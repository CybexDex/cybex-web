import BaseStore from "./BaseStore";
import { Set } from "immutable";
import alt from "alt-instance";
import { Store } from "alt-instance";
import { debugGen } from "utils//Utils";

const debug = debugGen("NetworkStore");

interface NetworkInformation extends EventTarget {
  readonly downlink: number;
  readonly downlinkMax: number;
  readonly effectiveType: "slow-2g" | "2g" | "3g" | "4g";
  readonly rtt: number;
  readonly type:
    | "bluetooth"
    | "cellular"
    | "ethernet"
    | "none"
    | "wifi"
    | "wimax"
    | "other"
    | "unknown";
  onchange: any;
}

const connect = <NetworkInformation>(navigator as any).connection;

type ApiStatus = "online" | "blocked" | "offline";

class NetworkStore extends BaseStore
  implements
    Store<{ online: boolean; apiStatus: ApiStatus; initDone: boolean }> {
  bindListeners;
  setState;
  state;
  constructor() {
    super();
    this.state = {
      online: navigator.onLine,
      apiStatus: "offline",
      initDone: false
    };
    try {
      if (typeof window !== undefined) {
        window.ononline = this.onChangeHandler;
        window.onoffline = this.onChangeHandler;
      }
    } catch (e) {}
    super._export("setInitDone", "updateApiStatus");
  }
  setInitDone = (initDone = true) => {
    this.setState({
      initDone
    });
  };
  updateApiStatus = apiStatus => {
    this.setState({
      apiStatus
    });
  };
  onChangeHandler = online => {
    debug("beforeStateChange", this.state);
    this.setState({
      online: navigator.onLine
    });
  };
}
const StoreWrapper = alt.createStore(NetworkStore, "NetworkStore");
export { StoreWrapper as NetworkStore };

export default StoreWrapper;
