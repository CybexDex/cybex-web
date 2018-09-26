import * as React from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import Translate from "react-translate-component";
import { ChartCanvas, Chart } from "react-stockcharts/es";
import { handleStockData } from "utils/Chart";
import Radium from "radium";
import { XAxis, YAxis } from "react-stockcharts/es/lib/axes";
import { fitWidth } from "react-stockcharts/es/lib/helper";
import { discontinuousTimeScaleProvider } from "react-stockcharts/es/lib/scale";
import {
  ema,
  wma,
  sma,
  tma,
  macd,
  bollingerBand,
  rsi,
  atr,
  elderImpulse,
  sar,
  forceIndex,
  elderRay,
  change,
  stochasticOscillator
} from "react-stockcharts/es/lib/indicator";
import {
  CandlestickSeries,
  BarSeries,
  LineSeries,
  AreaSeries,
  BollingerSeries,
  MACDSeries,
  RSISeries,
  OHLCSeries,
  SARSeries,
  VolumeProfileSeries,
  StraightLine,
  ElderRaySeries,
  StochasticSeries
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
  StandardDeviationChannel,
  TrendLine,
  DrawingObjectSelector,
  EquidistantChannel,
  GannFan
} from "react-stockcharts/es/lib/interactive";
import {
  OHLCTooltip,
  MovingAverageTooltip,
  BollingerBandTooltip,
  MACDTooltip,
  RSITooltip,
  SingleValueTooltip,
  StochasticTooltip
} from "react-stockcharts/es/lib/tooltip";
import colors from "assets/colors";
import { cloneDeep } from "lodash";
import utils from "common/utils";
import cnames from "classnames";
import counterpart from "counterpart";
import Icon from "../Icon/Icon";
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from "constants";
import { Checkbox, Button, LabelOption } from "components/Common";
import { saveInteractiveNodes, getInteractiveNodes } from "./interactiveutils";
import * as numeral from "numeral";
import { element } from "../../../node_modules/@types/prop-types";
import { toObject } from "react-stockcharts/es/lib/utils";
const stoAppearance = {
  stroke: Object.assign({}, StochasticSeries.defaultProps.stroke)
};

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
  saveInteractiveNodes;
  getInteractiveNodes;
  constructor(props) {
    super(props);
    const pricePrecision = props.base.get("precision");
    const volumePrecision = props.quote.get("precision");
    const priceFormat = format(`.${pricePrecision}f`);
    const timeFormatter = timeFormat("%Y-%m-%d %H:%M");
    const volumeFormat = volume =>
      volume > 10
        ? numeral(volume).format("0.0a")
        : numeral(volume).format("0.00a");
    this.state = {
      tools: [],
      priceFormat,
      timeFormatter,
      volumeFormat,
      margin: { left: 10, right: 48, top: 30, bottom: 20 },
      calculators: this._getCalculators(props)
    };
  }

  componentDidMount() {}
  componentWillUnmount() {}
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
      atr14: atr()
        .options({ windowSize: 14 })
        .merge((d, c) => {
          d.atr14 = c;
        })
        .accessor(d => d.atr14),
      rsi: rsi()
        .options({ windowSize: 14 })
        .merge((d, c) => {
          d.rsi = c;
        })
        .accessor(d => d.rsi),
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
      sar: sar()
        .options({
          accelerationFactor: 0.02,
          maxAccelerationFactor: 0.2
        })
        .merge((d, c) => {
          d.sar = c;
        })
        .accessor(d => d.sar),
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
        .accessor(d => d.macd),
      slowSTO: stochasticOscillator()
        .options({ windowSize: 14, kWindowSize: 3 })
        .merge((d, c) => {
          d.slowSTO = c;
        })
        .accessor(d => d.slowSTO),
      fastSTO: stochasticOscillator()
        .options({ windowSize: 14, kWindowSize: 1 })
        .merge((d, c) => {
          d.fastSTO = c;
        })
        .accessor(d => d.fastSTO),
      fullSTO: stochasticOscillator()
        .options({ windowSize: 14, kWindowSize: 3, dWindowSize: 4 })
        .merge((d, c) => {
          d.fullSTO = c;
        })
        .accessor(d => d.fullSTO),
      elder: elderRay(),
      change: change(),
      fi: forceIndex()
        .merge((d, c) => {
          d.fi = c;
        })
        .accessor(d => d.fi),
      ei: elderImpulse()
        .macdSource(
          macd()
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
            .accessor()
        )
        .emaSource(
          ema()
            .options({
              windowSize: parseInt(indicatorSettings["ema2"], 10)
            })
            .merge((d, c) => {
              d.ema2 = c;
            })
            .accessor(d => d.ema2)
            .accessor()
        )
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
    console.log("chartindicators", indicators);
    return (
      <Chart
        id={2}
        yExtents={[d => d.volume, calculators.smaVolume.accessor()]}
        height={60}
        origin={[0, 230]}
      >
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
      lasest,
      saveCanvasNode,
      saveInteractiveNodes,
      onDrawCompleteChart1,
      onGfComplete,
      onFibComplete,
      onEquComplete,
      onSdcComplete,
      getInteractiveNodes,
      handleSelection,
      trends_1,
      channels_2,
      fans,
      retracements_1,
      channels_1,
      enables
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
        <MouseCoordinateY
          {...arrowStyle()}
          id={0}
          // dx={-50}
          at="right"
          orient="left"
          displayFormat={priceFormat}
        />
        <TrendLine
          ref={saveInteractiveNodes("Trendline", 1)}
          enabled={enables.trendline}
          type="RAY"
          snap={false}
          snapTo={d => [d.high, d.low]}
          onStart={() => console.log("START")}
          onComplete={onDrawCompleteChart1}
          trends={trends_1}
          appearance={{
            stroke: "#6BA583",
            strokeOpacity: 1,
            strokeWidth: 1,
            strokeDasharray: "Solid",
            edgeStrokeWidth: 1,
            edgeFill: "#FFFFFF",
            edgeStroke: "#000000",
            r: 6
          }}
        />
        <FibonacciRetracement
          ref={saveInteractiveNodes("FibonacciRetracement", 1)}
          enabled={enables.fib}
          type="BOUND"
          retracements={retracements_1}
          onComplete={onFibComplete}
          appearance={{
            stroke: "#6BA583",
            strokeWidth: 1,
            strokeOpacity: 1,
            fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
            fontSize: 11,
            fontFill: "#FF0000",
            edgeStroke: "#000000",
            edgeFill: "#FFFFFF",
            nsEdgeFill: "#000000",
            edgeStrokeWidth: 1,
            r: 5
          }}
        />
        <EquidistantChannel
          ref={saveInteractiveNodes("EquidistantChannel", 1)}
          enabled={enables.equ}
          onStart={() => console.log("START")}
          onComplete={onEquComplete}
          channels={channels_1}
        />
        <StandardDeviationChannel
          ref={saveInteractiveNodes("StandardDeviationChannel", 1)}
          enabled={enables.sdc}
          onStart={() => console.log("START")}
          onComplete={onSdcComplete}
          channels={channels_2}
        />
        <GannFan
          ref={saveInteractiveNodes("GannFan", 1)}
          enabled={enables.gf}
          onStart={() => console.log("START")}
          onComplete={onGfComplete}
          fans={fans}
        />
        <CandlestickSeries
          wickStroke={d => (d.close > d.open ? positiveColor : negativeColor)}
          stroke={d => (d.close > d.open ? positiveColor : negativeColor)}
          fill={d => (d.close > d.open ? positiveColor : negativeColor)}
          opacity={1}
          rectRadius={40}
        />
        {indicators.vpbsVolume && (
          <VolumeProfileSeries
            bySession
            orient="right"
            showSessionBackground
            fill={_ref => {
              console.debug("ref", _ref.type);
              return _ref.type === "up" ? positiveColor : negativeColor;
            }}
          />
        )}
        {indicators.vpVolume && (
          <VolumeProfileSeries
            fill={_ref => {
              console.debug("ref", _ref.type);
              return _ref.type === "up" ? positiveColor : negativeColor;
            }}
          />
        )}
        {indicators.bb && (
          <BollingerSeries
            yAccessor={d => d.bb}
            stroke={bbStroke}
            fill={bbFill}
          />
        )}
        {indicators.sar && <SARSeries yAccessor={d => d.sar} />}
        {indicators.sar && (
          <SingleValueTooltip
            yDisplayFormat={format(".8f")}
            yLabel={"SAR (.02,.2)"}
            yAccessor={d => d.sar}
            origin={[0, 45]}
            fontSize={12}
            labelFill="rgba(255,255,255,0.3)"
            valueFill="rgba(255,255,255,0.8)"
          />
        )}
        {indicators.ei && (
          <OHLCSeries stroke={d => calculators.ei.stroke()[d.elderImpulse]} />
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
          origin={[0, -20]}
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
            {...ohlcStyle}
            origin={[0, 60]}
            yAccessor={d => d.bb}
            options={calculators.bb.options()}
          />
        )}
      </Chart>
    );
  }

  render() {
    const {
      elementorigin,
      width,
      priceData,
      height,
      ratio,
      theme,
      zoom,
      indicators,
      showVolumeChart,
      enableChartClamp,
      saveCanvasNode,
      getInteractiveNodes,
      handleSelection,
      handleSelection1,
      handleSelection2,
      handleSelection3,
      handleSelection4,
      enables
    } = this.props;
    console.debug("elementorigin1:", elementorigin);
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
    console.log("height:", height);
    return (
      <ChartCanvas
        ref={saveCanvasNode}
        ratio={ratio}
        width={width}
        height={height}
        seriesName="PriceChart"
        margin={{ left: 10, right: 70, top: 30, bottom: 20 }}
        clamp={enableChartClamp}
        data={data}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xScale={xScale}
        xExtents={xExtents}
        type="hybrid"
        className="chart-main no-overflow Stockcharts__wrapper"
      >
        {showVolumeChart && this._renderVolumeChart(chartMultiplier)}
        {this._renderCandleStickChart(chartMultiplier, maCalcs)}
        {indicators.macd && (
          <Chart
            id={3}
            height={80}
            yExtents={calculators.macd.accessor()}
            origin={[0, elementorigin.macd]}
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
        {indicators.rsi && (
          <Chart
            id={4}
            height={80}
            yExtents={calculators.rsi.accessor()}
            origin={[0, elementorigin.rsi]}
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
            <MouseCoordinateY
              {...arrowStyle()}
              id={0}
              at="right"
              orient="left"
              displayFormat={format(".2f")}
            />
            <RSISeries yAccessor={d => d.rsi} />
            <RSITooltip
              origin={[0, -6]}
              yAccessor={d => d.rsi}
              options={calculators.rsi.options()}
              fontSize={12}
              textFill="rgba(255,255,255,0.8)"
              labelFill="rgba(255,255,255,0.3)"
            />
          </Chart>
        )}
        {indicators.atr && (
          <Chart
            id={6}
            height={80}
            yExtents={calculators.atr14.accessor()}
            origin={[0, elementorigin.atr]}
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
            <MouseCoordinateY
              {...arrowStyle()}
              id={0}
              at="right"
              orient="left"
              displayFormat={format(".8f")}
            />

            <LineSeries
              yAccessor={calculators.atr14.accessor()}
              stroke={calculators.atr14.stroke()}
            />
            <SingleValueTooltip
              yAccessor={calculators.atr14.accessor()}
              yLabel={`ATR (${calculators.atr14.options().windowSize})`}
              yDisplayFormat={format(".8f")}
              origin={[0, -6]}
              fontSize={12}
              labelFill="rgba(255,255,255,0.3)"
              valueFill="rgba(255,255,255,0.8)"
            />
          </Chart>
        )}
        {indicators.fi && (
          <Chart
            id={7}
            height={80}
            yExtents={calculators.fi.accessor()}
            origin={[0, elementorigin.fi]}
          >
            />
            <YAxis
              tickStroke={axisLineColor}
              stroke={axisLineColor}
              {...axisStyle}
              tickPadding={4}
              showDomain={false}
              innerTickSize={0}
              axisAt="right"
              orient="right"
              ticks={3}
            />
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
            <MouseCoordinateY
              {...arrowStyle()}
              id={0}
              at="right"
              orient="left"
              displayFormat={format(".2f")}
            />
            <AreaSeries
              baseAt={scale => scale(0)}
              yAccessor={calculators.fi.accessor()}
            />
            <StraightLine yValue={0} stroke="#ffffff" opacity={0.3} />
            <SingleValueTooltip
              yAccessor={calculators.fi.accessor()}
              yLabel="ForceIndex (1)"
              fontSize={12}
              valueFill="rgba(255,255,255,0.8)"
              labelFill="rgba(255,255,255,0.3)"
              yDisplayFormat={format(".4s")}
              origin={[0, -6]}
            />
          </Chart>
        )}
        {indicators.er && (
          <Chart
            id={8}
            height={80}
            yExtents={[0, calculators.elder.accessor()]}
            origin={[0, elementorigin.er]}
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
              tickStroke={axisLineColor}
              stroke={axisLineColor}
              {...axisStyle}
              tickPadding={4}
              showDomain={false}
              innerTickSize={0}
              axisAt="right"
              orient="right"
              ticks={3}
              tickFormat={format(".4f")}
            />
            <MouseCoordinateY
              {...arrowStyle()}
              id={0}
              at="right"
              orient="left"
              displayFormat={format(".4f")}
            />
            <ElderRaySeries
              yAccessor={calculators.elder.accessor()}
              bullPowerFill={positiveColor}
              bearPowerFill={negativeColor}
            />
            <StraightLine yValue={0} stroke="#ffffff" opacity={0.3} />
            <SingleValueTooltip
              yAccessor={calculators.elder.accessor()}
              yLabel="Elder Ray"
              fontSize={12}
              valueFill="rgba(255,255,255,0.8)"
              labelFill="rgba(255,255,255,0.3)"
              yDisplayFormat={d =>
                `${format(".7f")(d.bullPower)}, ${format(".7f")(d.bearPower)}`
              }
              origin={[0, -6]}
            />
          </Chart>
        )}
        {indicators.sto && (
          <Chart
            id={9}
            yExtents={[0, 100]}
            height={80}
            origin={[0, elementorigin.sto]}
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
              tickStroke={axisLineColor}
              stroke={axisLineColor}
              {...axisStyle}
              tickPadding={4}
              showDomain={false}
              innerTickSize={0}
              axisAt="right"
              orient="right"
              tickValues={[20, 50, 80]}
            />

            <MouseCoordinateY
              {...arrowStyle()}
              id={0}
              at="right"
              orient="left"
              displayFormat={format(".2f")}
            />
            <StochasticSeries
              yAccessor={d => d.slowSTO}
              stroke={{
                top: "#ffffff",
                middle: "#ffffff",
                bottom: "#ffffff",
                dLine: "#EA2BFF",
                kLine: "#74D400"
              }}
            />

            <StochasticTooltip
              origin={[0, -6]}
              yAccessor={d => d.slowSTO}
              options={calculators.slowSTO.options()}
              appearance={stoAppearance}
              label="Slow STO"
            />
          </Chart>
        )}
        {indicators.sto && (
          <Chart
            id={10}
            yExtents={[0, 100]}
            height={80}
            origin={[0, elementorigin.sto + 100]}
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
              tickStroke={axisLineColor}
              stroke={axisLineColor}
              {...axisStyle}
              tickPadding={4}
              showDomain={false}
              innerTickSize={0}
              axisAt="right"
              orient="right"
              tickValues={[20, 50, 80]}
            />

            <MouseCoordinateY
              {...arrowStyle()}
              id={0}
              at="right"
              orient="left"
              displayFormat={format(".2f")}
            />
            <StochasticSeries
              yAccessor={d => d.slowSTO}
              stroke={{
                top: "#ffffff",
                middle: "#ffffff",
                bottom: "#ffffff",
                dLine: "#EA2BFF",
                kLine: "#74D400"
              }}
            />

            <StochasticTooltip
              origin={[0, -6]}
              yAccessor={d => d.fastSTO}
              options={calculators.fastSTO.options()}
              appearance={stoAppearance}
              label="Fast STO"
            />
          </Chart>
        )}
        {indicators.sto && (
          <Chart
            id={11}
            yExtents={[0, 100]}
            height={80}
            origin={[0, elementorigin.sto + 200]}
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
              tickStroke={axisLineColor}
              stroke={axisLineColor}
              {...axisStyle}
              tickPadding={4}
              showDomain={false}
              innerTickSize={0}
              axisAt="right"
              orient="right"
              tickValues={[20, 50, 80]}
            />

            <MouseCoordinateY
              {...arrowStyle()}
              id={0}
              at="right"
              orient="left"
              displayFormat={format(".2f")}
            />
            <StochasticSeries
              yAccessor={d => d.slowSTO}
              stroke={{
                top: "#ffffff",
                middle: "#ffffff",
                bottom: "#ffffff",
                dLine: "#EA2BFF",
                kLine: "#74D400"
              }}
            />

            <StochasticTooltip
              origin={[0, -6]}
              yAccessor={d => d.fullSTO}
              options={calculators.fullSTO.options()}
              appearance={stoAppearance}
              label="Full STO"
            />
          </Chart>
        )}
        <Chart id={5} height={height - 75} yExtents={[]}>
          <XAxis
            tickStroke={axisLineColor}
            stroke={axisLineColor}
            {...axisStyle}
            ticks={8}
            axisAt="bottom"
            orient="bottom"
          />
          <MouseCoordinateX
            rectWidth={125}
            at="bottom"
            orient="bottom"
            displayFormat={timeFormatter}
          />
        </Chart>
        {/* Need to return an empty element here, null triggers an error */}
        <CrossHairCursor stroke={indicatorLineColor} />
        <DrawingObjectSelector
          enabled={!enables.trendline}
          getInteractiveNodes={getInteractiveNodes}
          drawingObjectMap={{
            Trendline: "trends"
          }}
          onSelect={handleSelection}
        />
        <DrawingObjectSelector
          enabled={!enables.fib}
          getInteractiveNodes={getInteractiveNodes}
          drawingObjectMap={{
            FibonacciRetracement: "retracements"
          }}
          onSelect={handleSelection1}
        />
        <DrawingObjectSelector
          enabled={!enables.equ}
          getInteractiveNodes={getInteractiveNodes}
          drawingObjectMap={{
            EquidistantChannel: "channels"
          }}
          onSelect={handleSelection2}
        />
        <DrawingObjectSelector
          enabled={!enables.sdc}
          getInteractiveNodes={getInteractiveNodes}
          drawingObjectMap={{
            StandardDeviationChannel: "channels"
          }}
          onSelect={handleSelection3}
        />
        <DrawingObjectSelector
          enabled={!enables.gf}
          getInteractiveNodes={getInteractiveNodes}
          drawingObjectMap={{
            GannFan: "fans"
          }}
          onSelect={handleSelection4}
        />
      </ChartCanvas>
    );
  }
};

CandleStickChartWithZoomPan = fitWidth(CandleStickChartWithZoomPan);
export default Radium(
  class Wrapper extends React.Component<any, any> {
    saveInteractiveNodes;
    getInteractiveNodes;
    canvasNode;
    mainChart: React.RefObject<any> = React.createRef();
    constructor(props) {
      super(props);

      this.state = {
        enables: {
          trendline: false,
          fib: false,
          equ: false,
          sdc: false,
          gf: false
        },
        dropdowns: {
          indicators: false,
          tools: false,
          settings: false
        },
        retracements_1: [],
        trends_1: [],
        channels_2: [],
        channels_1: [],
        fans: []
      };
      this.onKeyPress = this.onKeyPress.bind(this);
      this.onDrawCompleteChart1 = this.onDrawCompleteChart1.bind(this);
      (this.onGfComplete = this.onGfComplete.bind(this)),
        (this.onSdcComplete = this.onSdcComplete.bind(this));
      this.onFibComplete = this.onFibComplete.bind(this);
      this.onEquComplete = this.onEquComplete.bind(this);
      this.handleSelection = this.handleSelection.bind(this);
      this.handleSelection1 = this.handleSelection1.bind(this);
      this.handleSelection2 = this.handleSelection2.bind(this);
      this.handleSelection3 = this.handleSelection3.bind(this);
      this.handleSelection4 = this.handleSelection4.bind(this);
      this.saveInteractiveNodes = saveInteractiveNodes.bind(this);
      this.getInteractiveNodes = getInteractiveNodes.bind(this);

      this.saveCanvasNode = this.saveCanvasNode.bind(this);

      this._onInputHeight = this._onInputHeight.bind(this);
      this._listener = this._listener.bind(this);
    }
    saveCanvasNode(node) {
      this.canvasNode = node;
    }
    handleSelection3(interactives) {
      let handle = [interactives[3]];
      const state = toObject(handle, each => {
        return ["channels_2", each.objects];
      });
      this.setState(state);
    }
    handleSelection2(interactives) {
      let handle = [interactives[2]];
      const state = toObject(handle, each => {
        return [`channels_${each.chartId}`, each.objects];
      });
      this.setState(state);
    }
    handleSelection1(interactives) {
      let handle = [interactives[1]];
      const state = toObject(handle, each => {
        return [`retracements_${each.chartId}`, each.objects];
      });
      this.setState(state);
    }
    handleSelection4(interactives) {
      let handle = [interactives[4]];
      const state = toObject(handle, each => {
        return ["fans", each.objects];
      });
      this.setState(state);
    }
    handleSelection(interactives) {
      let handle = [interactives[0]];
      const state = toObject(handle, each => {
        return [`trends_${each.chartId}`, each.objects];
      });
      this.setState(state);
    }
    onEquComplete(channels_1) {
      // this gets called on
      // 1. draw complete of drawing object
      // 2. drag complete of drawing object
      this.setState({
        enables: {
          trendline: false,
          fib: false,
          equ: false,
          sdc: false,
          gf: false
        },
        channels_1
      });
    }
    onFibComplete(retracements_1) {
      this.setState({
        retracements_1,
        enables: {
          trendline: false,
          fib: false,
          equ: false,
          sdc: false,
          gf: false
        }
      });
    }
    onSdcComplete(channels_2) {
      this.setState({
        channels_2,
        enables: {
          trendline: false,
          fib: false,
          equ: false,
          sdc: false,
          gf: false
        }
      });
    }
    onGfComplete(fans) {
      this.setState({
        fans,
        enables: {
          trendline: false,
          fib: false,
          equ: false,
          sdc: false,
          gf: false
        }
      });
    }
    onDrawCompleteChart1(trends_1) {
      this.setState({
        enables: {
          trendline: false,
          fib: false,
          equ: false,
          sdc: false,
          gf: false
        },
        trends_1
      });
      console.debug("trend1:", trends_1);
    }
    onKeyPress(e) {
      const keyCode = e.which;
      console.log(keyCode);
      switch (keyCode) {
        case 8: {
          // DEL

          const trends_1 = this.state.trends_1.filter(each => !each.selected);
          const retracements_1 = this.state.retracements_1.filter(
            each => !each.selected
          );
          const channels_1 = this.state.channels_1.filter(
            each => !each.selected
          );
          const channels_2 = this.state.channels_2.filter(
            each => !each.selected
          );
          const fans = this.state.fans.filter(each => !each.selected);
          this.canvasNode.cancelDrag();
          this.setState({
            trends_1,
            retracements_1,
            channels_1,
            channels_2,
            fans
          });
          break;
        }
      }
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
      document.removeEventListener("keyup", this.onKeyPress);
      document.removeEventListener("click", this._listener);
    }

    _toggleTools(key) {
      console.debug("toolsKey:", key);
      let enables = this.state.enables;
      console.debug("toolsKey:", enables);
      enables[key] = true;
      this.setState(enables);
      this._resetDropdowns();
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
      document.addEventListener("keyup", this.onKeyPress);
      if (this.mainChart) {
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
        elementorigin,
        currentPeriod,
        buckets,
        bucketSize,
        indicators,
        indicatorSettings
      } = this.props;
      const { dropdowns } = this.state;
      console.debug("shuyuan", this.state.trends_1);
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
        // .filter(bucket => {
        //   return bucket > 60 * 4;
        // })
        .map(bucket => {
          return (
            <LabelOption
              key={bucket}
              active={bucketSize === bucket}
              onClick={this.props.changeBucketSize.bind(this, bucket)}
              size="smaller"
              type="white-primary"
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
      const indicatorCommon = ["macd", "bb", "sar"].map(i => (
        <LabelOption
          key={i}
          className="hide-column-small"
          active={indicators[i]}
          size="smaller"
          type="white-primary"
          style={{
            marginRight: "4px"
          }}
          onClick={this.props.onChangeIndicators.bind(null, i)}
        >
          <Translate content={`exchange.chart_options.${i}`} />
        </LabelOption>
      ));
      const indicatorOptionsPrice = Object.keys(indicators)
        .map(i => {
          let hasSetting = i in indicatorSettings;
          let settingInput = hasSetting ? (
            <div className="inline-block" style={{ paddingRight: 5 }}>
              <Translate content="exchange.chart_options.period" />:
              <input
                style={{ margin: 0 }}
                type="number"
                value={indicatorSettings[i]}
                onChange={this.props.onChangeIndicatorSetting.bind(null, i)}
              />
            </div>
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
                  <Translate content={`exchange.chart_options.${i}`} />
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
      console.debug("this.props.tools:", this.props.tools);
      const toolsOptions = this.props.tools.map(i => {
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
                  <span className="with-colon">
                    <Translate content="exchange.time" />
                  </span>
                  <span>{bucketOptions}</span>
                </span>
              </li>

              <li className="stat custom-dropdown">
                <span>
                  <span className="with-colon">
                    <Translate content="exchange.chart_options.title" />
                  </span>
                </span>
                <span>
                  {indicatorCommon}
                  <LabelOption
                    size="smaller"
                    type="white-primary"
                    style={{
                      marginRight: "4px"
                    }}
                    // className="v-align indicators clickable"
                    // style={{ display: "inline-flex" }}
                    onClick={this._toggleDropdown.bind(this, "indicators")}
                  >
                    <Translate content="exchange.chart_options.more" />
                  </LabelOption>
                </span>
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
            <CandleStickChartWithZoomPan
              ref={this.mainChart}
              {...this.props}
              handleSelection={this.handleSelection}
              handleSelection1={this.handleSelection1}
              handleSelection2={this.handleSelection2}
              handleSelection3={this.handleSelection3}
              handleSelection4={this.handleSelection4}
              getInteractiveNodes={this.getInteractiveNodes}
              trends_1={this.state.trends_1}
              fans={this.state.fans}
              channels_2={this.state.channels_2}
              retracements_1={this.state.retracements_1}
              channels_1={this.state.channels_1}
              onFibComplete={this.onFibComplete}
              onEquComplete={this.onEquComplete}
              onSdcComplete={this.onSdcComplete}
              onDrawCompleteChart1={this.onDrawCompleteChart1}
              onGfComplete={this.onGfComplete}
              enableTrendLine={this.state.enableTrendLine}
              saveInteractiveNodes={this.saveInteractiveNodes}
              saveCanvasNode={this.saveCanvasNode}
              enables={this.state.enables}
            />
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
