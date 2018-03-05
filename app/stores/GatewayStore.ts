import BaseStore from "./BaseStore";
import {
    List,
    Set,
    Map,
    fromJS
} from "immutable";
import alt from "alt-instance";
import { Store } from "alt-instance";
import GatewayActions from "actions/GatewayActions";
import { debugGen } from "utils//Utils";

import ls from "lib/common/localStorage";
const STORAGE_KEY = "__graphene__";
let ss = new ls(STORAGE_KEY);

const debug = debugGen("GatewayStore");

type State = {
    backedCoins: Map<any, any>,
    bridgeCoins: Map<any, any>,
    bridgeInputs: Array<string>,
    down: Map<any, any>,
    modals: Map<string, boolean>,
    depositInfo?,
    withdrawInfo?,
};
declare const __TEST__;
export const JADE_COINS = __TEST__ ?
    [{
        symbol: "TEST.BTC"
    },
    {
        symbol: "TEST.ETH"
    }] : [{
        symbol: "JADE.BTC"
    },
    {
        symbol: "JADE.ETH"
    }];


class GatewayStore extends BaseStore implements Store<State>{
    bindListeners;
    setState;
    state: State = {
        backedCoins: Map({
            JADE: JADE_COINS
        }),
        bridgeCoins: Map(fromJS(ss.get("bridgeCoins", {}))),
        bridgeInputs: ["btc", "dash", "eth", "steem"],
        down: Map({}),
        modals: Map(),
        depositInfo: {},
        withdrawInfo: {}
    };
    constructor() {
        super();
        this.bindListeners({
            handleDepositUpdate: GatewayActions.afterUpdateDepositInfo,
            handleWithdrawUpdate: GatewayActions.afterUpdateWithdrawInfo,
            openModal: GatewayActions.openModal,
            closeModal: GatewayActions.closeModal,
        });
    }

    handleDepositUpdate(depositInfo) {
        debug("Open: ", depositInfo);
        this.setState({
            depositInfo
        });
    }

    handleWithdrawUpdate(withdrawInfo) {
        this.setState({
            withdrawInfo
        });
    }

    openModal(id) {
        this.setState({
            modals: this.state.modals.set(id, true)
        });
    }

    closeModal(id) {
        this.setState({
            modals: this.state.modals.set(id, false)
        });
    }

}
const StoreWrapper = alt.createStore(GatewayStore, "GatewayStore");
export { StoreWrapper as GatewayStore }

export default StoreWrapper;