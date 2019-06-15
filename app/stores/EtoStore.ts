import BaseStore from "./BaseStore";
import { List, Set, Map, fromJS } from "immutable";
import alt from "alt-instance";
import { Store } from "alt-instance";
import { EtoActions } from "actions/EtoActions";
import { debugGen } from "utils//Utils";
import AccountActions from "actions/AccountActions";

import ls from "lib/common/localStorage";
import { AbstractStore } from "./AbstractStore";
import { Eto, EtoProject } from "services/eto";
const STORAGE_KEY = "__graphene__";
let ss = new ls(STORAGE_KEY);

const debug = debugGen("EtoStore");
type UserInStatus = {
  [projectId: string]: EtoProject.UserInStatus;
};
type UserProjectStatus = {
  [projectId: string]: EtoProject.UserProjectStatus;
};
export type EtoState = Eto.EtoInfo & {
  loading: number;
  rank: null | Eto.Rank;
  projects: EtoProject.ProjectDetail[];
  banners: EtoProject.Banner[];
  userInSet: UserInStatus;
  userProjectStatus: UserProjectStatus;
};
class EtoStore extends AbstractStore<EtoState> {
  state: EtoState = {
    state: Eto.EtoPersonalState.Uninit,
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
      handleAddLoading: EtoActions.addLoading,
      handleRemoveLoading: EtoActions.removeLoading,
      handleInfoUpdate: EtoActions.queryInfo,
      handleSurveyUpdate: EtoActions.putSurvey,
      handleApplyDone: EtoActions.setApplyDone,
      handleApplyLockImpl: EtoActions.applyLock,
      handleTokenUpdate: EtoActions.putToken,
      handleBasicUpdate: EtoActions.putBasic,
      handleRankUpdate: EtoActions.queryRank,
      handleBannerUpdate: EtoActions.updateBanner,
      handleProjectListUpdate: EtoActions.updateProjectList,
      handleProjectDetailUpdate: EtoActions.updateProject,
      handleUserProjectDetail: EtoActions.updateProjectByUser,
      handleUserIn: EtoActions.queryUserIn,
      handleProjectDetail: EtoActions.loadProjectDetail
    });
  }
  handleRankUpdate(rank) {
    this.setState({ rank });
  }
  reset() {
    this.setState({
      state: Eto.EtoPersonalState.Uninit,
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
  handleTokenUpdate({ info, onResolve }: { info: Eto.EtoInfo; onResolve? }) {
    console.debug("Personal Info: ", info);
    this.setState({
      ...(this as any).getInstance().getState(),
      ...info,
      state: (this as any).getInstance().getState().state
    });
    if (onResolve) {
      setTimeout(onResolve, 500);
    }
  }
  handleSurveyUpdate(info: Eto.EtoInfo) {
    console.debug("Personal Info: ", info);
    info.state = Eto.EtoPersonalState.ApplyDone;
    this.setState({ ...(this as any).getInstance().getState(), ...info });
  }

  handleBannerUpdate(banners: EtoProject.Banner[]) {
    this.setState({ banners });
  }
  handleProjectListUpdate(projects: EtoProject.ProjectDetail[]) {
    let oldProjects =
      ((this as any).getInstance().getState()
        .projects as EtoProject.ProjectDetail[]) || [];
    let newProjects = projects.map(p => {
      let op = oldProjects.find(op => op.id === p.id);
      return op
        ? {
            ...op,
            ...p,
            current_percent: Math.max(
              Number(p.current_percent),
              Number(op.current_percent)
            )
          }
        : p;
    });
    this.setState({ projects: newProjects });
  }
  handleProjectDetailUpdate(project: EtoProject.ProjectDetail) {
    let newProjects = ((this as any).getInstance().getState()
      .projects as EtoProject.ProjectDetail[]).map(oldP =>
      project.id === oldP.id
        ? {
            ...oldP,
            ...project,
            current_percent: Math.max(
              Number(project.current_percent),
              Number(oldP.current_percent)
            )
          }
        : oldP
    );
    if (!newProjects.find(p => p.id === project.id)) {
      newProjects = [project];
    }
    this.setState({ projects: newProjects });
  }
  handleProjectDetail(project: EtoProject.ProjectDetail) {
    this.handleProjectDetailUpdate(project);
  }
  handleUserProjectDetail(project: EtoProject.ProjectDetail) {
    this.setState({
      userProjectStatus: {
        ...((this as any).getInstance().getState()
          .userProjectStatus as UserProjectStatus),
        [project.id]: project
      }
    });
  }
  handleUserIn(project: EtoProject.ProjectDetail) {
    this.setState({
      userInSet: {
        ...((this as any).getInstance().getState().userInSet as UserInStatus),
        [project.id]: project
      }
    });
  }
}

const StoreWrapper = alt.createStore(EtoStore, "EtoStore");
export { StoreWrapper as EtoStore };

export default StoreWrapper;
