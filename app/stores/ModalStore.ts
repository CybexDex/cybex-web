import BaseStore from "./BaseStore";
import { Set, Map } from "immutable";
import alt from "alt-instance";
import { Store } from "alt-instance";
import ModalActions, {
  ModalHandlers,
  ModalCloseParams
} from "actions/ModalActions";
import { debugGen } from "utils//Utils";

import ls from "lib/common/localStorage";
import { EtoActions } from "../actions/EtoActions";
import { DEFAULT_ETO_CHECK_TOKEN } from "../components/Modal/ModalID";
const STORAGE_KEY = "__graphene__";
let ss = new ls(STORAGE_KEY);

const debug = debugGen("ModalStore");

type State = {
  showingModals: Set<string>;
  modalHandlers: Map<string, ModalHandlers>;
};

class ModalStore extends BaseStore implements Store<State> {
  bindListeners;
  listen;
  unlisten;
  getState;
  setState;
  state: State = {
    showingModals: Set(),
    modalHandlers: Map()
  };
  constructor() {
    super();
    this.bindListeners({
      handleShowModal: ModalActions.showModal,
      handleHideModal: ModalActions.hideModal,
      // handleTokenModal: EtoActions.putToken,
      handleCloseModalWithResolve: ModalActions.closeModalWithResolve,
      handleCloseModalWithReject: ModalActions.closeModalWithReject,
      handleNeverShow: ModalActions.neverShow
    });
  }

  handleShowModal({ modal_id, onlyOnce, handlers }) {
    let toShow = true;
    if (onlyOnce) {
      toShow = !ss.get("modal_has_shown_" + modal_id, false);
    }
    if (toShow) {
      this.setState({
        showingModals: this.state.showingModals.add(modal_id),
        modalHandlers: this.state.modalHandlers.set(modal_id, handlers)
      });
    }
  }

  handleHideModal(id) {
    this.setState({
      showingModals: this.state.showingModals.remove(id),
      modalHandlers: this.state.modalHandlers.remove(id)
    });
  }
  // handleTokenModal() {
  //   this.setState({
  //     showingModals: this.state.showingModals.remove(DEFAULT_ETO_CHECK_TOKEN),
  //     modalHandlers: this.state.modalHandlers.remove(DEFAULT_ETO_CHECK_TOKEN)
  //   });
  // }
  handleCloseModalWithResolve(params: ModalCloseParams) {
    let handlers = this.state.modalHandlers.get(params.modal_id);
    if (handlers && handlers.onResolve) {
      setTimeout(() => handlers.onResolve(params.result));
    }
    this.setState({
      showingModals: this.state.showingModals.remove(params.modal_id),
      modalHandlers: this.state.modalHandlers.remove(params.modal_id)
    });
  }
  handleCloseModalWithReject(params: ModalCloseParams) {
    let handlers = this.state.modalHandlers.get(params.modal_id);
    if (handlers && handlers.onReject) {
      setTimeout(() => handlers.onReject(params.result));
    }
    this.setState({
      showingModals: this.state.showingModals.remove(params.modal_id),
      modalHandlers: this.state.modalHandlers.remove(params.modal_id)
    });
  }

  handleNeverShow({ modal_id, neverShow = true }) {
    ss.set("modal_has_shown_" + modal_id, neverShow);
  }
}
const StoreWrapper = alt.createStore(ModalStore, "ModalStore");
export { StoreWrapper as ModalStore };

export default StoreWrapper;
