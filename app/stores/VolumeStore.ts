import { Set } from "immutable";
import alt from "alt-instance";
import { debugGen } from "utils//Utils";
import { AbstractStore } from "./AbstractStore";
interface VolumnState {
  totalVolumn: number;
}

class VolumnStore extends AbstractStore<VolumnState> {
  state = { totalVolumn: 0 };
  constructor(props) {
    super();
    this.bindListeners({});
  }
  handleAddMarket() {}
  handleRemoveMarket() {}
  handleMarketUpdate() {}
}

const StoreWrapper = alt.createStore(VolumnStore, "VolumnStore") as VolumnStore;
export { StoreWrapper as VolumnStore };
export default StoreWrapper;
