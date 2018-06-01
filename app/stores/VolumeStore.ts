import { Set } from "immutable";
import alt from "alt-instance";
import { debugGen } from "utils//Utils";
import { AbstractStore } from "./AbstractStore";
import VolumeActions, { PriceSetByYuan } from "actions/VolumeActions";
interface VolumnState {
  totalVolumn: number;
  priceState: PriceSetByYuan;
}

class VolumnStore extends AbstractStore<VolumnState> {
  state = {
    details: [],
    sum: 0,
    totalVolumn: 0,
    priceState: {}
  };
  constructor(props) {
    super();
    this.bindListeners({
      handleVolUpdate: VolumeActions.updateVol,
      handlePriceUpdate: VolumeActions.updatePriceData
    });
  }
  handleVolUpdate(volState) {
    if (volState) {
      this.setState(volState);
    }
  }
  handlePriceUpdate(priceState) {
    console.debug("Update Price: ", priceState);
    this.setState({priceState});
  }
  handleAddMarket() {}
  handleRemoveMarket() {}
  handleMarketUpdate() {}
}

const StoreWrapper = alt.createStore(VolumnStore, "VolumnStore") as VolumnStore;
export { StoreWrapper as VolumnStore };
export default StoreWrapper;
