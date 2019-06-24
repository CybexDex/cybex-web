import * as React from "react";
import * as PropTypes from "prop-types";

import { getClassName } from "utils//ClassName";
import { connect } from "alt-react";
import { ChainStore } from "cybexjs";
import GatewayStore from "stores/GatewayStore";
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
const debug = debugGen("WithdrawModal");

const style = {
  position: "fixed",
  left: 0,
  top: 0
};

type props = {
  modalId;
  withdrawInfo?;
  open?;
  className?;
  asset;
  balances?;
  account?;
  issuer?;
  receive_asset_name?;
  receive_asset_symbol?;
};
type state = {
  withdraw_address_loading;
  withdraw_address_error?;
  withdraw_address_valid;
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
  useCybAsFee?;
  withdraw_amount;
  withdraw_address: string;
  eosPrecisionError;
  withMemo;
  withdraw_address_origin;
  memoContent;
  outerPrecision: number;
};

class WithdrawModal extends React.Component<props, state> {
  nestedRef;
  static propTypes = {
    account: ChainTypes.ChainAccount.isRequired,
    issuer: ChainTypes.ChainAccount.isRequired,
    asset: ChainTypes.ChainAsset.isRequired,
    receive_asset_name: PropTypes.string,
    receive_asset_symbol: PropTypes.string,
    memo_prefix: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      withdraw_amount: 0,
      withdraw_address: "",
      fadeOut: false,
      fee_asset_id: "1.3.0",
      feeAmount: new Asset({ amount: 0 }),
      from_account: props.account,
      feeStatus: {},
      memo: null,
      hasPoolBalance: null,
      hasBalance: null,
      balanceError: null,
      error: false,
      useCybAsFee: true,
      eosPrecisionError: false,
      withdraw_address_loading: false,
      withdraw_address_valid: false,
      outerPrecision: 2,
      withMemo: false,
      withdraw_address_origin: "",
      memoContent: ""
    };
  }

  onWithdrawAmountChange = ({ amount }) => {
    let eosPrecisionError = false;
    let outerPrecision, p;
    try {
      outerPrecision =
        this.props.withdrawInfo.type === "EOS"
          ? 4
          : this.props.withdrawInfo.precision ||
            this.props.asset.get("precision");
    } catch (e) {
      outerPrecision = 4;
    }
    p = new BigNumber(1).dividedBy(Math.pow(10, outerPrecision));
    eosPrecisionError =
      new BigNumber(amount || 1)
        .dividedBy(p)
        .toString()
        .indexOf(".") !== -1;
    this.setState(
      {
        withdraw_amount: amount,
        eosPrecisionError,
        outerPrecision: p.toString()
      },
      this._checkBalance
    );
  };

  onMemoToggleChange = e => {
    let withMemo = e.target.checked;
    let fullAddress = this.state.withdraw_address;
    let fakeE;
    this.setState({
      withMemo,
      memoContent: ""
    });
    if (!withMemo) {
      fakeE = {
        target: {
          value: this.state.withdraw_address_origin
        }
      };
      this.onWithdrawAddressChanged(fakeE);
    } else {
      fakeE = {
        target: {
          value: this.state.withdraw_address
        }
      };
      this.onWithdrawOriginAddrChange(fakeE);
    }
  };

  onWithdrawMemoChange = e => {
    if (!this.state.withMemo) return;
    let memoContent = e.target.value;
    this.setState({
      memoContent
    });
    let value = memoContent
      ? `${this.state.withdraw_address_origin}[${memoContent}]`
      : this.state.withdraw_address_origin;
    let fakeE = {
      target: {
        value
      }
    };
    this.onWithdrawAddressChanged(fakeE);
  };

  onWithdrawOriginAddrChange = e => {
    let withdraw_address_origin = e.target.value;
    this.setState({
      withdraw_address_origin
    });
    let value =
      this.state.withMemo && this.state.memoContent
        ? `${withdraw_address_origin}[${this.state.memoContent}]`
        : withdraw_address_origin;
    let fakeE = {
      target: {
        value
      }
    };
    this.onWithdrawAddressChanged(fakeE);
  };

  onWithdrawAddressChanged(e) {
    this.setState(
      {
        withdraw_address: e.target.value,
        withdraw_address_loading: true,
        withdraw_address_valid: false
      },
      this._updateFee
    );
    this.validateAddress(e.target.value);
  }

  _validateAddress = async (address: string) => {
    let valid;
    try {
      let res = await verifyAddress(
        address,
        this.props.account.get("name"),
        this.props.withdrawInfo.type
      );
      debug("Verify Res: ", res);
      valid = res.valid;
    } catch (e) {
      return this.setState({
        withdraw_address_loading: false,
        withdraw_address_valid: false,
        withdraw_address_error: true
      });
    }
    this.setState(
      {
        withdraw_address_loading: false,
        withdraw_address_error: false,
        withdraw_address_valid: valid
      },
      this._updateFee
    );
    debug("Valid: ", valid);
  };

  validateAddress = debounce(this._validateAddress, 250);

  componentWillMount() {
    // this._updateFee();
    // this._checkFeeStatus();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.withdrawInfo &&
      prevProps.withdraw &&
      this.props.withdrawInfo.type != prevProps.withdrawInfo.type
    ) {
      this.setState({
        withMemo: false
      });
    }
  }

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
        content: this._withdrawMemo()
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
            content: this._withdrawMemo()
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

  onFeeCheckboxChange(e) {
    let useCybAsFee: boolean = e.target.checked;
    this.setState({
      useCybAsFee
    });
  }

  _checkBalance() {
    const { feeAmount, withdraw_amount } = this.state;
    const { asset } = this.props;
    const balances = this.props.account.get("balances").toJS();
    let current_asset_id = this.props.asset.get("id");
    let balance = balances[current_asset_id]; //Todo
    if (!balance || !feeAmount) return;
    let balanceObject = ChainStore.getObject(balance);
    const hasBalance = checkBalance(
      withdraw_amount,
      asset,
      feeAmount,
      balanceObject
    );
    if (hasBalance === null) return;
    this.setState({ balanceError: !hasBalance });
    return hasBalance;
  }

  onSubmit = () => {
    let { useCybAsFee } = this.state;
    let precision = this.props.asset.get("precision");
    let withdrawAmount = calcAmount(this.state.withdraw_amount, precision);
    let gatewayFeeAmount = calcAmount(this.props.withdrawInfo.fee, precision);
    AccountActions.transfer(
      this.props.account.get("id"),
      this.props.withdrawInfo.gatewayAccount,
      withdrawAmount,
      this.props.asset.get("id"),
      this._withdrawMemo(),
      null,
      this.state.feeAsset ? this.state.feeAsset.get("id") : "1.3.0"
    ).catch(error => {
      NotificationActions.error(
        counterpart.translate("modal.withdraw.lack_memo")
      );
    });
  };

  _withdrawMemo = () => {
    return (
      "withdraw:" +
      GATEWAY_ID +
      ":" +
      this.props.withdrawInfo.type +
      ":" +
      this.state.withdraw_address
    );
  };

  // Subcomponent
  invalid_address_message = (
    <div className="has-error" style={{ paddingTop: 10 }}>
      <Translate
        content="gateway.valid_address"
        coin_type={this.props.withdrawInfo.type}
      />
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
        { withdraw_amount: balance.getAmount({ real: true }) },
        this._checkBalance
      );
    }
  }

  // render
  render() {
    let { asset, withdrawInfo, modalId } = this.props;
    let {
      withdraw_amount,
      withdraw_address,
      withdraw_address_valid,
      withdraw_address_loading,
      withdraw_address_error,
      useCybAsFee,
      eosPrecisionError,
      memo,
      withdraw_address_origin,
      withMemo,
      feeAsset,
      memoContent
    } = this.state;

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
    let gatewayServiceInvalid =
      withdraw_address && !withdraw_address_loading && withdraw_address_error;

    let addressInvalid =
      withdraw_address &&
      !withdraw_address_loading &&
      !withdraw_address_valid &&
      !withdraw_address_error;

    let amountValid = Number(withdraw_amount) >= withdrawInfo.minValue;
    let disableSubmit =
      !withdraw_address ||
      withdraw_address_loading ||
      addressInvalid ||
      this.state.balanceError ||
      gatewayServiceInvalid ||
      eosPrecisionError ||
      !amountValid;
    // withdraw_amount <= 0;
    let assetName: string = utils.replaceName(this.props.asset.get("symbol"))
      .name;
    let isEOS =
      assetName.indexOf("EOS") !== -1 ||
      assetName === "LC" ||
      assetName.indexOf("XRP") !== -1 ||
      assetName.indexOf("IRIS") !== -1 ||
      assetName.indexOf("ATOM") !== -1;
    let memoName = assetName.indexOf("XRP") !== -1 ? "tag" : "memo/tag";

    return (
      <BaseModal modalId={modalId}>
        <div className="content-block">
          <h3>
            <Translate content={"gateway.withdraw"} />
            {" " + assetName}({this.props.receive_asset_symbol})
          </h3>
        </div>
        <div className="content-block">
          <p>
            {
              <Translate
                unsafe
                content="gateway.withdraw_funds"
                type={this.props.receive_asset_symbol}
                asset={assetName}
              />
            }
          </p>
        </div>
        <div className="content-block">
          <AmountSelector
            label="modal.withdraw.amount"
            amount={this.state.withdraw_amount}
            asset={this.props.asset.get("id")}
            assets={[this.props.asset.get("id")]}
            placeholder="0.0"
            onChange={this.onWithdrawAmountChange.bind(this)}
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
              },
              {
                name: "withdraw-amount",
                isError: !amountValid && Number(withdraw_amount) != 0,
                isI18n: true,
                message: "gateway.low_limit",
                messageParams: {
                  symbol: this.props.withdrawInfo.type,
                  amount: this.props.withdrawInfo.minValue
                }
              },
              {
                name: "withdraw-precision",
                isError: eosPrecisionError,
                isI18n: true,
                message: "gateway.precision_error",
                messageParams: {
                  symbol: this.props.withdrawInfo.type,
                  amount: this.state.outerPrecision
                }
              }
            ]}
            muiltTips={false}
          />
        </div>
        <div className="content-block">
          <label className="left-label">
            {!isEOS ? (
              <Translate
                component="span"
                content="modal.withdraw.address"
                type={assetName}
              />
            ) : (
              <Translate
                component="span"
                content="modal.withdraw.to_eos"
                type={assetName}
              />
            )}
          </label>
          <div className="inline-label">
            <Input
              size="small"
              style={{ width: "100%" }}
              id="withdrawAddress"
              name="withdrawAddress"
              type="text"
              value={withMemo ? withdraw_address_origin : withdraw_address}
              valueFromOuter={true}
              onChange={
                withMemo
                  ? this.onWithdrawOriginAddrChange.bind(this)
                  : this.onWithdrawAddressChanged.bind(this)
              }
              autoComplete="off"
            />
          </div>
        </div>
        <div className="content-block">
          {isEOS && (
            <div className="inline-label use-cyb">
              <Translate
                className="left-label"
                component="lebel"
                content="modal.withdraw.with_memo"
                memo={memoName}
              />
              <div className="switch">
                <input
                  id="withMemo"
                  type="checkbox"
                  value={withMemo}
                  defaultChecked={false}
                  onChange={this.onMemoToggleChange}
                />
                <label htmlFor="withMemo" />
              </div>
            </div>
          )}
          {withMemo && (
            <div style={{ marginTop: 10 }}>
              <label className="left-label">
                <Translate
                  component="span"
                  memo={memoName}
                  content="gateway.withdraw_memo"
                />
              </label>
              <div className="inline-label">
                <Input
                  type="text"
                  size="small"
                  style={{ width: "100%" }}
                  id="withdrawAddressMemo"
                  name="withdrawAddressMemo"
                  value={memoContent}
                  valueFromOuter={true}
                  onChange={this.onWithdrawMemoChange.bind(this)}
                  autoComplete="off"
                />
              </div>
            </div>
          )}
          <ErrorTipBox
            isI18n={true}
            placeholder={true}
            messageParams={{ memo: memoName }}
            tips={[
              {
                name: "withdraw-address",
                isError: withdraw_address.indexOf(" ") !== -1,
                isI18n: true,
                message: "gateway.space_in_memo"
              },
              {
                name: "withdraw-address",
                isError: addressInvalid,
                isI18n: true,
                message: "gateway.valid_address",
                messageParams: {
                  coin_type: this.props.withdrawInfo.type
                }
              },
              {
                name: "withdraw-gateway",
                isError: gatewayServiceInvalid,
                isI18n: true,
                message: "gateway.valid_service"
              },
              {
                name: "withdraw-gateway",
                isError: withdraw_address_loading,
                isI18n: true,
                message: "gateway.loading"
              }
            ]}
            muiltTips={false}
          />
        </div>
        <hr />
        {/* Gate fee */}
        {this.props.withdrawInfo.fee ? (
          <div
            className="amount-selector right-selector"
            style={{ paddingBottom: 20 }}
          >
            <label className="left-label">
              <Translate content="gateway.fee" />
              <TipMark>
                <Translate content="gateway.fee_tip_outer" />
              </TipMark>
            </label>
            <div className="inline-label input-wrapper">
              <Input
                size="small"
                style={{ width: "100%" }}
                type="text"
                disabled
                valueFromOuter={true}
                value={this.props.withdrawInfo.fee}
              />

              <div className="form-label select floating-dropdown">
                <div className="dropdown-wrapper inactive">
                  <div>{withdrawInfo.type}</div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

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

// let WithdrawModalWrapper = WithdrawModal;
let WithdrawModalWrapper = BindToChainState(WithdrawModal, {
  keep_updating: true,
  show_loader: true
});

WithdrawModalWrapper = connect(
  WithdrawModalWrapper,
  {
    listenTo() {
      return [GatewayStore];
    },
    getProps(props) {
      let { modalId } = props;
      let withdrawInfo = GatewayStore.getState().withdrawInfo;
      return {
        open: GatewayStore.getState().modals.get(modalId),
        withdrawInfo,
        receive_asset_symbol: withdrawInfo.type,
        asset: GatewayStore.getState().withdrawInfo.asset
      };
    }
  }
);

export default WithdrawModalWrapper;
