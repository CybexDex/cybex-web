import alt from "alt-instance";
import { Apis } from "cybexjs-ws";
import WalletDb from "stores/WalletDb";
import SettingsStore from "stores/SettingsStore";
import WalletApi from "api/WalletApi";
import { debugGen } from "utils";
import * as moment from "moment";
import {
  getDepositInfo,
  getWithdrawInfo,
  queryFundRecords as queryFundRecordsImpl,
  loginQuery as loginQueryImpl
} from "services//GatewayService";
import { NotificationActions } from "actions//NotificationActions";
import { JadePool } from "services/GatewayConfig";
import { ops, PrivateKey, Signature } from "cybexjs";
import { Map } from "immutable";
import { CustomTx } from "CustomTx";

const debug = debugGen("GatewayActions");

export const DEPOSIT_MODAL_ID = "DEPOSIT_MODAL_ID";
export const WITHDRAW_MODAL_ID = "WITHDRAW_MODAL_ID";

const pickKeys = (keys: string[], count = 1) => {
  let res = [];
  for (let key of keys) {
    let privKey = WalletDb.getPrivateKey(key);
    if (privKey) {
      res.push(privKey);
      if (res.length >= count) {
        break;
      }
    }
  }
  return res;
};

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

  async queryFundRecords(account: Map<string, any>, login, offset = 0, size = 20) {
    debug("[QueryFundRecord]", account);
    const tx = new CustomTx({
      accountName: account.get("name"),
      offset,
      size
    });
    // let { login } = GatewayStore.getState();
    if (login.accountName === account.get("name") && login.signer) {
      tx.addSigner(login.signer);
    }

    // 尝试获取记录
    let records = await queryFundRecordsImpl(tx);
    // 如果获取不成功，重新登录并再次尝试获取
    if (!records) {
      await this.loginGatewayQuery(account);
      tx.addSigner(login.signer);
      records = await queryFundRecordsImpl(tx);
    }
    // 如果最终获取，更新记录
    if (records) {
      this.updateFundRecords(records);
    }
  }

  updateFundRecords(records) {
    return records;
  }

  /**
   * 注册一个查询签名
   *
   * @param {Map<string, any>} account
   * @memberof GatewayActions
   */
  async loginGatewayQuery(account: Map<string, any>) {
    debug("[LoginGatewayQuery]", account);
    debug("[LoginGatewayQuery]", SettingsStore.getSetting("walletLockTimeout"));

    const tx = new CustomTx({
      accountName: account.get("name"),
      expiration:
        Date.now() + SettingsStore.getSetting("walletLockTimeout") * 1000
    });
    const op = ops.fund_query.fromObject(tx.op);

    // Pick approps key
    let weight_threshold = account.getIn(["active", "weight_threshold"]);
    let availKeys = account
      .getIn(["active", "key_auths"])
      .filter(key => key.get(1) >= 1)
      .map(key => key.get(0))
      .toJS();
    let privKey = pickKeys(availKeys)[0];
    if (!privKey) {
      throw Error("Privkey Not Found");
    }
    debug(
      "[LoginGatewayQuery privKey]",
      account.getIn(["options", "memo_key"]),
      privKey
    );
    // let privKey = PrivateKey.fromWif(privKeyWif);
    let buffer = ops.fund_query.toBuffer(op);
    let signedHex = Signature.signBuffer(buffer, privKey).toHex();
    debug("[LoginGatewayQuery Signed]", signedHex);
    // tx.addSigner(1);
    tx.addSigner(signedHex);
    let loginRes = await loginQueryImpl(tx);
    debug("[LoginGatewayQuery LoginRes]", loginRes);
    if (loginRes) {
      this.updateLogin(loginRes);
    }
  }

  updateLogin(loginRes) {
    return loginRes;
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
