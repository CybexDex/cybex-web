import * as React from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import Translate from "react-translate-component";
import {
  ChartCanvas,
  Chart,
  series,
  scale,
  coordinates,
  tooltip,
  axes,
  indicator,
  helper,
  interactive
} from "react-stockcharts";
import { handleStockData } from "utils/Chart";
import Radium from "radium";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
  ema,
  wma,
  sma,
  tma,
  macd,
  bollingerBand
} from "react-stockcharts/es/lib/indicator";
import {
  CandlestickSeries,
  BarSeries,
  LineSeries,
  AreaSeries,
  BollingerSeries,
  MACDSeries
} from "react-stockcharts/es/lib/series";

import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
  CurrentCoordinate,
  EdgeIndicator
} from "react-stockcharts/es/lib/coordinates";
import {
  FibonacciRetracement,
  TrendLine
} from "react-stockcharts/es/lib/interactive";
import {
  OHLCTooltip,
  MovingAverageTooltip,
  BollingerBandTooltip,
  MACDTooltip
} from "react-stockcharts/lib/tooltip";
import colors from "assets/colors";
import { cloneDeep } from "lodash";
import utils from "common/utils";
import cnames from "classnames";
import counterpart from "counterpart";
import Icon from "../Icon/Icon";
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from "constants";
import { Checkbox, Button, LabelOption } from "components/Common";

import numeral from "numeral";

const bbStroke = {
  top: "#964B00",
  middle: "#000000",
  bottom: "#964B00"
};

const bbFill = "#4682B4";
const ohlcStyle = {
  fontSize: 12,
  textFill: "rgba(255,255,255,0.8)",
  labelFill: "rgba(255,255,255,0.3)"
};
const labelStyle = {
  opacity: 0.3,
  // stroke: "rgba(255,255,255,0.3)",
  textFill: "rgba(255,255,255,0.3)"
};
const axisStyle = {
  ...labelStyle,
  fontSize: 10
};
const arrowStyle = (isRight = true) => ({
  fontSize: 10,
  rectWidth: 34,
  rectHeight: 12,
  arrowWidth: 4,
  dx: isRight ? -4 : 4,
  opacity: 1
});

let CandleStickChartWithZoomPan = class extends React.Component<any, any> {
  constructor(props) {
    super(props);

    const pricePrecision = props.base.get("precision");
    const volumePrecision = props.quote.get("precision");

    const priceFormat = format(`.${pricePrecision}f`);
    const timeFormatter = timeFormat("%Y-%m-%d %H:%M");
    const volumeFormat = volume =>
      volume > 10
        ? numeral(volume).format(`0.0a`)
        : numeral(volume).format(`0.00a`);

    let { digits, marginRight } = this.calcDigits(props);
    this.state = {
      enableTrendLine: false,
      enableFib: false,
      tools: [],
      priceFormat,
      timeFormatter,
      volumeFormat,
      margin: { left: 10, right: 48, top: 30, bottom: 20 },
      calculators: this._getCalculators(props)
    };

    this.onTrendLineComplete = this.onTrendLineComplete.bind(this);
    this.onFibComplete = this.onFibComplete.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keyup", this.onKeyPress, {
      capture: false,
      passive: true
    });
  }
  componentWillUnmount() {
    document.removeEventListener("keyup", this.onKeyPress);
  }

  onTrendLineComplete() {
    this.setState({
      enableTrendLine: false
    });
  }

  onFibComplete() {
    this.setState({
      enableFib: false
    });
  }

  onKeyPress(e) {
    const tools = cloneDeep(this.state.tools);
    const ref = this.refs[tools[tools.length - 1]];
    var keyCode = e.which;
    switch (keyCode) {
      case 46: {
        // DEL
        if (ref) ref.removeLast();
        tools.pop();
        this.setState({ tools });
        break;
      }
      case 27: {
        // ESC
        if (ref) ref.terminate();
        try {
          // modal uses escape event as well, and this line throws an exception
          this.setState({
            [enableFib]: false
          });
        } catch (e) {}
        break;
      }
    }
  }

  calcDigits = props => {
    let [digits, marginRight] = [6, 48];
    try {
      digits = props.latest.int.length > 1 ? 2 : 6;
      marginRight = (props.latest.int.length + digits) * 6 + 12;
    } catch (e) {}
    return {
      digits,
      marginRight
    };
  };

  componentWillReceiveProps(np) {
    console.debug("NP: ", np);
    let tools = cloneDeep(this.state.tools);
    if (np.tools && np.tools.trendline) {
      this.setState({ enableTrendLine: true });
      tools.push("enableTrendLine");
    }
    if (np.tools && np.tools.fib) {
      this.setState({ enableFib: true });
      tools.push("enableFib");
    }
    // 判断是否极小价格变化
    let { digits, marginRight } = this.calcDigits(np);
    if (this.state.margin.right !== marginRight) {
      this.setState({
        digits,
        margin: {
          ...this.state.margin,
          right: marginRight
        }
      });
    }
    this.setState({ tools });

    if (
      !utils.are_equal_shallow(np.indicators, this.props.indicators) ||
      !utils.are_equal_shallow(
        np.indicatorSettings,
        this.props.indicatorSettings
      )
    ) {
      this.setState({ calculators: this._getCalculators(np) });
    }
  }

  _getThemeColors(props = this.props) {
    return colors[props.theme];
  }

  _getCalculators(props = this.props) {
    const { positiveColor, negativeColor } = this._getThemeColors(props);
    const { indicatorSettings } = props;
    const calculators = {
      sma: sma()
        .options({
          windowSize: parseInt(indicatorSettings["sma"], 10), // optional will default to 10
          sourcePath: "close" // optional will default to close as the source
        })
        .stroke("#1f77b4")
        .fill("#1f77b4")
        .merge((d, c) => {
          d.sma = c;
        })
        .accessor(d => d.sma),
      ema1: ema()
        .options({
          windowSize: parseInt(indicatorSettings["ema1"], 10) // optional will default to 10
        })
        .merge((d, c) => {
          d.ema1 = c;
        })
        .accessor(d => d.ema1),
      ema2: ema()
        .options({
          windowSize: parseInt(indicatorSettings["ema2"], 10) // optional will default to 10
        })
        .merge((d, c) => {
          d.ema2 = c;
        })
        .accessor(d => d.ema2),
      smaVolume: sma()
        .options({
          windowSize: parseInt(indicatorSettings["smaVolume"], 10), // optional will default to 10
          sourcePath: "volume" // optional will default to close as the source
        })
        .merge((d, c) => {
          d.smaVolume = c;
        })
        .stroke("#1f77b4")
        .fill("#1f77b4")
        .accessor(d => d.smaVolume),
      bb: bollingerBand()
        .merge((d, c) => {
          d.bb = c;
        })
        .accessor(d => d.bb),
      macd: macd()
        .options({
          fast: 12,
          slow: 26,
          signal: 9
        })
        .stroke({ macd: negativeColor, signal: positiveColor })
        .fill({ macd: negativeColor, signal: positiveColor })
        .merge((d, c) => {
          d.macd = c;
        })
        .accessor(d => d.macd)
    };

    return calculators;
  }

  _renderVolumeChart(chartMultiplier) {
    const { height, indicators, width } = this.props;
    const { timeFormatter, volumeFormat, calculators, margin } = this.state;
    const {
      axisLineColor,
      volumeColor,
      indicatorLineColor,
      negativeColor,
      positiveColor
    } = this._getThemeColors();
    let gridHeight = height - margin.top - margin.bottom;
    let gridWidth = width - margin.left - margin.right;

    let showGrid = true;
    let yGrid = showGrid
      ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.1 }
      : {};

    return (
      <Chart
        id={2}
        yExtents={[d => d.volume, calculators.smaVolume.accessor()]}
        height={60}
        origin={(w, h) => [0, indicators.macd ? h - 180 : h - 80]}
      >
        {indicators.macd ? null : (
          <XAxis
            tickStroke={axisLineColor}
            stroke={axisLineColor}
            {...axisStyle}
            axisAt="bottom"
            orient="bottom"
            opacity={0.5}
            // tickFormat={timeFormatter}
            ticks={10}
          />
        )}
        <YAxis
          tickStroke={axisLineColor}
          showDomain={false}
          stroke={axisLineColor}
          axisAt="right"
          orient="right"
          {...axisStyle}
          ticks={4}
          tickPadding={4}
          innerTickSize={0}
          tickFormat={volumeFormat}
        />
        <YAxis
          tickStroke={axisLineColor}
          showDomain={false}
          stroke={axisLineColor}
          axisAt="left"
          orient="left"
          showTickLabel={false}
          {...axisStyle}
          {...yGrid}
          ticks={4}
          tickPadding={0}
          tickFormat={volumeFormat}
        />

        {indicators.macd ? null : (
          <MouseCoordinateX
            id={1}
            rectWidth={65}
            at="bottom"
            orient="bottom"
            displayFormat={timeFormatter}
          />
        )}
        <MouseCoordinateY
          id={0}
          {...arrowStyle()}
          at="right"
          orient="left"
          displayFormat={volumeFormat}
        />

        <BarSeries
          yAccessor={d => d.volume}
          rectRadius={[40, 40, 40, 40, 0, 0, 0, 0]}
          stroke={false}
          opacity={0.5}
          fill={d => (d.close > d.open ? positiveColor : negativeColor)}
        />
        {indicators.smaVolume ? (
          <AreaSeries
            yAccessor={calculators.smaVolume.accessor()}
            stroke={calculators.smaVolume.stroke()}
            fill={calculators.smaVolume.fill()}
          />
        ) : null}

        {indicators.smaVolume ? (
          <CurrentCoordinate
            yAccessor={calculators.smaVolume.accessor()}
            fill={calculators.smaVolume.stroke()}
          />
        ) : null}
        <CurrentCoordinate yAccessor={d => d.volume} fill={volumeColor} />

        {/* <EdgeIndicator
          lineStroke={indicatorLineColor}
          rectWidth={30}
          itemType="first"
          orient="left"
          edgeAt="right"
          yAccessor={d => d.volume}
          displayFormat={volumeFormat}
          fill="#0F0F0F"
        />
        <EdgeIndicator
          lineStroke={indicatorLineColor}
          rectWidth={30}
          itemType="last"
          orient="left"
          edgeAt="right"
          yAccessor={d => d.volume}
          displayFormat={volumeFormat}
          fill="#0F0F0F"
        /> */}
        {/* {indicators.smaVolume ? (
          <EdgeIndicator
            lineStroke={indicatorLineColor}
            rectWidth={30}
            itemType="first"
            orient="right"
            edgeAt="left"
            yAccessor={calculators.smaVolume.accessor()}
            displayFormat={volumeFormat}
            fill={calculators.smaVolume.fill()}
          />
        ) : null} */}
        {/* {indicators.smaVolume ? (
          <EdgeIndicator
            lineStroke={indicatorLineColor}
            rectWidth={30}
            itemType="last"
            orient="left"
            edgeAt="right"
            yAccessor={calculators.smaVolume.accessor()}
            displayFormat={volumeFormat}
            fill={calculators.smaVolume.fill()}
          />
        ) : null} */}
      </Chart>
    );
  }

  _renderCandleStickChart(chartMultiplier, maCalcs) {
    const {
      height,
      width,
      showVolumeChart,
      indicators,
      enableChartClamp,
      onMouseMove,
      lasest
    } = this.props;

    let { marginRight, digits } = this.calcDigits(this.props);

    const {
      timeFormatter,
      volumeFormat,
      priceFormat,

      enableTrendLine,
      enableFib,
      calculators
    } = this.state;
    let margin = {
      ...this.state.margin,
      right: marginRight
    };
    const {
      positiveColor,
      negativeColor,
      axisLineColor,
      indicatorLineColor
    } = this._getThemeColors();

    let gridHeight = height - margin.top - margin.bottom;
    let gridWidth = width - margin.left - margin.right;

    let showGrid = true;
    let yGrid = showGrid
      ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.1 }
      : {};
    return (
      <Chart
        id={1}
        height={224}
        yExtents={[
          d => [d.high, d.low],
          calculators.ema1.accessor(),
          calculators.ema2.accessor(),
          calculators.sma.accessor()
        ]}
        padding={{ top: 10, bottom: 20 }}
      >
        <XAxis
          tickStroke={axisLineColor}
          showTicks={false}
          showTickLabel={false}
          stroke={axisLineColor}
          {...axisStyle}
          axisAt="bottom"
          orient="bottom"
          opacity={0.8}
        />
        <YAxis
          axisAt="right"
          orient="right"
          tickPadding={4}
          tickFormat={format(`.${digits}f`)}
          showDomain={false}
          // zoomEnabled={false}
          {...axisStyle}
          ticks={8}
          innerTickSize={0}
          tickStroke={axisLineColor}
          stroke={axisLineColor}
        />
        <YAxis
          axisAt="left"
          orient="left"
          tickPadding={0}
          showDomain={false}
          showTickLabel={false}
          zoomEnabled={false}
          {...yGrid}
          {...axisStyle}
          ticks={8}
          tickStroke={axisLineColor}
          stroke={axisLineColor}
        />

        {indicators.macd || showVolumeChart ? null : (
          <MouseCoordinateX
            id={1}
            rectWidth={65}
            at="bottom"
            orient="bottom"
            displayFormat={timeFormatter}
          />
        )}
        <MouseCoordinateY
          {...arrowStyle()}
          id={0}
          // dx={-50}
          at="right"
          orient="left"
          displayFormat={priceFormat}
        />

        <CandlestickSeries
          wickStroke={d => (d.close > d.open ? positiveColor : negativeColor)}
          stroke={d => (d.close > d.open ? positiveColor : negativeColor)}
          fill={d => (d.close > d.open ? positiveColor : negativeColor)}
          opacity={1}
          rectRadius={40}
        />
        {indicators.bb && (
          <BollingerSeries
            yAccessor={d => d.bb}
            stroke={bbStroke}
            fill={bbFill}
          />
        )}

        {indicators.sma ? (
          <LineSeries
            yAccessor={calculators.sma.accessor()}
            stroke={calculators.sma.stroke()}
          />
        ) : null}
        {indicators.ema1 ? (
          <LineSeries
            yAccessor={calculators.ema1.accessor()}
            stroke={calculators.ema1.stroke()}
          />
        ) : null}
        {indicators.ema2 ? (
          <LineSeries
            yAccessor={calculators.ema2.accessor()}
            stroke={calculators.ema2.stroke()}
          />
        ) : null}

        {indicators.sma ? (
          <CurrentCoordinate
            yAccessor={calculators.sma.accessor()}
            fill={calculators.sma.stroke()}
          />
        ) : null}
        {indicators.ema1 ? (
          <CurrentCoordinate
            yAccessor={calculators.ema1.accessor()}
            fill={calculators.ema1.stroke()}
          />
        ) : null}
        {indicators.ema2 ? (
          <CurrentCoordinate
            yAccessor={calculators.ema2.accessor()}
            fill={calculators.ema2.stroke()}
          />
        ) : null}

        {/* <EdgeIndicator
          {...arrowStyle()}
          rectHeight={10}
          lineStroke={indicatorLineColor}
          dx={-50}
          
          itemType="last"
          orient="right"
          edgeAt="right"
          yAccessor={d => d.close}
          displayFormat={priceFormat}
          fill={d => (d.close > d.open ? positiveColor : negativeColor)}
        />
        <EdgeIndicator
          {...arrowStyle(false)}
          lineStroke={indicatorLineColor}
          itemType="first"
          orient="left"
          edgeAt="left"
          dx={50}
          yAccessor={d => d.close}
          displayFormat={priceFormat}
          fill={d => (d.close > d.open ? positiveColor : negativeColor)}
        /> */}

        <OHLCTooltip
          {...ohlcStyle}
          className="tooltip-hide-no"
          xDisplayFormat={timeFormatter}
          volumeFormat={volumeFormat}
          ohlcFormat={priceFormat}
          origin={[0, -10]}
        />

        {maCalcs.length ? (
          <MovingAverageTooltip
            origin={[0, 0]}
            displayFormat={priceFormat}
            options={maCalcs.map(s => ({
              yAccessor: s.accessor(),
              type: s.type(),
              stroke: s.stroke(),
              windowSize: s.options().windowSize,
              echo: "some echo here"
            }))}
          />
        ) : null}

        {indicators.bb && (
          <BollingerBandTooltip
            origin={[-40, 40]}
            yAccessor={d => d.bb}
            options={calculators.bb.options()}
          />
        )}

        <TrendLine
          ref="enableTrendLine"
          enabled={enableTrendLine}
          type="LINE"
          snap={true}
          snapTo={d => [d.high, d.low]}
          onComplete={this.onTrendLineComplete}
          stroke={axisLineColor}
          fontStroke={axisLineColor}
        />

        <FibonacciRetracement
          ref="enableFib"
          enabled={enableFib}
          type="BOUND"
          onComplete={this.onFibComplete}
          stroke={axisLineColor}
          fontStroke={axisLineColor}
        />
      </Chart>
    );
  }

  render() {
    const {
      width,
      priceData,
      height,
      ratio,
      theme,
      zoom,
      indicators,
      showVolumeChart,
      enableChartClamp
    } = this.props;
    const {
      timeFormatter,
      enableFib,
      enableTrendLine,
      priceFormat,
      margin,
      calculators
    } = this.state;
    const themeColors = colors[theme];
    const { axisLineColor, indicatorLineColor } = themeColors;
    let chartMultiplier = showVolumeChart ? 1 : 0; // Used to adjust the height of the charts and their positioning
    // if (indicators.bb) calc.push(bb);

    // Indicator calculators
    let calc = [],
      maCalcs = [],
      tooltipIncludes = ["sma", "ema1", "ema2", "smaVolume"];

    // if (showVolumeChart) maCalcs.push(calculators["smaVolume"]);

    for (let i in indicators) {
      if (indicators[i]) {
        // Don't add volume indicators if the volume chart is off
        if (i.toLowerCase().indexOf("volume") !== -1 && !showVolumeChart)
          continue;
        // Add active calculators
        calc.push(calculators[i]);
        // Add calculators needing tooltips
        if (tooltipIncludes.indexOf(i) !== -1) maCalcs.push(calculators[i]);
      }
    }
    if (indicators["macd"]) chartMultiplier++;

    const filterDate = new Date(new Date().getTime() - zoom * 1000);
    const filteredData =
      zoom === "all"
        ? priceData
        : priceData.filter(a => {
            return a.date > filterDate;
          });

    const initialData = handleStockData(filteredData);
    const dataWithIndicator = Object.getOwnPropertyNames(calculators).reduce(
      (data, calc) => calculators[calc](data),
      initialData
    );
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      d => d.date
    );
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
      dataWithIndicator
    );

    const defaultXExtents = 80;
    const xExtents = [
      xAccessor(data[data.length - 1]),
      data.length > defaultXExtents
        ? xAccessor(data[data.length - defaultXExtents])
        : xAccessor(data[0])
    ];

    let gridHeight = height - margin.top - margin.bottom;
    let gridWidth = width - margin.left - margin.right;

    let showGrid = true;
    let yGrid = showGrid
      ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.1 }
      : {};
    const { positiveColor, negativeColor } = this._getThemeColors();

    const macdAppearance = {
      stroke: {
        macd: positiveColor,
        signal: negativeColor
      },
      fill: {
        divergence: "#4682B4"
      }
    };
    return (
      <ChartCanvas
        ratio={ratio}
        width={width}
        height={height}
        seriesName="PriceChart"
        margin={margin}
        // zoomEvent={false}
        clamp={enableChartClamp}
        data={data}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xScale={xScale}
        xExtents={xExtents}
        type="hybrid"
        // className="chart-main ps-child no-overflow Stockcharts__wrapper ps-must-propagate"
        className="chart-main no-overflow Stockcharts__wrapper"
        drawMode={enableTrendLine || enableFib}
      >
        {showVolumeChart && this._renderVolumeChart(chartMultiplier)}
        {this._renderCandleStickChart(chartMultiplier, maCalcs)}
        {indicators.macd && (
          <Chart
            id={3}
            height={80}
            yExtents={calculators.macd.accessor()}
            origin={(w, h) => [0, h - 100]}
          >
            <XAxis
              tickStroke={axisLineColor}
              stroke={axisLineColor}
              {...axisStyle}
              ticks={8}
              axisAt="bottom"
              orient="bottom"
            />
            <YAxis
              tickStroke={axisLineColor}
              stroke={axisLineColor}
              {...axisStyle}
              tickPadding={4}
              showDomain={false}
              innerTickSize={0}
              // zoomEnabled={false}
              axisAt="right"
              orient="right"
              ticks={3}
            />
            <YAxis
              axisAt="left"
              orient="left"
              tickPadding={0}
              showDomain={false}
              showTickLabel={false}
              zoomEnabled={false}
              {...yGrid}
              {...axisStyle}
              ticks={3}
              tickStroke={axisLineColor}
              stroke={axisLineColor}
            />

            <MouseCoordinateX
              rectWidth={125}
              at="bottom"
              orient="bottom"
              displayFormat={timeFormatter}
            />
            <MouseCoordinateY
              {...arrowStyle()}
              id={0}
              at="right"
              orient="left"
              displayFormat={priceFormat}
            />

            <MACDSeries yAccessor={d => d.macd} {...macdAppearance} />
            <MACDTooltip
              yAccessor={d => d.macd}
              options={calculators.macd.options()}
              appearance={macdAppearance}
              origin={[0, -6]}
            />
          </Chart>
        )}
        {/* Need to return an empty element here, null triggers an error */}
        <CrossHairCursor stroke={indicatorLineColor} />
      </ChartCanvas>
    );
  }
};

CandleStickChartWithZoomPan = fitWidth(CandleStickChartWithZoomPan);
export default Radium(
  class Wrapper extends React.Component<any, any> {
    mainChart: React.RefObject<any> = React.createRef();
    constructor(props) {
      super(props);

      this.state = {
        dropdowns: {
          indicators: false,
          tools: false,
          settings: false
        }
      };
      this._onInputHeight = this._onInputHeight.bind(this);
      this._listener = this._listener.bind(this);
    }

    shouldComponentUpdate(np, ns) {
      // if (!np.marketReady && !this.props.marketReady) return false;
      if (!np.priceData.length && !this.props.priceData.length) return false;
      return (
        !utils.are_equal_shallow(np.priceData, this.props.priceData) ||
        !utils.are_equal_shallow(np.indicators, this.props.indicators) ||
        !utils.are_equal_shallow(
          np.indicatorSettings,
          this.props.indicatorSettings
        ) ||
        !utils.are_equal_shallow(np.tools, this.props.tools) ||
        !utils.are_equal_shallow(ns, this.state) ||
        np.height !== this.props.height ||
        np.chartHeight !== this.props.chartHeight ||
        np.width !== this.props.width ||
        np.leftOrderBook !== this.props.leftOrderBook ||
        np.zoom !== this.props.zoom ||
        np.showVolumeChart !== this.props.showVolumeChart ||
        np.enableChartClamp !== this.props.enableChartClamp
      );
    }

    componentWillUnmount() {
      document.removeEventListener("click", this._listener);
    }

    _toggleTools(key) {
      this._resetDropdowns();
      this.props.onChangeTool(key);
      this.forceUpdate();
    }

    _changeSettings(payload, e) {
      e.persist();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    }

    _onInputHeight(e) {
      const val = e.target.value;
      this.props.onChangeChartHeight({ value: parseInt(val, 10) });
    }

    _toggleDropdown(key, e) {
      e.stopPropagation();
      const { dropdowns } = this.state;
      let newState = {};
      for (let k in this.state.dropdowns) {
        if (k === key) newState[k] = !dropdowns[k];
        else newState[k] = false;
      }
      if (newState[key]) {
        document.addEventListener("click", this._listener, {
          capture: false,
          passive: true
        });
      }
      this.setState({ dropdowns: newState });
    }

    _listener() {
      this._resetDropdowns();
      document.removeEventListener("click", this._listener);
    }

    _stopPropagation(e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    }

    _resetDropdowns() {
      let dropdowns = {};
      for (let key in this.state.dropdowns) {
        dropdowns[key] = false;
      }
      this.setState({ dropdowns });
    }

    componentDidMount() {
      if (this.mainChart) {
        console.debug("3D: ", this.mainChart);
        (this.mainChart.current as HTMLElement).addEventListener(
          "wheel",
          e => {
            e.stopPropagation();
          },
          true
        );
      }
    }

    render() {
      const {
        currentPeriod,
        buckets,
        bucketSize,
        indicators,
        indicatorSettings
      } = this.props;
      const { dropdowns } = this.state;

      // Lower bar
      let bucketText = function(size) {
        if (size === "all") {
          return counterpart.translate("exchange.zoom_all");
        } else if (size < 60) {
          return size + "s";
        } else if (size < 3600) {
          return size / 60 + "m";
        } else if (size < 86400) {
          return size / 3600 + "h";
        } else if (size < 604800) {
          return size / 86400 + "d";
        } else if (size < 2592000) {
          return size / 604800 + "w";
        } else {
          return size / 2592000 + "m";
        }
      };

      let bucketOptions = buckets
        .filter(bucket => {
          return bucket > 60 * 4;
        })
        .map(bucket => {
          return (
            <LabelOption
              key={bucket}
              active={bucketSize === bucket}
              size="smaller"
              type="white-primary"
              onClick={this.props.changeBucketSize.bind(this, bucket)}
              style={{
                marginRight: "4px"
              }}
            >
              {bucketText(bucket)}
            </LabelOption>
          );
        });

      let oneHour = 3600,
        oneDay = oneHour * 24;
      let zoomPeriods = [
        oneHour * 6,
        oneHour * 48,
        oneHour * 48 * 2,
        oneHour * 24 * 7,
        oneDay * 14,
        oneDay * 30,
        oneDay * 30 * 3,
        "all"
      ];

      let zoomOptions = zoomPeriods.map(period => {
        return (
          <div
            key={period}
            className={cnames("label bucket-option", {
              "active-bucket": currentPeriod === period
            })}
            onClick={this.props.changeZoomPeriod.bind(this, period)}
          >
            {bucketText(period)}
          </div>
        );
      });

      /* Indicators dropdown */
      const indicatorOptionsVolume = [];
      const indicatorOptionsPrice = Object.keys(indicators)
        .map(i => {
          let hasSetting = i in indicatorSettings;
          let settingInput = hasSetting ? (
            <>
              <div className="inline-block" style={{ paddingRight: 5 }}>
                <Translate content="exchange.chart_options.period" />:
                <input
                  style={{ margin: 0 }}
                  type="number"
                  value={indicatorSettings[i]}
                  onChange={this.props.onChangeIndicatorSetting.bind(null, i)}
                />
              </div>
            </>
          ) : null;

          if (i.toLowerCase().indexOf("volume") !== -1) {
            if (!this.props.showVolumeChart) return null;
            indicatorOptionsVolume.push(
              <li className="indicator" key={i}>
                <Checkbox
                  active={indicators[i]}
                  value={i}
                  onChange={this.props.onChangeIndicators.bind(null, i)}
                  labelStyle={{ alignItems: "center" }}
                >
                  <Translate content={`exchange.chart_options.${i}`} />{" "}
                </Checkbox>
                {/* <input
                className="clickable"
                type="checkbox"
                checked={indicators[i]}
                onClick={this.props.onChangeIndicators.bind(null, i)}
              />
              <div
                onClick={this.props.onChangeIndicators.bind(null, i)}
                className="clickable"
              /> */}
                {settingInput}
              </li>
            );
          } else {
            return (
              <li className="indicator" key={i}>
                <Checkbox
                  active={indicators[i]}
                  value={i}
                  onChange={this.props.onChangeIndicators.bind(null, i)}
                  labelStyle={{ alignItems: "center" }}
                >
                  <Translate content={`exchange.chart_options.${i}`} />
                </Checkbox>
                {settingInput}
              </li>
            );
          }
        })
        .filter(a => !!a);

      /* Tools dropdown */
      const toolsOptions = Object.keys(this.props.tools).map(i => {
        return (
          <li
            className="clickable"
            key={i}
            onClick={this._toggleTools.bind(this, i)}
          >
            <div style={{ marginLeft: 5 }} className="inline-block">
              <Translate content={`exchange.chart_options.${i}`} />
            </div>
          </li>
        );
      });

      /* Tools dropdown */
      const settingsOptions = ["volume", "height", "clamp_chart"].map(i => {
        let content;
        switch (i) {
          case "height": {
            content = (
              <li className="indicator" key={i}>
                <div style={{ marginLeft: 0, paddingRight: 10 }}>
                  <div>
                    <Translate content="exchange.chart_options.height" />:
                  </div>
                </div>
                <div>
                  <input
                    style={{ margin: 0, textAlign: "right", maxWidth: 75 }}
                    value={this.props.chartHeight}
                    type="number"
                    onChange={this._onInputHeight}
                  />
                </div>
              </li>
            );
            break;
          }

          case "volume": {
            content = (
              <li
                className="clickable indicator"
                key={i}
                onClick={this.props.onToggleVolume}
              >
                <input type="checkbox" checked={this.props.showVolumeChart} />
                <div>
                  <Translate content={`exchange.chart_options.${i}`} />
                </div>
              </li>
            );
            break;
          }

          case "clamp_chart": {
            content = (
              <li
                className="clickable indicator"
                key={i}
                onClick={this.props.onToggleChartClamp}
              >
                <input type="checkbox" checked={this.props.enableChartClamp} />
                <div>
                  <Translate content={`exchange.chart_options.${i}`} />
                </div>
              </li>
            );
            break;
          }

          default: {
            content = <li key={i}>TBD</li>;
          }
        }
        return content;
      });

      // if (!this.props.priceData.length) {
      //     return (
      //         <div className="grid-content text-center">
      //             <div style={{ paddingTop: this.props.height / 2, height: this.props.height }}>
      //                 <Translate content="exchange.no_data" component="h2" />
      //             </div>
      //         </div>
      //     );
      // }

      return (
        <div
          className="no-margin no-padding"
          style={{ overflow: "visible", width: "100%" }}
          ref={this.mainChart}
        >
          <div className="chart-tools">
            <ul className="market-stats stats bottom-stats">
              {/* Chart controls */}
              {/* Hide Zoom
            <li className="stat">
              <span>
                <span>
                  <Translate content="exchange.zoom" />:
                </span>
                <span>{zoomOptions}</span>
              </span>
            </li> */}
              <li className="stat">
                <span>
                  <span>
                    <Translate content="exchange.time" />:
                  </span>
                  <span>{bucketOptions}</span>
                </span>
              </li>

              <li className="stat input custom-dropdown">
                <div
                  className="v-align indicators clickable"
                  onClick={this._toggleDropdown.bind(this, "indicators")}
                >
                  <Translate content="exchange.chart_options.title" />
                </div>
                {dropdowns.indicators ? (
                  <div
                    className="custom-dropdown-content"
                    onClick={this._stopPropagation}
                  >
                    <ul>
                      <li className="indicator-title">
                        <Translate content="exchange.chart_options.price_title" />
                      </li>
                      {indicatorOptionsPrice}

                      {indicatorOptionsVolume.length ? (
                        <li className="indicator-title">
                          <Translate content="exchange.chart_options.volume_title" />
                        </li>
                      ) : null}
                      {indicatorOptionsVolume}
                    </ul>
                  </div>
                ) : null}
              </li>

              <li className="stat input custom-dropdown">
                <div
                  className="v-align indicators clickable"
                  onClick={this._toggleDropdown.bind(this, "tools")}
                >
                  <Translate content="exchange.chart_options.tools" />
                </div>
                {dropdowns.tools ? (
                  <div
                    className="custom-dropdown-content"
                    onClick={this._stopPropagation}
                  >
                    <ul>{toolsOptions}</ul>
                  </div>
                ) : null}
              </li>

              {/* <li className="stat input custom-dropdown">
                            <div className="indicators clickable" onClick={this._toggleDropdown.bind(this, "settings")}>
                                <Icon className="icon-14px settings-cog" name="cog" />
                            </div>
                            {dropdowns.settings ?
                                <div className="custom-dropdown-content" onClick={this._stopPropagation}>
                                    <ul>
                                        {settingsOptions}
                                    </ul>
                                </div> : null}
                        </li> */}
            </ul>
          </div>
          {this.props.priceData.length ? (
            <CandleStickChartWithZoomPan ref={this.mainChart} {...this.props} />
          ) : (
            <div className="grid-content text-center">
              <div
                style={{
                  paddingTop: this.props.height / 2,
                  height: this.props.height
                }}
              >
                <Translate content="exchange.no_data" component="h2" />
              </div>
            </div>
          )}
          {/* <CandleStickChartWithZoomPan ref="FitWidth" {...this.props} /> */}
        </div>
      );
    }
  }
);
