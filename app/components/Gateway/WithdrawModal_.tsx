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

import { BaseModal } from "./BaseModal";
import { CurrentBalance } from "./Common";

type props = { modalId, depositInfo?, open?, className?, asset, balances?};

class DepositModal extends React.Component<props, { fadeOut, withdraw_amount, withdraw_address }> {
  static propTypes = {
    account: ChainTypes.ChainAccount.isRequired,
    issuer: ChainTypes.ChainAccount.isRequired,
    asset: ChainTypes.ChainAsset.isRequired,
    receive_asset_name: React.PropTypes.string,
    receive_asset_symbol: React.PropTypes.string,
    memo_prefix: React.PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      withdraw_amount: null,
      withdraw_address: null,
      fadeOut: false
    };
  }

  getNewAddress = () => {
    let { depositInfo } = this.props;
    GatewayActions.updateDepositAddress(depositInfo.account, depositInfo.type);
  }

  render() {
    let { asset, depositInfo, modalId } = this.props;
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
      <BaseModal modalId={modalId} >
        <h3><Translate content={"gateway.withdraw"} /> {assetName}</h3>
        {/* <p><Translate content="gateway.withdraw_funds" asset={assetName} /></p> */}
        <p>
          {<Translate unsafe content="gateway.add_funds" account={depositInfo.account} />}
        </p>
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
      </BaseModal>
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