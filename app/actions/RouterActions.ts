import alt from "alt-instance";
import { string } from "prop-types";

class RouterActions {
  setDeferRedirect(path: string) {
    return path;
  }
}

const RouterActionsWrapped: RouterActions = alt.createActions(RouterActions);

export { RouterActionsWrapped as RouterActions };
export default RouterActionsWrapped;
