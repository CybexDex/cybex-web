import * as React from "react";
// import './index.css';
// import Datafeed from './api/'
import { widget } from "../../../charting_library/charting_library.min";
import EventEmitter from "event-emitter";
import { Colors } from "components/Common/Colors";
import IntlStore from "stores/IntlStore";

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
const interval = { 15: "15S", 60: "1", 300: "5", 3600: "60", 86400: "1D" };
type Price = {
  base: "JADE.USDT";
  close: 578.4156383628588;
  date: Date;
  high: 586.1529147571035;
  isBarClosed: true;
  isLastBar: false;
  low: 566.4228706896552;
  open: 573.7612700228833;
  quote: "JADE.ETH";
  time: 1466265600000;
  volume: 475.724341;
};
const isPriceDifferent: (prev: Price[], next: Price[]) => boolean = (
  prev = [],
  next = []
) => {
  let fromZeroToOne =
    prev.length < 2 ||
    next.length < 2 ||
    Math.abs(next.length - prev.length) >= 2;
  if (fromZeroToOne) {
    return true;
  }
  let bucketChange: boolean =
    [prev[0], prev[1]].reduce(
      (first, second) => Math.abs(first.time - second.time) as any
    ) !==
    [next[0], next[1]].reduce(
      (first, second) => Math.abs(first.time - second.time) as any
    );
  if (bucketChange) {
    return true;
  }
  let marketChange: boolean =
    prev[0].base + prev[0].quote !== next[0].base + next[0].quote;
  if (marketChange) {
    return true;
  }
  return false;
};

export class TVChartContainer extends React.PureComponent<any> {
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

  componentDidUpdate(prevProps) {
    // console.debug("TVChart: DidUpdate", prevProps, this.props);
    if (isPriceDifferent(prevProps.priceData, this.props.priceData)) {
      this.updateEmitter.emit(RELOAD_CHART);
    }
    // Price realtime update
    // TODO: needs further riview
    if (
      this.props.lastBar &&
      this.props.priceData.length >= prevProps.priceData.length
    ) {
      let index = this.props.priceData.findIndex(this.props.lastBar);
      while (index < this.props.priceData.length) {
        if (this.updateCbs.realtimeUpdate) {
          this.updateCbs.realtimeUpdate(this.props.priceData[index]);
        }
        index = index + 1;
      }
    }
  }

  componentDidMount() {
    this.updateEmitter.on(RELOAD_CHART, props => {
      if (this.updateCbs.resetData) {
        console.debug("Reload Chart");
        this.updateCbs.resetCache();
        this.updateCbs.resetData();
      }
    });
    this._setupTv();
  }

  _setupTv() {
    let disabled_features = [
      "edit_buttons_in_legend",
      "header_symbol_search",
      // "hide_left_toolbar_by_default",
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
        // console.debug('resolveSymbol:',{symbolName})
        const symbolStub = {
          name: symbolName,
          description: symbolName,
          type: "crypto",
          session: "24x7",
          timezone: "Asia/Shanghai",
          ticker: symbolName,
          // exchange: "Cybex",
          minmov: 1,
          pricescale: 1000000,
          has_intraday: true,
          has_seconds: true,
          intraday_multipliers: ["15S", "1", "60"],
          disabled_features,
          supported_resolution: Object.keys(supportedResolutions),
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
      getBars: (
        symbolInfo,
        resolution,
        from,
        to,
        onHistoryCallback,
        onErrorCallback,
        firstDataRequest
      ) => {
        from *= 1000;
        to *= 1000;
        console.debug("=====getBars running", from, to, this.props.priceData);
        let priceData = this.props.priceData
          .filter(price => price.time >= from && price.time <= to)
          .sort(
            (prev, next) =>
              prev.time > next.time ? 1 : prev.time < next.time ? -1 : 0
          );
        const updateHistory = () => {
          if (priceData.length) {
            onHistoryCallback(priceData, { noData: false });
            this.updateCbs.lastBar = priceData[priceData.length - 1];
          } else {
            onHistoryCallback(priceData, { noData: true });
            this.updateCbs.lastBar = null;
          }
        };
        updateHistory();
      }
    };

    const widgetOptions = {
      debug: false,
      symbol: this.props.quoteSymbol.replace("JADE.", "") + "/" + this.props.baseSymbol.replace("JADE.", ""),
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
      time_frames: [
        { text: "1m", resolution: "1D" },
        { text: "1d", resolution: "60" },
        { text: "6h", resolution: "1" }
      ],
      enabled_features: [
          "hide_loading_screen_on_series_error",
          "side_toolbar_in_fullscreen_mode",
          "hide_left_toolbar_by_default"
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
          "scalesProperties.fontSize":10,
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
        this.tvWidget.activeChart().setSymbol(this._getSymbol());
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
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
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
