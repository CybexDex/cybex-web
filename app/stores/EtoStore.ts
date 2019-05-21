import BaseStore from "./BaseStore";
import { List, Set, Map, fromJS } from "immutable";
import alt from "alt-instance";
import { Store } from "alt-instance";
import { EtoActions } from "actions/EtoActions";
import { debugGen } from "utils//Utils";

import ls from "lib/common/localStorage";
import { AbstractStore } from "./AbstractStore";
import { Eto } from "services/eto";
const STORAGE_KEY = "__graphene__";
let ss = new ls(STORAGE_KEY);

const debug = debugGen("EtoStore");

type State = Eto.EtoInfo;
class EtoStore extends AbstractStore<State> {
  state: State = { state: 0, info: null };
  constructor() {
    super();
    this.bindListeners({
      handleInfoUpdate: EtoActions.queryInfo
    });
  }

  handleInfoUpdate(info: Eto.EtoInfo) {
    console.debug("Personal Info: ", info);
    this.setState(info);
  }
}

const StoreWrapper = alt.createStore(EtoStore, "EtoStore");
export { StoreWrapper as EtoStore };

export default StoreWrapper;
