import { Store } from "alt-instance";

export class AbstractStore<S> implements Store<S> {
  state: S;
  listen?(stateListener): void;
  unlisten?(stateListener): void;
  getState?(): S;
  setState?(state: any): S;
  bindListeners?(listenerBinder: { [method: string]: Function }): void;
  exportPublicMethods;
  _export = (...methods) => {
    let publicMethods = {};
    methods.forEach(method => {
      this[method] = this[method].bind(this);
      publicMethods[method] = this[method];
    });
    this.exportPublicMethods(publicMethods);
  };
}

export default AbstractStore;
