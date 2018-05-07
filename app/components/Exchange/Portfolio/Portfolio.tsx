import * as React from "react"; import * as PropTypes from "prop-types";
import marketUtil, { GroupedMarkets } from "utils/Market";
import { connect } from "alt-react";
import MarketsStore from "stores/MarketsStore";
import AssetStore from "stores/AssetStore";
import SettingsStore from "stores/SettingsStore";
import Translate from "react-translate-component";
import { PortfolioCard } from "./PortfolioCard";
import { Map } from "immutable";
import MarketColors from "./MarketColors";
import { getColorGenerator, MarketColor } from "utils/ColorUtils";

const getColor = getColorGenerator(MarketColors);

type PortfolioProps = {
  starredMarkets?: Map<string, { base: string, quote: string }>
};

let Portfolio = class extends React.Component<PortfolioProps, { markets: GroupedMarkets }> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    let { starredMarkets } = this.props;
    let markets = starredMarkets.toArray();
    return markets.length ? (
      <div className="currency-table table-flex table-custom table-default">
        <div className="table-caption">
          <Translate component="h4" content="bazaar.portfolio" />
        </div>
        <div className="table-head">
          <div className="table-row">
          </div>
        </div>
        <div className="table-body">
          {
            markets
              .map(market => marketUtil.getMarketWithId(market.quote, market.base))
              .map(market =>
                <PortfolioCard key={market.marketId} marketColor={getColor(market.marketId)} {...market} />
              )
          }
        </div>
      </div>
    ) : null;
  }
}

Portfolio = connect(Portfolio, {
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

export { Portfolio };
export default Portfolio;