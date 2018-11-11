import alt from "alt-instance";
import { string } from "prop-types";
import { correctMarketPair, correctMarketPairMap } from "utils/Market";
import { Apis } from "cybexjs-ws";

// Todo Review this class
class TradeHistoryActions {
  /**
   *
   * @param {string} assetA
   * @param {string} assetB
   * @param {Cybex.Trade[]} currentHistory A trade history array, with descending order on the time
   * @param {boolean} [loadLatest=true]
   * @memberof TradeHistoryActions
   */
  async patchTradeHistory(
    assetA,
    assetB,
    currentHistory: Cybex.Trade[] = [],
    loadLatest = true
  ) {
    let market = correctMarketPairMap(assetA, assetB);
    let { base, quote } = market;

    let nowTrade: Cybex.Trade = {
      date: new Date().toISOString(),
      sequence: 0,
      price: "",
      amount: "",
      value: "",
      side1_account_id: "",
      side2_account_id: ""
    };
    let earlyTrade: Cybex.Trade = {
      date: new Date(Date.now() - 86400 * 1000 * 10000).toISOString(),
      sequence: 0,
      price: "",
      amount: "",
      value: "",
      side1_account_id: "",
      side2_account_id: ""
    };
    let currentLatest: Cybex.Trade = currentHistory.length
      ? currentHistory[0]
      : earlyTrade;
    let currentOldest: Cybex.Trade = currentHistory.length
      ? currentHistory[currentHistory.length - 1]
      : nowTrade;
    let startTime = loadLatest ? nowTrade.date : currentOldest.date;
    let stopTime = loadLatest ? currentLatest.date : earlyTrade.date;
    let history: Cybex.Trade[] = await Apis.instance()
      .db_api()
      .exec("get_trade_history", [
        base.get("id"),
        quote.get("id"),
        startTime.substring(0, startTime.length - 1),
        stopTime.substring(0, stopTime.length - 1),
        100
      ]);
    return this.onHistoryPatched({
      market: `${market.quote.get("symbol")}${market.base.get("symbol")}`,
      history
    });
  }

  onHistoryPatched({
    market,
    history
  }: {
    market: string;
    history: Cybex.Trade[];
  }) {
    return { market, history };
  }
}

const TradeHistoryActionsWrapped: TradeHistoryActions = alt.createActions(
  TradeHistoryActions
);

export { TradeHistoryActionsWrapped as TradeHistoryActions };
export default TradeHistoryActionsWrapped;
