import { Set } from "immutable";
import alt, { Store } from "alt-instance";
import { debugGen } from "utils//Utils";
import { MarketHistoryActions } from "actions/MarketHistoryActions";
import { AbstractStore } from "./AbstractStore";
import { Map } from "immutable";

const MAX_SIZE = 1500;

type MarketHistoryState = {
  [marketPairWithInterval: string]: Cybex.SanitizedMarketHistory[];
};

class MarketHistoryStore extends AbstractStore<MarketHistoryState> {
  constructor() {
    super();
    console.debug("MarketHistory Store Constructor");
    this.state = {};
    this.bindListeners({
      onHistoryPatched: MarketHistoryActions.onHistoryPatched
    });
    console.debug("MarketHistory Store Constructor Done");
  }
  onHistoryPatched({ market, history = [], loadLatest }) {
    console.debug("MarketHistoryStore: ", market, this.state[market], history);
    let currentData = this.state[market] || [];
    let concatData = history.length ? history[history.length - 1] : null;
    if (concatData) {
      currentData = currentData.filter(data => data.date < concatData.date);
    }
    let h: Cybex.SanitizedMarketHistory[] = !loadLatest
      ? [...currentData, ...history]
      : [...history, ...currentData];
    this.setState({
      [market]: h
        .sort((prev, next) => {
          let prevTime = prev.date;
          let nextTime = next.date;
          if (prevTime > nextTime) return -1;
          if (prevTime < nextTime) return 1;
          else return 0;
        })
        .slice(0, MAX_SIZE)
    });
    console.debug("MarketHistoryStore Patched: ", this.state);
  }
}

const StoreWrapper: Store<MarketHistoryState> = alt.createStore(
  MarketHistoryStore,
  "MarketHistoryStore"
);
export { StoreWrapper as MarketHistoryStore };

export default StoreWrapper;
