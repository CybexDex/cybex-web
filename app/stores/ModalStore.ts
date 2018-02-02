import BaseStore from "./BaseStore";
import {
  Set
} from "immutable";
import alt from "alt-instance";
import { Store } from "alt-instance";
import ModalActions from "actions/ModalActions";
import { debugGen } from "utils//Utils";

import ls from "lib/common/localStorage";
const STORAGE_KEY = "__graphene__";
let ss = new ls(STORAGE_KEY);

const debug = debugGen("ModalStore");

type State = {
  showingModals: Set<string>
};

class ModalStore extends BaseStore implements Store<State>{
  bindListeners;
  setState;
  state: State = {
    showingModals: Set()
  };
  constructor() {
    super();
    this.bindListeners({
      handleShowModal: ModalActions.showModal,
      handleHideModal: ModalActions.hideModal,
      handleNeverShow: ModalActions.neverShow
    });
  }

  handleShowModal({ modal_id, onlyOnce }) {
    let toShow = true;
    if (onlyOnce) {
      toShow = !ss.get("modal_has_shown_" + modal_id, false);
    }
    if (toShow) {
      this.setState({
        showingModals: this.state.showingModals.add(modal_id)
      });
    }
  }

  handleHideModal(id) {
    this.setState({
      showingModals: this.state.showingModals.remove(id)
    });
  }

  handleNeverShow({ modal_id, neverShow = true }) {
    ss.set("modal_has_shown_" + modal_id, neverShow);
  }

}
const StoreWrapper = alt.createStore(ModalStore, "ModalStore");
export { StoreWrapper as ModalStore }

export default StoreWrapper;