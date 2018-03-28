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
import NewDepositAddress from "./NewDepositAddress";

import { BaseModal } from "./BaseModal";
import { CurrentBalance } from "./Common";
import * as moment from "moment";

const style = {
  position: "fixed",
  left: 0,
  top: 0
};

type props = { modalId, depositInfo?, open?, className?, type, asset, balances?};

class DepositModal extends React.Component<props, { fadeOut }> {

  static propTypes = {
    asset: ChainTypes.ChainAsset.isRequired,
    balances: ChainTypes.ChainObjectsList
    // assets: ChainTypes.ChainAssetsList.isRequired
  };


  constructor(props) {
    super(props);
  }

  getNewAddress = () => {
    let { depositInfo } = this.props;
    GatewayActions.updateDepositAddress(depositInfo.accountName, depositInfo.type, true);
  }

  render() {
    let { asset, depositInfo, modalId, type } = this.props;
    let currentBalance = this.props.balances.find(b => {
      return b && b.get && b.get("asset_type") === this.props.asset.get("id");
    });
    let balance = new Asset({
      asset_id: asset.get("id"),
      precision: asset.get("precision"),
      amount: currentBalance ? currentBalance.get("balance") : 0
    });
    let assetName = type;
    return (
      <BaseModal modalId={modalId} >
        <h3><Translate content={"gateway.deposit"} /> {asset.get("symbol")}({assetName})</h3>
        <p>
          {<Translate unsafe content="gateway.add_funds" type={assetName} account={depositInfo.accountName} />}
        </p>
        {currentBalance && <CurrentBalance currentBalance={balance} asset={asset} />}
        <div className="SimpleTrade__withdraw-row">
          <p style={{ marginBottom: 10 }}
            data-place="right"
            data-tip={counterpart.translate("tooltip.deposit_tip", { asset: assetName })}
          >
            <span className="help-tooltip">
              {counterpart.translate("gateway.deposit_to", { asset: assetName })}
            </span>
          </p>
          {!depositInfo ? <LoadingIndicator type="three-bounce" /> : <label>
            <span className="inline-label">
              <input id="depositAddress" readOnly type="text" value={depositInfo.address} />
              <CopyButton
                text={depositInfo.address}
              />
            </span>
          </label>}
          <div className="SimpleTrade__withdraw-row">
            <p>Current address is generated {moment(depositInfo.createAt).fromNow()}</p>
          </div>
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
    let { modalId } = props;
    
    return {
      open: GatewayStore.getState().modals.get(modalId),
      depositInfo: GatewayStore.getState().depositInfo,
      type: GatewayStore.getState().depositInfo.type,
      asset: GatewayStore.getState().depositInfo.asset
    };
  }
});


export default DepositModalWrapper;