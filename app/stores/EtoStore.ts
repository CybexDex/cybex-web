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
  state: State = { state: Eto.EtoPersonalState.Uninit, info: null, sum: 0 };
  constructor() {
    super();
    this.bindListeners({
      handleInfoUpdate: EtoActions.queryInfo,
      handleSurveyUpdate: EtoActions.putSurvey,
      handleApplyDone: EtoActions.setApplyDone,
      handleBasicUpdate: EtoActions.putBasic
    });
  }
  handleApplyDone() {
    console.debug("GetState: ", this, (this as any).getInstance().getState());
    let state = {
      ...(this as any).getInstance().getState(),
      state: Eto.EtoPersonalState.Lock
    };
    this.setState(state);
  }
  handleInfoUpdate(info: Eto.EtoInfo) {
    console.debug("Personal Info: ", info);
    this.setState(info);
  }
  handleBasicUpdate(info: Eto.EtoInfo) {
    console.debug("Personal Info: ", info);
    this.setState(info);
  }
  handleSurveyUpdate(info: Eto.EtoInfo) {
    console.debug("Personal Info: ", info);
    info.state = Eto.EtoPersonalState.ApplyDone;
    this.setState(info);
  }
}

const StoreWrapper = alt.createStore(EtoStore, "EtoStore");
export { StoreWrapper as EtoStore };

export default StoreWrapper;
