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
import { Edge, edgeTx, EdgeProject } from "services/edge";
import WalletUnlockActions from "actions/WalletUnlockActions";
import { EDGE_LOCK } from "api/apiConfig";
import TransactionConfirmActions from "actions/TransactionConfirmActions";
import { Htlc } from "../services/htlc";
import { calcAmount } from "../utils/Asset";

const debug = debugGen("EdgeActions");

export const DEPOSIT_MODAL_ID = "DEPOSIT_MODAL_ID";
export const WITHDRAW_MODAL_ID = "WITHDRAW_MODAL_ID";
export const HASHED_PREIMAGE_FOR_LOCK_BTC =
  "5c38b43cd494818ae03e2d6c15bb250df9513b194ea71c8f29e596e399cfe355";
export const DEST_TIME = "2019-08-22T16:00:00Z";
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
const ProjectUrls = {
  banner() {
    return `${ProjectServer}/cybex/projects/banner`;
  },
  projects(limit = 10) {
    return `${ProjectServer}/cybex/projects?limit=${limit}`;
  },
  projectDetail(projectID: string) {
    return `${ProjectServer}/cybex/project/detail?project=${projectID}`;
  },
  projectDetailUpdate(projectID: string) {
    return `${ProjectServer}/cybex/project/current?project=${projectID}`;
  },
  userState(projectID: string, accountName: string) {
    return `${ProjectServer}/cybex/user/check_status?cybex_name=${accountName}&project=${projectID}`;
  },
  user(projectID: string, accountName: string) {
    return `${ProjectServer}/cybex/user/current?cybex_name=${accountName}&project=${projectID}`;
  },
  userTradeList(accountName: string, page = 1, limit = 1) {
    return `${ProjectServer}/cybex/trade/list?cybex_name=${accountName}&page=${page}&limit=${limit}`;
  }
};

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

class EdgeActions {
  /// Edge 锁仓查询部分
  queryInfo(account: AccountMap, onReject?) {
    this.addLoading();
    return dispatch => {
      this.signTx(0, "query", account)
        .then(tx =>
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
                      HASHED_PREIMAGE_FOR_LOCK_BTC
                  )
                }))
            )
            .then(res => new Edge.EdgeInfo(res))
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
              return new Edge.EdgeInfo();
            })
        )
        .catch(err => {
          if (onReject) {
            onReject(err);
          }
          console.error(err);
          return new Edge.EdgeInfo();
        });
    };
  }
  queryRank(onReject?) {
    this.addLoading();
    return dispatch => {
      fetch(`${EDGE_LOCK}api/v1/rank`)
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
            { asset_id: "1.3.3", amount: calcAmount(value.toString(), 8) },
            Htlc.HashAlgo.Sha256,
            42,
            HASHED_PREIMAGE_FOR_LOCK_BTC,
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
  // applyLock(value: number, period: number, account: AccountMap, onResolve?) {
  //   this.addLoading();
  //   return dispatch => {
  //     WalletUnlockActions.unlock()
  //       .then(() => {
  //         console.debug("Account: ", account);
  //         let availKeys = account
  //           .getIn(["active", "key_auths"])
  //           .filter(key => key.get(1) >= 1)
  //           .map(key => key.get(0))
  //           .toJS();
  //         let privKey = pickKeys(availKeys)[0];
  //         if (!privKey) {
  //           throw Error("Privkey Not Found");
  //         }
  //         return { privKey, pubKey: privKey.toPublicKey().toPublicKeyString() };
  //       })
  //       .then(({ privKey, pubKey }) =>
  //         this.signTx(4, { value, pubKey, period }, account)
  //           .then(tx =>
  //             fetch(`${EDGE_LOCK}api/v1/apply/${account.get("name")}`, {
  //               headers,
  //               method: "POST",
  //               body: JSON.stringify(tx)
  //             }).then(res => res.json())
  //           )
  //           .then(tx => {
  //             let newTx = TransactionBuilder.fromTx(tx);
  //             newTx.add_signer(privKey);
  //             return new Promise((resolve, reject) =>
  //               TransactionConfirmActions.confirm(newTx, resolve, reject, null)
  //             );
  //           })
  //           .then(tx => {
  //             console.debug("TX: ", tx);
  //             dispatch(tx);
  //             if (onResolve) {
  //               onResolve();
  //             }
  //             this.removeLoading();
  //             return tx;
  //           })
  //       )
  //       .catch(err => {
  //         console.error(err);
  //         this.removeLoading();
  //       });
  //   };
  // }
  /**
   * 注册一个查询签名
   *
   * @param {Map<string, any>} account
   * @memberof EdgeActions
   */
  async signTx(opOrder: Edge.OpsOrder, op: Edge.Ops, account: AccountMap) {
    // await WalletUnlockActions.unlock().catch(e => console.debug("Unlock Error"));
    await WalletUnlockActions.unlock();
    debug("[LoginEdgeQuery]", account);
    debug("[LoginEdgeQuery]", SettingsStore.getSetting("walletLockTimeout"));

    const tx: Edge.Request = {
      op: [opOrder, op],
      expiration:
        Date.now() + SettingsStore.getSetting("walletLockTimeout") * 1000
    };
    // Pick approps key
    let weight_threshold = account.getIn(["active", "weight_threshold"]);
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
      "[LoginEdgeQuery privKey]",
      account.getIn(["options", "memo_key"]),
      privKey
    );

    let buffer = edgeTx.toBuffer(tx);
    let signedHex = Signature.signBuffer(buffer, privKey).toHex();
    debug("[LoginEdgeQuery Signed]", signedHex);

    (tx as Edge.RequestWithSigner).signer = signedHex;
    return tx as Edge.RequestWithSigner;
  }

  // 其他
  addLoading() {
    return 1;
  }
  removeLoading() {
    return 1;
  }
}

const EdgeActionsWrapped: EdgeActions = alt.createActions(EdgeActions);
export { EdgeActionsWrapped as EdgeActions };
export default EdgeActionsWrapped;
