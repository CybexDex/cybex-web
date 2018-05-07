import { Set } from "immutable";
import alt from "alt-instance";
import { debugGen } from "utils//Utils";
import { AbstractStore } from "./AbstractStore";
import VolumeActions from "actions/VolumeActions";
interface VolumnState {
  totalVolumn: number;
}

class VolumnStore extends AbstractStore<VolumnState> {
  state = { details: [], sum: 0, totalVolumn: 0 };
  constructor(props) {
    super();
    this.bindListeners({
      handleVolUpdate: VolumeActions.updateVol
    });
  }
  handleVolUpdate(volState) {
    if (volState) {
      this.setState(volState);
    }
  }
  handleAddMarket() {}
  handleRemoveMarket() {}
  handleMarketUpdate() {}
}

const StoreWrapper = alt.createStore(VolumnStore, "VolumnStore") as VolumnStore;
export { StoreWrapper as VolumnStore };
export default StoreWrapper;
