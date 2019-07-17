import alt from "alt-instance";
import { LockCActions } from "actions/LockCActions";
import { debugGen } from "utils//Utils";
import AccountActions from "actions/AccountActions";

import ls from "lib/common/localStorage";
import { AbstractStore } from "./AbstractStore";
import { LockC, LockCProject } from "services/lockC";
const STORAGE_KEY = "__graphene__";
let ss = new ls(STORAGE_KEY);

const debug = debugGen("LockCStore");
export type LockCState = LockC.LockCInfo & {
  loading: number;
};
class LockCStore extends AbstractStore<LockCState> {
  state: LockCState = {
    state: LockC.LockCPersonalState.Uninit,
    info: null,
    sum: 0,
    loading: 0
  };
  constructor() {
    super();
    this.bindListeners({
      reset: AccountActions.setCurrentAccount,
      handleAddLoading: LockCActions.addLoading,
      handleRemoveLoading: LockCActions.removeLoading,
      handleInfoUpdate: LockCActions.queryInfo
    });
  }
  reset() {
    this.setState({
      state: LockC.LockCPersonalState.Uninit,
      info: null,
      sum: 0,
      loading: 0,
      userProjectStatus: {},
      projects: []
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
  handleInfoUpdate(info: LockC.LockCInfo) {
    console.debug("Personal Info: ", info);
    this.setState({ ...(this as any).getInstance().getState(), ...info });
  }
}

const StoreWrapper = alt.createStore(LockCStore, "LockCStore");
export { StoreWrapper as LockCStore };

export default StoreWrapper;
