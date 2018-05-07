import * as React from "react"; import * as PropTypes from "prop-types";
import Chart from "chart.js";
import { HistoryDatum } from "./HistoryDatum";
import { MarketColor } from "utils/ColorUtils";


type SPCProps = {
  dataArray: HistoryDatum[],
  chartId: string,
  color: MarketColor
};

export class SimplePriceChart extends React.Component<SPCProps, null> {
  chartId: string;
  chartCtx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  chartInstance: Chart;

  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  componentDidMount() {
    let { children, dataArray, color } = this.props;
    this.chartCtx = this.canvas.getContext("2d");
    this.chartInstance = new Chart(this.chartCtx, {
      type: 'line',
      data: {
        labels: dataArray.map(data => data.key.open),
        datasets: [{
          label: 'Close',
          data: dataArray.map(data => data.close_quote),
          backgroundColor: [
            color.bgColor
          ],
          borderColor: [
            color.color
          ],
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            display: false,
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [
            {
              display: false
            }
          ]
        },
        elements: {
          point: {
            radius: 0
          }
        },
        tooltips: {
          displayColors: false
        }
      }
    });
  }

  _renderChart() {
    return (
      <canvas ref={canvas => this.canvas = canvas} id={this.props.chartId} />)
  }

  render() {
    return (
      <div className="spc-wrapper">
        {this._renderChart()}
      </div>
    );
  }
}

export default SimplePriceChart;