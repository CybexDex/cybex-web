import * as React from "react";
import * as PropTypes from "prop-types";

import { getClassName } from "utils//ClassName";
import { connect } from "alt-react";
import { ChainStore } from "cybexjs";
import { GatewayActions } from "actions/GatewayActions";
import { verifyAddress } from "services//GatewayService";
import { GATEWAY_ID } from "services/GatewayConfig";
import BindToChainState from "../Utility/BindToChainState";
import BalanceComponent from "components/Utility/BalanceComponent";
import AmountSelector from "components/Utility/AmountSelector";
import ChainTypes from "../Utility/ChainTypes";
import { Asset } from "lib/common/MarketClasses";
import Translate from "react-translate-component";
import CopyButton from "../Utility/CopyButton";
import ErrorTipBox from "../Utility/ErrorTipBox";
import Icon from "../Icon/Icon";
import counterpart from "counterpart";
import utils from "common/utils";
import { debugGen } from "utils";
import { checkFeeStatusAsync, checkBalance } from "lib/common/trxHelper";
import { debounce } from "lodash";
import { BaseModal } from "./BaseModal";
import AccountActions from "actions/AccountActions";
import { calcAmount } from "utils//Asset";
import { BigNumber } from "bignumber.js";
import { NotificationActions } from "actions/NotificationActions";
import { TipMark } from "components/Common/TipMark";
import { Input, Button } from "components/Common";
import { GameStore } from "./GameStore";
const debug = debugGen("DepositModal");

const style = {
  position: "fixed",
  left: 0,
  top: 0
};

type props = {
  modalId;
  open?;
  className?;
  asset?;
  balances?;
  account?;
  issuer?;
  depositAccount?;
};
type state = {
  feeAsset?;
  error;
  balanceError;
  hasPoolBalance;
  hasBalance;
  memo;
  feeStatus;
  from_account;
  fee_asset_id?;
  feeAmount?;
  fadeOut;
  depositAmount;
};

class DepositModal extends React.Component<props, state> {
  nestedRef;
  static propTypes = {
    // account: ChainTypes.ChainAccount.isRequired,
    depositAccount: ChainTypes.ChainAccount.isRequired,
    asset: ChainTypes.ChainAsset.isRequired
  };

  constructor(props) {
    super(props);
    console.debug("GameDepositModal: ", props);
    this.state = {
      depositAmount: 0,
      fadeOut: false,
      fee_asset_id: "1.3.0",
      feeAmount: new Asset({ amount: 0 }),
      from_account: props.account,
      feeStatus: {},
      memo: null,
      hasPoolBalance: null,
      hasBalance: null,
      balanceError: null,
      error: false
    };
  }

  onAmountChange = ({ amount }) => {
    this.setState(
      {
        depositAmount: amount
      },
      this._checkBalance
    );
  };

  onFeeChanged({ asset }) {
    this.setState(
      {
        feeAsset: asset,
        fee_asset_id: asset.get("id")
      },
      this._updateFee
    );
  }

  _updateFee(state = this.state) {
    let { fee_asset_id, from_account } = state;
    const { fee_asset_types } = this._getAvailableAssets(state);
    if (fee_asset_types.length === 1 && fee_asset_types[0] !== fee_asset_id) {
      fee_asset_id = fee_asset_types[0];
    }
    debug("UpdateFee: ", state);
    if (!from_account) return null;
    checkFeeStatusAsync({
      accountID: from_account.get("id"),
      feeID: fee_asset_id,
      options: ["price_per_kbyte"],
      data: {
        type: "memo",
        content: this._depositMemo()
      }
    }).then(({ fee, hasBalance, hasPoolBalance }) => {
      // if (this.unMounted) return;

      this.setState(
        {
          feeAmount: fee,
          hasBalance,
          hasPoolBalance,
          error: !hasBalance || !hasPoolBalance
        },
        this._checkBalance
      );
    });
  }

  _getAvailableAssets(state = this.state) {
    const { from_account, feeStatus } = state;
    function hasFeePoolBalance(id) {
      if (feeStatus[id] === undefined) return true;
      return feeStatus[id] && feeStatus[id].hasPoolBalance;
    }

    function hasBalance(id) {
      if (feeStatus[id] === undefined) return true;
      return feeStatus[id] && feeStatus[id].hasBalance;
    }

    let fee_asset_types = [];
    if (!(from_account && from_account.get("balances"))) {
      return { fee_asset_types };
    }
    let account_balances = state.from_account.get("balances").toJS();
    fee_asset_types = Object.keys(account_balances).sort(utils.sortID);
    for (let key in account_balances) {
      let asset = ChainStore.getObject(key);
      let balanceObject = ChainStore.getObject(account_balances[key]);
      if (balanceObject && balanceObject.get("balance") === 0) {
        if (fee_asset_types.indexOf(key) !== -1) {
          fee_asset_types.splice(fee_asset_types.indexOf(key), 1);
        }
      }

      if (asset) {
        // Remove any assets that do not have valid core exchange rates
        if (
          asset.get("id") !== "1.3.0" &&
          !utils.isValidPrice(asset.getIn(["options", "core_exchange_rate"]))
        ) {
          fee_asset_types.splice(fee_asset_types.indexOf(key), 1);
        }
      }
    }

    fee_asset_types = fee_asset_types.filter(a => {
      return hasFeePoolBalance(a) && hasBalance(a);
    });
    return { fee_asset_types };
  }

  _checkFeeStatus(state = this.state) {
    let account = state.from_account;
    if (!account) return;

    const { fee_asset_types: assets } = this._getAvailableAssets(state);
    // const assets = ["1.3.0", this.props.asset.get("id")];
    let feeStatus = {};
    let p = [];
    assets.forEach(a => {
      p.push(
        checkFeeStatusAsync({
          accountID: account.get("id"),
          feeID: a,
          options: ["price_per_kbyte"],
          data: {
            type: "memo",
            content: this._depositMemo()
          }
        })
      );
    });
    Promise.all(p)
      .then(status => {
        assets.forEach((a, idx) => {
          feeStatus[a] = status[idx];
        });
        if (!utils.are_equal_shallow(state.feeStatus, feeStatus)) {
          this.setState({
            feeStatus
          });
        }
        this._checkBalance();
      })
      .catch(err => {
        console.error(err);
      });
  }

  setNestedRef(ref) {
    this.nestedRef = ref;
  }

  _checkBalance() {
    const { feeAmount, depositAmount } = this.state;
    const { asset } = this.props;
    const balances = this.props.account.get("balances").toJS();
    let current_asset_id = this.props.asset.get("id");
    let balance = balances[current_asset_id]; //Todo
    if (!balance || !feeAmount) return;
    let balanceObject = ChainStore.getObject(balance);
    const hasBalance = checkBalance(
      depositAmount,
      asset,
      feeAmount,
      balanceObject
    );
    if (hasBalance === null) return;
    this.setState({ balanceError: !hasBalance });
    return hasBalance;
  }

  onSubmit = () => {
    let precision = this.props.asset.get("precision");
    let depositAmount = calcAmount(this.state.depositAmount, precision);
    AccountActions.transfer(
      this.props.account.get("id"),
      this.props.depositAccount.get("id"),
      depositAmount,
      this.props.asset.get("id"),
      this._depositMemo(),
      null,
      this.state.feeAsset ? this.state.feeAsset.get("id") : "1.3.0"
    ).catch(error => {
      NotificationActions.error(
        counterpart.translate("modal.withdraw.lack_memo")
      );
    });
  };

  _depositMemo = () => {
    return "game:deposit:" + this.props.account.get("name");
  };

  // Subcomponent
  invalid_address_message = (
    <div className="has-error" style={{ paddingTop: 10 }}>
      <Translate content="gateway.valid_address" coin_type={this.props.asset} />
    </div>
  );

  invalid_gateway_message = (
    <div className="has-error" style={{ paddingTop: 10 }}>
      <Translate content="gateway.valid_service" />
    </div>
  );

  _setTotal(asset_id, balance_id) {
    const { feeAmount } = this.state;
    let balanceObject = ChainStore.getObject(balance_id);
    let transferAsset = ChainStore.getObject(asset_id);

    let balance = new Asset({
      amount: balanceObject.get("balance"),
      asset_id: transferAsset.get("id"),
      precision: transferAsset.get("precision")
    });

    if (balanceObject) {
      if (feeAmount.asset_id === balance.asset_id) {
        balance.minus(feeAmount);
      }
      this.setState(
        { depositAmount: balance.getAmount({ real: true }) },
        this._checkBalance
      );
    }
  }

  // render
  render() {
    let { asset, modalId } = this.props;
    let { depositAmount, memo, feeAsset } = this.state;

    let balance = null;
    // console.log( "account: ", this.props.account.toJS() );
    let account_balances = this.props.account.get("balances").toJS();
    // console.log( "balances: ", account_balances );
    let fee = this.state.feeAmount.getAmount({ real: true });
    let feeID = feeAsset ? feeAsset.get("id") : "1.3.0";
    let asset_types = Object.keys(account_balances);
    if (asset_types.length > 0) {
      let current_asset_id = this.props.asset.get("id");
      if (current_asset_id)
        balance = (
          <span
            style={{ borderBottom: "#A09F9F 1px dotted", cursor: "pointer" }}
            onClick={this._setTotal.bind(
              this,
              current_asset_id,
              account_balances[current_asset_id],
              fee,
              feeID
            )}
          >
            <Translate component="span" content="transfer.available" />:
            <BalanceComponent balance={account_balances[current_asset_id]} />
          </span>
        );
      else balance = "No funds";
    } else {
      balance = "No funds";
    }
    let { fee_asset_types } = this._getAvailableAssets();

    // State Control

    let amountValid = Number(depositAmount) >= 0;
    let disableSubmit = this.state.balanceError || !amountValid;
    // withdraw_amount <= 0;
    let assetName: string = utils.replaceName(this.props.asset.get("symbol"))
      .name;

    return (
      <BaseModal modalId={modalId}>
        <div className="content-block">
          <h3>
            <Translate content={"gateway.withdraw"} />
            {" " + assetName}
          </h3>
        </div>
        <div className="content-block">
          <p>
            {
              <Translate
                unsafe
                content="gateway.withdraw_funds"
                type={"USDT"}
                asset={assetName}
              />
            }
          </p>
        </div>
        <div className="content-block">
          <AmountSelector
            label="modal.withdraw.amount"
            amount={this.state.depositAmount}
            asset={this.props.asset.get("id")}
            assets={[this.props.asset.get("id")]}
            placeholder="0.0"
            onChange={this.onAmountChange.bind(this)}
            display_balance={balance}
          />
          <ErrorTipBox
            isI18n={true}
            tips={[
              {
                name: "insufficient",
                isError: this.state.balanceError,
                isI18n: true,
                message: "transfer.errors.insufficient"
              }
            ]}
            muiltTips={false}
          />
        </div>

        <div className="content-block gate_fee">
          <AmountSelector
            labelTooltip={{
              id: "gate_fee_tip",
              component: <Translate content="gateway.fee_tip_inner" />
            }}
            refCallback={this.setNestedRef.bind(this)}
            label="gateway.fee_transfer"
            disabled={true}
            amount={this.state.feeAmount.getAmount({ real: true })}
            onChange={this.onFeeChanged.bind(this)}
            asset={this.state.feeAmount.asset_id}
            assets={fee_asset_types}
          />
          {!this.state.hasBalance ? (
            <p className="has-error no-margin" style={{ paddingTop: 10 }}>
              <Translate content="transfer.errors.noFeeBalance" />
            </p>
          ) : null}
          {!this.state.hasPoolBalance ? (
            <p className="has-error no-margin" style={{ paddingTop: 10 }}>
              <Translate content="transfer.errors.noPoolBalance" />
            </p>
          ) : null}
        </div>

        {/* Withdraw/Cancel buttons */}
        <Button
          onClick={this.onSubmit}
          type="primary"
          style={{ width: "100%" }}
          disabled={disableSubmit}
        >
          <Translate content="modal.withdraw.submit" onClick={this.onSubmit} />
        </Button>
      </BaseModal>
    );
  }
}

// let DepositModalWrapper = DepositModal;
let DepositModalWrapper = BindToChainState(DepositModal, {
  keep_updating: true,
  show_loader: true
});

DepositModalWrapper = connect(
  DepositModalWrapper,
  {
    listenTo() {
      return [GameStore];
    },
    getProps(props) {
      let { modalId } = props;
      console.debug("GameDeposit", props, GameStore.getState().depositInfo);
      return {
        open: GameStore.getState().modals.has(modalId),
        asset: GameStore.getState().depositInfo.asset,
        depositAccount: GameStore.getState().depositInfo.depositAccount
      };
    }
  }
);

export default DepositModalWrapper;
