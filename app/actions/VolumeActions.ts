import alt from "alt-instance";
import { ChainStore } from "stores/ChainStore";
import { Apis } from "cybexjs-ws";
import { debugGen } from "utils//Utils";
import { correctMarketPair } from "utils/Market";

const debug = debugGen("VolActions");

const isId = str => /[12]\..+\..+/.test(str);

async function getObject(id = "1.1.1") {
  console.log(`Get object ${id}`);
  return await this.daemon.Apis.instance()
    .db_api()
    .exec("get_objects", [[id]]);
}

async function getAsset(...assets) {
  if (isId(assets[0])) {
    return await Promise.all(assets.map(id => getObject(id)));
  }
  return await Apis.instance()
    .db_api()
    .exec("lookup_asset_symbols", [assets]);
}

async function getLatestPrice(_base = "1.3.0", _quote = "1.3.2") {
  let [base, quote] = await getAsset(_base, _quote);
  let d = new Date().toISOString().slice(0, 19);
  let latestTrade = (await Apis.instance()
    .db_api()
    .exec(
      "get_trade_history",
      [
        base.id,
        quote.id,
        d,
        // start,
        `2018-02-24T00:00:00`,
        // stop,
        1
      ]
    ))[0] || { price: 0 };
  return latestTrade.price;
}

async function getVol(quote?, base?) {
  return await Apis.instance()
    .db_api()
    .exec("get_24_volume", [quote, base]);
}

async function statVolume() {
  if (!Apis.instance().db_api()) return;
  let assets = await Apis.instance()
    .db_api()
    .exec("list_assets", ["", 100]);
  let assetSymbols = assets.map(asset => asset.symbol);
  let rawPairs = assetSymbols.reduce((allPairs, next, i, arr) => {
    arr.forEach(symbol => {
      if (symbol !== next) {
        allPairs.push([symbol, next]);
      }
    });
    return allPairs;
  }, []);
  let orderedPairs = rawPairs
    .map(pair => correctMarketPair(...pair))
    .map(pair => `${pair.quote}_${pair.base}`);
  let validMarkets = Array.from(new Set(orderedPairs) as Set<string>);
  let marketsVol = await Promise.all(
    validMarkets.map(pair => getVol(...pair.split("_")))
  );
  let marketsVolByAsset = marketsVol.reduce((summary, vol) => {
    if (vol.base in summary) {
      summary[vol.base] += Number(vol.base_volume);
    } else {
      summary[vol.base] = Number(vol.base_volume);
    }
    if (vol.quote in summary) {
      summary[vol.quote] += Number(vol.quote_volume);
    } else {
      summary[vol.quote] = Number(vol.quote_volume);
    }
    return summary;
  }, {});
  let priceOfCybEth = await getLatestPrice("JADE.ETH", "CYB");
  let volByEth = await Promise.all(
    Object.getOwnPropertyNames(marketsVolByAsset).map(async asset => {
      let res: { [key: string]: any } = {
        asset,
        vol: marketsVolByAsset[asset]
      };
      let price = await getLatestPrice("JADE.ETH", asset);
      if (!price) {
        price = (await getLatestPrice("CYB", asset)) * priceOfCybEth;
        res.byCYB = true;
      }
      res.volByEther = price * marketsVolByAsset[asset].toFixed(6);

      return res;
    })
  );

  let res = {
    details: volByEth,
    sum: volByEth.reduce((acc, next) => acc + Number(next.volByEther), 0)
  };
  return res;
}

class VolumnActions {
  async subMarket(_base, _quote) {
    let [base, quote] = await Promise.all([
      ChainStore.getAsset(_base),
      ChainStore.getAsset(_quote)
    ]);
    debug("[Sub]", base, quote);
    Apis.instance()
      .db_api()
      .exec("subscribe_to_market", [this.updateHandler, base.id, quote.id]);
  }

  async unSubMarket(_base, _quote) {
    let [base, quote] = await Promise.all([
      ChainStore.getAsset(_base),
      ChainStore.getAsset(_quote)
    ]);
    Apis.instance()
      .db_api()
      .exec("unsubscribe_from_market", [
        this.updateHandler,
        base.get("id"),
        quote.get("id")
      ]);
  }

  async queryVol() {
    let vol = await statVolume();
    this.updateVol(vol);
  }

  updateVol(vol) {
    return vol;
  }

  updateHandler = async change => {
    debug("[UpdateHandler]", change);
  };

  updateMarket(modal_id, neverShow) {
    return { modal_id, neverShow };
  }
}

const VolumnActionsWrapper: VolumnActions = alt.createActions(VolumnActions);

export { VolumnActionsWrapper as VolumnActions };
export default VolumnActionsWrapper;
