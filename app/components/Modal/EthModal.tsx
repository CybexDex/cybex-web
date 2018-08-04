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
          {/* <Translate
            className="text-center"
            unsafe
            component="h3"
            content="first.title"
          /> */}
          <h3 className="text-center">【ETO时间调整通知】</h3>
          <div className="modal-content game-modal">
            <p className="text-center">
              ETO参与页面已完全恢复正常，请大家积极参与！
            </p>
            <p className="text-center">首轮结束时间延迟至12:45结束！</p>
            <p className="text-center">第二轮参与开始时间13:00</p>
            <p className="text-center">感谢您的参与！</p>
            {/* <Translate
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
            <Translate
              className="text-center"
              unsafe
              component="section"
              content="first.p5"
            />
            <Translate
              className="text-center"
              unsafe
              component="section"
              content="first.footer"
            /> */}
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

const GameModalWapper = connect(
  EthModal,
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
);

export default GameModalWapper;
