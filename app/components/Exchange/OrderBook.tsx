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
import { Colors, TabLink, $styleSelect } from "components/Common";
import counterpart from "counterpart";
import Select from "react-select";
import { LimitOrder } from "common/MarketClasses";
import { VolumnStore } from "stores/VolumeStore";
import ReactTooltip from "react-tooltip";
import { connect } from "alt-react";
import { RteActions } from "actions/RteActions";
import { RteStore } from "stores/RteStore";

enum OrderType {
  Ask,
  Bid,
  All
}
enum DepthType {
  Accum,
  Interval
}

const priceRowHeight = 24;
const heightRowHeight = 32;
const rowStyles = {
  base: {
    display: "flex",
    flexShrink: 0,
    position: "relative",
    padding: "0 0.5rem",
    margin: "0 -0.5em"
  }
};

const wrapperStyle = {
  base: {
    ...rowStyles.base,
    flexGrow: 1,
    flexFlow: "column",
    transition: "all 0.4s ease-in-out",
    overflowY: "hidden",
    justifyContent: "space-between",
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
  padding: "0 0.5rem",
  flexFlow: "column"
};

const rowHeight = {
  flexBasis: priceRowHeight + "px",
  lineHeight: priceRowHeight + "px"
};

const headerStyles = {
  height: `${heightRowHeight}px`,
  display: "flex",
  alignItems: "center"
};

const fixArray = (list, cutCondition, fixedLength, filler) => {
  return !cutCondition || !list || !Array.isArray(list) || !fixedLength
    ? list
    : list.length > fixedLength
    ? list.slice(0, fixedLength)
    : [...list, ...new Array(fixedLength - list.length).fill(filler)];
};

const cellStyle = width => ({
  zIndex: 2,
  lineHeight: priceRowHeight + "px",
  width
});

export class Order {
  accum: number;

  constructor(
    public price: number,
    public value: number,
    public amount: number,
    public isBid: boolean,
    public basePrecision: number,
    public quotePresicion: number
  ) {}

  sum(another: Order) {
    return new Order(
      this.price,
      this.value + another.value,
      this.amount + another.amount,
      this.isBid,
      this.basePrecision,
      this.quotePresicion
    );
  }

  get priceAmount() {
    return parseInt((this.price * Math.pow(10, this.basePrecision)).toString());
  }
  get amountAmount() {
    return parseInt(
      (this.amount * Math.pow(10, this.quotePresicion)).toString()
    );
  }
  get accumAmount() {
    return parseInt(
      (this.accum * Math.pow(10, this.quotePresicion)).toString()
    );
  }
  get quoteValueAmount() {
    return parseInt(
      (this.accum * this.price * Math.pow(10, this.basePrecision)).toString()
    );
  }
}
type RteOrderPrice = string;
type RteOrderAmount = string;
type RteOrder = [RteOrderPrice, RteOrderAmount];

let OrderBookRowVertical = class extends React.Component<
  {
    index?;
    currentAccount;
    order;
    quote;
    base;
    final;
    digits;
    depthType?;
    onClick?;
    total;
    max?;
    withYuan?;
    unitYuan?;
    previous;
  },
  any
> {
  static defaultProps = {
    depthType: DepthType.Interval
  };

  shouldComponentUpdate(np) {
    // if (np.order.market_base !== this.props.order.market_base) return false;
    return (
      np.order.ne(this.props.order) ||
      np.index !== this.props.index ||
      np.digits !== this.props.digits ||
      np.max !== this.props.max ||
      np.total !== this.props.total ||
      np.depthType !== this.props.depthType ||
      np.currentAccount !== this.props.currentAccount
    );
  }

  render() {
    let {
      order,
      quote,
      base,
      final,
      digits,
      depthType,
      total,
      withYuan,
      unitYuan,
      max,
      previous
    } = this.props;
    const isBid = order.isBid();
    const isCall = order.isCall();
    let integerClass = isCall
      ? "orderHistoryCall"
      : isBid
      ? "orderHistoryBid"
      : "orderHistoryAsk";

    let price = (
      <PriceText
        price={order.getPrice(order.sell_price, digits)}
        quote={quote}
        base={base}
        precision={digits}
        previous={previous}
      />
    );
    let yuanPrice = withYuan
      ? parseFloat(
          (unitYuan * order.getPrice(order.sell_price, digits)).toFixed(
            Math.max(digits - 3, 2)
          )
        )
      : NaN;
    // console.debug("ORDER: ", total, order, order.totalToReceive());
    let bgWidth =
      (order
        ? depthType === DepthType.Interval
          ? (((isBid
              ? order.amountToReceive().amount
              : order.amountForSale().amount) / max) as any).toFixed(4) * 100
          : ((order.accum / total)
              // (isBid
              //   ? // ? order.totalToReceive().amount
              //     order.totalForSale().amount
              //   : order.totalForSale().amount) / total
              .toFixed(4) as any) * 100
        : 0) + "%";
    return (
      <div
        onClick={this.props.onClick}
        className={classnames(
          "link",
          "order-row",
          // { "final-row": final },
          { "my-order": order.isMine(this.props.currentAccount) }
        )}
        style={[rowStyles.base, rowHeight] as any}
        data-tip={withYuan && !isNaN(yuanPrice) ? `¥ ${yuanPrice}` : null}
        data-place="left"
      >
        <i
          className="bg"
          style={{
            position: "absolute",
            zIndex: 1,
            width: bgWidth,
            height: "100%",
            margin: "0 -0.5em",
            backgroundColor: isBid ? Colors.$colorGrass : Colors.$colorFlame,
            opacity: 0.25
          }}
        />
        <span
          className="text-left"
          style={
            [
              cellStyle("30%"),
              { color: isBid ? Colors.$colorGrass : Colors.$colorFlame }
            ] as any
          }
        >
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

OrderBookRowVertical = connect(
  OrderBookRowVertical,
  {
    listenTo() {
      return [VolumnStore];
    },
    getProps(props) {
      let { base } = props;
      let symbolName = utils.replaceName(base.get("symbol"), false).name;
      let unitYuan = VolumnStore.getState().priceState[symbolName] || NaN;
      return {
        unitYuan
      };
    }
  }
);

const PRECISION_SIZE = 7;
let OrderBookHeader = class extends React.PureComponent<
  {
    type;
    depthType;
    onDepthTypeChange?;
    onTypeChange?;
    maxDigits?;
    digits?;
    onDepthChange;
  },
  any
> {
  // combineOptions = [];

  handleDepthChange = depth => {
    let { onDepthChange } = this.props;
    if (onDepthChange) {
      onDepthChange(depth);
    }
  };

  getDepthOption = value => ({
    label: counterpart.translate("exchange.depth", {
      depth: value
    }),
    value: value
  });

  render() {
    let {
      type,
      depthType,
      onTypeChange,
      onDepthTypeChange,
      onDepthChange
    } = this.props;
    let { maxDigits, digits } = this.props;

    console.debug("OrderBookHeader: ", this.props);
    const maxOption = Math.min(8, maxDigits);
    // const minOption = Math.max(1, maxDigits-2);
    let combineOptions = new Array(Math.min(4, maxOption))
      .fill(1)
      .map((v, i) => this.getDepthOption(maxOption - i));
    return (
      <>
        <TabLink
          key="orderType-all"
          active={type === OrderType.All}
          onClick={onTypeChange.bind(this, OrderType.All)}
          style={OrderBookStyles.tab}
        >
          <Translate content="exchange.orderbook.all" />
        </TabLink>
        <TabLink
          key="orderType-ask"
          active={type === OrderType.Ask}
          onClick={onTypeChange.bind(this, OrderType.Ask)}
          style={OrderBookStyles.tab}
        >
          <Translate content="exchange.orderbook.ask" />
        </TabLink>
        <TabLink
          key="orderType-bid"
          active={type === OrderType.Bid}
          onClick={onTypeChange.bind(this, OrderType.Bid)}
          style={OrderBookStyles.tab}
        >
          <Translate content="exchange.orderbook.bid" />
        </TabLink>
        <i key="orderType-divider" style={{ flexGrow: 1 }} />
        <TabLink
          key="depthType-interval"
          type="secondary"
          active={depthType === DepthType.Interval}
          onClick={onDepthTypeChange.bind(this, DepthType.Interval)}
          style={OrderBookStyles.tab}
        >
          <Translate content="exchange.orderbook.compare_depth" />
        </TabLink>
        <TabLink
          key="depthType-accum"
          type="secondary"
          active={depthType === DepthType.Accum}
          onClick={onDepthTypeChange.bind(this, DepthType.Accum)}
          style={OrderBookStyles.tab}
        >
          <Translate content="exchange.orderbook.accum_depth" />
        </TabLink>
        <i key="depthType-divider" style={{ flexGrow: 1 }} />
        <Select
          key="depthType-switcher"
          onChange={this.handleDepthChange}
          styles={$styleSelect("orderbook")}
          options={combineOptions}
          value={this.getDepthOption(digits)}
        />
      </>
    );
  }
};

const OrderBookRowEmpty = class extends React.PureComponent<any> {
  render() {
    return (
      <div style={rowStyles.base as any}>
        <span className="text-left" style={cellStyle("30%")}>
          ---
        </span>
        <span className="text-right" style={cellStyle("30%")}>
          ---
        </span>
        <span className="text-right" style={cellStyle("40%")}>
          ---
        </span>
      </div>
    );
  }
};

let OrderBookTableHeader = class extends React.PureComponent<
  { baseSymbol; quoteSymbol },
  any
> {
  render() {
    let { baseSymbol, quoteSymbol } = this.props;
    return (
      <div key="top-header" style={headerStyles} className="top-header">
        <span className="header-sub-title text-left" style={{ width: "30%" }}>
          {counterpart.translate("exchange.price")}
          (<AssetName dataPlace="top" name={baseSymbol} />)
        </span>
        <span className="header-sub-title text-right" style={{ width: "30%" }}>
          {counterpart.translate("exchange.quantity")}
          (<AssetName dataPlace="top" name={quoteSymbol} />)
        </span>
        <span className="header-sub-title text-right" style={{ width: "40%" }}>
          {counterpart.translate("exchange.total_bidask")}
          (<AssetName dataPlace="top" name={baseSymbol} />)
        </span>
      </div>
    );
  }
};

let OrderBookParitalWrapper = class extends React.Component<
  {
    orders;
    type;
    countOfRow;
    base;
    quote;
    digits;
    depthType;
    onOrderClick;
    currentAccount;
    total?;
    max?;
    displayType;
  },
  any
> {
  render() {
    let {
      orders,
      displayType,
      type,
      countOfRow,
      base,
      quote,
      onOrderClick,
      currentAccount,
      depthType,
      total,
      digits,
      max
    } = this.props;
    let toDispalyOrders = type === OrderType.Ask ? orders.reverse() : orders;
    return toDispalyOrders.map((order, index) => {
      let previousOne;
      if (type === OrderType.Ask) {
        previousOne =
          index < toDispalyOrders.length - 1
            ? toDispalyOrders[index + 1]
            : null;
      } else {
        previousOne = index > 0 ? toDispalyOrders[index - 1] : null;
      }
      let previous = previousOne ? previousOne.getPrice() : null;

      return order === null ? (
        <OrderBookRowEmpty key={"$nullOrder" + index} />
      ) : (
        <OrderBookRowVertical
          index={index}
          key={order.getPrice() + (order.isCall() ? "_call" : "")}
          order={order}
          onClick={onOrderClick.bind(
            this,
            order,
            order.getPrice(order.sell_price, digits)
          )}
          digits={digits}
          withYuan
          base={base}
          quote={quote}
          final={index === 0}
          depthType={depthType}
          max={max}
          total={total}
          currentAccount={currentAccount}
          previous={previous}
        />
      );
    });
  }
};
declare namespace OrderBook {
  type Props = {
    latest: {
      dec: "77";
      full: 210.76999999999998;
      int: "210";
      pays: "790.387500";
      receives: "3.750000";
      time: "2018/11 14:01:27Z";
      trailing: "000000";
    };
    marketReady: boolean;
    [other: string]: any;
  };
}

const getMaxDigits = latest => {
  let latestPrice = (latest && latest.full) || 0.0;
  let pre =
    Number.parseFloat(latestPrice)
      .toPrecision(5)
      .split(".")[1] || "";
  let digitsLength = pre.length;

  return {
    maxDigit: Math.max(1, Math.min(8, digitsLength)),
    tooSmall: pre.startsWith("0000")
  };
};

let OrderBook = class extends React.Component<OrderBook.Props, any> {
  marketPair: string;
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
    const { maxDigit, tooSmall } = getMaxDigits(props.latest);
    this.state = {
      scrollToBottom: true,
      flip: props.flipOrderBook,
      showAllBids: true,
      showAllAsks: true,
      rowCount: 20,
      tooSmall,
      digits: tooSmall ? maxDigit : maxDigit - 2,
      maxDigits: maxDigit,
      // digits: props.base.get("precision", 8),
      depthType: DepthType.Interval,
      type: OrderType.All
    };
    RteActions.addMarketListener(`${props.quoteSymbol}${props.baseSymbol}`);
  }

  static getDerivedStateFromProps(props: OrderBook.Props, state) {
    let lastMaxDigits = state.maxDigits;
    let lastTooSmall = state.tooSmall;
    let { maxDigit, tooSmall } = getMaxDigits(props.latest);
    let newMaxDigits = Math.min(maxDigit + 2, 8);
    let newState: any = {
      // digits: state.digits,
      tooSmall,
      maxDigits: newMaxDigits
    };
    if (
      state.digits > newMaxDigits ||
      newMaxDigits != lastMaxDigits ||
      tooSmall !== lastTooSmall
    ) {
      newState.digits = tooSmall ? newMaxDigits : newMaxDigits - 2;
    }
    return newState;
  }

  shouldComponentUpdate(props: OrderBook.Props) {
    return props.marketReady;
  }

  setType = type => {
    this.setState({
      type
    });
    this.fixPos();
  };

  setDepthType = depthType => {
    this.setState({
      depthType
    });
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

  componentDidUpdate(prevProps: OrderBook.Props) {
    let newMarket = `${this.props.quoteSymbol}${this.props.baseSymbol}`;
    if (this.marketPair !== newMarket) {
      RteActions.removeMarketListener(this.marketPair);
      this.marketPair = newMarket;
      RteActions.addMarketListener(this.marketPair);
    }
  }

  componentDidMount() {
    this.fixPos();
  }

  componentDidCatch() {
    return <h1>Opps</h1>;
  }

  onDepthChange = ({ value: digits }) => {
    this.setState({
      digits
    });
  };

  onDepthTypeChange = {};

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
      rteTicker,
      rteDepth,
      latest
    } = this.props;
    let {
      showAllAsks,
      showAllBids,
      rowCount,
      type,
      digits,
      maxDigits,
      depthType
    } = this.state;
    // let countOfRow = 16;
    let countOfRow = document.getElementById("orderBook")
      ? Math.floor(
          (document.getElementById("orderBook").offsetHeight / priceRowHeight -
            3) /
            2
        )
      : 24;
    if (!base || !quote) {
      return null;
    }
    let useRte =
      (baseSymbol === "JADE.USDT" && quoteSymbol === "JADE.ETH") ||
      (baseSymbol === "JADE.USDT" && quoteSymbol === "JADE.EOS");
    let usingRte = useRte && rteDepth.bids;
    let [limitBids, limitAsks] =
      useRte && rteDepth.bids
        ? [rteDepth.bids, rteDepth.asks].map((orders: RteOrder[], isNotBid) =>
            orders
              // .slice(0, 1)
              .map(order =>
                LimitOrder.fromRteOrder(order, base, quote, !isNotBid)
              )
          )
        : [combinedBids, combinedAsks];
    let [bidRows, askRows] = [limitBids, limitAsks].map(
      (orders: LimitOrder[]) =>
        Array.from(
          orders
            .reduce((orderSet: Map<string, LimitOrder>, order) => {
              let orderPrice = order.getPrice(order.sell_price, digits);
              let oriOrder = orderSet[orderPrice];
              if (!orderSet.has(orderPrice)) {
                orderSet.set(orderPrice, order);
              } else {
                let newOrder = orderSet.get(orderPrice).sum(order);
                orderSet.set(orderPrice, newOrder);
              }
              return orderSet;
            }, new Map<string, LimitOrder>())
            .values()
        )
    );

    Array.prototype["lastOne"] = function() {
      if (this.length) {
        return this.filter(a => a).slice(-1)[0];
      } else {
        return null;
      }
    };

    askRows =
      OrderType.Ask === type
        ? fixArray(
            askRows,
            askRows.length < countOfRow * 2,
            countOfRow * 2,
            null
          )
        : fixArray(askRows, true, countOfRow, null);

    bidRows =
      OrderType.Bid === type
        ? fixArray(
            bidRows,
            bidRows.length < countOfRow * 2,
            countOfRow * 2,
            null
          )
        : fixArray(bidRows, true, countOfRow, null);
    // For accumulate depth
    let accum = 0;
    let maxBid = 0;
    let maxAsk = 0;
    // bidRows.filter(b => b).forEach(order => {
    //   maxBid = Math.max(maxBid, order.amount);
    //   order.isBid = true;
    //   accum += order.amount;
    //   order.accum = accum;
    // });
    // accum = 0;
    // askRows.filter(a => a).forEach(order => {
    //   maxAsk = Math.max(maxAsk, order.amount);
    //   accum += order.amount;
    //   order.accum = accum;
    // });
    bidRows
      .filter(b => b)
      .forEach(order => {
        let amount = order.isBid()
          ? order.amountToReceive().amount
          : order.amountForSale().amount;
        maxBid = Math.max(maxBid, amount);
        accum += amount;
        order["accum"] = accum;
      });
    accum = 0;
    askRows
      .filter(a => a)
      .forEach(order => {
        let amount = order.isBid()
          ? order.amountToReceive().amount
          : order.amountForSale().amount;
        maxAsk = Math.max(maxAsk, amount);
        accum += amount;
        order["accum"] = accum;
      });
    let total = Math.max(
      ((bidRows as any).lastOne() && (bidRows as any).lastOne().accum) || 0,
      ((askRows as any).lastOne() && (askRows as any).lastOne().accum) || 0
    );

    let priceRow = (
      <div
        style={
          [
            rowHeight,
            { backgroundColor: Colors.$colorAnchor, margin: "0 -0.5rem" }
          ] as any
        }
        className="text-center"
      >
        <PriceStat
          ready={marketReady}
          price={
            (useRte && rteTicker && rteTicker.px) ||
            (latest && latest.full) ||
            {}
          }
          quote={quote}
          withYuan
          base={base}
          hideQuote={true}
        />
      </div>
    );

    return [
      <div className="order-book-title" style={headerStyles}>
        <OrderBookHeader
          type={this.state.type}
          onTypeChange={this.setType}
          maxDigits={maxDigits}
          digits={digits}
          depthType={this.state.depthType}
          onDepthTypeChange={this.setDepthType}
          // basePrecision={base.get("precision")}
          onDepthChange={this.onDepthChange}
        />
      </div>,
      <div className="order-book-wrapper" style={headerUnderStyle}>
        <OrderBookTableHeader
          baseSymbol={base.get("symbol")}
          quoteSymbol={quote.get("symbol")}
        />
        <div className="order-book-body _scroll-bar" style={[bodyStyle] as any}>
          <div
            ref={askWrapper => (this.askWrapper = askWrapper)}
            className="ask-wrapper"
            style={
              [
                wrapperStyle.base,
                type === OrderType.All && wrapperStyle.expand,
                type === OrderType.Ask && wrapperStyle.scroll,
                type === OrderType.Bid && wrapperStyle.hidden
                // {
                //   flexFlow: "column-reverse"
                // }
              ] as any
            }
          >
            <OrderBookParitalWrapper
              displayType={this.state.type}
              type={OrderType.Ask}
              currentAccount={this.props.currentAccount}
              countOfRow={countOfRow}
              total={total}
              digits={digits}
              base={base}
              quote={quote}
              orders={askRows}
              max={maxAsk}
              depthType={depthType}
              onOrderClick={this.props.onClick.bind(this)}
            />
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
            <OrderBookParitalWrapper
              displayType={this.state.type}
              type={OrderType.Bid}
              currentAccount={this.props.currentAccount}
              countOfRow={countOfRow}
              digits={digits}
              base={base}
              total={total}
              quote={quote}
              depthType={depthType}
              max={maxBid}
              orders={bidRows}
              onOrderClick={this.props.onClick.bind(this)}
            />
          </div>
        </div>
      </div>
    ];
  }
};

const OrderBookStyles = {
  tab: {
    marginRight: "0.5rem",
    lineHeight: priceRowHeight + "px",
    height: priceRowHeight + "px"
  }
};
OrderBook = Radium(OrderBook);
OrderBook = connect(
  OrderBook,
  {
    listenTo: () => {
      return [RteStore];
    },
    getProps: props => {
      return {
        rteDepth: RteStore.getState()["depth"].get(
          `${props.quoteSymbol}${props.baseSymbol}`,
          {}
        ),
        rteTicker: RteStore.getState()["ticker"].get(
          `${props.quoteSymbol}${props.baseSymbol}`,
          {}
        )
      };
    }
  }
);

export default OrderBook;
