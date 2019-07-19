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
import WalletUnlockActions from "actions/WalletUnlockActions";
import { ETO_LOCK } from "api/apiConfig";
import TransactionConfirmActions from "actions/TransactionConfirmActions";
import { Htlc } from "../services/htlc";
import { htlc_create } from "../cybex/cybexjs/serializer/src/operations";

const debug = debugGen("HtlcActions");

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

type AccountMap = Map<string, any>;

class HtlcActions {
  /// Htlc 锁仓查询部分
  queryRank(onReject?) {
    this.addLoading();
    return dispatch => {
      fetch(`${ETO_LOCK}api/v1/rank`)
        .then(res => res.json())
        .then(rank => {
          dispatch(rank);
          this.removeLoading();
        })
        .catch(err => {
          this.removeLoading();
          if (onReject) {
            onReject(err);
          }
          console.error(err);
        });
    };
  }
  /**
   * 注册一个查询签名
   *
   * @param {Map<string, any>} account
   * @memberof HtlcActions
   */
  async signTx(opName: string, op: Htlc.Ops, account: AccountMap) {
    // await WalletUnlockActions.unlock().catch(e => console.debug("Unlock Error"));
    await WalletUnlockActions.unlock();
    debug("[LoginHtlcQuery]", account);
    debug("[LoginHtlcQuery]", SettingsStore.getSetting("walletHtlcTimeout"));
    // Pick approps key
    let availKeys = account
      .getIn(["active", "key_auths"])
      .filter(key => key.get(1) >= 1)
      .map(key => key.get(0))
      .toJS()
      .concat(
        account
          .getIn(["owner", "key_auths"])
          .filter(key => key.get(1) >= 1)
          .map(key => key.get(0))
          .toJS()
      );
    let privKey = pickKeys(availKeys)[0];
    if (!privKey) {
      throw Error("Privkey Not Found");
    }
    debug(
      "[LoginHtlcQuery privKey]",
      account.getIn(["options", "memo_key"]),
      privKey
    );
    let tx = new TransactionBuilder();
    tx.add_type_operation(opName, op);
    tx.add_signer(privKey);
    await tx.set_required_fees();
    await tx.finalize();
    await tx.sign();
    return new Promise((resolve, reject) =>
      TransactionConfirmActions.confirm(tx, resolve, reject)
    ).then(tx => {
      this.removeLoading();
      return tx;
    });
  }

  createRawHtlc(
    from: string,
    to: string,
    amount: { asset_id: string; amount: number },
    account: AccountMap,
    preimage: string,
    algo: Htlc.HashAlgo = Htlc.HashAlgo.Sha256,
    claimPeriodSecond: number,
    append: any,
    onResolve?
  ) {
    this.addLoading();
    return dispatch => {
      WalletUnlockActions.unlock()
        .then(() => {
          let htlc = {
            from,
            to,
            amount
          };
          let htlcCreate = new Htlc.HtlcCreateByRawPreimage(
            from,
            to,
            amount,
            preimage,
            algo,
            claimPeriodSecond
          );
          debug("[HtlcCreate]", htlcCreate);
          return this.signTx("htlc_create", htlcCreate, account);
        })
        .catch(err => {
          console.error(err);
          this.removeLoading();
        });
    };
  }
  redeemHtlc(
    htlc_id: string,
    redeemer: string,
    preimage: string,
    account: any,
    append?: any,
    onResolve?
  ) {
    this.addLoading();
    return dispatch => {
      WalletUnlockActions.unlock()
        .then(() => {
          let htlcRedeem = new Htlc.HtlcRedeem(htlc_id, redeemer, preimage);
          debug("[HtlcRedeem]", htlcRedeem);
          return this.signTx("htlc_redeem", htlcRedeem, account).then(res => {
            if (onResolve) {
              setTimeout(() => {
                onResolve();
              }, 0);
            }
            return res;
          });
        })
        .catch(err => {
          console.error(err);
          this.removeLoading();
        });
    };
  }
  extendHtlc(
    htlc_id: string,
    update_issuer: string,
    seconds_to_add: number,
    account: any,
    append?: any,
    onResolve?
  ) {
    this.addLoading();
    return dispatch => {
      WalletUnlockActions.unlock()
        .then(() => {
          let htlcExtend = new Htlc.HtlcExtend(
            htlc_id,
            update_issuer,
            seconds_to_add
          );
          debug("[HtlcExtends]", htlcExtend);
          return this.signTx("htlc_extend", htlcExtend, account).then(res => {
            if (onResolve) {
              setTimeout(() => {
                onResolve();
              }, 0);
            }
            return res;
          });
        })
        .catch(err => {
          console.error(err);
          this.removeLoading();
        });
    };
  }

  updateHtlcRecords(accountID: string) {
    return dispatch =>
      Promise.all([
        Apis.instance()
          .db_api()
          .exec("get_htlc_by_from", [accountID, "1.21.0", 100]),
        Apis.instance()
          .db_api()
          .exec("get_htlc_by_to", [accountID, "1.21.0", 100])
      ])
        .then(([from, to]) =>
          Object.entries(
            [...from, ...to].reduce(
              (dict, next) => ({ ...dict, [next.id]: next }),
              {}
            )
          ).map(record => record[1])
        )
        .then(records => dispatch({ accountID, records }));
  }

  // 其他
  addLoading() {
    return 1;
  }
  removeLoading() {
    return 1;
  }
}

const HtlcActionsWrapped: HtlcActions = alt.createActions(HtlcActions);
export { HtlcActionsWrapped as HtlcActions };
export default HtlcActionsWrapped;
