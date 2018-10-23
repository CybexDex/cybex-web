import * as React from "react";
// import './index.css';
// import Datafeed from './api/'
import { widget } from "../../../charting_library/charting_library.min";

function getLanguageFromURL() {
  const regex = new RegExp("[\\?&]lang=([^&#]*)");
  const results = regex.exec(window.location.search);
  return results === null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const supportedResolutions = [
  "1",
  "3",
  "5",
  "15",
  "30",
  "60",
  "120",
  "240",
  "D"
];

export class TVChartContainer extends React.PureComponent {
  static defaultProps = {
    symbol: "Cybex:BTC/USD",
    interval: "15",
    containerId: "tv_chart_container",
    libraryPath: "/charting_library/",
    chartsStorageUrl: "https://saveload.tradingview.com",
    chartsStorageApiVersion: "1.1",
    clientId: "tradingview.com",
    userId: "public_user_id",
    fullscreen: false,
    autosize: true,
    studiesOverrides: {}
  };

  tvWidget = null;

  componentDidMount() {
    const priceData = this.props.priceData;
    const volumeData=this.props.volumeData;

    console.log("priceData:", priceData);

    let Datafeed = {
      onReady: cb => {
        console.log("=====onReady running");
        setTimeout(
          () => cb({ supported_resolutions: supportedResolutions }),
          0
        );
      },
      calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
        //optional
        console.log("=====calculateHistoryDepth running");
        // while optional, this makes sure we request 24 hours of minute data at a time
        // CryptoCompare's minute data endpoint will throw an error if we request data beyond 7 days in the past, and return no data
        return resolution < 60
          ? { resolutionBack: "D", intervalBack: "1" }
          : undefined;
      },
      subscribeBars: (
        symbolInfo,
        resolution,
        onRealtimeCallback,
        subscribeUID,
        onResetCacheNeededCallback
      ) => {
        console.log("=====subscribeBars runnning");
        // stream.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback)
      },
      unsubscribeBars: subscriberUID => {
        console.log("=====unsubscribeBars running");
        // stream.unsubscribeBars(subscriberUID)
      },
    };

    Datafeed.resolveSymbol = function(
      symbolName,
      onSymbolResolvedCallback,
      onResolveErrorCallback
    ) {
      // expects a symbolInfo object in response
      console.log("======resolveSymbol running");
      // console.log('resolveSymbol:',{symbolName})
      var split_data = symbolName.split(/[:/]/);
      // console.log({split_data})
      var symbol_stub = {
        name: symbolName,
        description: "Fantastic",
        type: "crypto",
        session: "24x7",
        timezone: "Etc/UTC",
        ticker: symbolName,
        exchange: split_data[0],
        minmov: 1,
        pricescale: 100000000,
        has_intraday: true,
        intraday_multipliers: ["1", "60"],
        supported_resolution: supportedResolutions,
        volume_precision: 8,
        data_status: "streaming"
      };

      if (split_data[2].match(/USD|EUR|JPY|AUD|GBP|KRW|CNY/)) {
        symbol_stub.pricescale = 100;
      }
      // setTimeout(function() {
      //   onSymbolResolvedCallback(symbol_stub)
      //   console.log('Resolving that symbol....', symbol_stub)
      // }, 0)
    };

    Datafeed.getBars = function(
      symbolInfo,
      resolution,
      from,
      to,
      onHistoryCallback,
      onErrorCallback,
      firstDataRequest
    ) {
      console.debug("=====getBars running", priceData);
      if (priceData.length) {
        onHistoryCallback(priceData, { noData: false });
      } else {
        onHistoryCallback(priceData, { noData: true });
      }
    };

    const widgetOptions = {
      debug: true,
      symbol: "Cybex:" + this.props.baseSymbol + "/" + this.props.quoteSymbol, //"Cybex:BTC/USD"
      //symbol:this.props.exchange+this.props.symbol,
      datafeed: Datafeed,
      interval: this.props.interval,
      container_id: this.props.containerId,
      library_path: this.props.libraryPath,
      locale: getLanguageFromURL() || "en",
      // disabled_features: ["use_localstorage_for_settings"],
      // enabled_features: ["study_templates"],
      // charts_storage_url: this.props.chartsStorageUrl,
      charts_storage_api_version: this.props.chartsStorageApiVersion,
      // client_id: this.props.clientId,
      user_id: this.props.userId,
      fullscreen: this.props.fullscreen,
      autosize: this.props.autosize,
      // studies_overrides: this.props.studiesOverrides,
      // overrides: {
      //   "mainSeriesProperties.showCountdown": true,
      //   "paneProperties.background": "#131722",
      //   "paneProperties.vertGridProperties.color": "#363c4e",
      //   "paneProperties.horzGridProperties.color": "#363c4e",
      //   "symbolWatermarkProperties.transparency": 90,
      //   "scalesProperties.textColor": "#AAA",
      //   "mainSeriesProperties.candleStyle.wickUpColor": "#336854",
      //   "mainSeriesProperties.candleStyle.wickDownColor": "#7f323f"
      // },

      enabled_features: ["minimalistic_logo", "narrow_chart_enabled", "dont_show_boolean_study_arguments","hide_last_na_study_output","clear_bars_on_series_error", "hide_loading_screen_on_series_error"],
      disabled_features:["google_analytics", "header_widget","header_symbol_search","symbol_info","header_compare","header_chart_type","display_market_status","symbol_search_hot_key","compare_symbol","border_around_the_chart","remove_library_container_border","symbol_info","header_interval_dialog_button","show_interval_dialog_on_key_press","volume_force_overlay"],
      charts_storage_url: "http://saveload.tradingview.com",
      client_id: "bitmex.com",
      overrides: {
        "paneProperties.background": "#131722",
        "paneProperties.vertGridProperties.color": "#363c4e",
        "paneProperties.horzGridProperties.color": "#363c4e",
        "symbolWatermarkProperties.transparency": 90,
        "scalesProperties.textColor": "#AAA",
        "mainSeriesProperties.candleStyle.wickUpColor": "#336854",
        "mainSeriesProperties.candleStyle.wickDownColor": "#7f323f",
        // "paneProperties.topMargin": 10,
        // "paneProperties.bottomMargin": 25,
        "paneProperties.legendProperties.showStudyArguments": !1,
        "paneProperties.legendProperties.showStudyTitles": !0,
        "paneProperties.legendProperties.showStudyValues": !0,
        "paneProperties.legendProperties.showSeriesTitle": !1,
        "paneProperties.legendProperties.showSeriesOHLC": !0,
        "scalesProperties.showLeftScale": !1,
        "scalesProperties.showRightScale": !0,
        "scalesProperties.scaleSeriesOnly": !1,
        "scalesProperties.showSymbolLabels": !0,
        "mainSeriesProperties.priceAxisProperties.autoScale": !0,
        "mainSeriesProperties.priceAxisProperties.autoScaleDisabled": !1,
        "mainSeriesProperties.priceAxisProperties.percentage": !1,
        "mainSeriesProperties.priceAxisProperties.percentageDisabled": !1,
        "mainSeriesProperties.priceAxisProperties.log": !1,
        "mainSeriesProperties.priceAxisProperties.logDisabled": !1,
        "mainSeriesProperties.showLastValue": !0,
        "mainSeriesProperties.visible": !0,
        "mainSeriesProperties.showPriceLine": !0
      },

    };

    const tvWidget = new widget(widgetOptions);
    this.tvWidget = tvWidget;

    tvWidget.onChartReady(() => {
      console.log("Chart has loaded!");
    });
  }

  componentWillUnmount() {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  }

  render() {
    const priceData = this.props.priceData;
    console.debug("myPriceData",priceData);

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
