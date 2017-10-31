import { Map } from "immutable";
export type Market = {
  quote: string;
  base: string;
  marketId: string;
  id: string;
};

export type GroupedMarkets = { [market: string]: Market[] };

const getMarketWithId: (quote: string, base: string) => Market =
  (quote, base) => ({
    quote,
    base,
    marketId: `${quote}_${base}`,
    id: `${quote}_${base}`
  });

const getMarketFromId: (id: string, separator?: string) => Market =
  (id, separator = "_") => {
    let afterSplit = id.split(separator)[1];
    return {
      id,
      marketId: id,
      base: afterSplit[1],
      quote: afterSplit[0]
    };
  };

const getGroupedMarkets: (markets: Market[]) => GroupedMarkets =
  markets =>
    markets.reduce((groupedMarkets, nextMarket) =>
      groupedMarkets[nextMarket.base] ?
        {
          ...groupedMarkets,
          [nextMarket.base]: [
            ...groupedMarkets[nextMarket.base],
            nextMarket
          ]
        } :
        {
          ...groupedMarkets,
          [nextMarket.base]: [nextMarket]
        }, {});

const getGroupedMarketsFromMap:
  (markets: Map<string, { quote: string, base: string }>) => GroupedMarkets =
  markets =>
    getGroupedMarkets(
      markets
        .toArray()
        .map((map) =>
          getMarketWithId(map.quote, map.base)
        )
    );


export default {
  getMarketFromId,
  getMarketWithId,
  getGroupedMarkets,
  getGroupedMarketsFromMap
};