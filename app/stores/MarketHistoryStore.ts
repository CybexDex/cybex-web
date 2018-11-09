import { Set } from "immutable";
import alt, { Store } from "alt-instance";
import { debugGen } from "utils//Utils";
import { MarketHistoryActions } from "actions/MarketHistoryActions";
import { AbstractStore } from "./AbstractStore";
import { Map } from "immutable";
import EventEmitter from "event-emitter";

const MAX_SIZE = 1500;

export const marketEvent = new EventEmitter();

type MarketHistoryState = {
  [marketPairWithInterval: string]: Cybex.SanitizedMarketHistory[];
};

class MarketHistoryStore extends AbstractStore<MarketHistoryState> {
  constructor() {
    super();
    // console.debug("MarketHistory Store Constructor");
    this.state = {};
    this.bindListeners({
      onHistoryPatched: MarketHistoryActions.onHistoryPatched
    });
    // console.debug("MarketHistory Store Constructor Done");
  }
  onHistoryPatched({ market, history = [], loadLatest, requestID }) {
    // console.debug("MarketHistoryStore: ", market, this.state[market], history);
    let currentData = this.state[market] || [];
    let concatData = history.length ? history[history.length - 1] : null;
    if (concatData) {
      currentData = currentData.filter(data => data.date < concatData.date);
    }
    let h: Cybex.SanitizedMarketHistory[] = !loadLatest
      ? [...currentData, ...history]
      : [...history, ...currentData];
    
      // .slice(0, MAX_SIZE);
    this.setState({
      [market]: h
    });
    // console.debug("MarketHistoryStore Patched: ", this.state);
    requestID && marketEvent.emit(requestID, h);
  }
}

const StoreWrapper: Store<MarketHistoryState> = alt.createStore(
  MarketHistoryStore,
  "MarketHistoryStore"
);
export { StoreWrapper as MarketHistoryStore };

export default StoreWrapper;
