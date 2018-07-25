import * as React from "react";
import * as PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";
import AssetName from "../Utility/AssetName";
import MarketsActions from "actions/MarketsActions";
import SettingsActions from "actions/SettingsActions";
import PriceStat from "./PriceStat";
import Translate from "react-translate-component";
import counterpart from "counterpart";
import cnames from "classnames";

export default class ExchangeHeader extends React.Component {

  _addMarket(quote, base) {
    let marketID = `${quote}_${base}`;
    if (!this.props.starredMarkets.has(marketID)) {
      SettingsActions.addStarMarket(quote, base);
    } else {
      SettingsActions.removeStarMarket(quote, base);
    }
  }

  render() {
    const {
      quoteAsset,
      baseAsset,
      starredMarkets,
      hasPrediction,
      feedPrice,
      showCallLimit,
      lowestCallPrice,
      marketReady,
      latestPrice,
      currentPeriod,
      marketStats,
      showDepthChart,
      buckets,
      bucketSize,
      showIndicators,
      onBorrowBase,
      onBorrowQuote,
      indicators,
      indicatorSettings,
      currentMouseItem
    } = this.props;

    const baseSymbol = baseAsset.get("symbol");
    const quoteSymbol = quoteAsset.get("symbol");

    // Favorite star
    const marketID = `${quoteSymbol}_${baseSymbol}`;
    const starClass = starredMarkets.has(marketID) ? "gold-star" : "grey-star";

    // Market stats
    const dayChange = marketStats.get("change");

    const dayChangeClass =
      parseFloat(dayChange) === 0
        ? ""
        : parseFloat(dayChange) < 0
          ? "negative"
          : "positive";
    const dayChangeArrow =
      dayChangeClass === ""
        ? ""
        : dayChangeClass === "positive"
          ? "change-up"
          : "change-down";
    const volumeBase = marketStats.get("volumeBase");
    const volumeQuote = marketStats.get("volumeQuote");

    return (
      <div className="grid-block shrink no-padding overflow-visible top-bar">
        <div className="grid-block overflow-visible">
          <div className="grid-block shrink show-for-large">
            <span
              className="v-align clickable"
              onClick={this._addMarket.bind(this, quoteSymbol, baseSymbol)}
            >
              <span style={{ paddingRight: 0 }} className="market-symbol">
                <Icon className={starClass} name="fi-star" />
              </span>
              <span className="market-symbol">
                <span style={{ fontSize: "1.2em" }}>
                  <AssetName name={quoteSymbol} />
                </span>
                {" / "}
                <AssetName name={baseSymbol} />
              </span>
            </span>
          </div>

          <div className="grid-block vertical" style={{ overflow: "visible" }}>
            <ul className="market-stats stats top-stats medium-12">
              {latestPrice ? (
                <PriceStat
                  ready={marketReady}
                  price={latestPrice.full}
                  hideBase
                  withYuan
                  quote={quoteAsset}
                  base={baseAsset}
                  hideQuote={true}
                  content="exchange.latest"
                />
              ) : null}

              <li className="stat">
                <span>
                  <Translate
                    className="nowrap"
                    component="span"
                    content="account.hour_24"
                  />
                  <br />
                  <b className={"value " + dayChangeClass}>
                    {marketReady ? dayChange : 0}
                    <span className={dayChangeArrow}>
                      &nbsp;{dayChangeArrow === "" ? null : dayChangeArrow ===
                      "change-up" ? (
                        <span>&#8593;</span>
                      ) : (
                        <span>&#8595;</span>
                      )}
                    </span>
                  </b>
                  <span>%</span>
                </span>
              </li>

              {volumeBase >= 0 ? (
                <PriceStat
                  ready={marketReady}
                  decimals={0}
                  volume={true}
                  price={volumeBase}
                  volume2={volumeQuote}
                  base={baseAsset}
                  quote={quoteAsset}
                  content="exchange.volume_24"
                />
              ) : null}

              {!hasPrediction && feedPrice ? (
                <PriceStat
                  toolTip={counterpart.translate("tooltip.settle_price")}
                  ready={marketReady}
                  price={feedPrice.toReal()}
                  quote={quoteAsset}
                  base={baseAsset}
                  content="exchange.settle"
                />
              ) : null}

              {lowestCallPrice && showCallLimit ? (
                <PriceStat
                  toolTip={counterpart.translate("tooltip.call_limit")}
                  ready={marketReady}
                  className="is-call"
                  price={lowestCallPrice}
                  quote={quoteAsset}
                  base={baseAsset}
                  content="explorer.block.call_limit"
                />
              ) : null}

              {feedPrice && showCallLimit ? (
                <PriceStat
                  toolTip={counterpart.translate("tooltip.margin_price")}
                  ready={marketReady}
                  className="is-call"
                  price={feedPrice.getSqueezePrice({ real: true })}
                  quote={quoteAsset}
                  base={baseAsset}
                  content="exchange.squeeze"
                />
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
