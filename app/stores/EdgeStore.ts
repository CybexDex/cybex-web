import BaseStore from "./BaseStore";
import { List, Set, Map, fromJS } from "immutable";
import alt from "alt-instance";
import { Store } from "alt-instance";
import { EdgeActions } from "actions/EdgeActions";
import { debugGen } from "utils//Utils";
import AccountActions from "actions/AccountActions";

import ls from "lib/common/localStorage";
import { AbstractStore } from "./AbstractStore";
import { Edge, EdgeProject } from "services/edge";
const STORAGE_KEY = "__graphene__";
let ss = new ls(STORAGE_KEY);

const debug = debugGen("EdgeStore");
type UserInStatus = {
  [projectId: string]: EdgeProject.UserInStatus;
};
type UserProjectStatus = {
  [projectId: string]: EdgeProject.UserProjectStatus;
};
export type EdgeState = Edge.EdgeInfo & {
  loading: number;
  rank: null | Edge.Rank;
  projects: EdgeProject.ProjectDetail[];
  banners: EdgeProject.Banner[];
  userInSet: UserInStatus;
  userProjectStatus: UserProjectStatus;
};
class EdgeStore extends AbstractStore<EdgeState> {
  state: EdgeState = {
    state: Edge.EdgePersonalState.Uninit,
    info: null,
    sum: 0,
    loading: 0,
    rank: null,
    projects: [],
    banners: [],
    userInSet: {},
    userProjectStatus: {}
  };
  constructor() {
    super();
    this.bindListeners({
      reset: AccountActions.setCurrentAccount,
      handleAddLoading: EdgeActions.addLoading,
      handleRemoveLoading: EdgeActions.removeLoading,
      handleInfoUpdate: EdgeActions.queryInfo
    });
  }
  handleRankUpdate(rank) {
    this.setState({ rank });
  }
  reset() {
    this.setState({
      state: Edge.EdgePersonalState.Uninit,
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
  handleInfoUpdate(info: Edge.EdgeInfo) {
    console.debug("Personal Info: ", info);
    this.setState({ ...(this as any).getInstance().getState(), ...info });
  }
}

const StoreWrapper = alt.createStore(EdgeStore, "EdgeStore");
export { StoreWrapper as EdgeStore };

export default StoreWrapper;
