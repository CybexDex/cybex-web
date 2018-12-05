import alt from "alt-instance";
import SettingsStore from "stores/SettingsStore";
import { CustomTx } from "CustomTx";
import { ops, PrivateKey, Signature } from "cybexjs";
import { Map } from "immutable";
import WalletDb from "stores/WalletDb";
import { gameLogin } from "./GameService";

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

class GameActions {
  /**
   * 注册一个查询签名
   *
   * @param {Map<string, any>} account
   * @memberof GatewayActions
   */
  async getGameUrl(account: Map<string, any>) {
    console.debug("[LoginGameCenter]", account);
    console.debug(
      "[LoginGameCenter]",
      SettingsStore.getSetting("walletLockTimeout")
    );

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
    console.debug(
      "[LoginGameCenter privKey]",
      account.getIn(["options", "memo_key"]),
      privKey
    );
    // let privKey = PrivateKey.fromWif(privKeyWif);
    let buffer = ops.fund_query.toBuffer(op);
    let signedHex = Signature.signBuffer(buffer, privKey).toHex();
    console.debug("[LoginGameCenter Signed]", signedHex);
    // tx.addSigner(1);
    tx.addSigner(signedHex);
    let loginRes = await gameLogin(tx);
    console.debug("[LoginGameCenter LoginRes]", loginRes);

    return loginRes;
  }
}

const GameActionsWrapped: GameActions = alt.createActions(GameActions);

export { GameActionsWrapped as GameActions };
export default GameActionsWrapped;
