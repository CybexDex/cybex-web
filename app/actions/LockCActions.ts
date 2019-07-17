import alt from "alt-instance";
import { Apis } from "cybexjs-ws";
import WalletDb from "stores/WalletDb";
import SettingsStore from "stores/SettingsStore";
import WalletApi from "api/WalletApi";
import { debugGen } from "utils";
import * as moment from "moment";
import { NotificationActions } from "actions//NotificationActions";
import { ops, PrivateKey, Signature, TransactionBuilder } from "cybexjs";
import { Map } from "immutable";
import { CustomTx } from "CustomTx";
import { LockC } from "services/lockC";
import WalletUnlockActions from "actions/WalletUnlockActions";
import { EDGE_LOCK } from "api/apiConfig";
import TransactionConfirmActions from "actions/TransactionConfirmActions";
import { Htlc } from "../services/htlc";
import { calcAmount } from "../utils/Asset";

const debug = debugGen("LockCActions");

export const DEPOSIT_MODAL_ID = "DEPOSIT_MODAL_ID";
export const WITHDRAW_MODAL_ID = "WITHDRAW_MODAL_ID";
export const HASHED_PREIMAGE_FOR_LOCK_CYB =
  "b5fc0b94782e68a2982fb76f63a915ff0a899c2dbf032e2a2ff1696a5696e741";
export const DEST_TIME = "2019-07-31T16:00:00Z";
// export const DEST_TIME = "2019-12-31T16:00:00Z";
export const RECEIVER = "btc-lock";

const headers = new Headers();
headers.append("Content-Type", "application/json");
const pickKeys = (keys: string[], count = 1) => {
  let res: any[] = [];
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

const ProjectServer = __DEV__
  ? "https://EDGEapi.cybex.io/api"
  : "https://EDGEapi.cybex.io/api";

const fetchUnwrap = <T = any>(url: string) =>
  fetch(url)
    .then(res => res.json())
    .then(res => {
      if (res.code === 0) {
        return res.result as T;
      } else {
        throw new Error(res.code);
      }
    });

type AccountMap = Map<string, any>;

class LockCActions {
  /// LockC 锁仓查询部分
  queryInfo(account: AccountMap, onReject?) {
    this.addLoading();
    return dispatch => {
      Promise.resolve({
        accountName: account.get("name"),
        accountID: account.get("id"),
        basic: {}
      })
        .then(res =>
          Apis.instance()
            .db_api()
            .exec("get_htlc_by_from", [account.get("id"), "1.21.0", 100])
            .then(records => ({
              ...res,
              records: records.filter(
                (record: Htlc.HtlcRecord) =>
                  record.conditions.hash_lock.preimage_hash[1] ===
                  HASHED_PREIMAGE_FOR_LOCK_CYB
              )
            }))
        )
        .then(res => new LockC.LockCInfo(res))
        .then(info => {
          dispatch(info);
          this.removeLoading();
          return info;
        })
        .catch(err => {
          if (onReject) {
            onReject(err);
          }
          console.error(err);
          return new LockC.LockCInfo();
        });
    };
  }
  applyLock(value: number, account: AccountMap, onResolve?) {
    this.addLoading();
    return dispatch => {
      WalletUnlockActions.unlock()
        .then(() => {
          let availKeys = account
            .getIn(["active", "key_auths"])
            .filter(key => key.get(1) >= 1)
            .map(key => key.get(0))
            .toJS();
          let privKey = pickKeys(availKeys)[0];
          if (!privKey) {
            throw Error("Privkey Not Found");
          }
          return { privKey, pubKey: privKey.toPublicKey().toPublicKeyString() };
        })
        .then(async ({ privKey, pubKey }) => {
          let tx = new TransactionBuilder();
          let destAccount = await Apis.instance()
            .db_api()
            .exec("get_account_by_name", [RECEIVER]);
          let htlc = new Htlc.HtlcCreateByHashedPreimage(
            account.get("id"),
            destAccount.id,
            { asset_id: "1.3.0", amount: calcAmount(value.toString(), 5) },
            Htlc.HashAlgo.Sha256,
            42,
            HASHED_PREIMAGE_FOR_LOCK_CYB,
            moment(DEST_TIME).diff(moment(), "seconds")
          );
          tx.add_type_operation("htlc_create", htlc);
          await tx.set_required_fees();
          await tx.finalize();
          await tx.add_signer(privKey);
          await tx.sign();
          return new Promise((resolve, reject) =>
            TransactionConfirmActions.confirm(tx, resolve, reject, null)
          );
        })
        .then(tx => {
          console.debug("TX: ", tx);
          dispatch(tx);
          if (onResolve) {
            onResolve();
          }
          this.removeLoading();
          return tx;
        })
        .catch(err => {
          console.error(err);
          this.removeLoading();
        });
    };
  }

  // 其他
  addLoading() {
    return 1;
  }
  removeLoading() {
    return 1;
  }
}

const LockCActionsWrapped: LockCActions = alt.createActions(LockCActions);
export { LockCActionsWrapped as LockCActions };
export default LockCActionsWrapped;
