import * as React from "react";
import ReactTooltip from "react-tooltip";
import Translate from "react-translate-component";
import AssetName from "components/Utility/AssetName";
import { MARKETS } from "stores/SettingsStore";
import { correctMarketPair, correctMarketPairMap } from "utils/Market";
import BindToChainState from "components/Utility/BindToChainState";
import MarketsStore from "stores/MarketsStore";
import MarketsActions from "actions/MarketsActions";
import SettingsStore from "stores/SettingsStore";
import { connect } from "alt-react";
import ChainTypes from "../Utility/ChainTypes";


let AssetDetail = class extends React.PureComponent<{ asset; vol }> {
  static propTypes = {
    asset: ChainTypes.ChainAsset.isRequired
  };
  render() {
    let { asset, vol } = this.props;
    return (
      <tr>
        <td className="status-title text-left">
          <AssetName name={asset.get ? asset.get("symbol") : asset} />
        </td>
        <td className="status-content text-right">{vol.toFixed(6)} ETH</td>
      </tr>
    );
  }
};
AssetDetail = BindToChainState(AssetDetail);

let VolumeDisplay = class extends React.PureComponent<
  { markets?; vol?; marketStats? },
  { volMarkets }
> {
  static propTypes = {
    markets: ChainTypes.ChainAssetsList.isRequired
  };

  state = {
    volMarkets: []
  };

  componentDidUpdate(prevProps, prevState, snapShot) {
    if (
      prevProps.markets[1] != this.props.markets[1] &&
      this.props.markets[1]
    ) {
      let assetsMap = this.props.markets.filter(m => !!m);
      let rawPairs = assetsMap.reduce((allPairs, nextAssetMap, i, arr) => {
        arr.forEach(assetMap => {
          if (assetMap.get("id") !== nextAssetMap.get("id")) {
            allPairs.push([assetMap, nextAssetMap]);
          }
        });
        return allPairs;
      }, []);
      let pairSet = new Set();
      let volMarkets = rawPairs
        .map(pair => correctMarketPairMap(pair[0], pair[1]))
        .filter(pair => {
          if (
            SettingsStore.getState().preferredBases.indexOf(
              pair.base.get("symbol")
            ) === -1
          ) {
            return false;
          }
          let marketPair = pair.base.get("symbol") + pair.quote.get("symbol");
          if (pairSet.has(marketPair)) {
            return false;
          }
          pairSet.add(marketPair);
          return true;
        });
      this.setState({ volMarkets });
      volMarkets.forEach(pair => {
        MarketsActions.getMarketStats(pair.base, pair.quote);
      });
      this._calcVol();
    }
  }

  _calcVol = () => {
    let { marketStats } = this.props;
    let { volMarkets } = this.state;
    let volSet = {};
    let priceByCyb = {};
    let priceByEth = {};
    let priceByUsdt = {};
    volMarkets
      .map(pair =>
        marketStats.get(
          `${pair.quote.get("symbol")}_${pair.base.get("symbol")}`
        )
      )
      .filter(
        marketStat =>
          !!marketStat && marketStat.volumeBase && marketStat.volumeQuote
      )
      .forEach(stat => {
        if (stat.volumeBaseAsset.asset_id === "1.3.0") {
          priceByCyb[stat.volumeQuoteAsset.asset_id] = parseFloat(stat.price);
        }
        if (stat.volumeQuoteAsset.asset_id === "1.3.0") {
          priceByCyb[stat.volumeBaseAsset.asset_id] = 1 / parseFloat(stat.price);
        }
        if (stat.volumeBaseAsset.asset_id === "1.3.27") {
          priceByUsdt[stat.volumeQuoteAsset.asset_id] = parseFloat(stat.price);
        }
        if (stat.volumeQuoteAsset.asset_id === "1.3.27") {
          priceByUsdt[stat.volumeBaseAsset.asset_id] = 1 / parseFloat(stat.price);
        }
        if (stat.volumeBaseAsset.asset_id === "1.3.2") {
          priceByEth[stat.volumeQuoteAsset.asset_id] = parseFloat(stat.price);
        }
        if (stat.volumeQuoteAsset.asset_id === "1.3.2") {
          priceByEth[stat.volumeBaseAsset.asset_id] = 1 / parseFloat(stat.price);
        }
        if (volSet[stat.volumeBaseAsset.asset_id]) {
          volSet[stat.volumeBaseAsset.asset_id] += stat.volumeBase;
        } else {
          volSet[stat.volumeBaseAsset.asset_id] = stat.volumeBase;
        }
        if (volSet[stat.volumeQuoteAsset.asset_id]) {
          volSet[stat.volumeQuoteAsset.asset_id] += stat.volumeQuote;
        } else {
          volSet[stat.volumeQuoteAsset.asset_id] = stat.volumeQuote;
        }
      });
    let volDetails = [];
    let vol = Object.getOwnPropertyNames(volSet).reduce((sum, nextId) => {
      let price = priceByEth[nextId]
        ? priceByEth[nextId]
        : priceByCyb[nextId]
          ? priceByCyb[nextId] * priceByEth["1.3.0"]
          : priceByUsdt[nextId]
            ? priceByUsdt[nextId] * (1 / priceByUsdt["1.3.2"])
            : 0;
      let v = volSet[nextId] * price;
      sum += v;
      volDetails.push({ asset: nextId, volByEther: v });
      return sum;
    }, 0);

    return {
      sum: vol,
      details: volDetails
    };
  };

  render() {
    let vol = this._calcVol();
    return (
      <div
        className="volume-wrapper"
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "1em"
        }}
      >
        <div
          className="toggle tooltip"
          style={{
            fontWeight: "bold",
            fontSize: "90%"
          }}
          data-tip
          data-for="volumeDetails"
          data-place="bottom"
          // data-type="light"
        >
          <Translate content="header.volume" />
          <a href="javascript:;">{vol.sum.toFixed(6) + " ETH"}</a>
        </div>
        <ReactTooltip id="volumeDetails" delayHide={500} effect="solid">
          <table id="" className="status-table">
            <tbody>
              {vol.details.map(vol => (
                <AssetDetail
                  key={vol.asset}
                  asset={vol.asset}
                  vol={vol.volByEther}
                />
              ))}
              <tr className="border-top" />
            </tbody>
          </table>
        </ReactTooltip>
      </div>
    );
  }
};

VolumeDisplay = BindToChainState(VolumeDisplay);

VolumeDisplay = connect(
  VolumeDisplay,
  {
    listenTo() {
      return [MarketsStore];
    },
    getProps() {
      return {
        markets: MARKETS,
        marketStats: MarketsStore.getState().allMarketStats
      };
    }
  }
);
export { VolumeDisplay };
export default VolumeDisplay;
