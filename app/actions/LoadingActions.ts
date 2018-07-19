import alt from "alt-instance";

class LoadingActions {
  enterLoading(loadingId) {
    return loadingId;
  }
  quitLoading(loadingId) {
    return loadingId;
  }
}

const LoadingActionsWrapped: LoadingActions = alt.createActions(LoadingActions);

export { LoadingActionsWrapped as LoadingActions };
export default LoadingActionsWrapped;
