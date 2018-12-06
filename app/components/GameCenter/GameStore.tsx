import BaseStore from "stores/BaseStore";
import { Set } from "immutable";
import alt from "alt-instance";
import { Store } from "alt-instance";
import { GatewayActions } from "actions/GatewayActions";
import { JadePool } from "services/GatewayConfig";
import { debugGen } from "utils//Utils";

import ls from "lib/common/localStorage";
import { GameActions } from "./GameActions";

const STORAGE_KEY = "__graphene__";
let ss = new ls(STORAGE_KEY);

const debug = debugGen("GameStore");

type State = {
  gameUrl: string;
  modals: Set<string>;
  depositInfo: GameCenter.DepositConfig;
  withdrawInfo: GameCenter.WithdrawConfig;
};
declare const __TEST__;
export const JADE_COINS = JadePool.ADDRESS_TYPES;

class GameStore extends BaseStore implements Store<State> {
  bindListeners;
  setState;
  state: State = {
    gameUrl: "#",
    modals: Set(),
    withdrawInfo: {
      exchangeRate: null,
      ceil: null
    },
    depositInfo: {
      depositAccount: null,
      asset: null,
      exchangeRate: null
    }
  };

  constructor() {
    super();
    this.bindListeners({
      updateGameUrl: GameActions.setGameUrl,
      updateDepositInfo: GameActions.updateDepositInfo,
      updateWithdrawInfo: GameActions.updateWithdrawInfo,
      openModal: GameActions.openModal,
      closeModal: GameActions.closeModal
    });
  }

  updateGameUrl(gameUrl: string) {
    debug("UpdateGameUrl: ", gameUrl);
    this.setState({
      gameUrl
    });
  }

  updateDepositInfo(depositInfo: GameCenter.DepositConfig) {
    debug("UpdateDepositInfo: ", depositInfo);
    this.setState({
      depositInfo
    });
  }
  updateWithdrawInfo(withdrawInfo: GameCenter.WithdrawConfig) {
    debug("UpdateWithdrawInfo: ", withdrawInfo);
    this.setState({
      withdrawInfo
    });
  }
  
  openModal(id) {
    this.setState({
      modals: this.state.modals.add(id)
    });
  }

  closeModal(id) {
    this.setState({
      modals: this.state.modals.remove(id)
    });
  }
}

const StoreWrapper = alt.createStore(GameStore, "GameStore") as GameStore &
  Store<State>;
export { StoreWrapper as GameStore };

export default StoreWrapper;
