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

  if (high > 1.3 * ((open + close) / 2)) {
    high = findMax(open, close);
  }

  if (low < 0.7 * ((open + close) / 2)) {
    low = findMin(open, close);
  }

  return {
    date,
    open,
    high,
    low,
    close,
    volume,
    interval,
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
    let market = correctMarketPairMap(assetA, assetB);
    let { base, quote } = market;
    // let current = currentHistory.filter(entry => !entry.isBarClosed);
    let nowTrade: Cybex.SanitizedMarketHistory = {
      date: new Date(),
      open: 0,
      high: 0,
      low: 0,
      close: 0,
      volume: 0,
      base: base.get("symbol"),
      quote: quote.get("symbol"),
      time: new Date().valueOf(),
      isLastBar: false,
      isBarClosed: true
    };
    let earlyTrade: Cybex.SanitizedMarketHistory = {
      date: new Date(Date.now() - 86400 * 1000 * 10000),
      open: 0,
      high: 0,
      low: 0,
      close: 0,
      volume: 0,
      base: base.get("symbol"),
      quote: quote.get("symbol"),
      time: new Date(Date.now() - 86400 * 1000 * 10000).valueOf(),
      isLastBar: false,
      isBarClosed: true
    };
    let currentLatest: Cybex.SanitizedMarketHistory = currentHistory.length
      ? currentHistory[0]
      : earlyTrade;
    let currentOldest: Cybex.SanitizedMarketHistory = currentHistory.length
      ? currentHistory[currentHistory.length - 1]
      : nowTrade;
    let startTime = loadLatest
      ? nowTrade.date.toISOString()
      : currentOldest.date.toISOString();
    let stopTime = loadLatest
      ? currentLatest.date.toISOString()
      : earlyTrade.date.toISOString();
    console.debug("Market Action To Patch: ", [
      base.get("id"),
      quote.get("id"),
      startTime.substring(0, startTime.length - 1),
      stopTime.substring(0, stopTime.length - 1),
      300
    ]);
    let history: Cybex.SanitizedMarketHistory[] = (await Apis.instance()
      .history_api()
      .exec("get_market_history", [
        base.get("id"),
        quote.get("id"),
        interval,
        stopTime.substring(0, stopTime.length - 1),
        startTime.substring(0, startTime.length - 1),
      ])).map(marketHistorySanitizer(base, quote, interval));
    this.onHistoryPatched({
      market: `${market.quote.get("symbol")}${market.base.get(
        "symbol"
      )}${interval}`,
      history
    });
  }

  onHistoryPatched({
    market,
    history
  }: {
    market: string;
    history: Cybex.SanitizedMarketHistory[];
  }) {
    return { market, history };
  }
}

const MarketHistoryActionsWrapped: MarketHistoryActions = alt.createActions(
  MarketHistoryActions
);

export { MarketHistoryActionsWrapped as MarketHistoryActions };
export default MarketHistoryActionsWrapped;
