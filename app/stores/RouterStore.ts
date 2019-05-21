import { Set } from "immutable";
import alt, { Store } from "alt-instance";
import { debugGen } from "utils//Utils";
import { RouterActions } from "actions/RouterActions";
import { AbstractStore } from "./AbstractStore";
import { Map } from "immutable";

type RouterMsg = { type: string; sym: string };
type Ticker = { px: string; qty: string; cymQty: string } & RouterMsg;
type OrderBook = {};

type RouterState = { deferRedirect: null | string };

class RouterStore extends AbstractStore<RouterState> {
  constructor() {
    super();
    console.debug("Router Store Constructor");
    this.state = { deferRedirect: null };
    this.bindListeners({
      onSetDeferRedirect: RouterActions.setDeferRedirect
    });
    console.debug("Router Store Constructor Done");
  }

  onSetDeferRedirect(path: string) {
    this.setState({ deferRedirect: path });
  }
}

const StoreWrapper: Store<RouterState> = alt.createStore(
  RouterStore,
  "RouterStore"
);
export { StoreWrapper as RouterStore };

export default StoreWrapper;
