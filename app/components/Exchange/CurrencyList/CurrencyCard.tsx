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

class MarketStats {

}


let CurrencyCard = class extends React.PureComponent<any, any> {
  statsChecked: Date;
  statsInterval: number;

  static propTypes = {
    quote: ChainTypes.ChainAsset.isRequired,
    base: ChainTypes.ChainAsset.isRequired,
    invert: PropTypes.bool
  };

  componentWillMount() {
    MarketsActions.getMarketStats.defer(this.props.base, this.props.quote);
    this.statsChecked = new Date();
    this.statsInterval =
      setInterval(MarketsActions.getMarketStats.bind(this, this.props.base, this.props.quote), 35 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.statsInterval);
  }

  render() {
    let { hide, isLowVolume, base, quote, marketStats } = this.props;
    return marketStats ?
      <div className={getClassName("table-row change-color",
        { "change-go-up": marketStats.change > 0, "change-go-down": marketStats.change < 0 })}>
        <div className="table-cell currency-symbol">
          <AssetName dataPlace="top" name={quote.get("symbol")} />
        </div>
        <div className="table-cell currency-volume with-change">
          {
            marketStats.price && utils.price_text(marketStats.price.toReal(), base, quote).toString()
            || "-"
          }
        </div>
        <div className="table-cell currency-volume">
          {utils.format_volume(marketStats.volumeBase) || "-"}
        </div>
        <div className="table-cell currency-change with-change">
          {`${marketStats.change}%` || "-"}
        </div>
      </div> :
      <div className="table-row"></div>;
  }
}

CurrencyCard = BindToChainState(CurrencyCard);
let CurrencyCardWrapper = class extends React.Component<any, any>{
  render() {
    return (
      <CurrencyCard {...this.props} />
    );
  }
}

CurrencyCardWrapper = connect(CurrencyCardWrapper, {
  listenTo() {
    return [MarketsStore];
  },
  getProps(props) {
    return {
      marketStats: MarketsStore.getState().allMarketStats.get(props.marketId)
    };
  }
});

export { CurrencyCardWrapper as CurrencyCard };
export default CurrencyCardWrapper;
