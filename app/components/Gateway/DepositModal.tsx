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
import counterpart from "counterpart";
import utils from "lib/common/utils";
import LoadingIndicator from "../LoadingIndicator";


const style = {
  position: "fixed",
  left: 0,
  top: 0
};

type props = { fade?, modalId, depositInfo?, open?, className?, asset, balances?};

const CurrentBalance = ({ currentBalance, asset }) => {
  console.debug("Asset: ", asset, currentBalance);
  const { name: assetName } = utils.replaceName(asset.get("symbol"), !!asset.get("bitasset"));

  const applyBalanceButton =
    <span style={{ border: "2px solid black", borderLeft: "none" }} className="form-label">{assetName}</span>;

  return (
    <div className="SimpleTrade__withdraw-row" style={{ fontSize: "1rem" }}>
      <label style={{ fontSize: "1rem" }}>
        {counterpart.translate("gateway.balance_asset", { asset: assetName })}:
                <span className="inline-label">
          <input
            disabled
            style={{ color: "white", border: "2px solid black", padding: 10, width: "100%" }}
            value={currentBalance && currentBalance.getAmount ? currentBalance.getAmount({ real: true }) : 0}
          />
          {applyBalanceButton}
        </span>
      </label>
    </div>
  );
}


class DepositModal extends React.Component<props, { fadeOut }> {

  static propTypes = {
    asset: ChainTypes.ChainAsset.isRequired,
    balances: ChainTypes.ChainObjectsList
    // assets: ChainTypes.ChainAssetsList.isRequired
  };


  constructor(props) {
    super(props);
    this.state = {
      fadeOut: false
    };
  }

  getNewAddress = () => {
    let { depositInfo } = this.props;
    GatewayActions.updateDepositAddress(depositInfo.account, depositInfo.type);
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
    let { fade, asset, depositInfo } = this.props;
    let { fadeOut } = this.state;
    let currentBalance = this.props.balances.find(b => {
      return b && b.get && b.get("asset_type") === this.props.asset.get("id");
    });
    let balance = new Asset({
      asset_id: asset.get("id"),
      precision: asset.get("precision"),
      amount: currentBalance ? currentBalance.get("balance") : 0
    });
    let assetName = asset.get("symbol");
    console.debug(this.props, currentBalance, balance);
    return (
      <div className={getClassName("overlay", { "fade-in": fade, "fade-out": fadeOut })}>
        <div id={this.props.modalId} className="modal">
          <a href="javascript:;" className="close-button" onClick={this.onClose}>&times;</a>
          <h3><Translate content={"gateway.deposit"} /> {assetName}</h3>
          {/* <p><Translate content="gateway.withdraw_funds" asset={assetName} /></p> */}
          <p><Translate unsafe content="gateway.add_funds" account={depositInfo.account} /></p>
          {currentBalance && <CurrentBalance currentBalance={balance} asset={asset} />}
          <div className="SimpleTrade__withdraw-row">
            <p style={{ marginBottom: 10 }} data-place="right" data-tip={counterpart.translate("tooltip.deposit_tip", { asset: assetName })}>
              <span className="help-tooltip">
                {counterpart.translate("gateway.deposit_to", { asset: assetName })}
              </span>
            </p>
            {!depositInfo ? <LoadingIndicator type="three-bounce" /> : <label>
              <span className="inline-label">
                <input readOnly type="text" value={depositInfo.address} />

                <CopyButton
                  text={depositInfo.address}
                />
              </span>
            </label>}
            <div className="button-group SimpleTrade__withdraw-row">
              <button className="button" onClick={this.getNewAddress} type="submit" >
                <Translate content="gateway.generate_new" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
let DepositModalWrapper = BindToChainState(DepositModal, { keep_updating: true, show_loader: true });

DepositModalWrapper = connect(DepositModalWrapper, {
  listenTo() {
    return [GatewayStore];
  },
  getProps(props) {
    console.debug("Props: ", props);
    let { modalId } = props;
    console.debug("PROPS: ", GatewayStore.getState());
    return {
      open: GatewayStore.getState().modals.get(modalId),
      depositInfo: GatewayStore.getState().depositInfo,
      asset: GatewayStore.getState().depositInfo.type
    };
  }
});


export default DepositModalWrapper;