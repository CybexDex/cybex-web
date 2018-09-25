import * as React from "react";
import * as PropTypes from "prop-types";
import BaseModal from "../Modal/BaseModal";
import ZfApi from "react-foundation-apps/src/utils/foundation-api";
import Transaction from "./Transaction";
import Translate from "react-translate-component";
import TransactionConfirmActions from "actions/TransactionConfirmActions";
import TransactionConfirmStore from "stores/TransactionConfirmStore";
import { connect } from "alt-react";
import Icon from "../Icon/Icon";
import LoadingIndicator from "../LoadingIndicator";
import WalletDb from "stores/WalletDb";
import AccountStore from "stores/AccountStore";
import SettingsStore from "stores/SettingsStore";
import AccountSelect from "components/Forms/AccountSelect";
import { ChainStore } from "cybexjs";
import utils from "common/utils";
import Operation from "components/Blockchain/Operation";
import { Button } from "components/Common/Button";
import notify from "actions/NotificationActions";
import { getErrorTrans } from "utils";

class TransactionConfirm extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (!nextProps.transaction) {
      return false;
    }

    return !utils.are_equal_shallow(nextProps, this.props);
  }

  componentDidUpdate() {
    if (!this.props.closed) {
      ZfApi.publish("transaction_confirm_modal", "open");
    } else {
      ZfApi.publish("transaction_confirm_modal", "close");
    }
  }

  onConfirmClick(e) {
    e.preventDefault();
    if (this.props.propose) {
      const propose_options = {
        fee_paying_account: ChainStore.getAccount(
          this.props.fee_paying_account
        ).get("id")
      };
      this.props.transaction.update_head_block().then(() => {
        WalletDb.process_transaction(
          this.props.transaction.propose(propose_options),
          null,
          true
        );
      });
    } else {
      TransactionConfirmActions.broadcast(
        this.props.transaction,
        this.props.resolve,
        this.props.reject
      );
    }
  }

  onCloseClick(e) {
    e.preventDefault();
    TransactionConfirmActions.close();
  }

  onProposeClick(e) {
    e.preventDefault();
    TransactionConfirmActions.togglePropose();
  }

  onProposeAccount(fee_paying_account) {
    ChainStore.getAccount(fee_paying_account);
    TransactionConfirmActions.proposeFeePayingAccount(fee_paying_account);
  }

  componentWillReceiveProps(np) {
    if (np.broadcast && np.included && !this.props.included && !np.error) {
      notify.addNotification.defer({
        children: (
          <div>
            <p>
              <Translate content="transaction.transaction_confirmed" />
              &nbsp;&nbsp;<span>
                <Icon name="checkmark-circle" size="1x" className="success" />
              </span>
            </p>
            <table>
              <Operation
                op={this.props.transaction.serialize().operations[0]}
                block={1}
                current={"1.2.0"}
                hideFee
                inverted={false}
                hideOpLabel={true}
                hideDate={true}
              />
            </table>
          </div>
        ),
        level: "success",
        autoDismiss: 3
      });
    }
  }

  render() {
    let { broadcast, broadcasting, appendParams } = this.props;
    let errorTrans = getErrorTrans(this.props.error);
    if (!this.props.transaction || this.props.closed) {
      return null;
    }
    let button_group,
      header,
      confirmButtonClass = "button nowrap";
    if (this.props.propose && !this.props.fee_paying_account)
      confirmButtonClass += " disabled";

    if (this.props.error || this.props.included) {
      header = this.props.error ? (
        <div
          style={{ minHeight: 40 }}
          className="grid-content modal-header has-error"
        >
          <Translate component="h3" content="transaction.broadcast_fail" />
          {errorTrans ? (
            <Translate component="h6" content={`error_details.${errorTrans}`} />
          ) : (
            <h6>{this.props.error}</h6>
          )}
        </div>
      ) : (
        <div style={{ minHeight: 40 }} className="grid-content modal-header">
          <div className="float-left">
            <Icon name="checkmark-circle" size="4x" className="success" />
          </div>
          <Translate
            component="h3"
            content="transaction.transaction_confirmed"
          />
          <h6>
            #{this.props.trx_id}@{this.props.trx_block_num}
          </h6>
        </div>
      );
      button_group = (
        <div className="button-group">
          <Button type="secondary" onClick={this.onCloseClick.bind(this)}>
            <Translate content="transfer.close" />
          </Button>
        </div>
      );
    } else if (broadcast) {
      header = (
        <div style={{ minHeight: 40 }} className="grid-content modal-header">
          <Translate component="h3" content="transaction.broadcast_success" />
          <Translate component="h6" content="transaction.waiting" />
        </div>
      );
      button_group = (
        <div className="button-group">
          <Button type="secondary" onClick={this.onCloseClick.bind(this)}>
            <Translate content="transfer.close" />
          </Button>
        </div>
      );
    } else if (broadcasting) {
      header = (
        <div style={{ minHeight: 40 }} className="grid-content modal-header">
          <Translate component="h3" content="transaction.broadcasting" />
          <div style={{ width: "100%", textAlign: "center" }}>
            <LoadingIndicator type="three-bounce" />
          </div>
        </div>
      );
      button_group = <div style={{ height: 55 }} />;
    } else {
      header = (
        <div style={{ minHeight: 40 }} className="grid-content modal-header">
          <Translate component="h3" content="transaction.confirm" />
        </div>
      );
      button_group = (
        <div className="button-group">
          <div
            className="grid-block full-width-content"
            style={{ alignItems: "center" }}
          >
            <Button
              onClick={this.onConfirmClick.bind(this)}
              type="primary"
              style={{ whiteSpace: "nowrap", marginRight: "0.5em" }}
            >
              {this.props.propose ? (
                <Translate content="propose" />
              ) : (
                <Translate content="transfer.confirm" />
              )}
            </Button>
            <Button
              type="secondary"
              style={{ minHeight: 42 }}
              onClick={this.onCloseClick.bind(this)}
            >
              <Translate content="account.perm.cancel" />
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div ref="transactionConfirm">
        <BaseModal
          id="transaction_confirm_modal"
          ref="modal"
          overlay={true}
          overlayClose={!broadcasting}
          noCloseBtn={true}
        >
          <div
            style={{ minHeight: 250 }}
            className="grid-block vertical no-padding no-margin"
          >
            {!broadcasting ? (
              <div
                className="close-button"
                onClick={this.onCloseClick.bind(this)}
              >
                &times;
              </div>
            ) : null}
            {header}

            {appendParams}
            <div
              className="grid-content shrink"
              style={{
                maxHeight: "60vh",
                overflowY: "auto",
                overflowX: "hidden"
              }}
            >
              <Transaction
                key={Date.now()}
                trx={this.props.transaction.serialize()}
                index={0}
                no_links={true}
              />
            </div>
            <div className="grid-content shrink" style={{ padding: "1rem" }}>
              {/* P R O P O S E   T O G G L E */}
              {this.props.enabledProposal &&
              !this.props.transaction.has_proposed_operation() &&
              !(broadcast || broadcasting) ? (
                <div
                  className="grid-block form-group"
                  style={{
                    justifyContent: "space-between",
                    alignItems: "flex-end"
                  }}
                >
                  <label style={{ paddingLeft: "5px" }}>
                    <Translate content="propose" />:
                  </label>
                  <div
                    className="switch"
                    onClick={this.onProposeClick.bind(this)}
                  >
                    <input type="checkbox" checked={this.props.propose} />
                    <label />
                  </div>
                </div>
              ) : null}
              {/* P R O P O S E   F R O M */}
              {this.props.propose ? (
                <div
                  className="full-width-content"
                  style={{ paddingTop: "0.6rem" }}
                >
                  <label style={{ paddingLeft: "5px" }}>
                    <Translate content="account.propose_from" />
                  </label>
                  <AccountSelect
                    account_names={AccountStore.getMyAccounts()}
                    onChange={this.onProposeAccount.bind(this)}
                  />
                </div>
              ) : null}
            </div>
            <div className="grid-block shrink" style={{ paddingTop: "1rem" }}>
              {button_group}
            </div>
          </div>
        </BaseModal>
      </div>
    );
  }
}

TransactionConfirm = connect(
  TransactionConfirm,
  {
    listenTo() {
      return [TransactionConfirmStore, SettingsStore];
    },
    getProps() {
      let enabledProposal = SettingsStore.getState().settings.get(
        "advancedMode"
      );
      // console.group();
      // console.debug("TransactionConfirm: ");
      // console.dir(enabledProposal);
      // console.groupEnd();
      return {
        ...TransactionConfirmStore.getState(),
        enabledProposal
      };
    }
  }
);

export default TransactionConfirm;
