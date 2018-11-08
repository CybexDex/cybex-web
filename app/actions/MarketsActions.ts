import alt from "alt-instance";
import WalletApi from "api/WalletApi";
import WalletDb from "stores/WalletDb";
import { ChainStore } from "cybexjs";
import { Apis } from "cybexjs-ws";
import marketUtils from "common/market_utils";
import accountUtils from "common/account_utils";
import * as Immutable from "immutable";
import { TradeHistoryActions } from "./TradeHistoryActions";
import { TradeHistoryStore } from "stores/TradeHistoryStore";
import { MarketHistoryActions } from "./MarketHistoryActions";
import { MarketHistoryStore } from "stores/MarketHistoryStore";
declare const __DEV__;

let subs = {};
let currentBucketSize;
let marketStats = {};
let statTTL = 4 * 1000; // 2 minutes
// let statTTL = 60 * 2 * 1000; // 2 minutes

let cancelBatchIDs: any = Immutable.List();
let dispatchCancelTimeout = null;
let cancelBatchTime = 500;

let subBatchResults: any = Immutable.List();
let dispatchSubTimeout = null;
let subBatchTime = 500;

function clearBatchTimeouts() {
  clearTimeout(dispatchCancelTimeout);
  clearTimeout(dispatchSubTimeout);
  dispatchCancelTimeout = null;
  dispatchSubTimeout = null;
}

class MarketsActions {
  changeBase(market) {
    clearBatchTimeouts();
    return market;
  }

  changeBucketSize(size) {
    return size;
  }

  getMarketStats(base, quote) {
    return dispatch => {
      let market = quote.get("id") + "_" + base.get("id");
      let marketName = quote.get("symbol") + "_" + base.get("symbol");
      let now = new Date();
      let endDate = new Date();
      let startDateShort = new Date();
      endDate.setDate(endDate.getDate() + 1);
      startDateShort = new Date(startDateShort.getTime() - 3600 * 50 * 1000);

      let refresh = false;

      if (marketStats[market]) {
        if ((now as any) - marketStats[market].lastFetched < statTTL) {
          return false;
        } else {
          refresh = true;
        }
      }

      if (!marketStats[market] || refresh) {
        marketStats[market] = {
          lastFetched: new Date()
        };
        Apis.instance()
          .db_api()
          .exec("get_ticker", [base.get("id"), quote.get("id")])
          .then(result => {
            dispatch({
              market: marketName,
              base,
              quote,
              latest: result
            });
          });
      }
    };
  }

  switchMarket() {
    return true;
  }

  subscribeMarket(base, quote, bucketSize) {
    clearBatchTimeouts();
    let subID = quote.get("id") + "_" + base.get("id");

    let { isMarketAsset, marketAsset, inverted } = marketUtils.isMarketAsset(
      quote,
      base
    );

    const bucketCount = 200;
    // let lastLimitOrder = null;
    return dispatch => {
      let subscription = subResult => {
        /* In the case of many market notifications arriving at the same time,
                * we queue them in a batch here and dispatch them all at once at a frequency
                * defined by "subBatchTime"
                */
        if (!dispatchSubTimeout) {
          subBatchResults = subBatchResults.concat(subResult);

          dispatchSubTimeout = setTimeout(() => {
            let hasLimitOrder = false;
            let onlyLimitOrder = true;
            let hasFill = false;

            // // We get two notifications for each limit order created, ignore the second one
            // if (subResult.length === 1 && subResult[0].length === 1 && subResult[0][0] === lastLimitOrder) {
            //     return;
            // }

            // Check whether the market had a fill order, and whether it only has a new limit order
            subBatchResults.forEach(result => {
              result.forEach(notification => {
                if (typeof notification === "string") {
                  let split = notification.split(".");
                  if (split.length >= 2 && split[1] === "7") {
                    hasLimitOrder = true;
                  } else {
                    onlyLimitOrder = false;
                  }
                } else {
                  onlyLimitOrder = false;
                  if (
                    notification.length === 2 &&
                    notification[0] &&
                    notification[0][0] === 4
                  ) {
                    hasFill = true;
                  }
                }
              });
            });
            if (hasFill) {
              TradeHistoryActions.patchTradeHistory(
                quote,
                base,
                TradeHistoryStore.getState()[
                  `${quote.get("symbol")}${base.get("symbol")}`
                ]
              );
            }
            MarketHistoryActions.patchMarketHistory(
              quote,
              base,
              bucketSize,
              MarketHistoryStore.getState()[
                `${quote.get("symbol")}${base.get("symbol")}${bucketSize}`
              ]
            );
            let callPromise = null,
              settlePromise = null;

            // Only check for call and settle orders if either the base or quote is the CORE asset
            if (isMarketAsset) {
              callPromise = Apis.instance()
                .db_api()
                .exec("get_call_orders", [marketAsset.id, 300]);
              settlePromise = Apis.instance()
                .db_api()
                .exec("get_settle_orders", [marketAsset.id, 300]);
            }

            let startDate = new Date();
            let startDate2 = new Date();
            let startDate3 = new Date();
            let endDate = new Date();
            let startDateShort = new Date();
            startDate = new Date(
              startDate.getTime() - bucketSize * bucketCount * 1000
            );
            startDate2 = new Date(
              startDate2.getTime() - bucketSize * bucketCount * 2000
            );
            startDate3 = new Date(
              startDate3.getTime() - bucketSize * bucketCount * 3000
            );
            endDate.setDate(endDate.getDate() + 1);
            startDateShort = new Date(
              startDateShort.getTime() - 3600 * 50 * 1000
            );

            subBatchResults = subBatchResults.clear();
            dispatchSubTimeout = null;
            // Selectively call the different market api calls depending on the type
            // of operations received in the subscription update
            Promise.all([
              Apis.instance()
                .db_api()
                .exec("get_limit_orders", [
                  base.get("id"),
                  quote.get("id"),
                  300
                ]), // Limits
              onlyLimitOrder ? null : callPromise, // Calls
              onlyLimitOrder ? null : settlePromise, // Settles
              !hasFill //[3] Price
                ? null
                : Apis.instance()
                    .history_api()
                    .exec("get_market_history", [
                      base.get("id"),
                      quote.get("id"),
                      bucketSize,
                      startDate.toISOString().slice(0, -5),
                      endDate.toISOString().slice(0, -5)
                    ]),
              !hasFill // [4]Filled History
                ? null
                : Apis.instance()
                    .history_api()
                    .exec("get_fill_order_history", [
                      base.get("id"),
                      quote.get("id"),
                      200
                    ]),
              !hasFill
                ? null
                : Apis.instance()
                    .history_api()
                    .exec("get_market_history", [
                      base.get("id"),
                      quote.get("id"),
                      3600,
                      startDateShort.toISOString().slice(0, -5),
                      endDate.toISOString().slice(0, -5)
                    ]),
              !hasFill
                ? null
                : Apis.instance()
                    .history_api()
                    .exec("get_market_history", [
                      base.get("id"),
                      quote.get("id"),
                      bucketSize,
                      startDate2.toISOString().slice(0, -5),
                      startDate.toISOString().slice(0, -5)
                    ]),
              !hasFill
                ? null
                : Apis.instance()
                    .history_api()
                    .exec("get_market_history", [
                      base.get("id"),
                      quote.get("id"),
                      bucketSize,
                      startDate3.toISOString().slice(0, -5),
                      startDate2.toISOString().slice(0, -5)
                    ])
            ])
              .then(results => {
                // Todo
                const data1 = results[6] || [];
                const data2 = results[7] || [];
                dispatch({
                  limits: results[0],
                  calls: !onlyLimitOrder && results[1],
                  settles: !onlyLimitOrder && results[2],
                  price: hasFill && data1.concat(data2.concat(results[3])),
                  history: hasFill && results[4],
                  recent: hasFill && results[5],
                  market: subID,
                  base: base,
                  quote: quote,
                  inverted: inverted
                });
              })
              .catch(error => {
                console.log("Error in MarketsActions.subscribeMarket: ", error);
              });
          }, subBatchTime);
        } else {
          subBatchResults = subBatchResults.concat(subResult);
        }
      };

      if (!subs[subID] || currentBucketSize !== bucketSize) {
        dispatch({ switchMarket: true });
        currentBucketSize = bucketSize;
        let callPromise = null,
          settlePromise = null;

        if (isMarketAsset) {
          callPromise = Apis.instance()
            .db_api()
            .exec("get_call_orders", [marketAsset.id, 300]);
          settlePromise = Apis.instance()
            .db_api()
            .exec("get_settle_orders", [marketAsset.id, 300]);
        }

        let startDate = new Date();
        let startDate2 = new Date();
        let startDate3 = new Date();
        let endDate = new Date();
        let startDateShort = new Date();
        startDate = new Date(
          startDate.getTime() - bucketSize * bucketCount * 1000
        );
        startDate2 = new Date(
          startDate2.getTime() - bucketSize * bucketCount * 2000
        );
        startDate3 = new Date(
          startDate3.getTime() - bucketSize * bucketCount * 3000
        );
        startDateShort = new Date(startDateShort.getTime() - 3600 * 50 * 1000);
        endDate.setDate(endDate.getDate() + 1);
        if (__DEV__) console.time("Fetch market data");
        MarketHistoryActions.patchMarketHistory(
          quote,
          base,
          bucketSize,
          MarketHistoryStore.getState()[
            `${quote.get("symbol")}${base.get("symbol")}${bucketSize}`
          ]
        );
        return Promise.all([
          Apis.instance()
            .db_api()
            .exec("subscribe_to_market", [
              subscription,
              base.get("id"),
              quote.get("id")
            ]),
          Apis.instance()
            .db_api()
            .exec("get_limit_orders", [base.get("id"), quote.get("id"), 300]),
          callPromise,
          settlePromise,
          Apis.instance()
            .history_api()
            .exec("get_market_history", [
              base.get("id"),
              quote.get("id"),
              bucketSize,
              startDate.toISOString().slice(0, -5),
              endDate.toISOString().slice(0, -5)
            ]),
          Apis.instance()
            .history_api()
            .exec("get_market_history_buckets", []),
          Apis.instance()
            .history_api()
            .exec("get_fill_order_history", [
              base.get("id"),
              quote.get("id"),
              200
            ]),
          Apis.instance()
            .history_api()
            .exec("get_market_history", [
              base.get("id"),
              quote.get("id"),
              3600,
              startDateShort.toISOString().slice(0, -5),
              endDate.toISOString().slice(0, -5)
            ]),
          Apis.instance()
            .history_api()
            .exec("get_market_history", [
              base.get("id"),
              quote.get("id"),
              bucketSize,
              startDate2.toISOString().slice(0, -5),
              startDate.toISOString().slice(0, -5)
            ]),
          Apis.instance()
            .history_api()
            .exec("get_market_history", [
              base.get("id"),
              quote.get("id"),
              bucketSize,
              startDate3.toISOString().slice(0, -5),
              startDate2.toISOString().slice(0, -5)
            ]),
          TradeHistoryActions.patchTradeHistory(
            quote,
            base,
            TradeHistoryStore.getState()[
              `${quote.get("symbol")}${base.get("symbol")}`
            ]
          )
        ])
          .then(results => {
            const data1 = results[9] || [];
            const data2 = results[8] || [];
            subs[subID] = subscription;
            if (__DEV__) console.timeEnd("Fetch market data");
            dispatch({
              limits: results[1],
              calls: results[2],
              settles: results[3],
              price: data1.concat(data2.concat(results[4])),
              buckets: results[5],
              history: results[6],
              recent: results[7],
              market: subID,
              base: base,
              quote: quote,
              inverted: inverted
            });
          })
          .catch(error => {
            console.log("Error in MarketsActions.subscribeMarket: ", error);
          });
      }
      return Promise.resolve(true);
    };
  }

  clearMarket() {
    clearBatchTimeouts();
    return true;
  }

  unSubscribeMarket(quote, base) {
    let subID = quote + "_" + base;
    clearBatchTimeouts();
    return dispatch => {
      if (subs[subID]) {
        return Apis.instance()
          .db_api()
          .exec("unsubscribe_from_market", [subs[subID], quote, base])
          .then(unSubResult => {
            delete subs[subID];
            dispatch({ unSub: true });
          })
          .catch(error => {
            subs[subID] = true;
            console.log("Error in MarketsActions.unSubscribeMarket: ", error);
            dispatch({ unSub: false, market: subID });
          });
      }
      return Promise.resolve(true);
    };
  }

  createLimitOrder(
    account,
    sellAmount,
    sellAsset,
    buyAmount,
    buyAsset,
    expiration,
    isFillOrKill,
    fee_asset_id
  ) {
    var tr = WalletApi.new_transaction();

    let feeAsset = ChainStore.getAsset(fee_asset_id);
    if (
      feeAsset.getIn(["options", "core_exchange_rate", "base", "asset_id"]) ===
        "1.3.0" &&
      feeAsset.getIn(["options", "core_exchange_rate", "quote", "asset_id"]) ===
        "1.3.0"
    ) {
      fee_asset_id = "1.3.0";
    }

    tr.add_type_operation("limit_order_create", {
      fee: {
        amount: 0,
        asset_id: fee_asset_id
      },
      seller: account,
      amount_to_sell: {
        amount: sellAmount,
        asset_id: sellAsset.get("id")
      },
      min_to_receive: {
        amount: buyAmount,
        asset_id: buyAsset.get("id")
      },
      expiration: expiration,
      fill_or_kill: isFillOrKill
    });

    return dispatch => {
      return WalletDb.process_transaction(tr, null, true)
        .then(result => {
          dispatch(true);
          return true;
        })
        .catch(error => {
          console.log("order error:", error);
          dispatch({ error });
          return { error };
        });
    };
  }

  createLimitOrder2(order) {
    var tr = WalletApi.new_transaction();

    // let feeAsset = ChainStore.getAsset(fee_asset_id);
    // if( feeAsset.getIn(["options", "core_exchange_rate", "base", "asset_id"]) === "1.3.0" && feeAsset.getIn(["options", "core_exchange_rate", "quote", "asset_id"]) === "1.3.0" ) {
    //     fee_asset_id = "1.3.0";
    // }

    order.setExpiration();
    order = order.toObject();

    tr.add_type_operation("limit_order_create", order);

    return WalletDb.process_transaction(tr, null, true)
      .then(result => {
        return true;
      })
      .catch(error => {
        console.log("order error:", error);
        return { error };
      });
  }

  createPredictionShort(
    order,
    collateral,
    account,
    sellAmount,
    sellAsset,
    buyAmount,
    collateralAmount,
    buyAsset,
    expiration,
    isFillOrKill,
    fee_asset_id = "1.3.0"
  ) {
    var tr = WalletApi.new_transaction();

    // Set the fee asset to use
    fee_asset_id = accountUtils.getFinalFeeAsset(
      order.seller,
      "call_order_update",
      order.fee.asset_id
    );

    order.setExpiration();

    tr.add_type_operation("call_order_update", {
      fee: {
        amount: 0,
        asset_id: fee_asset_id
      },
      funding_account: order.seller,
      delta_collateral: collateral.toObject(),
      delta_debt: order.amount_for_sale.toObject(),
      expiration: order.getExpiration()
    });

    tr.add_type_operation("limit_order_create", order.toObject());

    return WalletDb.process_transaction(tr, null, true)
      .then(result => {
        return true;
      })
      .catch(error => {
        console.log("order error:", error);
        return { error };
      });
  }

  cancelLimitOrder(accountID, orderID) {
    // Set the fee asset to use
    let fee_asset_id = accountUtils.getFinalFeeAsset(
      accountID,
      "limit_order_cancel"
    );

    var tr = WalletApi.new_transaction();
    tr.add_type_operation("limit_order_cancel", {
      fee: {
        amount: 0,
        asset_id: fee_asset_id
      },
      fee_paying_account: accountID,
      order: orderID
    });
    return WalletDb.process_transaction(tr, null, true).catch(error => {
      console.log("cancel error:", error);
    });
  }

  cancelLimitOrderSuccess(ids) {
    return dispatch => {
      /* In the case of many cancel orders being issued at the same time,
            * we batch them here and dispatch them all at once at a frequency
            * defined by "dispatchCancelTimeout"
            */
      if (!dispatchCancelTimeout) {
        cancelBatchIDs = cancelBatchIDs.concat(ids);
        dispatchCancelTimeout = setTimeout(() => {
          dispatch(cancelBatchIDs.toJS());
          dispatchCancelTimeout = null;
          cancelBatchIDs = cancelBatchIDs.clear();
        }, cancelBatchTime);
      } else {
        cancelBatchIDs = cancelBatchIDs.concat(ids);
      }
    };
  }

  closeCallOrderSuccess(orderID) {
    return orderID;
  }

  callOrderUpdate(order) {
    return order;
  }

  feedUpdate(asset) {
    return asset;
  }

  settleOrderUpdate(asset) {
    return dispatch => {
      Apis.instance()
        .db_api()
        .exec("get_settle_orders", [asset, 100])
        .then(result => {
          dispatch({
            settles: result
          });
        });
    };
  }

  toggleStars() {
    return true;
  }
}

export default alt.createActions(MarketsActions);
