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

export type EtoState = Eto.EtoInfo & { loading: number };
class EtoStore extends AbstractStore<EtoState> {
  state: EtoState = {
    state: Eto.EtoPersonalState.Uninit,
    info: null,
    sum: 0,
    loading: 0
  };
  constructor() {
    super();
    this.bindListeners({
      handleAddLoading: EtoActions.addLoading,
      handleRemoveLoading: EtoActions.removeLoading,
      handleInfoUpdate: EtoActions.queryInfo,
      handleSurveyUpdate: EtoActions.putSurvey,
      handleApplyDone: EtoActions.setApplyDone,
      handleApplyLockImpl: EtoActions.applyLock,
      handleBasicUpdate: EtoActions.putBasic
    });
  }
  handleAddLoading(count) {
    this.setState({
      loading: 1
    });
  }
  handleRemoveLoading(count) {
    this.setState({
      loading: 0
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
    this.setState({ ...(this as any).getInstance().getState(), ...info });
  }
  handleApplyLockImpl(info) {
    console.debug("handleApplyLockImpl: ", info);
  }
  handleBasicUpdate(info: Eto.EtoInfo) {
    console.debug("Personal Info: ", info);
    this.setState({ ...(this as any).getInstance().getState(), ...info });
  }
  handleSurveyUpdate(info: Eto.EtoInfo) {
    console.debug("Personal Info: ", info);
    info.state = Eto.EtoPersonalState.ApplyDone;
    this.setState({ ...(this as any).getInstance().getState(), ...info });
  }
}

const StoreWrapper = alt.createStore(EtoStore, "EtoStore");
export { StoreWrapper as EtoStore };

export default StoreWrapper;
