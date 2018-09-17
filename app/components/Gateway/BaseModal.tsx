import * as React from "react"; import * as PropTypes from "prop-types";

import { getClassName } from "utils//ClassName";
import { GatewayActions } from "actions/GatewayActions";

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
        <div id={this.props.modalId} className="modal with-shadow">
          <a href="javascript:;" className="close-button" onClick={this.onClose}>&times;</a>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default BaseModal;