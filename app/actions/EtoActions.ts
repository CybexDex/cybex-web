import alt from "alt-instance";
import { Apis } from "cybexjs-ws";
import WalletDb from "stores/WalletDb";
import SettingsStore from "stores/SettingsStore";
import WalletApi from "api/WalletApi";
import { debugGen } from "utils";
import * as moment from "moment";
import { NotificationActions } from "actions//NotificationActions";
import { ops, PrivateKey, Signature } from "cybexjs";
import { Map } from "immutable";
import { CustomTx } from "CustomTx";
import { Eto, etoTx } from "services/eto";
import WalletUnlockActions from "actions/WalletUnlockActions";
import { ETO_LOCK } from "api/apiConfig";

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

type AccountMap = Map<string, any>;

class EtoActions {
  queryInfo(account: AccountMap) {
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
            .catch(err => {
              console.error(err);
              return new Eto.EtoInfo();
            })
        )
        .then(info => {
          dispatch(info);
          return info;
        });
    };
  }
  putBasic(basic: Eto.Info, account: AccountMap) {
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
            .catch(err => {
              console.error(err);
              return new Eto.EtoInfo();
            })
        )
        .then(info => {
          dispatch(info);
          return info;
        });
    };
  }
  putSurvey(survey: Eto.Survey, account: AccountMap) {
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
            .catch(err => {
              console.error(err);
              return new Eto.EtoInfo();
            })
        )
        .then(info => {
          dispatch(info);
          return info;
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
}

const EtoActionsWrapped: EtoActions = alt.createActions(EtoActions);
export { EtoActionsWrapped as EtoActions };
export default EtoActionsWrapped;
