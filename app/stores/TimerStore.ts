import alt from "alt-instance";
import { Store } from "alt-instance";
import { debugGen } from "utils//Utils";
import { AbstractStore } from "./AbstractStore";

import ls from "lib/common/localStorage";
const STORAGE_KEY = "__graphene__";
let ss = new ls(STORAGE_KEY);

const debug = debugGen("TimerStore");

type State = {
  begin: number;
  basicTimer: number;
};

class TimerStore extends AbstractStore<State> {
  state: State = {
    begin: Date.now(),
    basicTimer: Date.now()
  };
  constructor() {
    super();
    setInterval(() => {
      this.setState({
        basicTimer: Date.now()
      });
    }, 900);
  }
}

const StoreWrapper = alt.createStore(TimerStore, "TimerStore") as TimerStore &
  Store<State>;
export { StoreWrapper as TimerStore };

export default StoreWrapper;
