import * as React from "react";
import * as PropTypes from "prop-types";

import { connect } from "alt-react";
import { ModalStore } from "stores/ModalStore";
import { ModalActions } from "actions/ModalActions";
import Translate from "react-translate-component";
import { BaseModal } from "./BaseModalNew";
import { Button } from "../Common";
import counterpart from "counterpart";

type props = { modalId; open?; onConfirm };

class EtoConfirmModal extends React.Component<props, { fadeOut?; neverShow? }> {
  constructor(props) {
    super(props);
    this.state = {
      neverShow: false
    };
  }

  render() {
    let { modalId, open, onConfirm } = this.props;
    return (
      open && (
        <BaseModal
          modalId={modalId}
          onClose={onConfirm}
          style={{ width: "20em" }}
        >
          <h4 />
          <Translate
            className="text-center"
            component="p"
            content="eto_apply.token.set_done"
          />
          <div style={{ textAlign: "center" }}>
            <Button
              type="primary"
              size="small"
              onClick={onConfirm}
              style={{ width: "100%" }}
            >
              OK
            </Button>
          </div>
          {/* <Button>{counterpart.translate("")}</Button> */}
        </BaseModal>
      )
    );
  }
}

const EtoConfirmModalWapper: any = connect(
  EtoConfirmModal as any,
  {
    listenTo() {
      return [ModalStore];
    },
    getProps(props) {
      let { modalId } = props;
      return {
        open: ModalStore.getState().showingModals.has(modalId)
      };
    }
  }
) as any;

export { EtoConfirmModalWapper as EtoConfirmModal };
export default EtoConfirmModalWapper;
