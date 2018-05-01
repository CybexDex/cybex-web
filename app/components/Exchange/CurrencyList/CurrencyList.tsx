import * as React from "react"; import * as PropTypes from "prop-types";
import marketUtil, { GroupedMarkets } from "utils/Market";
import { connect } from "alt-react";
import MarketsStore from "stores/MarketsStore";
import AssetStore from "stores/AssetStore";
import SettingsStore from "stores/SettingsStore";
import { CurrencyCard } from "./CurrencyCard";
import Translate from "react-translate-component";

const columns: { name: string }[] = [
  { name: "symbol" },
  { name: "price" },
  { name: "volume" },
  { name: "change" }
];


let CurrencyList = class extends React.Component<any, { markets: GroupedMarkets }> {
  constructor(props) {
    super(props);
    let { defaultMarkets } = this.props;
    this.state = {
      markets: marketUtil.getGroupedMarketsFromMap(defaultMarkets)
    };
  }

  componentDidMount() {

  }

  render() {
    let {
      starredMarkets,
      viewSettings,
      defaultMarkets,
      preferredBases,
      searchAssets
    } = this.props;
    let marketStats =
      this.state.markets["USD"] ?
        this.state.markets["USD"]
          .map(market =>
            ({
              ...MarketsStore.getState().allMarketStats.get(market.marketId),
              market
            })
          )
          .sort((prev, next) =>
            prev.volumeBase > next.volumeBase ?
              -1 :
              prev.volumeBase === next.volumeBase ?
                0 :
                1
          ) :
        [];
    return (
      <div className="currency-table table-flex table-custom table-default">
        <div className="table-caption">
          <Translate component="h4" content="bazaar.currencies" />
        </div>
        <div className="table-head">
          <div className="table-row">
            {columns.map(td =>
              (
                <Translate key={td.name} className="table-cell table-header" content={`bazaar.${td.name}`} />
              )
            )}
          </div>
        </div>
        <div className="table-body">
          {
            marketStats.map(
              market =>
                (<CurrencyCard key={market.market.id} {...market.market} />)
            )
          }
        </div>
      </div>
    );
  }
}

CurrencyList = connect(CurrencyList, {
  listenTo() {
    return [MarketsStore];
  },
  getProps(props) {
    return {
      starredMarkets: SettingsStore.getState().starredMarkets,
      defaultMarkets: SettingsStore.getState().defaultMarkets,
      viewSettings: SettingsStore.getState().viewSettings,
      preferredBases: SettingsStore.getState().preferredBases,
      userMarkets: SettingsStore.getState().userMarkets,
      assetsLoading: AssetStore.getState().assetsLoading,
    };
  }
});

export { CurrencyList };
export default CurrencyList;