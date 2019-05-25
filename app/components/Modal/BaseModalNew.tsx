import * as React from "react";
import * as PropTypes from "prop-types";

import { getClassName } from "utils//ClassName";
import { connect } from "alt-react";
import { ModalStore } from "stores/ModalStore";
import { ModalActions } from "actions/ModalActions";
import BindToChainState from "../Utility/BindToChainState";
import ChainTypes from "../Utility/ChainTypes";
import { Asset } from "lib/common/MarketClasses";
import Translate from "react-translate-component";
import CopyButton from "../Utility/CopyButton";
import Icon from "../Icon/Icon";

type props = {
  overlayClose?: boolean;
  overlay?: boolean;
  noCloseBtn?: boolean;
  onClose?;
  fade?;
  modalId;
  className?;
  style?;
};

export class BaseModal extends React.Component<props, { fadeOut }> {
  static defaultProps = {
    fade: true,
    overlayClose: false,
    overlay: true,
    noCloseBtn: false
  };

  constructor(props) {
    super(props);
    this.state = {
      fadeOut: false
    };
  }

  onClose = () => {
    this.setState({
      fadeOut: true
    });
    setTimeout(() => {
      ModalActions.hideModal(this.props.modalId);
    }, 300);
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  render() {
    let { fade, overlay, noCloseBtn, overlayClose, style } = this.props;
    let { fadeOut } = this.state;
    return (
      <div
        className={getClassName("", {
          overlay,
          "fade-in": fade,
          "fade-out": fadeOut
        })}
        onClick={() => overlayClose && this.onClose()}
      >
        <div
          id={this.props.modalId}
          className="modal with-shadow"
          style={...style || {}}
        >
          {!noCloseBtn && (
            <a
              href="javascript:;"
              className="close-button"
              onClick={this.onClose}
            >
              &times;
            </a>
          )}
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default BaseModal;
