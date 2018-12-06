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
  async updateGameUrl(account: Map<string, any>) {
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
    let buffer = ops.fund_query.toBuffer(op);
    let signedHex = Signature.signBuffer(buffer, privKey).toHex();
    console.debug("[LoginGameCenter Signed]", signedHex);
    tx.addSigner(signedHex);
    let loginRes = await gameLogin(tx);
    console.debug("[LoginGameCenter LoginRes]", loginRes);
    return this.setGameUrl(loginRes.url);
  }

  async showDepositModal(modalId) {
    this.updateDepositInfo({
      depositAccount: "game-receive",
      asset: "CYB",
      exchangeRate: 100
    });
    this.openModal(modalId);
  }
  async showWithdrawModal(modalId) {
    this.updateWithdrawInfo({
      exchangeRate: 100,
      ceil: Number.POSITIVE_INFINITY
    });
    this.openModal(modalId);
  }

  setGameUrl(gameUrl: string) {
    return gameUrl;
  }

  updateDepositInfo(depositInfo: GameCenter.DepositConfig) {
    return depositInfo;
  }
  updateWithdrawInfo(withdrawInfo: GameCenter.WithdrawConfig) {
    return withdrawInfo;
  }

  closeModal(modalId) {
    return modalId;
  }

  openModal(modalId) {
    return modalId;
  }
}

const GameActionsWrapped: GameActions = alt.createActions(GameActions);

export { GameActionsWrapped as GameActions };
export default GameActionsWrapped;
