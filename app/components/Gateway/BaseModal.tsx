import * as React from "react";

import { getClassName } from "utils//ClassName";
import { connect } from "alt-react";
import GatewayStore from "stores/GatewayStore";
import { GatewayActions } from "actions/GatewayActions";
import BindToChainState from "../Utility/BindToChainState";
import ChainTypes from "../Utility/ChainTypes";
import { Asset } from "lib/common/MarketClasses";
import Translate from "react-translate-component";
import CopyButton from "../Utility/CopyButton";
import Icon from "../Icon/Icon";

type props = { fade?, modalId, className?};

export class BaseModal extends React.Component<props, { fadeOut }> {

  static defaultProps = {
    fade: true
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
      GatewayActions.closeModal(this.props.modalId);
    }, 300);
  }


  render() {
    let { fade } = this.props;
    let { fadeOut } = this.state;
    return (
      <div className={getClassName("overlay", { "fade-in": fade, "fade-out": fadeOut })}>
        <div id={this.props.modalId} className="modal">
          <a href="javascript:;" className="close-button" onClick={this.onClose}>&times;</a>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default BaseModal;