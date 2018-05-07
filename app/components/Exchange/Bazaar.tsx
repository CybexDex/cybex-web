import * as React from "react"; import * as PropTypes from "prop-types";
import { CurrencyList } from "./CurrencyList/CurrencyList";
import { Portfolio } from "./Portfolio/Portfolio";
import { Map } from "immutable";
import { connect } from "alt-react";
import MarketsStore from "stores/MarketsStore";
import SettingsStore from "stores/SettingsStore";

type BazaarProps = {
  starredMarkets: Map<string, any>,
  defaultMarkets: any[],
  viewSettings: any[],
  preferredBases: any[],
  marketStats: any[],
  userMarkets: any[],
  searchAssets: any[],
  onlyStars: any[],
  assetsLoading: boolean
};


class Bazaar extends React.Component<BazaarProps, any> {
  render() {
    return (
      <div className="bazaar-wrapper">
        <div className="bazaar-left with-shadow panel-with-bg">
          <CurrencyList />
        </div>
        {
          this.props.starredMarkets.toArray().length ?
            <div className="bazaar-right with-shadow panel-with-bg margin-column">
              <Portfolio />
            </div> :
            null
        }
      </div>
    );
  }
}

export default connect(Bazaar, {
  listenTo() {
    return [SettingsStore];
  },
  getProps(props) {
    return {
      starredMarkets: SettingsStore.getState().starredMarkets
    };
  }
});;
