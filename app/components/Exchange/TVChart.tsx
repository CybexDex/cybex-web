import * as React from "react";
import { FetchChain } from "cybexjs";
// import Datafeed from './api/'
import { widget } from "../../../charting_library/charting_library.min";
import EventEmitter from "event-emitter";
import { Colors } from "components/Common/Colors";
import IntlStore from "stores/IntlStore";
import {
  MarketHistoryActions,
  getMarketHistory,
  SubStore,
  supportedResolutions
} from "actions/MarketHistoryActions";
import { MarketHistoryStore, marketEvent } from "stores/MarketHistoryStore";

function getLanguageFromURL() {
  const regex = new RegExp("[\\?&]lang=([^&#]*)");
  const results = regex.exec(window.location.search);
  return results === null
    ? IntlStore.getState().currentLocale
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

class SymbolUtils {
  static Spliter = "/";
  static constructSymbolString = (quoteSymbol, baseSymbol) =>
    [quoteSymbol, baseSymbol].join(SymbolUtils.Spliter);
  static destructSymbolString = (symbolString: string) =>
    symbolString.split(SymbolUtils.Spliter);
  static constructSymbolTicker = (quoteSymbol, baseSymbol) =>
    SymbolUtils.constructSymbolString(quoteSymbol, baseSymbol).replace(
      /JADE\./gm,
      ""
    );
  static getAsset = (symbolOrId: string) => {
    return FetchChain("getAsset", symbolOrId);
  };
}

const RELOAD_CHART = Symbol();

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
    console.debug("===getBar bucketChange: ", prev[1], next[1]);
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
  latestTime;

  static defaultProps = {
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
    if (
      this.props.quoteSymbol !== prevProps.quoteSymbol ||
      this.props.baseSymbol !== prevProps.baseSymbol
    ) {
      this.updateEmitter.emit(RELOAD_CHART);
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
    let subCenter = new SubStore();
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

        const precision = (this.props.latestPrice
          ? this.props.latestPrice.full
          : 0.0
        )
          .toPrecision(6)
          .split(".")[1].length;
        let preToDeimal = pre => {
          let result = 1;
          for (let i = 0; i < pre; i++) {
            result = result * 10;
          }
          return result;
        };
        let description = SymbolUtils.constructSymbolTicker(
          this.props.quoteSymbol,
          this.props.baseSymbol
        );
        const symbolStub = {
          name: symbolName,
          description,
          type: "crypto",
          session: "24x7",
          timezone: "Asia/Shanghai",
          ticker: symbolName,
          legs: [symbolName],
          base_name: [symbolName],
          // exchange: "Cybex",
          minmov: 1,
          pricescale: preToDeimal(precision),
          has_intraday: true,
          has_seconds: true,
          intraday_multipliers: ["15S", "1", "60"],
          disabled_features,
          supported_resolution: support_r,
          volume_precision: 4,
          // force_session_rebuild: false,
          has_empty_bars: true,
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
        // console.debug("=====subscribeBars runnning", symbolInfo, subscribeUID);
        this.updateCbs.resetCache = () => onResetCacheNeededCallback();
        this.updateCbs.realtimeUpdate = onRealtimeCallback;
        let [quoteSymbol, baseSymbol] = SymbolUtils.destructSymbolString(
          symbolInfo.name
        );
        let subSymbol = SubStore.encodeSubSymbol(
          quoteSymbol,
          baseSymbol,
          supportedResolutions[resolution]
        );
        subCenter.addSub(subscribeUID);
        subCenter.addListener(subscribeUID, data => {
          // console.debug(
          //   "=====subscribeBars: Update Data: ",
          //   data,
          //   this.latestTime
          // );
          if (data && data.length) {
            if (this.latestTime) {
              data = data.filter(d => d.date >= this.latestTime);
            }
          }
          if (data && data.length) {
            if (!this.latestTime || data[0].date > this.latestTime) {
              this.latestTime = data[0].date;
            }
            data.reverse().forEach(priceData => onRealtimeCallback(priceData));
          }
        });
      },
      unsubscribeBars: subscriberUID => {
        subCenter.removeSub(subscriberUID);
        console.debug("=====unsubscribeBars running", subscriberUID);
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
        let [quoteSymbol, baseSymbol] = SymbolUtils.destructSymbolString(
          symbolInfo.name
        );
        let quote = await FetchChain("getAsset", quoteSymbol);
        let base = await FetchChain("getAsset", baseSymbol);
        let priceData = await getMarketHistory(
          base,
          quote,
          supportedResolutions[resolution],
          from,
          to
        );
        console.debug(
          "=====getBars running",
          symbolInfo,
          resolution,
          firstDataRequest,
          from,
          to
        );

        if (firstDataRequest) {
          this.latestTime = null;
        }
        const updateHistory = priceData => {
          priceData.filter(p => {
            p.date >= from && p.date <= to;
          });
          priceData = priceData.sort((prev, next) =>
            prev.date > next.date ? 1 : prev.date < next.date ? -1 : 0
          );
          if (priceData.length > 1) {
            // console.debug("===getBars: FinalPrice", priceData);
            if (!this.latestTime || priceData[0].date > this.latestTime) {
              this.latestTime = priceData[0].date;
            }
            onHistoryCallback(priceData, { noData: false });
          } else {
            // console.debug("=====getBar: NoData: ", priceData);
            onHistoryCallback([], { noData: true });
            // onHistoryCallback([], { noData: true, nextTime: new Date(new Date().getTime() - 86400 * 1000 * 10) });
          }
        };
        updateHistory(priceData);
      }
    };

    const widgetOptions = {
      debug: false,
      symbol: SymbolUtils.constructSymbolString(
        this.props.quoteSymbol,
        this.props.baseSymbol
      ),
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
            SymbolUtils.constructSymbolString(
              this.props.quoteSymbol,
              this.props.baseSymbol
            )
          );
        // .setSymbol(
        //   this.props.quoteSymbol.replace("JADE.", "") +
        //     "/" +
        //     this.props.baseSymbol.replace("JADE.", "")
        // );
      };
      // this.tvWidget
      //   .chart()
      //   .onIntervalChanged()
      //   .subscribe(null, (interval, obj) => {
      //     console.debug("TVChart: ", "onIntervalChanged: ", interval, obj);
      //     this.props.onChangeBucket(supportedResolutions[interval] || 86400);
      //     // obj.timeframe = "12M";
      //   });
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
