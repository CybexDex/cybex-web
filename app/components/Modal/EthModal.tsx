import * as React from "react";
import * as PropTypes from "prop-types";

import { getClassName } from "utils//ClassName";
import { connect } from "alt-react";
import { ModalStore } from "stores/ModalStore";
import IntlStore from "stores/IntlStore";
import { ModalActions } from "actions/ModalActions";
import Translate from "react-translate-component";
import Icon from "../Icon/Icon";
import counterpart from "counterpart";
import utils from "lib/common/utils";
import { BaseModal } from "./BaseModalNew";
import * as moment from "moment";

const style = {
  position: "fixed",
  left: 0,
  top: 0
};

type props = { locale; modalId; open?; className?; accountName };

export const DEFAULT_ETH_MODAL_ID = "eth_modal";

class EthModal extends React.Component<props, { fadeOut?; neverShow? }> {
  constructor(props) {
    super(props);
    this.state = {
      neverShow: false
    };
  }

  handleNeverShow = e => {
    let neverShow = e.target.checked;
    this.setState({
      neverShow
    });
    ModalActions.neverShow(this.props.modalId, neverShow);
    return e.target.value;
  };

  render() {
    let { modalId, open, locale, accountName } = this.props;
    return (
      open && (
        <BaseModal modalId={this.props.modalId}>
          <Translate
            className="text-center"
            unsafe
            component="h3"
            content="first.title"
          />
          <div className="modal-content game-modal">
            <Translate
              className="text-center"
              unsafe
              component="section"
              content="first.p1"
            />
            <Translate
              className="text-center"
              unsafe
              component="section"
              content="first.p2"
            />
            <Translate
              className="text-center"
              unsafe
              component="section"
              content="first.p3"
            />
            <Translate
              className="text-center"
              unsafe
              component="section"
              content="first.p4"
            />
            {/* <Translate
              className="text-center"
              unsafe
              component="section"
              content="first.p5"
            />
            <Translate
              className="text-center"
              unsafe
              component="section"
              content="first.p6"
            />
            <Translate
              className="text-center"
              unsafe
              component="section"
              content="first.p7"
            /> */}
            <Translate
              className="text-center"
              unsafe
              component="section"
              content="first.footer"
            />
          </div>
          <div className="modal-footer">
            <p className="text-center">
              <label htmlFor="eth_never">
                <input type="checkbox" onChange={this.handleNeverShow} />
                <Translate content="modal.never" />
              </label>
            </p>
          </div>
        </BaseModal>
      )
    );
  }
}

const GameModalWapper = connect(EthModal, {
  listenTo() {
    return [ModalStore];
  },
  getProps(props) {
    let { modalId } = props;
    return {
      open: ModalStore.getState().showingModals.has(modalId)
    };
  }
});

export default GameModalWapper;
