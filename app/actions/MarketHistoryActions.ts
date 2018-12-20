import alt from "alt-instance";
import { string, number } from "prop-types";
import { correctMarketPair, correctMarketPairMap } from "utils/Market";
import { Apis } from "cybexjs-ws";
import utils from "common/utils";
import { EventEmitter } from "events";
import { FetchChain } from "cybexjs";

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

export const MarketHistoryStore = {};

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

const getMarketKey = (quoteSymbol, baseSymbol, interval) =>
  `${quoteSymbol}${baseSymbol}${interval}`;

const getTimeSet = (
  currentHistory: Cybex.SanitizedMarketHistory[] = [],
  interval: number,
  loadLatest = true
) => {
  // 计算合适的接口区间
  // 当没有当前数据时，时间节点为 当前时间 与 当前时间 - 200 * interval * 1000;
  // 当有当前数据时，判断是否为获取最新数据，如果是，时间节点为 当前时间 与 当前数据 的 最新时间，
  //              如不获取最新数据，为 当前数据的最旧时间 与 当前数据的最旧时间 - 200 * interval * 1000;

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
  return {
    newDate,
    oldDate,
    nowDate,
    nowIsoString
  };
};

export const getMarketHistory = async (
  baseAsset,
  quoteAsset,
  interval,
  timeEarlier,
  timeLatest,
  patchEmpty = true
) => {
  type StartTime = Date;
  type EndTime = Date;
  type TimePair = [StartTime, EndTime];
  let maxInterval = 200 * interval * 1000;
  let now = new Date();
  timeLatest = timeLatest > now ? now : timeLatest;
  let timeGroup: TimePair[] = (function() {
    let group: TimePair[] = [];
    let start = new Date(timeEarlier);
    while (true) {
      let stop = new Date(Math.min(start.valueOf() + maxInterval, timeLatest));
      // let stop = new Date(Math.min(start.valueOf() + maxInterval, Date.now()));
      group.push([start, stop]);
      if (stop >= timeLatest) {
        break;
      }
      start = stop;
    }
    return group;
  })();
  return await Promise.all(
    timeGroup.map((timePair: TimePair) => {
      return getMarketHistoryImpl(
        baseAsset,
        quoteAsset,
        interval,
        timePair[0],
        timePair[1],
        patchEmpty
      );
    })
  ).then(res => {
    return res.reduce((prev, next) => prev.concat(next));
  });
};
export const getMarketHistoryImpl = async (
  baseAsset,
  quoteAsset,
  interval,
  timeEarlier,
  timeLatest,
  patchEmpty = true
) => {
  if (!baseAsset || !quoteAsset) return [];
  let loaderCount = 0;
  let history: Cybex.SanitizedMarketHistory[] = [];
  let oldDate = new Date(timeEarlier);
  let newDate = new Date(timeLatest);
  let nowIsoString = new Date().toISOString();
  while (
    !history.length &&
    loaderCount < Math.ceil((86400 * 2) / 200 / interval)
  ) {
    history = (await Apis.instance()
      .history_api()
      .exec("get_market_history", [
        baseAsset.get("id"),
        quoteAsset.get("id"),
        interval,
        oldDate.toISOString().substring(0, nowIsoString.length - 5),
        newDate.toISOString().substring(0, nowIsoString.length - 5)
      ])).map(marketHistorySanitizer(baseAsset, quoteAsset, interval));
    oldDate = new Date(oldDate.getTime() - interval * 1000 * 200);
    loaderCount++;
  }

  history = history
    .map((data, i, historyArray) => {
      let finalDate =
        i !== historyArray.length - 1 ? historyArray[i + 1].date : newDate;
      let suffix = i !== historyArray.length - 1 ? 1 : 0;
      let numToPatch = Math.max(
        0,
        Math.floor(
          ((finalDate as any) - (data.date as any)) / interval / 1000
        ) - 1
      );
      // console.debug(
      //   "Get Market History: Got",
      //   "Now Patch Empty Date",
      //   i,
      //   numToPatch
      // );
      return [
        data,
        ...new Array(numToPatch).fill(1).map((e, i) => {
          let date = new Date(data.date.getTime() + (i + 1) * interval * 1000);
          return {
            date,
            time: date.getTime(),
            open: data.close,
            close: data.close,
            high: data.close,
            low: data.close,
            volume: 0,
            interval,
            base: data.base,
            quote: data.quote
          };
        })
      ];
    })
    .reduce((all, next) => [...all, ...next], [])
    .sort(
      (prev, next) =>
        prev.date > next.date ? -1 : prev.date < next.date ? 1 : 0
    );
  return history;
};

export const supportedResolutions = {
  "15S": 15,
  "1": 60,
  "5": 300,
  "60": 3600,
  "1D": 86400,
  D: 86400
};

export class SubStore extends EventEmitter {
  subCounterMap: { [symbolUID: string]: number } = {};
  timer;
  constructor(public updateInterval = 3000) {
    super();
    this.startTimer();
  }

  static encodeSubSymbol = (quoteId, baseId, interval) =>
    `${quoteId}/${baseId}_${interval}`;
  static decodeSubSymbol = (subStr: string) =>
    subStr
      .split("_")
      .map(
        (market, i) =>
          i === 0 ? market.split("/") : [supportedResolutions[market]]
      )
      .reduce((prev, next) => prev.concat(next));

  startTimer() {
    this.timer = setInterval(() => {
      Object.keys(this.subCounterMap)
        .filter(symbolUID => this.subCounterMap[symbolUID] > 0)
        .forEach(async symbolUID => {
          let [quoteSymbol, baseSymbol, interval] = SubStore.decodeSubSymbol(
            symbolUID
          );
          let [quote, base] = await Promise.all(
            [quoteSymbol, baseSymbol].map(symbol =>
              FetchChain("getAsset", symbol)
            )
          );
          let stop = new Date();
          let start = new Date(stop.valueOf() - parseInt(interval) * 10 * 1000);
          let data = await getMarketHistory(base, quote, interval, start, stop, false);
          this.emit(symbolUID, data);
        });
    }, this.updateInterval);
  }

  stopUpdateTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  addSub(symbolUID: string) {
    if (symbolUID in this.subCounterMap) {
      this.subCounterMap[symbolUID]++;
    } else {
      this.subCounterMap[symbolUID] = 1;
    }
  }
  removeSub(symbolUID: string) {
    if (symbolUID in this.subCounterMap) {
      this.subCounterMap[symbolUID]--;
    }
  }
}

class MarketHistoryActions {
  /**
   *
   *
   * @param {*} assetA
   * @param {*} assetB
   * @param {number} interval
   * @param {} [currentHistory=[]] A trade history array, with descending order on the time
   * @param {boolean} [loadLatest=true]
   * @param {string} [requestID="COMMON"]
   * @memberof MarketHistoryActions
   */
  async patchMarketHistory(
    assetA,
    assetB,
    interval: number,
    historyStore,
    loadLatest = true,
    requestID = "COMMON"
  ) {
    let market = correctMarketPairMap(assetA, assetB);
    let { base, quote } = market;
    let marketKey = getMarketKey(
      quote.get("symbol"),
      base.get("symbol"),
      interval
    );
    let currentHistory = (historyStore.getState()[marketKey] || []).sort(
      (prev, next) =>
        prev.date > next.date ? -1 : prev.date < next.date ? 1 : 0
    );
    let history: Cybex.SanitizedMarketHistory[] = [];
    let loaderCount = 0;
    let { oldDate, newDate, nowIsoString } = getTimeSet(
      currentHistory,
      interval,
      loadLatest
    );
    while (
      (loaderCount === 0 && loadLatest && currentHistory.length) ||
      (!history.length && loaderCount < Math.ceil((86400 * 2) / 200 / interval))
    ) {
      history = (await Apis.instance()
        .history_api()
        .exec("get_market_history", [
          base.get("id"),
          quote.get("id"),
          interval,
          oldDate.toISOString().substring(0, nowIsoString.length - 5),
          newDate.toISOString().substring(0, nowIsoString.length - 5)
        ])).map(marketHistorySanitizer(base, quote, interval));
      oldDate = new Date(oldDate.getTime() - interval * 1000 * 200);
      loaderCount++;
    }
    if (history.length === 0 && currentHistory.length && loadLatest) {
      history.push(currentHistory[0]);
    }
    history = history
      .map((data, i, historyArray) => {
        let finalDate =
          i !== historyArray.length - 1 ? historyArray[i + 1].date : newDate;
        let suffix = i !== historyArray.length - 1 ? 1 : 0;
        let numToPatch = Math.max(
          0,
          Math.floor(
            ((finalDate as any) - (data.date as any)) / interval / 1000
          ) - 1
        );
        // console.debug(
        //   "Get Market History: Got",
        //   "Now Patch Empty Date",
        //   i,
        //   numToPatch
        // );
        return [
          data,
          ...new Array(numToPatch).fill(1).map((e, i) => {
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
              interval,
              base: data.base,
              quote: data.quote
            };
          })
        ];
      })
      .reduce((all, next) => [...all, ...next], [])
      .sort(
        (prev, next) =>
          prev.date > next.date ? -1 : prev.date < next.date ? 1 : 0
      );
    // console.debug("Get Market History: Got: ", history);
    this.onHistoryPatched({
      market: marketKey,
      history,
      loadLatest,
      requestID
    });
  }

  onHistoryPatched({
    market,
    history,
    loadLatest,
    requestID
  }: {
    market: string;
    history: Cybex.SanitizedMarketHistory[];
    loadLatest: boolean;
    requestID;
  }) {
    return { market, history, loadLatest, requestID };
  }
}

const MarketHistoryActionsWrapped: MarketHistoryActions = alt.createActions(
  MarketHistoryActions
);

export { MarketHistoryActionsWrapped as MarketHistoryActions };
export default MarketHistoryActionsWrapped;
