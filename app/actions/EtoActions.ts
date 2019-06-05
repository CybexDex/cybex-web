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
import { Eto, etoTx, EtoProject } from "services/eto";
import WalletUnlockActions from "actions/WalletUnlockActions";
import { ETO_LOCK } from "api/apiConfig";
import TransactionConfirmActions from "actions/TransactionConfirmActions";
import { EtoMock } from "../components/Eto/mock";

const debug = debugGen("EtoActions");

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
  ? "https://etoapi.cybex.io/api"
  : "https://etoapi.cybex.io/api";
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

class EtoActions {
  /// Eto 锁仓查询部分
  queryInfo(account: AccountMap, onReject?) {
    this.addLoading();
    return dispatch => {
      this.signTx(0, "query", account)
        .then(tx =>
          fetch(
            `${ETO_LOCK}api/v1/info/${account.get("name")}?expiration=${
              tx.expiration
            }&signer=${tx.signer}`
          )
            .then(res => res.json())
            .then(res => new Eto.EtoInfo(res))
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
              return new Eto.EtoInfo();
            })
        )
        .catch(err => {
          if (onReject) {
            onReject(err);
          }
          console.error(err);
          return new Eto.EtoInfo();
        });
    };
  }
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
  applyLock(value: number, account: AccountMap, onResolve?) {
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
          this.signTx(4, { value, pubKey }, account)
            .then(tx =>
              fetch(`${ETO_LOCK}api/v1/apply/${account.get("name")}`, {
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
  putBasic(basic: Eto.Info, account: AccountMap, onResolve?) {
    this.addLoading();
    return dispatch => {
      this.signTx(1, basic, account)
        .then(tx =>
          fetch(
            `${ETO_LOCK}api/v1/info/${account.get("name")}/${Eto.Fields.basic}`,
            {
              headers,
              method: "PUT",
              body: JSON.stringify(tx)
            }
          )
            .then(res => res.json())
            .then(res => new Eto.EtoInfo(res))
        )
        .then(info => {
          dispatch(info);
          this.removeLoading();
          if (onResolve) {
            onResolve();
          }
          return info;
        })
        .catch(err => {
          console.error(err);
          return;
        });
    };
  }
  putSurvey(survey: Eto.Survey, account: AccountMap) {
    this.addLoading();

    return dispatch => {
      this.signTx(2, survey, account)
        .then(tx =>
          fetch(
            `${ETO_LOCK}api/v1/info/${account.get("name")}/${
              Eto.Fields.survey
            }`,
            {
              headers,
              method: "PUT",
              body: JSON.stringify(tx)
            }
          )
            .then(res => res.json())
            .then(res => new Eto.EtoInfo(res))
        )
        .then(info => {
          dispatch(info);
          this.removeLoading();
          return info;
        })
        .catch(err => {
          console.error(err);
          return new Eto.EtoInfo();
        });
    };
  }
  putToken(token: Eto.Token, account: AccountMap, onResolve?) {
    this.addLoading();
    return dispatch => {
      this.signTx(3, token, account)
        .then(tx =>
          fetch(
            `${ETO_LOCK}api/v1/info/${account.get("name")}/${Eto.Fields.token}`,
            {
              headers,
              method: "PUT",
              body: JSON.stringify(tx)
            }
          )
            .then(res => res.json())
            .then(res => new Eto.EtoInfo(res))
        )
        .then(info => {
          dispatch(info);
          this.removeLoading();
          if (onResolve) {
            onResolve();
          }
          return info;
        })
        .catch(err => {
          this.removeLoading();
          console.error(err);
          return;
        });
    };
  }
  setApplyDone() {
    return true;
  }
  /**
   * 注册一个查询签名
   *
   * @param {Map<string, any>} account
   * @memberof EtoActions
   */
  async signTx(opOrder: Eto.OpsOrder, op: Eto.Ops, account: AccountMap) {
    // await WalletUnlockActions.unlock().catch(e => console.debug("Unlock Error"));
    await WalletUnlockActions.unlock();
    debug("[LoginEtoQuery]", account);
    debug("[LoginEtoQuery]", SettingsStore.getSetting("walletLockTimeout"));

    const tx: Eto.Request = {
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
      .toJS();
    let privKey = pickKeys(availKeys)[0];
    if (!privKey) {
      throw Error("Privkey Not Found");
    }
    debug(
      "[LoginEtoQuery privKey]",
      account.getIn(["options", "memo_key"]),
      privKey
    );

    let buffer = etoTx.toBuffer(tx);
    let signedHex = Signature.signBuffer(buffer, privKey).toHex();
    debug("[LoginEtoQuery Signed]", signedHex);

    (tx as Eto.RequestWithSigner).signer = signedHex;
    return tx as Eto.RequestWithSigner;
  }
  // 认购项目部分
  updateBanner() {
    return dispatch =>
      fetchUnwrap<EtoProject.Banner[]>(ProjectUrls.banner()).then(dispatch);
    // return dispatch => Promise.resolve(EtoMock.banner).then(dispatch);
  }
  updateProjectList() {
    // return dispatch => Promise.resolve(EtoMock.details).then(dispatch);
    return dispatch =>
      fetchUnwrap<EtoProject.ProjectDetail[]>(ProjectUrls.projects()).then(
        dispatch
      );
  }
  loadProjectDetail(id: string) {
    // return dispatch => Promise.resolve(EtoMock.detail).then(dispatch);
    return dispatch =>
      fetchUnwrap<EtoProject.ProjectDetail>(ProjectUrls.projectDetail(id)).then(
        dispatch
      );
  }
  updateProject(id: string) {
    // return dispatch =>
    //   Promise.resolve(EtoMock.current)
    //     .then(p => ({ ...p, id }))
    //     .then(dispatch);
    return dispatch =>
      fetchUnwrap<EtoProject.ProjectDetail>(ProjectUrls.projectDetailUpdate(id))
        .then(p => ({ ...p, id }))
        .then(dispatch);
  }
  updateProjectByUser(id: string, accountName: string) {
    // return dispatch =>
    //   Promise.resolve(EtoMock.current)
    //     .then(p => ({ ...p, id }))
    //     .then(dispatch);
    return dispatch =>
      fetchUnwrap<EtoProject.ProjectDetail>(ProjectUrls.user(id, accountName))
        .then(p => ({ ...p, id }))
        .then(dispatch);
  }
  queryUserIn(id: string, accountName: string) {
    // return dispatch =>
    //   Promise.resolve(EtoMock.current)
    //     .then(p => ({ ...p, id }))
    //     .then(dispatch);
    return dispatch =>
      fetchUnwrap<EtoProject.ProjectDetail>(
        ProjectUrls.userState(id, accountName)
      )
        .then(p => ({ ...p, id }))
        .then(res => {
          dispatch(res);
        });
  }

  applyEto(
    projectID: string,
    fee: { asset_id: string; amount: number },
    amount: { asset_id: string; amount: number },
    account: AccountMap,
    append: any,
    onResolve?
  ) {
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
        .then(async ({ privKey, pubKey }) => {
          let tx = new TransactionBuilder();
          let op = tx.get_type_operation("exchange_participate", {
            fee,
            payer: account.get("id"),
            exchange_to_pay: projectID,
            amount
          });
          tx.add_operation(op);
          await tx.update_head_block();
          await tx.set_required_fees();
          await tx.update_head_block();
          tx.add_signer(privKey);
          await tx.finalize();
          await tx.sign();
          return new Promise((resolve, reject) =>
            TransactionConfirmActions.confirm(tx, resolve, reject, append)
          ).then(tx => {
            dispatch(tx);
            this.removeLoading();
            return tx;
          });
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

const EtoActionsWrapped: EtoActions = alt.createActions(EtoActions);
export { EtoActionsWrapped as EtoActions };
export default EtoActionsWrapped;
