import * as React from "react";
import * as PropTypes from "prop-types";

import { connect } from "alt-react";
import { ModalStore } from "stores/ModalStore";
import { ModalActions } from "actions/ModalActions";
import Translate from "react-translate-component";
import { BaseModal } from "./BaseModalNew";
import { Button, Checkbox } from "../Common";
import counterpart from "counterpart";

type props = { modalId; open?; onConfirm; onCancel };

class EtoRefreshModal extends React.Component<props, { fadeOut?; neverShow? }> {
  constructor(props) {
    super(props);
    this.state = {
      neverShow: false
    };
  }
  handleNeverShow = neverShow => {
    this.setState({
      neverShow
    });
    ModalActions.neverShow(this.props.modalId, neverShow);
    return neverShow;
  };

  render() {
    let { modalId, open, onConfirm, onCancel } = this.props;
    return (
      open && (
        <BaseModal modalId={modalId} style={{ width: "30em" }}>
          <h2 />
          <Translate
            className="text-center"
            component="h5"
            style={{ margin: "12px " }}
            content="eto_apply.refresh_tip"
          />
          <div style={{ textAlign: "center", margin: "12px auto" }}>
            <Button
              type="primary"
              size="small"
              onClick={onConfirm}
              style={{ width: "50%" }}
            >
              <Translate
                className="text-center"
                component="span"
                content="eto_apply.refresh_ok"
              />
            </Button>
            <Button
              type="secondary"
              size="small"
              onClick={onCancel}
              style={{ width: "50%" }}
            >
              <Translate
                className="text-center"
                component="span"
                content="eto_apply.refresh_cancel"
              />
            </Button>
          </div>
          <div className="modal-footer">
            <p className="text-center" style={{ fontSize: "10px" }}>
              <Checkbox
                onChange={this.handleNeverShow}
                active={this.state.neverShow}
              >
                <Translate content="modal.never" />
              </Checkbox>
              {/* <label htmlFor="eth_never">
                <input type="checkbox" onChange={this.handleNeverShow} />
              </label> */}
            </p>
          </div>
          {/* <Button>{counterpart.translate("")}</Button> */}
        </BaseModal>
      )
    );
  }
}

const EtoRefreshModalWapper: any = connect(
  EtoRefreshModal as any,
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

export { EtoRefreshModalWapper as EtoRefreshModal };
export default EtoRefreshModalWapper;
