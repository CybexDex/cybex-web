import { Set, Map } from "immutable";
import alt from "alt-instance";
import { AbstractStore } from "./AbstractStore";
import { debugGen } from "utils//Utils";
import { Apis } from "cybexjs-ws";
import * as assert from "assert";
import { ChainValidation } from "cybexjs";

type CommonType = {
  [property: string]: any;
};

type Asset = {
  precision: number;
  symbol: string;
  id: string;
} & CommonType;

interface ChainData {
  assets: Map<string, Asset>;
}

class ChainStore extends AbstractStore<ChainData> {
  state = { assets: Map<string, Asset>() };
  constructor(props) {
    super();
    this.bindListeners({});
    this._export(["getAsset"])
  }
  async getAssets(idsOrSymbols: string[]) {
    assert(idsOrSymbols && idsOrSymbols.length);
    let assets = ChainValidation.is_object_id(idsOrSymbols[0])
      ? await Promise.all(idsOrSymbols.map(id => this.getObject(id)))
      : await Apis.instance()
          .db_api()
          .exec("lookup_asset_symbols", [idsOrSymbols]);
    return assets;
  }
  async getAsset(idOrSymbol: string) {
    assert(idOrSymbol);
    let asset: Asset = this.state.assets.get(idOrSymbol, null);
    if (!asset) {
      asset = ChainValidation.is_object_id(idOrSymbol)
        ? await this.getObject(idOrSymbol)
        : (await this.getAssets([idOrSymbol]))[0];
      this.setState({
        assets: this.state.assets.set(asset.symbol, asset).set(asset.id, asset)
      });
    }
    return asset;
  }
  async getObject(id: string) {
    assert(id && ChainValidation.is_object_id(id));
    return await this.getObjects([id])[0];
  }
  async getObjects(ids: string[]) {
    assert(ids && ids.length && ChainValidation.is_object_id(ids[0]));
    return await Apis.instance()
      .db_api()
      .exec("get_objects", [ids]);
  }
}

const StoreWrapper = alt.createStore(ChainStore, "ChainStore") as ChainStore;
export { StoreWrapper as ChainStore };
export default StoreWrapper;
