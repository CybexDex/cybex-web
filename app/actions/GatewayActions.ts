import alt from "alt-instance";
import { Apis } from "cybexjs-ws";
import WalletDb from "stores/WalletDb";
import WalletApi from "api/WalletApi";
import { debugGen } from "utils";
import * as moment from "moment";
import {
  getDepositInfo,
  getWithdrawInfo,
  queryFundRecords as queryFundRecordsImpl
} from "services//GatewayService";
import { NotificationActions } from "actions//NotificationActions";
import { ApolloClient } from "apollo-client-preset";
import { JadePool } from "services/GatewayConfig";
import { ops, PrivateKey, Signature } from "cybexjs";
import { Map } from "immutable";
import { CustomTx } from "CustomTx";

const debug = debugGen("GatewayActions");

export const DEPOSIT_MODAL_ID = "DEPOSIT_MODAL_ID";
export const WITHDRAW_MODAL_ID = "WITHDRAW_MODAL_ID";

class GatewayActions {
  async showDepositModal(account, asset, modalId = DEPOSIT_MODAL_ID) {
    let type = JadePool.ADDRESS_TYPES[asset];
    if (!type) {
      return NotificationActions.error(
        `No suitable asset for ${asset} to be deposited`
      );
    }
    let valid = await this.updateDepositAddress(account, type);
    if (!valid) return;
    this.openModal(modalId);
  }

  async showWithdrawModal(asset) {
    debug("Withdraw: ", asset);
    let type = JadePool.ADDRESS_TYPES[asset];
    if (!type) {
      return NotificationActions.error(
        `No suitable asset for ${asset} to be withdrawn`
      );
    }

    let valid = await this.updateWithdrawInfo(asset, type);
    if (!valid) return;
    this.openModal(WITHDRAW_MODAL_ID);
  }

  async updateDepositAddress(account, type, needNew = false) {
    let res;
    debug("Update Deposit Address: ", account, type, needNew);
    try {
      let { address } = (res = await getDepositInfo(account, type, needNew));
      debug("Address: ", address);
      // NotificationActions.info(address);
    } catch (e) {
      debug(e);
      NotificationActions.error(e.message);
      return false;
    }
    this.afterUpdateDepositInfo(res);
    return res;
  }

  async updateWithdrawInfo(asset, type) {
    let res;
    try {
      res = await getWithdrawInfo(type);
      debug("WithdrawLimit: ", res);
      // NotificationActions.info(res.fee.toString());
    } catch (e) {
      debug(e);
      NotificationActions.error(e.message);
      return false;
    }
    this.afterUpdateWithdrawInfo({
      asset,
      ...res
    });
    return true;
  }

  async queryFundRecords(account: Map<string, any>) {
    debug("[QueryFundRecord]", account);
    const tx = new CustomTx({
      accountName: account.get("name"),
      // asset: "TEST.ETH",
      // fundType: "WITHDRAW",
      offset: 5,
      size: 5,
      expiration: Math.ceil(Date.now() / 1000) + 30
    });
    const op = ops.fund_query.fromObject(tx.op);

    let privKey = WalletDb.getPrivateKey(
      account.getIn(["options", "memo_key"])
    );
    debug(
      "[QueryFundRecord privKey]",
      account.getIn(["options", "memo_key"]),
      privKey
    );
    // let privKey = PrivateKey.fromWif(privKeyWif);
    let buffer = ops.fund_query.toBuffer(op);
    let signedHex = Signature.signBuffer(buffer, privKey).toHex();
    debug("[QueryFundRecord Signed]", signedHex);
    tx.addSigner(signedHex);

    return await queryFundRecordsImpl(tx);
  }

  afterUpdateWithdrawInfo(limit: { asset; type; fee; minValue }) {
    // for mock
    return limit;
  }

  afterUpdateDepositInfo(depositInfo) {
    return depositInfo;
  }

  closeModal(modalId) {
    return modalId;
  }

  openModal(modalId) {
    return modalId;
  }
}

const GatewayActionsWrapped: GatewayActions = alt.createActions(GatewayActions);
export { GatewayActionsWrapped as GatewayActions };
export default GatewayActionsWrapped;
