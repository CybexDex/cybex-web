import * as React from "react";
import * as PropTypes from "prop-types";

import utils from "common/utils";
import Translate from "react-translate-component";
// import SettingsActions from "actions/SettingsActions";
import classnames from "classnames";
import PriceText from "../Utility/PriceText";
import TransitionWrapper from "../Utility/TransitionWrapper";
import AssetName from "../Utility/AssetName";
import PriceStat from "./PriceStat";
import Radium from "radium";
// import ReactTooltip from "react-tooltip";

const rowStyles = {
  base: {}
};

const priceRowHeight = 24;

class OrderBookRowVertical extends React.Component<any, any> {
  shouldComponentUpdate(np) {
    if (np.order.market_base !== this.props.order.market_base) return false;
    return (
      np.order.ne(this.props.order) ||
      np.index !== this.props.index ||
      np.height !== this.props.height ||
      np.currentAccount !== this.props.currentAccount
    );
  }

  render() {
    let { order, quote, base, final, height } = this.props;
    const isBid = order.isBid();
    const isCall = order.isCall();
    let integerClass = isCall
      ? "orderHistoryCall"
      : isBid
        ? "orderHistoryBid"
        : "orderHistoryAsk";

    let price = (
      <PriceText price={order.getPrice()} quote={quote} base={base} />
    );
    return (
      <tr
        onClick={this.props.onClick}
        className={classnames(
          { "final-row": final },
          { "my-order": order.isMine(this.props.currentAccount) }
        )}
      >
        <td className="text-left" style={{ lineHeight: height + "px" }}>
          {price}
        </td>
        <td className="text-right" style={{ lineHeight: height + "px" }}>
          {utils.format_number(
            order[isBid ? "amountToReceive" : "amountForSale"]().getAmount({
              real: true
            }),
            quote.get("precision")
          )}
        </td>
        <td className="text-right" style={{ lineHeight: height + "px" }}>
          {utils.format_number(
            order[isBid ? "amountForSale" : "amountToReceive"]().getAmount({
              real: true
            }),
            base.get("precision")
          )}
        </td>
      </tr>
    );
  }
}

class OrderBook extends React.Component<any, any> {
  static defaultProps = {
    bids: [],
    asks: [],
    orders: {}
  };

  static propTypes = {
    bids: PropTypes.array.isRequired,
    asks: PropTypes.array.isRequired,
    orders: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      scrollToBottom: true,
      flip: props.flipOrderBook,
      showAllBids: true,
      showAllAsks: true,
      rowCount: 20
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.marketReady) {
      this.setState({
        scrollToBottom: true
      });
    }

    // Change of market or direction
    if (
      nextProps.base.get("id") !== this.props.base.get("id") ||
      nextProps.quote.get("id") !== this.props.quote.get("id")
    ) {
      this.setState({
        scrollToBottom: true
      });

      if (this.refs.askTransition) {
        this.refs.askTransition.resetAnimation();
        if (this.refs.hor_asks) this.refs.hor_asks.scrollTop = 0;
        if (this.refs.hor_bids) this.refs.hor_bids.scrollTop = 0;
      }

      if (this.refs.bidTransition) {
        this.refs.bidTransition.resetAnimation();
      }

      if (this.refs.vert_bids) this.refs.vert_bids.scrollTop = 0;
    }

    if (
      nextProps.height !== this.props.height ||
      nextProps.width !== this.props.width
    ) {
    }
  }

  _onToggleShowAll(type) {
    if (type === "asks") {
      this.setState({
        showAllAsks: !this.state.showAllAsks
      });

      if (this.state.showAllAsks) {
        this.refs.hor_asks.scrollTop = 0;
      }
    } else {
      this.setState({
        showAllBids: !this.state.showAllBids
      });

      if (this.state.showAllBids) {
        this.refs.hor_bids.scrollTop = 0;
      }
    }
  }

  render() {
    let {
      combinedBids,
      combinedAsks,
      highestBid,
      lowestAsk,
      quote,
      base,
      totalAsks,
      totalBids,
      quoteSymbol,
      baseSymbol,
      horizontal,
      marketReady,
      latest
    } = this.props;
    let { showAllAsks, showAllBids, rowCount } = this.state;
    // let countOfRow = 16;
    let countOfRow = document.getElementById("orderBook")
      ? (Math.floor(
          document.getElementById("orderBook").offsetHeight / priceRowHeight
        ) -
          2) /
        2
      : 24;
    let bidRows = null,
      askRows = null;

    if (base && quote) {
      bidRows = combinedBids
        .filter(a => {
          if (this.state.showAllBids || combinedBids.length <= rowCount) {
            return true;
          }
          return a.getPrice() >= highestBid.getPrice() / 5;
        })
        .slice(0, countOfRow)
        .map((order, index) => {
          return (
            <OrderBookRowVertical
              index={index}
              height={priceRowHeight}
              key={order.getPrice() + (order.isCall() ? "_call" : "")}
              order={order}
              onClick={this.props.onClick.bind(this, order)}
              base={base}
              quote={quote}
              final={index === 0}
              currentAccount={this.props.currentAccount}
            />
          );
        });

      let tempAsks = combinedAsks.filter(a => {
        if (this.state.showAllAsks || combinedBids.length <= rowCount) {
          return true;
        }
        return a.getPrice() <= lowestAsk.getPrice() * 5;
      });
      if (!horizontal) {
        tempAsks.sort((a, b) => {
          return b.getPrice() - a.getPrice();
        });
      }
      askRows = tempAsks.slice(-countOfRow).map((order, index) => {
        return (
          <OrderBookRowVertical
            index={index}
            key={order.getPrice() + (order.isCall() ? "_call" : "")}
            order={order}
            height={priceRowHeight}
            onClick={this.props.onClick.bind(this, order)}
            base={base}
            quote={quote}
            type={order.type}
            final={0 === index}
            currentAccount={this.props.currentAccount}
          />
        );
      });
    }

    let totalBidsLength = bidRows.length;
    let totalAsksLength = askRows.length;

    if (!showAllBids) {
      bidRows.splice(rowCount, bidRows.length);
    }

    if (!showAllAsks) {
      askRows.splice(rowCount, askRows.length);
    }

    let leftHeader = (
      <thead ref="leftHeader">
        <tr key="top-header" className="top-header">
          {/* <th><Translate className="header-sub-title" content="exchange.total" /><span className="header-sub-title"> (<AssetName dataPlace="top" name={baseSymbol} />)</span></th> */}

          <th className="text-left">
            <Translate
              className={
                (this.state.flip ? "ask-total" : "bid-total") +
                " header-sub-title"
              }
              content="exchange.price"
            />
          </th>
          <th className="text-right">
            <span className="header-sub-title">
              <AssetName dataPlace="top" name={quoteSymbol} />
            </span>
          </th>
          <th className="text-right">
            <span className="header-sub-title">
              <AssetName dataPlace="top" name={baseSymbol} />
            </span>
          </th>
        </tr>
      </thead>
    );

    let priceRow = (
      <tr>
        <td colSpan={3}>
          <PriceStat
            ready={marketReady}
            price={latest.full}
            quote={quote}
            base={base}
            hideQuote={true}
          />
        </td>
      </tr>
    );

    return (
      <table className="table order-table table-hover">
        {leftHeader}
        <tbody id="orderBookBody">
          {askRows}
          {priceRow}
          {bidRows}
        </tbody>
      </table>
    );
  }
}

export default OrderBook;
