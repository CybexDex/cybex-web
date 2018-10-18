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
    public isBid: boolean
  ) {}

  sum(another: Order) {
    return new Order(
      this.price,
      this.value + another.value,
      this.amount + another.amount,
      this.isBid
    );
  }
}
type RteOrderPrice = string;
type RteOrderAmount = string;
type RteOrder = [RteOrderPrice, RteOrderAmount];

const convertLimitToOrder: (order: LimitOrder, digits: number) => Order = (
  order,
  digits
) => {
  let price = order.getPrice(order.sell_price, digits);
  let isBid = order.isBid();
  let value = order[isBid ? "amountForSale" : "amountToReceive"]().getAmount({
    real: true
  });
  let amount = order[isBid ? "amountToReceive" : "amountForSale"]().getAmount({
    real: true
  });
  return new Order(price, value, amount, isBid);
};

const convertRteOrderToNormal: (order: RteOrder, digits: number) => Order = (
  order,
  digits
) => {
  let price = parseFloat(order[0]);
  let amount = parseFloat(order[1]);
  let value = price * amount;
  return new Order(parseFloat(price.toFixed(digits)), value, amount, false);
};

let OrderBookRowVertical = class extends React.Component<
  {
    index?;
    currentAccount;
    order: {
      isBid?;
      price: number;
      amount: number;
      value: number;
      accum: number;
    };
    quote;
    base;
    final;
    digits;
    depthType?;
    onClick?;
    total;
    max?;
    isBid?;
    withYuan?;
    unitYuan?;
  },
  any
> {
  static defaultProps = {
    depthType: DepthType.Interval
  };

  shouldComponentUpdate(np) {
    // if (np.order.market_base !== this.props.order.market_base) return false;
    return (
      // np.order.ne(this.props.order) ||
      np.index !== this.props.index ||
      np.digits !== this.props.digits ||
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
      max
    } = this.props;
    let { isBid } = order;
    let priceText = (
      <PriceText
        price={order.price}
        quote={quote}
        base={base}
        precision={digits}
      />
    );
    let yuanPrice = withYuan
      ? parseFloat((unitYuan * order.price).toFixed(digits - 3))
      : NaN;
    let bgWidth =
      (order
        ? depthType === DepthType.Interval
          ? ((order.amount / max) as any).toFixed(4) * 100
          : ((order.accum / total).toFixed(4) as any) * 100
        : 0) + "%";
    return (
      <div
        onClick={this.props.onClick}
        className={classnames(
          "link",
          "order-row"
          // { "final-row": final },
          // { "my-order": order.isMine(this.props.currentAccount) }
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
          {priceText}
        </span>
        <span className="text-right" style={cellStyle("30%")}>
          {utils.format_number(order.amount, quote.get("precision"))}
        </span>
        <span className="text-right" style={cellStyle("40%")}>
          {utils.format_number(order.value, base.get("precision"))}
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

const PRECISION_SIZE = 4;
let OrderBookHeader = class extends React.PureComponent<
  {
    type;
    depthType;
    onDepthTypeChange?;
    onTypeChange?;
    basePrecision?;
    onDepthChange;
  },
  any
> {
  combineOptions = [];
  constructor(props) {
    super(props);
    let availablePrecision = Math.max(props.basePrecision, PRECISION_SIZE);

    let combineOptions = (this.combineOptions = new Array(PRECISION_SIZE)
      .fill(1)
      .map((v, i) => ({
        label: counterpart.translate("exchange.depth", {
          depth: availablePrecision - i
        }),
        value: availablePrecision - i
      })));
    this.state = {
      depth: combineOptions[0]
    };
  }

  handleDepthChange = depth => {
    this.setState({ depth });
    let { onDepthChange } = this.props;
    if (onDepthChange) {
      onDepthChange(depth);
    }
  };

  render() {
    let {
      type,
      depthType,
      onTypeChange,
      onDepthTypeChange,
      onDepthChange,
      basePrecision = 8
    } = this.props;
    return [
      <TabLink
        key="orderType-all"
        active={type === OrderType.All}
        onClick={onTypeChange.bind(this, OrderType.All)}
        style={OrderBookStyles.tab}
      >
        <Translate content="exchange.orderbook.all" />
      </TabLink>,
      <TabLink
        key="orderType-ask"
        active={type === OrderType.Ask}
        onClick={onTypeChange.bind(this, OrderType.Ask)}
        style={OrderBookStyles.tab}
      >
        <Translate content="exchange.orderbook.ask" />
      </TabLink>,
      <TabLink
        key="orderType-bid"
        active={type === OrderType.Bid}
        onClick={onTypeChange.bind(this, OrderType.Bid)}
        style={OrderBookStyles.tab}
      >
        <Translate content="exchange.orderbook.bid" />
      </TabLink>,
      <i key="orderType-divider" style={{ flexGrow: 1 }} />,
      <TabLink
        key="depthType-interval"
        type="secondary"
        active={depthType === DepthType.Interval}
        onClick={onDepthTypeChange.bind(this, DepthType.Interval)}
        style={OrderBookStyles.tab}
      >
        <Translate content="exchange.orderbook.compare_depth" />
      </TabLink>,
      <TabLink
        key="depthType-accum"
        type="secondary"
        active={depthType === DepthType.Accum}
        onClick={onDepthTypeChange.bind(this, DepthType.Accum)}
        style={OrderBookStyles.tab}
      >
        <Translate content="exchange.orderbook.accum_depth" />
      </TabLink>,
      <i key="depthType-divider" style={{ flexGrow: 1 }} />,
      <Select
        key="depthType-switcher"
        onChange={this.handleDepthChange}
        styles={$styleSelect("orderbook")}
        options={this.combineOptions}
        value={this.state.depth}
      />
    ];
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
      return order === null ? (
        <OrderBookRowEmpty key={"$nullOrder" + index} />
      ) : (
        <OrderBookRowVertical
          index={index}
          key={order.price}
          order={order}
          onClick={onOrderClick.bind(this, order)}
          digits={digits}
          withYuan
          base={base}
          quote={quote}
          final={index === 0}
          depthType={depthType}
          max={max}
          total={total}
          currentAccount={currentAccount}
        />
      );
    });
  }
};

let OrderBook = class extends React.Component<any, any> {
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
    this.state = {
      scrollToBottom: true,
      flip: props.flipOrderBook,
      showAllBids: true,
      showAllAsks: true,
      rowCount: 20,
      digits: 8,
      // digits: props.base.get("precision", 8),
      depthType: DepthType.Interval,
      type: OrderType.All
    };
    RteActions.addMarketListener(`${props.quoteSymbol}${props.baseSymbol}`);
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

  componentDidUpdate(prevProps) {
    if (
      prevProps.baseSymbol !== this.props.baseSymbol ||
      prevProps.quoteSymbol !== this.props.quoteSymbol
    ) {
      RteActions.removeMarketListener(
        `${prevProps.quoteSymbol}${prevProps.baseSymbol}`
      );
      RteActions.addMarketListener(
        `${this.props.quoteSymbol}${this.props.baseSymbol}`
      );
    }
    // this.fixPos();
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
    let useRte = true;
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
    let [limitBids, limitAsks] =
      useRte && rteDepth.bids
        ? [rteDepth.bids, rteDepth.asks].map((orders: RteOrder[]) =>
            orders.map(order => convertRteOrderToNormal(order, digits))
          )
        : [combinedBids, combinedAsks].map((orders: LimitOrder[]) =>
            orders.map(order => convertLimitToOrder(order, digits))
          );
    // let [bids, asks] = rteDepth;
    let [bidRows, askRows] = [limitBids, limitAsks].map((orders: Order[]) =>
      Array.from(
        orders
          .reduce((orderSet: Map<number, Order>, order) => {
            if (!orderSet.has(order.price)) {
              orderSet.set(order.price, order);
            } else {
              let newOrder = orderSet.get(order.price).sum(order);
              orderSet.set(order.price, newOrder);
            }
            return orderSet;
          }, new Map<number, Order>())
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
    bidRows.filter(b => b).forEach(order => {
      maxBid = Math.max(maxBid, order.amount);
      order.isBid = true;
      accum += order.amount;
      order.accum = accum;
    });
    accum = 0;
    askRows.filter(a => a).forEach(order => {
      maxAsk = Math.max(maxAsk, order.amount);
      accum += order.amount;
      order.accum = accum;
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
          price={(rteTicker && rteTicker.px) || (latest && latest.full) || {}}
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
          basePrecision={8}
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
