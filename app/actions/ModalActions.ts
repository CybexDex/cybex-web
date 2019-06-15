import alt from "alt-instance";
export type ModalHandlers = {
  onResolve: any;
  onReject: any;
};

export type ModalResult = {
  data: any;
};

export type ModalCloseParams = {
  modal_id: string;
  result: ModalResult;
};
class ModalActions {
  showModal(
    modal_id: string,
    onlyOnce: boolean = false,
    handlers = {
      onResolve: () => void 0 as any,
      onReject: () => void 0 as any
    }
  ) {
    console.debug("Show Modal Actions: ", modal_id);
    return { modal_id, onlyOnce, handlers };
  }
  hideModal(modal_id: string) {
    return modal_id;
  }
  closeModalWithResolve(closeResult: {
    modal_id: string;
    result: ModalResult;
  }) {
    return closeResult;
  }
  closeModalWithReject(closeResult: ModalCloseParams) {
    return closeResult;
  }
  neverShow(modal_id, neverShow) {
    return { modal_id, neverShow };
  }
}

const ModalActionsWrapped: ModalActions = alt.createActions(ModalActions);

export { ModalActionsWrapped as ModalActions };
export default ModalActionsWrapped;
