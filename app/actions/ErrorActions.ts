import alt from "alt-instance";

let ErrorActions = class {
  emitError(msg: string, callback) {
    return { msg, callback };
  }
}

ErrorActions = alt.createActions(ErrorActions);

export { ErrorActions };
export default ErrorActions;