import BaseStore from "stores/BaseStore";
import { List, Set, Map, fromJS } from "immutable";
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
};
declare const __TEST__;
export const JADE_COINS = JadePool.ADDRESS_TYPES;

class GameStore extends BaseStore implements Store<State> {
  bindListeners;
  setState;
  state: State = {
    gameUrl: "#"
  };

  constructor() {
    super();
    this.bindListeners({
      updateGameUrl: GameActions.setGameUrl
    });
  }

  updateGameUrl(gameUrl: string) {
    debug("UpdateGameUrl: ", gameUrl);
    this.setState({
      gameUrl
    });
  }
}

const StoreWrapper = alt.createStore(GameStore, "GameStore") as GameStore &
  Store<State>;
export { StoreWrapper as GameStore };

export default StoreWrapper;
