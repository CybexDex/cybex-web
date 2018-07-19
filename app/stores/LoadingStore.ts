import { Set } from "immutable";
import alt from "alt-instance";
import { debugGen } from "utils//Utils";
import { LoadingActions } from "actions/LoadingActions";
import { AbstractStore } from "./AbstractStore";
const debug = debugGen("LoadingStore");

type LoadingState = {
  currentLoading: Set<any>;
};

class LoadingStore extends AbstractStore<LoadingState> {
  constructor() {
    super();
    this.state = {
      currentLoading: Set()
    };
    this.bindListeners({
      addLoadingId: LoadingActions.enterLoading,
      removeLoadingId: LoadingActions.quitLoading
    });
  }

  addLoadingId(id: string) {
    this.setState({
      currentLoading: this.state.currentLoading.add(id)
    });
  }

  removeLoadingId(id: string) {
    this.setState({
      currentLoading: this.state.currentLoading.remove(id)
    });
  }
  resetLoadingSet() {
    this.setState({
      currentLoading: Set()
    });
  }
}

const StoreWrapper = alt.createStore(LoadingStore, "LoadingStore");
export { StoreWrapper as LoadingStore };

export default StoreWrapper;
