import BaseStore from "./BaseStore";
import {
    List
} from "immutable";
import alt from "alt-instance";
import CrowdFundActions from "actions/CrowdFundActions";
import { debugGen } from "utils//Utils";

const debug = debugGen("DepositWithdrawStore");

class DepositWithdrawStore extends BaseStore {
    bindListeners;
    setState;
    state = {
        allFunds: List(),
        initCrowds: [],
        partiCrowds: []
    };
    constructor() {
        super();
        this.bindListeners({
            onAllFundsFetched: CrowdFundActions.allFundsFetched,
            onAccountPartiFundsFetched: CrowdFundActions.accountPartiFundsFetched,
            onAccountInitFundsFetched: CrowdFundActions.accountInitFundsFetched,
        });
    }

    onAllFundsFetched({ res, start, size }) {
        let allFunds = this.state.allFunds.take(start);
        allFunds = allFunds.concat(res);
        this.setState({
            allFunds
        });
        debug("onAllFundsFetched: ", this);
    }

    onAccountInitFundsFetched(initCrowds) {
        this.setState({
            initCrowds
        });
        debug("onAccountInitFundsFetched: ", this);
    }

    onAccountPartiFundsFetched(partiCrowds) {
        this.setState({
            partiCrowds
        });
        debug("onAccountPartiFundsFetched: ", this);
    }

}

export default alt.createStore(DepositWithdrawStore, "DepositWithdrawStore");