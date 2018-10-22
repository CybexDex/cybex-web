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
    //const volumeData=this.props.volumeData;

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
      }
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
      // close: 6439.1
      // high: 6439.1
      // low: 6439.09
      // open: 6439.09
      // time: 1539803100
      // volumefrom: 1.44
      // volumeto: 9261.31

      // close: 0.0008410000044910787
      // date: Mon Mar 05 2018 08:00:00 GMT+0800 (中国标准时间) {}
      // high: 0.0008410000044910787
      // low: 0.0005
      // open: 0.0005
      // volume: 87270.08555

      priceData.forEach(price => {
        price.time = price.date.getTime();
        price.volumefrom = price.volume;
        price.volumeto = price.volume;
      });

      if (priceData.length) {
        onHistoryCallback(priceData, { noData: false });
      } else {
        onHistoryCallback(priceData, { noData: true });
      }
    };

    const widgetOptions = {
      debug: true,
      symbol: "Cybex:" + this.props.base + "/" + this.props.quote, //"Cybex:BTC/USD"
      //symbol:this.props.exchange+this.props.symbol,
      datafeed: Datafeed,
      interval: this.props.interval,
      container_id: this.props.containerId,
      library_path: this.props.libraryPath,
      locale: getLanguageFromURL() || "en",
      disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["study_templates"],
      charts_storage_url: this.props.chartsStorageUrl,
      charts_storage_api_version: this.props.chartsStorageApiVersion,
      client_id: this.props.clientId,
      user_id: this.props.userId,
      fullscreen: this.props.fullscreen,
      autosize: this.props.autosize,
      studies_overrides: this.props.studiesOverrides,
      overrides: {
        "mainSeriesProperties.showCountdown": true,
        "paneProperties.background": "#131722",
        "paneProperties.vertGridProperties.color": "#363c4e",
        "paneProperties.horzGridProperties.color": "#363c4e",
        "symbolWatermarkProperties.transparency": 90,
        "scalesProperties.textColor": "#AAA",
        "mainSeriesProperties.candleStyle.wickUpColor": "#336854",
        "mainSeriesProperties.candleStyle.wickDownColor": "#7f323f"
      }
    };

    // window.TradingView.onready(() => {
    //   const widget = window.tvWidget = new window.TradingView.widget(widgetOptions);
    //
    //   widget.onChartReady(() => {
    //     console.log("Chart has loaded!");
    //   });
    // });
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
    return (
      <div
        id={this.props.containerId}
        className={"TVChartContainer"}
        height={this.props.height}
      />
    );
  }
}
