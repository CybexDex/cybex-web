import * as React from "react";
import * as PropTypes from "prop-types";

import { scaleTime } from "d3-scale";
import { utcDay, utcMinute, utcHour } from "d3-time";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { ema, wma, sma, tma } from "react-stockcharts/lib/indicator";
import { ChartCanvas, Chart } from "react-stockcharts";
import {
  CandlestickSeries,
  BarSeries,
  LineSeries,
  AreaSeries
} from "react-stockcharts/lib/series";
import {
  OHLCTooltip,
  MovingAverageTooltip
} from "react-stockcharts/lib/tooltip";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { tsvParse, csvParse } from "d3-dsv";
import {
  CrossHairCursor,
  CurrentCoordinate,
  MouseCoordinateX,
  MouseCoordinateY
} from "react-stockcharts/lib/coordinates";

const candlesAppearance = {
  rectRadius: 30
};
//   // wickStroke: "#000000",
//   fill: function fill(d) {
//     return d.close > d.open
//       ? "rgba(196, 205, 211, 0.8)"
//       : "rgba(22, 22, 22, 0.8)";
//   },
//   // stroke: "#000000",
//   candleStrokeWidth: 1,
//   widthRatio: 0.8,
//   opacity: 1
// };
let CandleStickChart = class extends React.Component<
  {
    series?;
    clamp?;
    width?;
    ratio?;
    type?;
    data;
  },
  any
> {
  static defaultProps = {
    type: "svg",
    series: []
  };

  static propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
    series: PropTypes.array.isRequired,
    type: PropTypes.oneOf(["svg", "hybrid"]).isRequired
  };

  render() {
    const { type, width, data: initialData, ratio, clamp, series } = this.props;
    // Calc

    // Setup Params of Drawing
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      d => d.date
    );
    console.debug("Series: ", series);
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
      initialData
    );
    const xExtents = [xAccessor(data[data.length - 1]), xAccessor(data[0])];

    return (
      <ChartCanvas
        height={600}
        ratio={ratio}
        width={width}
        margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
        type={"hybrid"}
        seriesName="MSFT"
        clamp={clamp}
        data={data}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xScale={xScale}
        xExtents={xExtents}
      >
        {
          // The Candle Sticks
        }
        <Chart
          id={1}
          yExtents={[d => [d.high, d.low], ...series.map(s => s.accessor())]}
          height={400}
        >
          <YAxis axisAt="right" orient="right" ticks={5} />
          <XAxis
            axisAt="bottom"
            orient="bottom"
            showTicks={false}
            outerTickSize={0}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".8f")}
          />
          {series.map((line, i) => [
            <LineSeries
              key={`series_${i}`}
              yAccessor={line.accessor()}
              stroke={line.stroke()}
            />,
            <CurrentCoordinate
              key={`coordiate_${i}`}
              yAccessor={line.accessor()}
              fill={line.stroke()}
            />
          ])}
          {
            // Tooltips
          }

          <OHLCTooltip origin={[-40, 0]} />
          <MovingAverageTooltip
            onClick={e => console.log(e)}
            origin={[-38, 15]}
            options={series.map(s => ({
              yAccessor: s.accessor(),
              type: s.type(),
              stroke: s.stroke(),
              windowSize: s.options().windowSize,
              echo: "some echo here"
            }))}
          />

          <CandlestickSeries />
        </Chart>
        {
          // Vol
        }
        <Chart
          yExtents={d => d.volume}
          height={140}
          origin={(w, h) => [0, h - 150]}
        >
          <YAxis
            axisAt="left"
            orient="left"
            tick="5"
            tickFormat={format(".0s")}
          />
          <XAxis axisAt="bottom" orient="bottom" ticks={5} />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d")}
          />
          <MouseCoordinateY
            at="left"
            orient="left"
            displayFormat={format(".4s")}
          />
          {/* <CurrentCoordinate
            yAccessor={smaVolume50.accessor()}
            fill={smaVolume50.stroke()}
          /> */}
          <CurrentCoordinate yAccessor={d => d.volume} fill="#9B0A47" />
          {/* <AreaSeries
            yAccessor={smaVolume50.accessor()}
            stroke={smaVolume50.stroke()}
            fill={smaVolume50.fill()}
          /> */}
          <BarSeries
            yAccessor={d => d.volume}
            fill={d => (d.close > d.open ? "#6BA583" : "red")}
          />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    );
  }
};

CandleStickChart = fitWidth(CandleStickChart);

export { CandleStickChart };
export default CandleStickChart;
