import * as React from "react"; import * as PropTypes from "prop-types";
import ChainTypes from "components/Utility/ChainTypes";
import AssetName from "components/Utility/AssetName";
import MarketsActions from "actions/MarketsActions";
import BindToChainState from "components/Utility/BindToChainState";
import SettingsStore from "stores/SettingsStore";
import MarketsStore from "stores/MarketsStore";
import AssetStore from "stores/AssetStore";
import { connect } from "alt-react";
import utils from "common/utils";
import Translate from "react-translate-component";
import { getClassName } from "utils/ClassName";
import { Apis } from "cybexjs-ws";
import { Map } from "immutable";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/timer";
import { Subscription } from "rxjs/Subscription";
import { SimplePriceChart } from "./SimplePriceChart";
import { HistoryDatum } from "./HistoryDatum";
import { MarketColor } from "utils/ColorUtils";

type PCardProps = {
  duration?: number,
  marketColor?: MarketColor,
  base: Map<any, any>,
  quote: Map<any, any>,
  marketStats: { [x: string]: any }
};

type PCardState = {
  historyData: HistoryDatum[],
  chartData: number[]
};

let PortfolioCard = class extends React.PureComponent<PCardProps, PCardState> {
  statsChecked: Date;
  stateSubscription: Subscription;
  static propTypes = {
    quote: ChainTypes.ChainAsset.isRequired,
    base: ChainTypes.ChainAsset.isRequired,
    invert: PropTypes.bool
  };

  componentWillMount() {
    let { base, quote, duration } = this.props;
    MarketsActions.getMarketStats.defer(this.props.base, this.props.quote);
    this.state = {
      historyData: [],
      chartData: []
    };
    this.statsChecked = new Date();
    this.stateSubscription =
      Observable
        .timer(0, 35 * 1000)
        .subscribe(timer =>
          MarketsActions.getMarketStats.bind(this, this.props.base, this.props.quote)
        );
    this.stateSubscription.add(
      Observable
        .timer(0, 35 * 1000)
        .subscribe(timer =>
          this.updateHistoryData()
        )
    );
  }

  componentWillUnmount() {
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe();
    }
  }

  updateHistoryData() {
    let { base, quote, duration } = this.props;
    let endDate = new Date();
    let startDateShort = new Date();
    endDate.setDate(endDate.getDate() + 1);
    startDateShort = new Date(startDateShort.getTime() - 3600 * 50 * 1000);
    Apis.instance().history_api()
      .exec("get_market_history", [
        base.get("id"),
        quote.get("id"),
        duration || 3600,
        startDateShort.toISOString().slice(0, -5), endDate.toISOString().slice(0, -5)
      ])
      .then((historyData: HistoryDatum[]) =>
        this.setState({
          historyData,
        })
      );
  }

  _getChartId() {
    return this.props.quote.get("id") + "__" + this.props.base.get("id") + "__spc";
  }

  _renderCard() {
    let { base, quote, marketStats, marketColor } = this.props;
    return (
      <div className="pcard-wrapper">
        <div className="p-tag" style={{ backgroundColor: marketColor.color }}></div>
        <div className={getClassName("p-body change-color",
          { "change-go-up": marketStats.change > 0, "change-go-down": marketStats.change < 0 })}>
          {
            <div className="p-row p-name">
              <AssetName dataPlace="top" name={quote.get("symbol")} />:
              <AssetName dataPlace="top" name={base.get("symbol")} />
            </div>
          }
          <div className="p-row with-change flex-justify">
            <span className="p-price">
              {
                marketStats.price && utils.price_text(marketStats.price.toReal(), base, quote).toString()
                || "-"
              }
            </span>
            <span className="p-change">
              {`${marketStats.change}%` || "-"}
            </span>
          </div>
        </div>
        <div className="p-chart">
          <SimplePriceChart chartId={this._getChartId()} dataArray={this.state.historyData} color={marketColor} />
        </div>
      </div>
    );
  }

  render() {
    let { base, quote, marketStats } = this.props;
    return marketStats &&
      this.state.historyData.length ?
      this._renderCard() : null;
  }
}

PortfolioCard = BindToChainState(PortfolioCard);
let PortfolioCardWrapper = class extends React.Component<any, any>{
  render() {
    // console.debug("Port: ", this);
    return (
      <PortfolioCard {...this.props} />
    );
  }
};

PortfolioCardWrapper = connect(PortfolioCardWrapper, {
  listenTo() {
    return [MarketsStore];
  },
  getProps(props) {
    return {
      marketStats: MarketsStore.getState().allMarketStats.get(props.marketId)
    };
  }
});

export { PortfolioCardWrapper as PortfolioCard };
export default PortfolioCardWrapper;
