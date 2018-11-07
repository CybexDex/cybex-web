import { Set } from "immutable";
import alt, { Store } from "alt-instance";
import { debugGen } from "utils//Utils";
import { TradeHistoryActions } from "actions/TradeHistoryActions";
import { AbstractStore } from "./AbstractStore";
import { Map } from "immutable";

const MAX_SIZE = 600;

type TradeHistoryState = { [marketPair: string]: Cybex.Trade[] };

class TradeHistoryStore extends AbstractStore<TradeHistoryState> {
  constructor() {
    super();
    console.debug("TradeHistory Store Constructor");
    this.state = {};
    this.bindListeners({
      onHistoryPatched: TradeHistoryActions.onHistoryPatched
    });
    console.debug("TradeHistory Store Constructor Done");
  }
  onHistoryPatched({ market, history }) {
    console.debug("TradeHistoryStore: ", market, this.state[market], history);
    let h = [
      ...(this.state[market] || []),
      ...(history || [])
    ] as Cybex.Trade[];
    this.setState({
      [market]: h.sort((prev, next) => {
        let prevTime = new Date(prev.date);
        let nextTime = new Date(next.date);
        if (prevTime > nextTime) return -1;
        if (prevTime < nextTime) return 1;
        else return 0;
      }).slice(0, MAX_SIZE)
    });
    console.debug("TradeHistoryStore Patched: ", this.state);
  }
}

const StoreWrapper: Store<TradeHistoryState> = alt.createStore(
  TradeHistoryStore,
  "TradeHistoryStore"
);
export { StoreWrapper as TradeHistoryStore };

export default StoreWrapper;
