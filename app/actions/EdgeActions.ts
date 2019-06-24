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

const debug = debugGen("EdgeActions");

export const DEPOSIT_MODAL_ID = "DEPOSIT_MODAL_ID";
export const WITHDRAW_MODAL_ID = "WITHDRAW_MODAL_ID";
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
          fetch(
            `${EDGE_LOCK}api/v1/info/${account.get("name")}?expiration=${
              tx.expiration
            }&signer=${tx.signer}`
          )
            .then(res => res.json())
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
  applyLock(value: number, period: number, account: AccountMap, onResolve?) {
    this.addLoading();
    return dispatch => {
      WalletUnlockActions.unlock()
        .then(() => {
          console.debug("Account: ", account);
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
        .then(({ privKey, pubKey }) =>
          this.signTx(4, { value, pubKey, period }, account)
            .then(tx =>
              fetch(`${EDGE_LOCK}api/v1/apply/${account.get("name")}`, {
                headers,
                method: "POST",
                body: JSON.stringify(tx)
              }).then(res => res.json())
            )
            .then(tx => {
              let newTx = TransactionBuilder.fromTx(tx);
              newTx.add_signer(privKey);
              return new Promise((resolve, reject) =>
                TransactionConfirmActions.confirm(newTx, resolve, reject, null)
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
        )
        .catch(err => {
          console.error(err);
          this.removeLoading();
        });
    };
  }
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
