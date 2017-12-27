import * as React from "react";

import { getClassName } from "utils//ClassName";
import { connect } from "alt-react";
import GatewayStore from "stores/GatewayStore";
import { GatewayActions } from "actions/GatewayActions";
import BindToChainState from "../Utility/BindToChainState";
import ChainTypes from "../Utility/ChainTypes";

const style = {
  position: "fixed",
  left: 0,
  top: 0
};

type props = { fade?, modalId, open?, className?, assets, balances?};

class DepositModal extends React.Component<props, { fadeOut }> {

  static propTypes = {
    asset: ChainTypes.ChainAsset.isRequired
    // assets: ChainTypes.ChainAssetsList.isRequired
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
    this.props.balances.find(b => {
      return b && b.get("asset_type") === this.props.asset.get("id");
    });
    return (
      <div className={getClassName("overlay", { "fade-in": fade, "fade-out": fadeOut })}>
        <div id={this.props.modalId} className="modal">
          <a href="javascript:;" className="close-button" onClick={this.onClose}>&times;</a>
          <h1>Deposit </h1>
        </div>
      </div>
    );
  }
}


let DepositModalWrapper = connect(DepositModal, {
  listenTo() {
    return [GatewayStore];
  },
  getProps(props) {
    console.debug("Props: ", props);
    let { modalId } = props;
    console.debug("PROPS: ", GatewayStore.getState().modals.get(modalId));
    return {
      open: GatewayStore.getState().modals.get(modalId)
    };
  }
});

DepositModalWrapper = BindToChainState(DepositModal)

export { DepositModalWrapper }
export default DepositModalWrapper;