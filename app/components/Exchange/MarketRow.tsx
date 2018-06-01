import * as React from "react";
import * as PropTypes from "prop-types";
import FormattedAsset from "../Utility/FormattedAsset";
import ChainTypes from "../Utility/ChainTypes";
import BindToChainState from "../Utility/BindToChainState";
import AccountName from "../Utility/AccountName";
import utils from "common/utils";
import Icon from "../Icon/Icon";
import MarketsActions from "actions/MarketsActions";
import SettingsActions from "actions/SettingsActions";
import { VolumnStore } from "stores/VolumeStore";
import ReactTooltip from "react-tooltip";
import { connect } from "alt-react";
import Radium from "radium";
import { Colors } from "components/Common";

const Styles = {
  row: {
    base: {
      width: "100%"
    },
    active: {
      backgroundColor: Colors.$colorGreyLightWhite,
      opacity: 0.8
    }
  },
  cell: {
    active: {
      color: Colors.$colorOrange
    }
  }
};

let MarketRow = class extends React.Component<
  {
    quote;
    base;
    noSymbols?;
    stats?;
    starred?;
    compact?;
    columns;
    current?;
    name?;
    isChecked?;
    isDefault?;
    onCheckMarket?;
    removeMarket?;
    withYuan?;
    unitYuan?;
    tooltipPosition?;
  },
  any
> {
  statsInterval;
  statsChecked;
  static propTypes = {
    quote: ChainTypes.ChainAsset.isRequired,
    base: ChainTypes.ChainAsset.isRequired
  };

  static defaultProps = {
    noSymbols: false,
    withYuan: false,
    tempComponent: "tr",
    tooltipPosition: "right"
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.statsInterval = null;
  }

  _onClick(marketID) {
    const newPath = `/market/${marketID}`;
    if (newPath !== this.context.router.location.pathname) {
      MarketsActions.switchMarket();
      this.context.router.push(`/market/${marketID}`);
    }
  }

  componentDidMount() {
    MarketsActions.getMarketStats.defer(this.props.base, this.props.quote);
    this.statsChecked = new Date();
    this.statsInterval = setInterval(
      MarketsActions.getMarketStats.bind(
        this,
        this.props.base,
        this.props.quote
      ),
      35 * 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.statsInterval);
  }

  shouldComponentUpdate(nextProps) {
    return !utils.are_equal_shallow(nextProps, this.props);
  }

  _onStar(quote, base, e) {
    e.preventDefault();
    if (!this.props.starred) {
      SettingsActions.addStarMarket(quote, base);
    } else {
      SettingsActions.removeStarMarket(quote, base);
    }
  }

  render() {
    let {
      quote,
      base,
      noSymbols,
      stats,
      starred,
      unitYuan,
      tooltipPosition,
      withYuan
    } = this.props;

    if (!quote || !base) {
      return null;
    }

    let marketID = quote.get("symbol") + "_" + base.get("symbol");
    let marketName = quote.get("symbol") + ":" + base.get("symbol");
    let dynamic_data = quote.get("dynamic");
    let base_dynamic_data = base.get("dynamic");

    let price = utils.convertPrice(quote, base);
    let finalPrice =
      stats && stats.price
        ? stats.price.toReal()
        : stats &&
          stats.close &&
          (stats.close.quote.amount && stats.close.base.amount)
          ? utils.get_asset_price(
              stats.close.quote.amount,
              quote,
              stats.close.base.amount,
              base,
              true
            )
          : utils.get_asset_price(
              price.quote.amount,
              quote,
              price.base.amount,
              base,
              true
            );
    let priceByYuan = parseFloat((unitYuan * finalPrice).toFixed(2));
    let buttonClass = "button outline";
    let buttonStyle = null;
    if (this.props.compact) {
      buttonClass += " no-margin";
      buttonStyle = {
        marginBottom: 0,
        fontSize: "0.75rem",
        padding: "4px 10px",
        borderRadius: "0px",
        letterSpacing: "0.05rem"
      };
    }

    let columns = this.props.columns
      .map(column => {
        switch (column.name) {
          case "star":
            let starClass = starred ? "gold-star" : "grey-star";
            return (
              <span
                onClick={this._onStar.bind(
                  this,
                  quote.get("symbol"),
                  base.get("symbol")
                )}
                key={column.index}
              >
                <Icon className={starClass} name="fi-star" />
              </span>
            );

          case "vol":
            let amount = stats ? stats.volumeBase : 0;
            return (
              <span
                onClick={this._onClick.bind(this, marketID)}
                className="text-right"
                key={column.index}
              >
                {utils.format_volume(amount)}
              </span>
            );

          case "change":
            let change = utils.format_number(
              stats && stats.change ? stats.change : 0,
              2
            );
            let changeClass =
              change === "0.00"
                ? ""
                : parseFloat(change) > 0
                  ? "change-up"
                  : "change-down";
            // console.debug("ChangeClass: ", change, changeClass);
            return (
              <span
                onClick={this._onClick.bind(this, marketID)}
                className={"text-right " + changeClass}
                key={column.index}
              >
                {change + "%"}
              </span>
            );

          case "marketName":
            return (
              <span
                onClick={this._onClick.bind(this, marketID)}
                key={column.index}
              >
                <div className={buttonClass} style={buttonStyle}>
                  {marketName}
                </div>
              </span>
            );

          case "market":
            return (
              <span
                onClick={this._onClick.bind(this, marketID)}
                key={column.index}
                style={[this.props.current && Styles.cell.active] as any}
              >
                {this.props.name}
              </span>
            );

          case "price":
            let highPrecisionAssets = [
              "BTC",
              "OPEN.BTC",
              "TRADE.BTC",
              "GOLD",
              "SILVER"
            ];
            let precision = 6;
            if (highPrecisionAssets.indexOf(base.get("symbol")) !== -1) {
              precision = 8;
            }

            return (
              <span
                onClick={this._onClick.bind(this, marketID)}
                className="text-right"
                key={column.index}
              >
                {utils.format_number(
                  finalPrice,
                  finalPrice > 1000 ? 0 : finalPrice > 10 ? 2 : precision
                )}
              </span>
            );

          case "quoteSupply":
            return (
              <span
                onClick={this._onClick.bind(this, marketID)}
                key={column.index}
              >
                {dynamic_data ? (
                  <FormattedAsset
                    style={{ fontWeight: "bold" }}
                    amount={parseInt(dynamic_data.get("current_supply"), 10)}
                    asset={quote.get("id")}
                  />
                ) : null}
              </span>
            );

          case "baseSupply":
            return (
              <span
                onClick={this._onClick.bind(this, marketID)}
                key={column.index}
              >
                {base_dynamic_data ? (
                  <FormattedAsset
                    style={{ fontWeight: "bold" }}
                    amount={parseInt(
                      base_dynamic_data.get("current_supply"),
                      10
                    )}
                    asset={base.get("id")}
                  />
                ) : null}
              </span>
            );

          case "issuer":
            return (
              <span
                onClick={this._onClick.bind(this, marketID)}
                key={column.index}
              >
                <AccountName account={quote.get("issuer")} />
              </span>
            );

          case "add":
            return (
              <span
                style={{ textAlign: "right" }}
                key={column.index}
                onClick={this.props.onCheckMarket.bind(this, marketID)}
              >
                <input
                  type="checkbox"
                  checked={!!this.props.isChecked || this.props.isDefault}
                  disabled={this.props.isDefault}
                  data-tip={
                    this.props.isDefault
                      ? "This market is a default market and cannot be removed"
                      : null
                  }
                />
              </span>
            );

          case "remove":
            return (
              <span
                key={column.index}
                className="clickable"
                onClick={this.props.removeMarket}
              >
                <span
                  style={{
                    marginBottom: "6px",
                    marginRight: "6px",
                    zIndex: 999
                  }}
                  className="text float-right remove"
                >
                  –
                </span>
              </span>
            );

          default:
            break;
        }
      })
      .sort((a, b) => {
        return a.key > b.key;
      });

    let className = "clickable";
    if (this.props.current) {
      className += " activeMarket";
    }

    return (
      <>
        <div
          className="table-row clickable"
          style={
            [Styles.row.base, this.props.current && Styles.row.active] as any
          }
          data-tip={withYuan && !isNaN(priceByYuan) ? `¥ ${priceByYuan}` : null}
          data-place={tooltipPosition}
          data-offset="{'right': 6}"
        >
          {columns}
        </div>
        {/* <ReactTooltip /> */}
      </>
    );
  }
};
MarketRow = Radium(MarketRow);

MarketRow = BindToChainState(MarketRow);
MarketRow = connect(
  MarketRow,
  {
    listenTo() {
      return [VolumnStore];
    },
    getProps(props) {
      let { base } = props;
      let symbolName = utils.replaceName(base, false).name;
      let unitYuan = VolumnStore.getState().priceState[symbolName] || NaN;
      return {
        unitYuan
      };
    }
  }
);


export default MarketRow;
