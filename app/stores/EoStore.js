import BaseStore from "./BaseStore";
import Immutable from "immutable";
import alt from "alt-instance";
import EoActions from "actions/EoActions";

class AssetStore extends BaseStore {
    constructor() {
        super();
        this.bindListeners({
            getList: EoActions.getList
        });
    }

    onGetAssetList(payload) {
    }

    onLookupAsset(payload) {
    }
}

export default alt.createStore(EoStore, "EoStore");
