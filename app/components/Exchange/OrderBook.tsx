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
import QueueAnim from "rc-queue-anim";

// import ReactTooltip from "react-tooltip";

enum OrderType {
  Ask,
  Bid,
  All
}

const priceRowHeight = 24;
const heightRowHeight = 32;
const rowStyles = {
  base: {
    display: "flex",
    flexGrow: 1,
    flexShrink: 0
  }
};

const wrapperStyle = {
  base: {
    ...rowStyles.base,
    flexFlow: "column",
    transition: "all 0.4s ease-in-out",
    overflowY: "hidden",
    flex: "1"
  },
  expand: {
    flex: "1"
  },
  hidden: {
    flex: "0"
  },
  scroll: {
    overflowY: "auto",
    height: `calc(100% - ${heightRowHeight}px)`
  }
};

const hiddenStyle = {
  display: "none"
};

const headerUnderStyle = {
  height: `calc(100% - ${heightRowHeight}px)`
};

const bodyStyle = {
  ...headerUnderStyle,
  ...wrapperStyle,
  display: "flex",
  flexFlow: "column"
};

const rowHeight = {
  flexBasis: priceRowHeight + "px"
};

const headerStyles = {
  height: `${heightRowHeight}px`,
  display: "flex",
  lineHeight: "32px"
};

const cellStyle = width => ({
  lineHeight: priceRowHeight + "px",
  width
});

let OrderBookRowVertical = class extends React.PureComponent<any, any> {
  // shouldComponentUpdate(np) {
  //   if (np.order.market_base !== this.props.order.market_base) return false;
  //   return (
  //     np.order.ne(this.props.order) ||
  //     np.index !== this.props.index ||
  //     np.currentAccount !== this.props.currentAccount
  //   );
  // }

  render() {
    let { order, quote, base, final } = this.props;
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
      <div
        onClick={this.props.onClick}
        className={classnames(
          "link",
          { "final-row": final },
          { "my-order": order.isMine(this.props.currentAccount) }
        )}
        style={[rowStyles.base, rowHeight] as any}
      >
        <span className="text-left" style={cellStyle("30%")}>
          {price}
        </span>
        <span className="text-right" style={cellStyle("30%")}>
          {utils.format_number(
            order[isBid ? "amountToReceive" : "amountForSale"]().getAmount({
              real: true
            }),
            quote.get("precision")
          )}
        </span>
        <span className="text-right" style={cellStyle("40%")}>
          {utils.format_number(
            order[isBid ? "amountForSale" : "amountToReceive"]().getAmount({
              real: true
            }),
            base.get("precision")
          )}
        </span>
      </div>
    );
  }
};

OrderBookRowVertical = Radium(OrderBookRowVertical);

let OrderBook = class extends React.Component<any, any> {
  askWrapper: HTMLDivElement;
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
      rowCount: 20,
      type: OrderType.All
    };
  }

  setType = type => {
    this.setState({
      type
    });
    this.fixPos();
  };

  fixPos = () => {
    setTimeout(() => {
      if (this.askWrapper) {
        this.askWrapper.scrollTop = this.askWrapper.scrollHeight + 1000;
      }
      if (this.state.type !== OrderType.Ask) {
        setTimeout(() => {
          this.askWrapper.scrollTop = this.askWrapper.scrollHeight + 1000;
        }, 200);
      }
    }, 200);
  };

  componentDidUpdate() {
    this.fixPos();
  }
  componentDidMount() {
    this.fixPos();
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
    let { showAllAsks, showAllBids, rowCount, type } = this.state;
    // let countOfRow = 16;
    let countOfRow = document.getElementById("orderBook")
      ? (Math.floor(
          document.getElementById("orderBook").offsetHeight / priceRowHeight
        ) -
          3) /
        2
      : 24;
    let bidRows = null,
      askRows = null;

    if (base && quote) {
      bidRows = combinedBids.filter(a => {
        if (this.state.showAllBids || combinedBids.length <= rowCount) {
          return true;
        }
        return a.getPrice() >= highestBid.getPrice() / 5;
      });
      bidRows = type !== OrderType.Bid ? bidRows.slice(0, countOfRow) : bidRows;
      bidRows = bidRows.map((order, index) => {
        return (
          <OrderBookRowVertical
            index={index}
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
      tempAsks =
        type !== OrderType.Ask ? tempAsks.slice(-countOfRow) : tempAsks;

      askRows = tempAsks.map((order, index) => {
        return (
          <OrderBookRowVertical
            index={index}
            key={order.getPrice() + (order.isCall() ? "_call" : "")}
            order={order}
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
      <div key="top-header" style={headerStyles} className="top-header">
        <Translate
          className={
            (this.state.flip ? "ask-total" : "bid-total") + " header-sub-title"
          }
          style={{ width: "30%" }}
          content="exchange.price"
        />
        <span className="header-sub-title text-right" style={{ width: "30%" }}>
          <AssetName dataPlace="top" name={quoteSymbol} />
        </span>
        <span className="header-sub-title text-right" style={{ width: "40%" }}>
          <AssetName dataPlace="top" name={baseSymbol} />
        </span>
      </div>
    );

    let priceRow = (
      <div style={[rowHeight] as any} className="text-center">
        <PriceStat
          ready={marketReady}
          price={latest.full}
          quote={quote}
          base={base}
          hideQuote={true}
        />
      </div>
    );

    return (
      <>
        <div className="order-book-title" style={headerStyles}>
          <button
            className="button"
            onClick={this.setType.bind(this, OrderType.Ask)}
          >
            Sell
          </button>
          <button
            className="button"
            onClick={this.setType.bind(this, OrderType.Bid)}
          >
            Buy
          </button>
          <button
            className="button"
            onClick={this.setType.bind(this, OrderType.All)}
          >
            All
          </button>
        </div>
        <div className="order-book-wrapper" style={headerUnderStyle}>
          {leftHeader}
          <div className="order-book-body" style={[bodyStyle] as any}>
            <div
              ref={askWrapper => (this.askWrapper = askWrapper)}
              className="ask-wrapper"
              style={
                [
                  wrapperStyle.base,
                  type === OrderType.All && wrapperStyle.expand,
                  type === OrderType.Ask && wrapperStyle.scroll,
                  type === OrderType.Bid && wrapperStyle.hidden
                ] as any
              }
            >
              {askRows}
            </div>
            {priceRow}
            <div
              className="bid-wrapper"
              style={
                [
                  wrapperStyle.base,
                  type === OrderType.All && wrapperStyle.expand,
                  type === OrderType.Bid && wrapperStyle.scroll,
                  type === OrderType.Ask && wrapperStyle.hidden
                ] as any
              }
            >
              {bidRows}
            </div>
          </div>
        </div>
      </>
    );
  }
};

OrderBook = Radium(OrderBook);

export default OrderBook;
