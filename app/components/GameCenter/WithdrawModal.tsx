import * as React from "react";
import { connect } from "alt-react";
import { ChainStore } from "cybexjs";
import BindToChainState from "../Utility/BindToChainState";
import AmountSelector from "components/Utility/AmountSelector";
import ChainTypes from "../Utility/ChainTypes";
import { Asset } from "lib/common/MarketClasses";
import Translate from "react-translate-component";
import ErrorTipBox from "../Utility/ErrorTipBox";
import utils from "common/utils";
import { debugGen } from "utils";
import { checkBalance } from "lib/common/trxHelper";
import { BaseModal } from "./BaseModal";
import { calcAmount } from "utils//Asset";
import { Input, Button } from "components/Common";
import { GameStore } from "./GameStore";
const debug = debugGen("WithdrawModal");

type props = {
  modalId;
  className?;
  asset?;
  balances?;
  account?;
  issuer?;
  withdrawAccount?;
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
  withdrawAmount;
};

class WithdrawModal extends React.Component<props, state> {
  nestedRef;

  constructor(props) {
    super(props);
    console.debug("GameWithdrawModal: ", props);
    this.state = {
      withdrawAmount: 0,
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
        withdrawAmount: amount
      },
      this._checkBalance
    );
  };

  setNestedRef(ref) {
    this.nestedRef = ref;
  }

  _checkBalance() {
    const { feeAmount, withdrawAmount } = this.state;
    const { asset } = this.props;
    const balances = this.props.account.get("balances").toJS();
    let current_asset_id = this.props.asset.get("id");
    let balance = balances[current_asset_id]; //Todo
    if (!balance || !feeAmount) return;
    let balanceObject = ChainStore.getObject(balance);
    const hasBalance = checkBalance(
      withdrawAmount,
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
    let withdrawAmount = calcAmount(this.state.withdrawAmount, precision);
  };

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
        { withdrawAmount: balance.getAmount({ real: true }) },
        this._checkBalance
      );
    }
  }

  // render
  render() {
    let { asset, modalId } = this.props;
    let { withdrawAmount } = this.state;

    let amountValid = Number(withdrawAmount) >= 0;
    let disableSubmit = this.state.balanceError || !amountValid;
    // withdraw_amount <= 0;

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
            amount={this.state.withdrawAmount}
            asset={this.props.asset.get("id")}
            assets={[this.props.asset.get("id")]}
            placeholder="0.0"
            onChange={this.onAmountChange.bind(this)}
            display_balance={1}
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

// let WithdrawModalWrapper = WithdrawModal;
let WithdrawModalWrapper = BindToChainState(WithdrawModal, {
  keep_updating: true,
  show_loader: true
});

WithdrawModalWrapper = connect(
  WithdrawModalWrapper,
  {
    listenTo() {
      return [GameStore];
    },
    getProps(props) {
      let { modalId } = props;
      return {
        withdrawInfo: GameStore.getState().withdrawInfo
      };
    }
  }
);

export default WithdrawModalWrapper;
