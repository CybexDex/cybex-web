import * as React from "react";
// import './index.css';
// import Datafeed from './api/'
import { widget } from "../../../charting_library/charting_library.min";
import EventEmitter from "event-emitter";
import { Colors } from "components/Common/Colors";
import IntlStore from "stores/IntlStore";
import { MarketHistoryActions } from "actions/MarketHistoryActions";
import { MarketHistoryStore, marketEvent } from "stores/MarketHistoryStore";

function getLanguageFromURL() {
  const regex = new RegExp("[\\?&]lang=([^&#]*)");
  const results = regex.exec(window.location.search);
  return results === null
    ? IntlStore.getState().currentLocale
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const RELOAD_CHART = Symbol();
const supportedResolutions = {
  "15S": 15,
  "1": 60,
  "5": 300,
  "60": 3600,
  "1D": 86400
};
const support_r = Object.keys(supportedResolutions);
const interval = { 15: "15S", 60: "1", 300: "5", 3600: "60", 86400: "1D" };
const hasMarketChanged: (
  prev: Cybex.SanitizedMarketHistory[],
  next: Cybex.SanitizedMarketHistory[]
) => boolean = (prev = [], next = []) => {
  if (!prev.length && !next.length) return false;
  let fromZeroToOne = prev.length == 0 || next.length == 0;
  if (fromZeroToOne) {
    console.debug("===getBar from zero to one");
    return true;
  }
  let bucketChange: boolean =
    prev[1] && next[1] && prev[1].interval !== next[1].interval;

  if (bucketChange) {
    console.debug(
      "===getBar bucketChange: ",
      prev[1],
      next[1]
    );
    return true;
  }
  let marketChange: boolean =
    prev[0].base + prev[0].quote !== next[0].base + next[0].quote;
  if (marketChange) {
    console.debug(
      "===getBar marketChange: ",
      prev[0].base + prev[0].quote,
      next[0].base + next[0].quote,
      next[1]
    );
    return true;
  }
  return false;
};

class TVChartProps {
  priceData: Cybex.SanitizedMarketHistory[];
  [props: string]: any;
}

export class TVChartContainer extends React.PureComponent<TVChartProps> {
  updateEmitter = new EventEmitter();
  updateCbs: { [fnName: string]: any } = {};
  // priceData = [];

  static defaultProps = {
    symbol: "ETH/USDT",
    interval: "60",
    containerId: "tv_chart_container",
    libraryPath: "/charting_library/",
    chartsStorageUrl: "https://saveload.tradingview.com",
    chartsStorageApiVersion: "1.0",
    clientId: "tradingview.com",
    userId: "anonymous",
    fullscreen: false,
    autosize: true,
    studiesOverrides: {}
  };

  tvWidget = null;

  componentDidUpdate(prevProps: TVChartProps) {
    if (hasMarketChanged(prevProps.priceData, this.props.priceData)) {
      this.updateEmitter.emit(RELOAD_CHART);
    } else if (
      prevProps.priceData.length &&
      this.props.priceData.length &&
      this.updateCbs.realtimeUpdate
    ) {
      let latestDate = new Date(
        Math.max(
          prevProps.priceData[0].date as any,
          prevProps.priceData[prevProps.priceData.length - 1].date as any
        )
      );
      let newBars = this.props.priceData.filter(
        (price: Cybex.SanitizedMarketHistory) =>
          price.date.getTime() >= latestDate.getTime()
      );
      newBars.forEach(price => (price.time = price.date.getTime()));
      newBars.forEach(price => this.updateCbs.realtimeUpdate(price));
    }
  }

  componentDidMount() {
    this.updateEmitter.on(RELOAD_CHART, props => {
      if (this.updateCbs.resetData) {
        console.debug("==== getBar Reload Chart");
        this.updateCbs.resetCache();
        this.updateCbs.resetData();
      }
    });
    console.debug("==== getBar Component Did Mount");
    this._setupTv();
  }

  _setupTv() {
    let disabled_features = [
      "edit_buttons_in_legend",
      "header_symbol_search",
      // "timeframes_toolbar",
      "symbol_search_hot_key",
      "symbol_info",
      "header_compare",
      "header_undo_redo",
      "border_around_the_chart"
    ];
    let Datafeed = {
      onReady: cb => {
        console.debug("=====onReady running");
        setTimeout(() => {
          cb({ supported_resolutions: Object.keys(supportedResolutions) });
        }, 10);
      },
      resolveSymbol: (symbolName, onSymbolResolvedCallback) => {
        // expects a symbolInfo object in response
        console.debug("======resolveSymbol running", symbolName);

        const precision = (this.props.latestPrice ? this.props.latestPrice.full : 0.00000000)
          .toPrecision(6)
          .split(".")[1].length;
        let preToDeimal = pre => {
          let result = 1;
          for (let i = 0; i < pre; i++) {
            result = result * 10;
          }
          return result;
        };
        const symbolStub = {
          name: symbolName,
          description: symbolName,
          type: "crypto",
          session: "24x7",
          timezone: "Asia/Shanghai",
          ticker: symbolName,
          // exchange: "Cybex",
          minmov: 1,
          pricescale: preToDeimal(precision),
          has_intraday: true,
          has_seconds: true,
          intraday_multipliers: ["15S", "1", "60"],
          disabled_features,
          supported_resolution: support_r,
          volume_precision: 4,
          data_status: "streaming"
        };

        setTimeout(function() {
          onSymbolResolvedCallback(symbolStub);
          console.debug("Resolving that symbol....", symbolStub);
        }, 0);
      },
      subscribeBars: (
        symbolInfo,
        resolution,
        onRealtimeCallback,
        subscribeUID,
        onResetCacheNeededCallback
      ) => {
        console.debug("=====subscribeBars runnning", symbolInfo);
        this.updateCbs.resetCache = () => onResetCacheNeededCallback();
        this.updateCbs.realtimeUpdate = onRealtimeCallback;
        // stream.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback)
      },
      unsubscribeBars: subscriberUID => {
        console.debug("=====unsubscribeBars running", subscriberUID);
        // stream.unsubscribeBars(subscriberUID)
      },
      getBars: async (
        symbolInfo,
        resolution,
        from,
        to,
        onHistoryCallback,
        onErrorCallback,
        firstDataRequest
      ) => {
        from *= 1000;
        to = to * 1000;
        let currentPriceData =
          MarketHistoryStore.getState()[
            `${this.props.quoteSymbol}${this.props.baseSymbol}${
              this.props.bucketSize
            }`
          ] || [];

        let availableData = firstDataRequest
          ? currentPriceData
          : currentPriceData.filter(
              price => price.date >= from && price.date <= to
            );
        console.debug(
          "=====getBars running",
          firstDataRequest,
          from,
          to,
          currentPriceData,
          availableData
        );
        if (!availableData.length) {
          availableData = (await new Promise(resolve => {
            let requestID = new Date().toISOString() + "$";
            // console.debug("=====getBars running Greedy Fetch: ", requestID);
            MarketHistoryActions.patchMarketHistory(
              this.props.base,
              this.props.quote,
              this.props.bucketSize,
              MarketHistoryStore,
              false,
              requestID
            );
            marketEvent.once(requestID, newPriceData => {
              // console.debug(
              //   "=====getBars running Greedy Fetched: ",
              //   requestID,
              //   newPriceData
              // );
              resolve(newPriceData);
            });
          })) as Cybex.SanitizedMarketHistory[];
        }
        // console.debug("=====getBars running after fetch", availableData);

        const updateHistory = priceData => {
          priceData.filter(p => {
            p.date >= from && p.date <= to;
          });
          priceData = priceData.sort(
            (prev, next) =>
              prev.date > next.date ? 1 : prev.date < next.date ? -1 : 0
          );
          if (priceData.length > 1) {
            onHistoryCallback(priceData, { noData: false });
          } else {
            // console.debug("=====getBar: NoData: ", priceData);
            onHistoryCallback([], { noData: true });
            // onHistoryCallback([], { noData: true, nextTime: new Date(new Date().getTime() - 86400 * 1000 * 10) });
          }
        };
        updateHistory(availableData);
      }
    };

    const widgetOptions = {
      debug: false,
      symbol:
        this.props.quoteSymbol.replace("JADE.", "") +
        "/" +
        this.props.baseSymbol.replace("JADE.", ""),
      // datafeed: this.props.Datafeed,
      datafeed: Datafeed,
      interval: interval[this.props.bucketSize],
      container_id: this.props.containerId,
      library_path: this.props.libraryPath,
      locale: getLanguageFromURL() || "en",
      // disabled_features: ["use_localstorage_for_settings"],
      // enabled_features: ["study_templates"],
      charts_storage_url: this.props.chartsStorageUrl,
      charts_storage_api_version: this.props.chartsStorageApiVersion,
      // client_id: this.props.clientId,
      user_id: this.props.userId,
      fullscreen: this.props.fullscreen,
      autosize: this.props.autosize,
      timezone: "Asia/Shanghai",
      // time_frames: [
      //   { text: "1m", resolution: "1D" },
      //   { text: "1d", resolution: "60" },
      //   { text: "6h", resolution: "1" }
      // ],
      enabled_features: [
        "hide_loading_screen_on_series_error",
        "side_toolbar_in_fullscreen_mode",
        "keep_left_toolbar_visible_on_small_screens"
        // "hide_left_toolbar_by_default"
      ],
      // disabled_features:["google_analytics", "header_widget","header_symbol_search","symbol_info","header_compare","header_chart_type","display_market_status","symbol_search_hot_key","compare_symbol","border_around_the_chart","remove_library_container_border","symbol_info","header_interval_dialog_button","show_interval_dialog_on_key_press","volume_force_overlay"],
      disabled_features,
      // hide_top_toolbar: true,
      toolbar_bg: Colors.$colorDark,
      client_id: "tradingview.com",
      custom_css_url: ["/charting_library/themes/tv-dark.min.css"],
      overrides: {
        "paneProperties.background": Colors.$colorDark,
        "dataWindowProperties.font": "Open Sans, Verdana",
        "dataWindowProperties.fontSize": 8,
        "paneProperties.vertGridProperties.color": "#363c4e",
        "paneProperties.horzGridProperties.color": "#363c4e",
        "symbolWatermarkProperties.transparency": 60,
        "scalesProperties.textColor": "#AAA",
        "scalesProperties.fontSize": 10,
        "paneProperties.topMargin": 10,
        "paneProperties.bottomMargin": 25,
        "paneProperties.leftMargin": 20,
        "paneProperties.rightMargin": 20,

        // Colors
        "mainSeriesProperties.candleStyle.wickUpColor": Colors.$colorGrass,
        "mainSeriesProperties.candleStyle.wickDownColor": Colors.$colorFlame,
        "mainSeriesProperties.candleStyle.upColor": Colors.$colorGrass,
        "mainSeriesProperties.candleStyle.downColor": Colors.$colorFlame
      },
      loading_screen: { backgroundColor: "#171d2a" },
      studies: ["MACD@tv-basicstudies"]
    };

    this.tvWidget = new widget(widgetOptions as any);

    this.tvWidget.onChartReady(() => {
      console.debug("Chart has loaded!");
      this.updateCbs.resetData = () => {
        this.tvWidget.activeChart().resetData();
        this.tvWidget
          .activeChart()
          .setSymbol(
            this.props.quoteSymbol.replace("JADE.", "") +
              "/" +
              this.props.baseSymbol.replace("JADE.", "")
          );
      };
      this.tvWidget
        .chart()
        .onIntervalChanged()
        .subscribe(null, (interval, obj) => {
          console.debug("TVChart: ", "onIntervalChanged: ", interval, obj);
          this.props.onChangeBucket(supportedResolutions[interval] || 86400);
          // obj.timeframe = "12M";
        });
    });
  }

  componentWillUnmount() {
    // if (this.tvWidget !== null) {
    //   this.tvWidget.remove();
    //   this.tvWidget = null;
    // }
  }

  render() {
    return (
      <div
        id={this.props.containerId}
        className={"TVChartContainer"}
        style={{
          height: this.props.height,
          width: "100%",
          marginBottom: "15px",
          borderBottom: "1px solid #2f3239"
        }}
      />
    );
  }
}
