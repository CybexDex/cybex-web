import * as Immutable from "immutable";
import alt from "alt-instance";
import MarketsActions from "actions/MarketsActions";
import market_utils from "common/market_utils";
import ls from "common/localStorage";
import { ChainStore } from "cybexjs";
import utils from "common/utils";
import {
  LimitOrder,
  CallOrder,
  FeedPrice,
  SettleOrder,
  Asset,
  didOrdersChange,
  Price
} from "common/MarketClasses";

// import {
//     SettleOrder
// }
// from "./tcomb_structs";

const nullPrice = {
  getPrice: () => {
    return 0;
  },
  sellPrice: () => {
    return 0;
  }
};

let marketStorage = new ls("__graphene__");

class MarketsStore {
  [props: string]: any;
  constructor() {
    this.markets = Immutable.Map();
    this.asset_symbol_to_id = {};
    this.pendingOrders = Immutable.Map();
    this.marketLimitOrders = Immutable.Map();
    this.marketCallOrders = Immutable.Map();
    this.allCallOrders = [];
    this.feedPrice = null;
    this.marketSettleOrders = Immutable.OrderedSet();
    this.activeMarketHistory = Immutable.OrderedSet();
    this.marketData = {
      bids: [],
      asks: [],
      calls: [],
      combinedBids: [],
      highestBid: nullPrice,
      combinedAsks: [],
      lowestAsk: nullPrice,
      flatBids: [],
      flatAsks: [],
      flatCalls: [],
      flatSettles: []
    };
    this.totals = {
      bid: 0,
      ask: 0,
      call: 0
    };
    this.priceData = [];
    this.volumeData = [];
    this.pendingCreateLimitOrders = [];
    this.activeMarket = null;
    this.quoteAsset = null;
    this.pendingCounter = 0;
    this.buckets = [15, 60, 300, 3600, 86400];
    this.bucketSize = this._getBucketSize();
    this.priceHistory = [];
    this.lowestCallPrice = null;
    this.marketBase = "CYB";
    this.marketStats = Immutable.Map({
      change: 0,
      volumeBase: 0,
      volumeQuote: 0
    });
    this.marketReady = false;

    this.allMarketStats = Immutable.Map();
    this.lowVolumeMarkets = Immutable.Map(
      marketStorage.get("lowVolumeMarkets", {})
    );
    this.onlyStars = marketStorage.get("onlyStars", false);

    this.baseAsset = {
      id: "1.3.0",
      symbol: "CYB",
      precision: 5
    };

    this.coreAsset = {
      id: "1.3.0",
      symbol: "CORE",
      precision: 5
    };

    this.bindListeners({
      onSubscribeMarket: MarketsActions.subscribeMarket,
      onUnSubscribeMarket: MarketsActions.unSubscribeMarket,
      onChangeBase: MarketsActions.changeBase,
      onChangeBucketSize: MarketsActions.changeBucketSize,
      onCancelLimitOrderSuccess: MarketsActions.cancelLimitOrderSuccess,
      onCloseCallOrderSuccess: MarketsActions.closeCallOrderSuccess,
      onCallOrderUpdate: MarketsActions.callOrderUpdate,
      onClearMarket: MarketsActions.clearMarket,
      onGetMarketStats: MarketsActions.getMarketStats,
      onSettleOrderUpdate: MarketsActions.settleOrderUpdate,
      onSwitchMarket: MarketsActions.switchMarket,
      onFeedUpdate: MarketsActions.feedUpdate,
      onToggleStars: MarketsActions.toggleStars
    });

    const supportedResolutions = ["1", "5", "60", "1D", "1W", "1M"];

    this.Datafeed = {
      onReady: cb => {
        console.log("=====onReady running");
        setTimeout(
          () => cb({ supported_resolutions: supportedResolutions }),
          0
        );
      },
      calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
        //optional
        console.log("=====calculateHistoryDepth running");
        // while optional, this makes sure we request 24 hours of minute data at a time
        // CryptoCompare's minute data endpoint will throw an error if we request data beyond 7 days in the past, and return no data
        return resolution < 60
          ? { resolutionBack: "D", intervalBack: "1" }
          : undefined;
      },
      resolveSymbol: (symbolName, onSymbolResolvedCallback) => {
        // expects a symbolInfo object in response
        console.debug("======resolveSymbol running", symbolName);
        // console.log('resolveSymbol:',{symbolName})
        const symbolStub = {
          name: symbolName,
          description: symbolName,
          type: "crypto",
          session: "24x7",
          timezone: "Asia/Shanghai",
          ticker: symbolName,
          exchange: "Cybex",
          minmov: 1,
          // TODO: set this later
          pricescale: 100000000,
          has_intraday: true,
          intraday_multipliers: ["1", "60"],
          supported_resolution: supportedResolutions,
          // TODO: set this later
          volume_precision: 8,
          data_status: "streaming"
        };

        setTimeout(function() {
          onSymbolResolvedCallback(symbolStub);
          console.log("Resolving that symbol....", symbolStub);
        }, 0);
      },

      unsubscribeBars: subscriberUID => {
        console.log("=====unsubscribeBars running");
        // stream.unsubscribeBars(subscriberUID)
      }
    };
  }

  onGetCollateralPositions(payload) {
    this.borrowMarketState = {
      totalDebt: payload.totalDebt,
      totalCollateral: payload.totalCollateral
    };
  }

  _getBucketSize() {
    return parseInt(marketStorage.get("bucketSize", 4 * 3600));
  }

  _setBucketSize(size) {
    this.bucketSize = size;
    marketStorage.set("bucketSize", size);
  }

  onChangeBase(market) {
    this.marketBase = market;
  }

  onChangeBucketSize(size) {
    this._setBucketSize(size);
  }

  onToggleStars() {
    this.onlyStars = !this.onlyStars;
    marketStorage.set("onlyStars", this.onlyStars);
  }

  onUnSubscribeMarket(payload) {
    // Optimistic removal of activeMarket
    if (payload.unSub) {
      this.activeMarket = null;
    } else {
      // Unsub failed, restore activeMarket
      this.activeMarket = payload.market;
    }
  }

  onSwitchMarket() {
    this.marketReady = false;
  }

  onClearMarket() {
    this.activeMarket = null;
    this.is_prediction_market = false;
    this.marketLimitOrders = this.marketLimitOrders.clear();
    this.marketCallOrders = this.marketCallOrders.clear();
    this.allCallOrders = [];
    this.feedPrice = null;
    this.marketSettleOrders = this.marketSettleOrders.clear();
    this.activeMarketHistory = this.activeMarketHistory.clear();
    this.marketData = {
      bids: [],
      asks: [],
      calls: [],
      combinedBids: [],
      highestBid: nullPrice,
      combinedAsks: [],
      lowestAsk: nullPrice,
      flatBids: [],
      flatAsks: [],
      flatCalls: [],
      flatSettles: []
    };
    this.totals = {
      bid: 0,
      ask: 0,
      call: 0
    };
    this.lowestCallPrice = null;
    this.pendingCreateLimitOrders = [];
    this.priceHistory = [];
    this.marketStats = Immutable.Map({
      change: 0,
      volumeBase: 0,
      volumeQuote: 0
    });
  }

  _marketHasCalls() {
    const { quoteAsset, baseAsset } = this;
    if (
      quoteAsset.has("bitasset") &&
      quoteAsset.getIn(["bitasset", "options", "short_backing_asset"]) ===
        baseAsset.get("id")
    ) {
      return true;
    } else if (
      baseAsset.has("bitasset") &&
      baseAsset.getIn(["bitasset", "options", "short_backing_asset"]) ===
        quoteAsset.get("id")
    ) {
      return true;
    }
    return false;
  }

  onSubscribeMarket(result) {
    if (result.switchMarket) {
      this.marketReady = false;
      return this.emitChange();
    }

    let limitsChanged = false,
      callsChanged = false;

    this.invertedCalls = result.inverted;

    // Get updated assets every time for updated feed data
    this.quoteAsset = ChainStore.getAsset(result.quote.get("id"));
    this.baseAsset = ChainStore.getAsset(result.base.get("id"));

    const assets = {
      [this.quoteAsset.get("id")]: {
        precision: this.quoteAsset.get("precision")
      },
      [this.baseAsset.get("id")]: {
        precision: this.baseAsset.get("precision")
      }
    };

    if (result.market && result.market !== this.activeMarket) {
      // console.log("switch active market from", this.activeMarket, "to", result.market);
      this.onClearMarket();
      this.activeMarket = result.market;
    }

    /* Set the feed price (null if not a bitasset market) */
    this.feedPrice = this._getFeed();

    if (result.buckets) {
      this.buckets = result.buckets;
      if (result.buckets.indexOf(this.bucketSize) === -1) {
        this.bucketSize = result.buckets[result.buckets.length - 1];
      }
    }

    if (result.buckets) {
      this.buckets = result.buckets;
    }

    if (result.limits) {
      // Keep an eye on this as the number of orders increases, it might not scale well
      const oldmarketLimitOrders = this.marketLimitOrders;
      this.marketLimitOrders = this.marketLimitOrders.clear();
      // console.time("Create limit orders " + this.activeMarket);
      result.limits.forEach(order => {
        // ChainStore._updateObject(order, false, false);
        if (typeof order.for_sale !== "number") {
          order.for_sale = parseInt(order.for_sale, 10);
        }
        order.expiration = new Date(order.expiration);
        this.marketLimitOrders = this.marketLimitOrders.set(
          order.id,
          new LimitOrder(order, assets, this.quoteAsset.get("id"))
        );
      });

      limitsChanged = didOrdersChange(
        this.marketLimitOrders,
        oldmarketLimitOrders
      );

      // Loop over pending orders to remove temp order from orders map and remove from pending
      for (let i = this.pendingCreateLimitOrders.length - 1; i >= 0; i--) {
        let myOrder = this.pendingCreateLimitOrders[i];
        let order = this.marketLimitOrders.find(order => {
          return (
            myOrder.seller === order.seller &&
            myOrder.expiration === order.expiration
          );
        });

        // If the order was found it has been confirmed, delete it from pending
        if (order) {
          this.pendingCreateLimitOrders.splice(i, 1);
        }
      }

      // console.timeEnd("Create limit orders " + this.activeMarket);

      if (this.pendingCreateLimitOrders.length === 0) {
        this.pendingCounter = 0;
      }

      // console.log("time to process limit orders:", new Date() - limitStart, "ms");
    }

    if (result.calls) {
      const oldmarketCallOrders = this.marketCallOrders;
      this.allCallOrders = result.calls;
      this.marketCallOrders = this.marketCallOrders.clear();

      result.calls.forEach(call => {
        // ChainStore._updateObject(call, false, false);
        try {
          let callOrder = new CallOrder(
            call,
            assets,
            this.quoteAsset.get("id"),
            this.feedPrice,
            this.is_prediction_market
          );
          if (callOrder.isMarginCalled()) {
            this.marketCallOrders = this.marketCallOrders.set(
              call.id,
              callOrder
            );
          }
        } catch (err) {
          console.error(
            "Unable to construct calls array, invalid feed price or prediction market?"
          );
        }
      });

      callsChanged = didOrdersChange(
        this.marketCallOrders,
        oldmarketCallOrders
      );
    }

    this.updateSettleOrders(result);

    if (result.history) {
      this.activeMarketHistory = this.activeMarketHistory.clear();
      result.history.forEach(order => {
        if (!/Z$/.test(order.time)) {
          order.time += "Z";
        }
        order.op.time = order.time;
        /* Only include history objects that aren't 'something for nothing' to avoid confusion */
        if (!(order.op.receives.amount == 0 || order.op.pays.amount == 0)) {
          this.activeMarketHistory = this.activeMarketHistory.add(order.op);
        }
      });
    }

    if (result.fillOrders) {
      result.fillOrders.forEach(fill => {
        // console.log("fill:", fill);
        this.activeMarketHistory = this.activeMarketHistory.add(fill[0][1]);
      });
    }

    if (result.stat) {
      let stats = result.stat;
      console.debug("ResultStat: ", stats);
      this.marketStats = this.marketStats.set("change", stats.percent_change);
      this.marketStats = this.marketStats.set("volumeBase", stats.base_volume);
      this.marketStats = this.marketStats.set("volumeQuote", stats.quote_volume);
      this.marketStats = this.marketStats.set("price", stats.latest);

      if (stats.volumeBase) {
        this.lowVolumeMarkets = this.lowVolumeMarkets.delete(result.market);
      }
    } 

    if (callsChanged || limitsChanged) {
      // Update orderbook
      this._orderBook(limitsChanged, callsChanged);

      // Update depth chart data
      this._depthChart();
    }

    this.marketReady = true;
    this.emitChange();
  }

  onCancelLimitOrderSuccess(cancellations) {
    if (cancellations && cancellations.length) {
      let didUpdate = false;
      cancellations.forEach(orderID => {
        if (orderID && this.marketLimitOrders.has(orderID)) {
          didUpdate = true;
          this.marketLimitOrders = this.marketLimitOrders.delete(orderID);
        }
      });

      if (this.marketLimitOrders.size === 0) {
        this.marketData.bids = [];
        this.marketData.flatBids = [];
        this.marketData.asks = [];
        this.marketData.flatAsks = [];
      }

      if (didUpdate) {
        // Update orderbook
        this._orderBook(true, false);

        // Update depth chart data
        this._depthChart();
      }
    } else {
      return false;
    }
  }

  onCloseCallOrderSuccess(orderID) {
    if (orderID && this.marketCallOrders.has(orderID)) {
      this.marketCallOrders = this.marketCallOrders.delete(orderID);
      if (this.marketCallOrders.size === 0) {
        this.marketData.calls = [];
        this.marketData.flatCalls = [];
      }
      // Update orderbook
      this._orderBook(false, true);

      // Update depth chart data
      this._depthChart();
    } else {
      return false;
    }
  }

  onCallOrderUpdate(call_order) {
    if (call_order && this.quoteAsset && this.baseAsset) {
      if (
        call_order.call_price.quote.asset_id === this.quoteAsset.get("id") ||
        call_order.call_price.quote.asset_id === this.baseAsset.get("id")
      ) {
        const assets = {
          [this.quoteAsset.get("id")]: {
            precision: this.quoteAsset.get("precision")
          },
          [this.baseAsset.get("id")]: {
            precision: this.baseAsset.get("precision")
          }
        };
        try {
          let callOrder = new CallOrder(
            call_order,
            assets,
            this.quoteAsset.get("id"),
            this.feedPrice
          );
          // console.log("**** onCallOrderUpdate **", call_order, "isMarginCalled:", callOrder.isMarginCalled());

          if (callOrder.isMarginCalled()) {
            this.marketCallOrders = this.marketCallOrders.set(
              call_order.id,
              callOrder
            );

            // Update orderbook
            this._orderBook(false, true);

            // Update depth chart data
            this._depthChart();
          }
        } catch (err) {
          console.error(
            "Unable to construct calls array, invalid feed price or prediction market?"
          );
        }
      }
    } else {
      return false;
    }
  }
  //
  onFeedUpdate(asset) {
    if (!this.quoteAsset || !this.baseAsset) {
      return false;
    }
    if (
      asset.get("id") ===
      this[this.invertedCalls ? "baseAsset" : "quoteAsset"].get("id")
    ) {
      this[this.invertedCalls ? "baseAsset" : "quoteAsset"] = asset;
    } else {
      return false;
    }

    let feedChanged = false;
    let newFeed = this._getFeed();
    if (
      (newFeed && !this.feedPrice) ||
      (this.feedPrice && this.feedPrice.ne(newFeed))
    ) {
      feedChanged = true;
    }

    if (feedChanged) {
      this.feedPrice = newFeed;
      const assets = {
        [this.quoteAsset.get("id")]: {
          precision: this.quoteAsset.get("precision")
        },
        [this.baseAsset.get("id")]: {
          precision: this.baseAsset.get("precision")
        }
      };

      /*
             * If the feed price changed, we need to check whether the orders
             * being margin called have changed and filter accordingly. To do so
             * we recreate the marketCallOrders map from scratch using the
             * previously fetched data and the new feed price.
             */
      this.marketCallOrders = this.marketCallOrders.clear();
      this.allCallOrders.forEach(call => {
        // ChainStore._updateObject(call, false, false);
        try {
          let callOrder = new CallOrder(
            call,
            assets,
            this.quoteAsset.get("id"),
            this.feedPrice,
            this.is_prediction_market
          );
          if (callOrder.isMarginCalled()) {
            this.marketCallOrders = this.marketCallOrders.set(
              call.id,
              new CallOrder(
                call,
                assets,
                this.quoteAsset.get("id"),
                this.feedPrice
              )
            );
          }
        } catch (err) {
          console.error(
            "Unable to construct calls array, invalid feed price or prediction market?"
          );
        }
      });

      // this.marketCallOrders = this.marketCallOrders.withMutations(callOrder => {
      //     if (callOrder && callOrder.first()) {
      //         callOrder.first().setFeed(this.feedPrice);
      //     }
      // });

      // this.marketCallOrders = this.marketCallOrders.filter(callOrder => {
      //     if (callOrder) {
      //         return callOrder.isMarginCalled();
      //     } else {
      //         return false;
      //     }
      // });

      // Update orderbook
      this._orderBook(true, true);

      // Update depth chart data
      this._depthChart();
    }
  }

  _getFeed() {
    if (!this._marketHasCalls()) {
      this.bitasset_options = null;
      this.is_prediction_market = false;
      return null;
    }

    const assets = {
      [this.quoteAsset.get("id")]: {
        precision: this.quoteAsset.get("precision")
      },
      [this.baseAsset.get("id")]: {
        precision: this.baseAsset.get("precision")
      }
    };
    let settlePrice = this[
      this.invertedCalls ? "baseAsset" : "quoteAsset"
    ].getIn(["bitasset", "current_feed", "settlement_price"]);

    try {
      let sqr = this[this.invertedCalls ? "baseAsset" : "quoteAsset"].getIn([
        "bitasset",
        "current_feed",
        "maximum_short_squeeze_ratio"
      ]);

      this.is_prediction_market = this[
        this.invertedCalls ? "baseAsset" : "quoteAsset"
      ].getIn(["bitasset", "is_prediction_market"], false);
      this.bitasset_options = this[
        this.invertedCalls ? "baseAsset" : "quoteAsset"
      ]
        .getIn(["bitasset", "options"])
        .toJS();
      /* Prediction markets don't need feeds for shorting, so the settlement price can be set to 1:1 */
      if (
        this.is_prediction_market &&
        settlePrice.getIn(["base", "asset_id"]) ===
          settlePrice.getIn(["quote", "asset_id"])
      ) {
        const backingAsset = this.bitasset_options.short_backing_asset;
        if (!assets[backingAsset])
          assets[backingAsset] = {
            precision: this.quoteAsset.get("precision")
          };
        settlePrice = settlePrice.setIn(["base", "amount"], 1);
        settlePrice = settlePrice.setIn(["base", "asset_id"], backingAsset);
        settlePrice = settlePrice.setIn(["quote", "amount"], 1);
        settlePrice = settlePrice.setIn(
          ["quote", "asset_id"],
          this.quoteAsset.get("id")
        );
        sqr = 1000;
      }
      const feedPrice = new FeedPrice({
        priceObject: settlePrice,
        market_base: this.quoteAsset.get("id"),
        sqr,
        assets
      });

      return feedPrice;
    } catch (err) {
      console.error(
        this.activeMarket,
        "does not have a properly configured feed price"
      );
      return null;
    }
  }

  _orderBook(limitsChanged = true, callsChanged = false) {
    // Loop over limit orders and return array containing bids
    let constructBids = orderArray => {
      let bids = orderArray
        .filter(a => {
          return a.isBid();
        })
        .sort((a, b) => {
          return a.getPrice() - b.getPrice();
        })
        .map(order => {
          return order;
        })
        .toArray();

      // Sum bids at same price
      if (bids.length > 1) {
        for (let i = bids.length - 2; i >= 0; i--) {
          if (bids[i].getPrice() === bids[i + 1].getPrice()) {
            bids[i] = bids[i].sum(bids[i + 1]);
            bids.splice(i + 1, 1);
          }
        }
      }
      return bids;
    };
    // Loop over limit orders and return array containing asks
    let constructAsks = orderArray => {
      let asks = orderArray
        .filter(a => {
          return !a.isBid();
        })
        .sort((a, b) => {
          return a.getPrice() - b.getPrice();
        })
        .map(order => {
          return order;
        })
        .toArray();

      // Sum asks at same price
      if (asks.length > 1) {
        for (let i = asks.length - 2; i >= 0; i--) {
          if (asks[i].getPrice() === asks[i + 1].getPrice()) {
            asks[i] = asks[i].sum(asks[i + 1]);
            asks.splice(i + 1, 1);
          }
        }
      }
      return asks;
    };

    // Assign to store variables
    if (limitsChanged) {
      if (__DEV__) console.time("Construct limit orders " + this.activeMarket);
      this.marketData.bids = constructBids(this.marketLimitOrders);
      this.marketData.asks = constructAsks(this.marketLimitOrders);
      if (!callsChanged) {
        this._combineOrders();
      }
      if (__DEV__)
        console.timeEnd("Construct limit orders " + this.activeMarket);
    }

    if (callsChanged) {
      if (__DEV__) console.time("Construct calls " + this.activeMarket);
      this.marketData.calls = this.constructCalls(this.marketCallOrders);
      this._combineOrders();
      if (__DEV__) console.timeEnd("Construct calls " + this.activeMarket);
    }

    // console.log("time to construct orderbook:", new Date() - orderBookStart, "ms");
  }

  constructCalls(callsArray) {
    let calls = [];
    if (callsArray.size) {
      calls = callsArray
        .sort((a, b) => {
          return a.getPrice() - b.getPrice();
        })
        .map(order => {
          if (this.invertedCalls) {
            this.lowestCallPrice = !this.lowestCallPrice
              ? order.getPrice(false)
              : Math.max(this.lowestCallPrice, order.getPrice(false));
          } else {
            this.lowestCallPrice = !this.lowestCallPrice
              ? order.getPrice(false)
              : Math.min(this.lowestCallPrice, order.getPrice(false));
          }

          return order;
        })
        .toArray();

      // Sum calls at same price
      if (calls.length > 1) {
        for (let i = calls.length - 2; i >= 0; i--) {
          calls[i] = calls[i].sum(calls[i + 1]);
          calls.splice(i + 1, 1);
        }
      }
    } else {
      this.lowestCallPrice = null;
    }
    return calls;
  }

  _combineOrders() {
    const hasCalls = !!this.marketCallOrders.size;
    const isBid = hasCalls && this.marketCallOrders.first().isBid();

    let combinedBids, combinedAsks;

    if (isBid) {
      combinedBids = this.marketData.bids.concat(this.marketData.calls);
      combinedAsks = this.marketData.asks.concat([]);
    } else {
      combinedBids = this.marketData.bids.concat([]);
      combinedAsks = this.marketData.asks.concat(this.marketData.calls);
    }

    let totalToReceive = new Asset({
      asset_id: this.quoteAsset.get("id"),
      precision: this.quoteAsset.get("precision")
    });

    let totalForSale = new Asset({
      asset_id: this.baseAsset.get("id"),
      precision: this.baseAsset.get("precision")
    });
    combinedBids
      .sort((a, b) => {
        return b.getPrice() - a.getPrice();
      })
      .forEach(a => {
        totalToReceive.plus(a.amountToReceive(true));
        totalForSale.plus(a.amountForSale());

        a.setTotalForSale(totalForSale.clone());
        a.setTotalToReceive(totalToReceive.clone());
      });

    totalToReceive = new Asset({
      asset_id: this.baseAsset.get("id"),
      precision: this.baseAsset.get("precision")
    });

    totalForSale = new Asset({
      asset_id: this.quoteAsset.get("id"),
      precision: this.quoteAsset.get("precision")
    });

    combinedAsks
      .sort((a, b) => {
        return a.getPrice() - b.getPrice();
      })
      .forEach(a => {
        totalForSale.plus(a.amountForSale());
        totalToReceive.plus(a.amountToReceive(false));
        a.setTotalForSale(totalForSale.clone());
        a.setTotalToReceive(totalToReceive.clone());
      });

    this.marketData.lowestAsk = !combinedAsks.length
      ? nullPrice
      : combinedAsks[0];

    this.marketData.highestBid = !combinedBids.length
      ? nullPrice
      : combinedBids[0];

    this.marketData.combinedBids = combinedBids;
    this.marketData.combinedAsks = combinedAsks;
  }

  _depthChart() {
    let bids = [],
      asks = [],
      calls = [],
      totalBids = 0,
      totalAsks = 0,
      totalCalls = 0;
    let flat_bids = [],
      flat_asks = [],
      flat_calls = [],
      flat_settles = [];

    if (this.marketLimitOrders.size) {
      this.marketData.bids.forEach(order => {
        bids.push([
          order.getPrice(),
          order.amountToReceive().getAmount({
            real: true
          })
        ]);
        totalBids += order.amountForSale().getAmount({
          real: true
        });
      });

      this.marketData.asks.forEach(order => {
        asks.push([
          order.getPrice(),
          order.amountForSale().getAmount({
            real: true
          })
        ]);
      });

      // Make sure the arrays are sorted properly
      asks.sort((a, b) => {
        return a[0] - b[0];
      });

      bids.sort((a, b) => {
        return a[0] - b[0];
      });

      // Flatten the arrays to get the step plot look
      flat_bids = market_utils.flatten_orderbookchart_highcharts(
        bids,
        true,
        true,
        1000
      );

      if (flat_bids.length) {
        flat_bids.unshift([0, flat_bids[0][1]]);
      }

      flat_asks = market_utils.flatten_orderbookchart_highcharts(
        asks,
        true,
        false,
        1000
      );
      if (flat_asks.length) {
        flat_asks.push([
          flat_asks[flat_asks.length - 1][0] * 1.5,
          flat_asks[flat_asks.length - 1][1]
        ]);
        totalAsks = flat_asks[flat_asks.length - 1][1];
      }
    }

    /* Flatten call orders if there any */
    if (this.marketData.calls.length) {
      let callsAsBids = this.marketData.calls[0].isBid();
      this.marketData.calls.forEach(order => {
        calls.push([
          order.getSqueezePrice(),
          order[
            order.isBid() ? "amountToReceive" : "amountForSale"
          ]().getAmount({
            real: true
          })
        ]);
      });

      // Calculate total value of call orders
      calls.forEach(call => {
        if (this.invertedCalls) {
          totalCalls += call[1];
        } else {
          totalCalls += call[1] * call[0];
        }
      });

      if (callsAsBids) {
        totalBids += totalCalls;
      } else {
        totalAsks += totalCalls;
      }

      // Make sure the array is sorted properly
      calls.sort((a, b) => {
        return a[0] - b[0];
      });

      // Flatten the array to get the step plot look
      if (this.invertedCalls) {
        flat_calls = market_utils.flatten_orderbookchart_highcharts(
          calls,
          true,
          false,
          1000
        );
        if (
          flat_asks.length &&
          flat_calls[flat_calls.length - 1][0] <
            flat_asks[flat_asks.length - 1][0]
        ) {
          flat_calls.push([
            flat_asks[flat_asks.length - 1][0],
            flat_calls[flat_calls.length - 1][1]
          ]);
        }
      } else {
        flat_calls = market_utils.flatten_orderbookchart_highcharts(
          calls,
          true,
          true,
          1000
        );
        if (flat_calls.length > 0) {
          flat_calls.unshift([0, flat_calls[0][1]]);
        }
      }
    }

    /* Flatten settle orders if there are any */
    if (this.marketSettleOrders.size) {
      flat_settles = this.marketSettleOrders.reduce((final, a) => {
        if (!final) {
          return [
            [
              a.getPrice(),
              a[!a.isBid() ? "amountForSale" : "amountToReceive"]().getAmount({
                real: true
              })
            ]
          ];
        } else {
          final[0][1] =
            final[0][1] +
            a[!a.isBid() ? "amountForSale" : "amountToReceive"]().getAmount({
              real: true
            });
          return final;
        }
      }, null);

      if (!this.feedPrice.inverted) {
        flat_settles.unshift([0, flat_settles[0][1]]);
      } else {
        flat_settles.push([
          flat_asks[flat_asks.length - 1][0],
          flat_settles[0][1]
        ]);
      }
    }

    // Assign to store variables
    this.marketData.flatAsks = flat_asks;
    this.marketData.flatBids = flat_bids;
    this.marketData.flatCalls = flat_calls;
    this.marketData.flatSettles = flat_settles;
    this.totals = {
      bid: totalBids,
      ask: totalAsks,
      call: totalCalls
    };
  }

  onGetMarketStats(payload) {
    let price = new Price({
      base: new Asset({
        amount:
          1 *
          payload.latest.latest *
          Math.pow(10, payload.base.get("precision")),
        asset_id: payload.base.get("id"),
        precision: payload.base.get("precision")
      }),
      quote: new Asset({
        amount: 1 * Math.pow(10, payload.quote.get("precision")),
        asset_id: payload.quote.get("id"),
        precision: payload.quote.get("precision")
      })
    });
    if (payload) {
      let stats = {
        close: null,
        // price: payload.latest.latest,
        price,
        change: payload.latest.percent_change,
        volumeBase: parseInt(payload.latest.base_volume),
        volumeQuote: parseInt(payload.latest.quote_volume),
        volumeBaseAsset: new Asset({
          amount: payload.latest.base_volume,
          asset_id: payload.base.get("id"),
          precision: payload.base.get("precision")
        }),
        volumeQuoteAsset: new Asset({
          amount: payload.latest.base_volume,
          asset_id: payload.quote.get("id"),
          precision: payload.quote.get("precision")
        })
      };
      this.allMarketStats = this.allMarketStats.set(payload.market, stats);
    }
  }

  onSettleOrderUpdate(result) {
    this.updateSettleOrders(result);
  }

  updateSettleOrders(result) {
    if (result.settles && result.settles.length) {
      const assets = {
        [this.quoteAsset.get("id")]: {
          precision: this.quoteAsset.get("precision")
        },
        [this.baseAsset.get("id")]: {
          precision: this.baseAsset.get("precision")
        }
      };
      this.marketSettleOrders = this.marketSettleOrders.clear();

      result.settles.forEach(settle => {
        // let key = settle.owner + "_" + settle.balance.asset_id;

        settle.settlement_date = new Date(settle.settlement_date);

        this.marketSettleOrders = this.marketSettleOrders.add(
          new SettleOrder(
            settle,
            assets,
            this.quoteAsset.get("id"),
            this.feedPrice,
            this.bitasset_options
          )
        );
      });
    }
  }
}

export default alt.createStore(MarketsStore, "MarketsStore");
