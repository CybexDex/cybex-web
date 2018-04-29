import alt from "alt-instance";
import { ChainStore } from "Stores/ChainStore";
import { Apis } from "cybexjs-ws";
import { debugGen } from "utils//Utils";

const debug = debugGen("VolActions");

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
