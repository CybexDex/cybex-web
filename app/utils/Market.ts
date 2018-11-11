import { Map } from "immutable";
import SettingsStore, {preferredBases} from "stores/SettingsStore";
export type Market = {
  quote: string;
  base: string;
  marketId: string;
  id: string;
};

export type GroupedMarkets = { [market: string]: Market[] };

class MarketPair {
  constructor(public base?, public quote?) {}
}

const correctMarketPair = (symbolOfA?, symbolOfB?) => {
  let indexOfA = preferredBases.indexOf(symbolOfA);
  let indexOfB = preferredBases.indexOf(symbolOfB);
  if (
    (indexOfA > indexOfB && indexOfB > -1) ||
    (indexOfA === -1 && indexOfB !== -1)
  ) {
    return new MarketPair(symbolOfB, symbolOfA);
  } else if (
    (indexOfA < indexOfB && indexOfA > -1) ||
    (indexOfA !== -1 && indexOfB === -1)
  ) {
    return new MarketPair(symbolOfA, symbolOfB);
  }
  return new MarketPair(...[symbolOfA, symbolOfB].sort());
};

const correctMarketPairMap = (
  assetA: Map<string, any>,
  assetB: Map<string, any>
) => {
  let [base, quote] =
    correctMarketPair(assetA.get("symbol"), assetB.get("symbol")).base ===
    assetA.get("symbol")
      ? [assetA, assetB]
      : [assetB, assetA];
  return { base, quote };
};

const getMarketWithId: (quote: string, base: string) => Market = (
  quote,
  base
) => ({
  quote,
  base,
  marketId: `${quote}_${base}`,
  id: `${quote}_${base}`
});

const getMarketFromId: (id: string, separator?: string) => Market = (
  id,
  separator = "_"
) => {
  let afterSplit = id.split(separator)[1];
  return {
    id,
    marketId: id,
    base: afterSplit[1],
    quote: afterSplit[0]
  };
};

const getGroupedMarkets: (markets: Market[]) => GroupedMarkets = markets =>
  markets.reduce(
    (groupedMarkets, nextMarket) =>
      groupedMarkets[nextMarket.base]
        ? {
            ...groupedMarkets,
            [nextMarket.base]: [...groupedMarkets[nextMarket.base], nextMarket]
          }
        : {
            ...groupedMarkets,
            [nextMarket.base]: [nextMarket]
          },
    {}
  );

const getGroupedMarketsFromMap: (
  markets: Map<string, { quote: string; base: string }>
) => GroupedMarkets = markets =>
  getGroupedMarkets(
    markets.toArray().map(map => getMarketWithId(map.quote, map.base))
  );
export {
  correctMarketPair,
  correctMarketPairMap,
  getMarketFromId,
  getMarketWithId,
  getGroupedMarkets,
  getGroupedMarketsFromMap
};
export default {
  correctMarketPair,
  correctMarketPairMap,
  getMarketFromId,
  getMarketWithId,
  getGroupedMarkets,
  getGroupedMarketsFromMap
};
