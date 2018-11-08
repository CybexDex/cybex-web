import alt from "alt-instance";
import { string } from "prop-types";
import { correctMarketPair, correctMarketPairMap } from "utils/Market";
import { Apis } from "cybexjs-ws";
import utils from "common/utils";

function findMax(a, b) {
  if (a !== Infinity && b !== Infinity) {
    return Math.max(a, b);
  } else if (a === Infinity) {
    return b;
  } else {
    return a;
  }
}

function findMin(a, b) {
  if (a !== 0 && b !== 0) {
    return Math.min(a, b);
  } else if (a === 0) {
    return b;
  } else {
    return a;
  }
}
const marketHistorySanitizer = (baseAsset, quoteAsset, interval) => (
  current: Cybex.MarketHistory,
  index: number,
  allHistory: Cybex.MarketHistory[]
) => {
  let high, low, open, close, volume;
  if (!/Z$/.test(current.key.open)) {
    current.key.open += "Z";
  }
  let date = new Date(current.key.open);

  if (quoteAsset.get("id") === current.key.quote) {
    high = utils.get_asset_price(
      current.high_base,
      baseAsset,
      current.high_quote,
      quoteAsset
    );
    low = utils.get_asset_price(
      current.low_base,
      baseAsset,
      current.low_quote,
      quoteAsset
    );
    open = utils.get_asset_price(
      current.open_base,
      baseAsset,
      current.open_quote,
      quoteAsset
    );
    close = utils.get_asset_price(
      current.close_base,
      baseAsset,
      current.close_quote,
      quoteAsset
    );
    volume = utils.get_asset_amount(current.quote_volume, quoteAsset);
  } else {
    low = utils.get_asset_price(
      current.high_quote,
      baseAsset,
      current.high_base,
      quoteAsset
    );
    high = utils.get_asset_price(
      current.low_quote,
      baseAsset,
      current.low_base,
      quoteAsset
    );
    open = utils.get_asset_price(
      current.open_quote,
      baseAsset,
      current.open_base,
      quoteAsset
    );
    close = utils.get_asset_price(
      current.close_quote,
      baseAsset,
      current.close_base,
      quoteAsset
    );
    volume = utils.get_asset_amount(current.base_volume, quoteAsset);
  }

  if (low === 0) {
    low = findMin(open, close);
  }

  if (isNaN(high) || high === Infinity) {
    high = findMax(open, close);
  }

  if (close === Infinity || close === 0) {
    close = open;
  }

  if (open === Infinity || open === 0) {
    open = close;
  }

  // if (high > 1.3 * ((open + close) / 2)) {
  //   high = findMax(open, close);
  // }

  // if (low < 0.7 * ((open + close) / 2)) {
  //   low = findMin(open, close);
  // }

  return {
    date,
    open,
    high,
    low,
    close,
    volume,
    interval,
    time: date.getTime(),
    base: baseAsset.get("symbol"),
    quote: quoteAsset.get("symbol")
  };
};

class MarketHistoryActions {
  /**
   *
   * @param {string} assetA
   * @param {string} assetB
   * @param {Cybex.SanitizedMarketHistory[]} currentHistory A trade history array, with descending order on the time
   * @param {boolean} [loadLatest=true]
   * @memberof MarketHistoryActions
   */
  async patchMarketHistory(
    assetA,
    assetB,
    interval: number,
    currentHistory: Cybex.SanitizedMarketHistory[] = [],
    loadLatest = true
  ) {
    console.debug("Get Market History: Current", currentHistory);
    let market = correctMarketPairMap(assetA, assetB);
    let { base, quote } = market;
    // let current = currentHistory.filter(entry => !entry.isBarClosed);
    let nowDate = new Date();
    let nowIsoString = nowDate.toISOString();
    let newDate = currentHistory.length
      ? loadLatest
        ? nowDate
        : currentHistory[currentHistory.length - 1].date
      : nowDate;
    let oldDate = currentHistory.length
      ? loadLatest
        ? currentHistory[0].date
        : currentHistory[currentHistory.length - 1].date
      : nowDate;
    oldDate =
      currentHistory.length && loadLatest
        ? oldDate
        : new Date(oldDate.getTime() - interval * 1000 * 200);
    console.debug("Get Market History: ", [
      base.get("id"),
      quote.get("id"),
      interval,
      oldDate.toISOString().substring(0, nowIsoString.length - 5),
      newDate.toISOString().substring(0, nowIsoString.length - 5)
    ]);
    let history: Cybex.SanitizedMarketHistory[] = (await Apis.instance()
      .history_api()
      .exec("get_market_history", [
        base.get("id"),
        quote.get("id"),
        interval,
        oldDate.toISOString().substring(0, nowIsoString.length - 5),
        newDate.toISOString().substring(0, nowIsoString.length - 5)
      ]))
      .map(marketHistorySanitizer(base, quote, interval))
      .map((data, i, historyArray) => {
        let finalDate =
          i !== historyArray.length - 1
            ? historyArray[i + 1].date
            : currentHistory.length && !loadLatest
              ? currentHistory[currentHistory.length - 1].date
              : new Date();
        let suffix = i !== historyArray.length - 1 ? 1 : 0;
        return [
          data,
          ...new Array(
            Math.floor((finalDate - data.date) / interval / 1000) - suffix
          )
            // return new Array((Math.floor(finalTime - data.time) / interval / 1000) - 1)
            .fill(1)
            .map((e, i) => {
              let date = new Date(
                data.date.getTime() + (i + 1) * interval * 1000
              );
              return {
                date,
                time: date.getTime(),
                open: data.close,
                close: data.close,
                high: data.close,
                low: data.close,
                volume: 0,
                isBarClosed: true,
                isLastBar: false,
                base: data.base,
                quote: data.quote
              };
            })
        ];
        // } else {
        //   return [data];
        // }
      })
      .reduce((all, next) => [...all, ...next], [])
      .sort(
        (prev, next) =>
          prev.time > next.time ? -1 : prev.time < next.time ? 1 : 0
      );
    console.debug("Get Market History: Got: ", history);
    this.onHistoryPatched({
      market: `${market.quote.get("symbol")}${market.base.get(
        "symbol"
      )}${interval}`,
      history,
      loadLatest
    });
  }

  onHistoryPatched({
    market,
    history,
    loadLatest
  }: {
    market: string;
    history: Cybex.SanitizedMarketHistory[];
    loadLatest: boolean;
  }) {
    return { market, history, loadLatest };
  }
}

const MarketHistoryActionsWrapped: MarketHistoryActions = alt.createActions(
  MarketHistoryActions
);

export { MarketHistoryActionsWrapped as MarketHistoryActions };
export default MarketHistoryActionsWrapped;
