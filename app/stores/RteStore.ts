import { Set } from "immutable";
import alt, { Store } from "alt-instance";
import { debugGen } from "utils//Utils";
import { RteActions } from "actions/RteActions";
import { AbstractStore } from "./AbstractStore";
import { Map } from "immutable";

type RteMsg = { type: string; sym: string };
type Ticker = { px: string; qty: string; cymQty: string } & RteMsg;
type OrderBook = {};

type RteState = { [channel: string]: Map<string, Ticker | OrderBook> };

class RteStore extends AbstractStore<RteState> {
  constructor() {
    super();
    console.debug("RTE Store Constructor");
    this.state = { ticker: Map(), depth: Map() } as any;
    this.bindListeners({
      onUpdateMarket: RteActions.onMarketMsg
    });
    console.debug("RTE Store Constructor Done");
  }
  onUpdateMarket({ channel, market, data }) {
    let n = this.state[channel].set(market, data);
    this.setState({
      [channel]: n
    });
  }
}

const StoreWrapper: Store<RteState> = alt.createStore(RteStore, "RteStore");
export { StoreWrapper as RteStore };

export default StoreWrapper;
