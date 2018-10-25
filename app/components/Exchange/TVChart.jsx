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

export class TVChartContainer extends React.PureComponent {
  // constructor(props) {
  //   super(props);
  //   this.bindListeners({
  //     onSubscribeMarket: MarketsActions.subscribeMarket,
  //   });
  // }

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

  componentDidMount() {

    const widgetOptions = {
      debug: true,
      symbol: "Cybex:" + this.props.quoteSymbol.replace("JADE.","")  + "/" + this.props.baseSymbol.replace("JADE.",""), //"Cybex:BTC/USD"
      //symbol:this.props.exchange+this.props.symbol,
      datafeed: this.props.Datafeed,
      interval: "60",
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
        { text: "6h", resolution: "1" },
      ],
      enabled_features:["minimalistic_logo", "narrow_chart_enabled", "dont_show_boolean_study_arguments","hide_last_na_study_output","clear_bars_on_series_error", "hide_loading_screen_on_series_error","side_toolbar_in_fullscreen_mode"],
      // disabled_features:["google_analytics", "header_widget","header_symbol_search","symbol_info","header_compare","header_chart_type","display_market_status","symbol_search_hot_key","compare_symbol","border_around_the_chart","remove_library_container_border","symbol_info","header_interval_dialog_button","show_interval_dialog_on_key_press","volume_force_overlay"],
      disabled_features:["header_widget","header_symbol_search","header_compare","header_chart_type","border_around_the_chart","remove_library_container_border"],
      client_id: "bitmex.com",
      custom_css_url: "/charting_library/themes/tv-dark.min.css",
      overrides: {
        "paneProperties.background": "#171d2a",
        "dataWindowProperties.font":"Open Sans, Verdana",
        "dataWindowProperties.fontSize":8,
        "paneProperties.vertGridProperties.color": "#363c4e",
        "paneProperties.horzGridProperties.color": "#363c4e",
        "symbolWatermarkProperties.transparency": 60,
        "scalesProperties.textColor": "#AAA",
        "mainSeriesProperties.candleStyle.wickUpColor": "#6dbb49", //"#336854",
        "mainSeriesProperties.candleStyle.wickDownColor": "#d24632",//"#7f323f",
        "paneProperties.topMargin": 10,
        "paneProperties.bottomMargin": 25,
      },
      loading_screen: { backgroundColor: "#171d2a" },
      studies:[
        "MACD@tv-basicstudies"
      ]
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

  // componentDidUpdate(){
  //   alert("update");
  // }

  // onSubscribeMarket(result){
  //   alert("Alert!Subscribe");
  //   console.log(result);
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
