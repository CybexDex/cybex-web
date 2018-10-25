import * as React from "react";
// import './index.css';
// import Datafeed from './api/'
import { widget } from "../../../charting_library/charting_library.min";
import EventEmitter from "event-emitter";

function getLanguageFromURL() {
  const regex = new RegExp("[\\?&]lang=([^&#]*)");
  const results = regex.exec(window.location.search);
  return results === null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const supportedResolutions = ["1", "5", "60", "1D", "1W", "1M"];
const RELOAD_CHART = Symbol();
export class TVChartContainer extends React.PureComponent {
  updateEmitter = new EventEmitter();
  updateCbs = {};
  priceData = [];
  static defaultProps = {
    symbol: "Cybex:BTC/USD",
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
    console.debug("TVChart: ", prevProps, this.props);
    if (
      prevProps.baseSymbol !== this.props.baseSymbol ||
      prevProps.quoteSymbol !== this.props.quoteSymbol ||
      (prevProps.priceData.length === 0 && this.props.priceData.length !== 0) ||
      (prevProps.priceData[0].base !== this.props.priceData[0].base ||
        prevProps.priceData[0].quote !== this.props.priceData[0].quote)
    ) {
      this.priceData = this.props.priceData.map(price => ({
        ...price,
        time: price.date.getTime()
      }));
      this.updateEmitter.emit(RELOAD_CHART);
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
    let Datafeed = {
      onReady: cb => {
        console.log("=====onReady running");
        cb({ supported_resolutions: supportedResolutions });
      },
      resolveSymbol: (symbolName, onSymbolResolvedCallback) => {
        // expects a symbolInfo object in response
        console.debug("======resolveSymbol running", symbolName);
        // console.log('resolveSymbol:',{symbolName})
        // const split_data = symbolName.split(/[:/]/);

        const symbolStub = {
          name: symbolName,
          description: symbolName,
          type: "crypto",
          session: "24x7",
          timezone: "Asia/Shanghai",
          ticker: symbolName,
          exchange: "Cybex",
          minmov: 1,
          pricescale: 100000000,
          has_intraday: true,
          intraday_multipliers: ["1", "60"],
          supported_resolution: supportedResolutions,
          volume_precision: 8,
          data_status: "streaming"
        };

        // if (split_data[2].match(/USD|EUR|JPY|AUD|GBP|KRW|CNY/)) {
        //   symbolStub.pricescale = 100;
        // }
        // setTimeout(function() {
        onSymbolResolvedCallback(symbolStub);
        console.log("Resolving that symbol....", symbolStub);
        // }, 0);
      },
      subscribeBars: (
        symbolInfo,
        resolution,
        onRealtimeCallback,
        subscribeUID,
        onResetCacheNeededCallback
      ) => {
        console.log("=====subscribeBars runnning", symbolInfo);
        this.updateCbs.resetCache = () => onResetCacheNeededCallback();
        // stream.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback)
      },
      unsubscribeBars: subscriberUID => {
        console.log("=====unsubscribeBars running", subscriberUID);
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
        console.debug("=====getBars running", from, to, this.priceData);
        let priceData = this.priceData.filter(
          price => price.time >= from && price.time <= to
        );
        const updateHistory = () => {
          if (priceData.length) {
            onHistoryCallback(priceData, { noData: false });
          } else {
            onHistoryCallback(priceData, { noData: true });
          }
        };
        updateHistory();
      }
    };

    const widgetOptions = {
      debug: false,
      symbol: this._getSymbol(), //"Cybex:BTC/USD"
      //symbol:this.props.exchange+this.props.symbol,
      datafeed: Datafeed,
      interval: this.props.interval,
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
      time_frames: [
        { text: "1m", resolution: "1M" },
        { text: "1w", resolution: "1W" },
        { text: "1d", resolution: "1D" },
        { text: "6h", resolution: "6" }
      ],
      enabled_features: [
        "minimalistic_logo",
        "narrow_chart_enabled",
        "dont_show_boolean_study_arguments",
        "hide_last_na_study_output",
        "clear_bars_on_series_error",
        "hide_loading_screen_on_series_error",
        "side_toolbar_in_fullscreen_mode"
      ],
      // disabled_features:["google_analytics", "header_widget","header_symbol_search","symbol_info","header_compare","header_chart_type","display_market_status","symbol_search_hot_key","compare_symbol","border_around_the_chart","remove_library_container_border","symbol_info","header_interval_dialog_button","show_interval_dialog_on_key_press","volume_force_overlay"],
      disabled_features: [
        "header_widget",
        "header_symbol_search",
        "header_compare",
        "header_chart_type",
        "border_around_the_chart",
        "remove_library_container_border"
      ],
      client_id: "bitmex.com",
      custom_css_url: "/charting_library/themes/tv-dark.min.css",
      overrides: {
        "paneProperties.background": "#171d2a",
        "dataWindowProperties.font": "Open Sans, Verdana",
        "dataWindowProperties.fontSize": 8,
        "paneProperties.vertGridProperties.color": "#363c4e",
        "paneProperties.horzGridProperties.color": "#363c4e",
        "symbolWatermarkProperties.transparency": 60,
        "scalesProperties.textColor": "#AAA",
        "mainSeriesProperties.candleStyle.wickUpColor": "#6dbb49", //"#336854",
        "mainSeriesProperties.candleStyle.wickDownColor": "#d24632", //"#7f323f",
        "paneProperties.topMargin": 10,
        "paneProperties.bottomMargin": 25
      },
      loading_screen: { backgroundColor: "#171d2a" },
      studies: ["MACD@tv-basicstudies"]
    };

    const tvWidget = new widget(widgetOptions);
    this.tvWidget = tvWidget;

    tvWidget.onChartReady(() => {
      console.log("Chart has loaded!");
      this.updateCbs.resetData = () => {
        tvWidget.activeChart().resetData();
        tvWidget.activeChart().setSymbol(this._getSymbol());
      };
    });
  }

  _getSymbol = () => {
    return (
      "Cybex:" +
      this.props.quoteSymbol.replace("JADE.", "") +
      "/" +
      this.props.baseSymbol.replace("JADE.", "")
    );
  };

  componentWillUnmount() {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  }

  // componentDidUpdate(){
  //   alert("update");
  // }

  render() {
    return (
      <div
        id={this.props.containerId}
        className={"TVChartContainer"}
        style={{
          height: this.props.height,
          width: "100%"
        }}
      />
    );
  }
}
