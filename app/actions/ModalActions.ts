import alt from "alt-instance";

class ModalActions {
  showModal(modal_id: string, onlyOnce: boolean = false) {
    return { modal_id, onlyOnce };
  }
  hideModal(modal_id: string) {
    return modal_id;
  }
  neverShow(modal_id) {
    return modal_id;
  }
}

const ModalActionsWrapped: ModalActions = alt.createActions(ModalActions);

export { ModalActionsWrapped as ModalActions };
export default ModalActionsWrapped;