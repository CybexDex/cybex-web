/// <reference types="react"/>
declare module "react-translate-component" {
  const Translate: React.ComponentFactory<any, any>;
  export default Translate;
}

declare module "rc-queue-anim" {
  class QueueAnim extends React.Component<any, any> {}
  export default QueueAnim;
}
declare module "react-scroll-up" {
  class QueueAnim extends React.Component<any, any> {}
  export default QueueAnim;
}
declare module "alt-container" {
  const AltContainer: React.ClassicFactory<any>;
  export default AltContainer;
}

declare module "alt-react" {
  function connect(Component, injector: any);
}

declare namespace CommonUtils {
  const price_text: (price: string, base: any, quote: any) => string;
  const replaceName: (name: string, isBitAsset?:boolean) => {
    name: string,
    prefix: string
  };
  const format_volume: (amount: number) => string;
  const are_equal_shallow: (...args) => boolean;
}

// declare module "common/utils" {
//   export default CommonUtils;
// }

type Action<T> = {} | T;

declare module "alt-instance" {
  class alt {
    static createActions(actionClass): Action<typeof actionClass>;
    static createStore(storeClass, storeName: string): Store<any>;
  }
  class BaseStore<S> {
    listen?(cb: (state: S) => void): void;
  }
  export interface Store<S> {
    state: S;
    getState?(): S;
    setState?(state: any): S;
    bindListeners?(listenerBinder: { [method: string]: Function }): void;
  }

  export default alt;
}

declare var __ELECTRON__;
