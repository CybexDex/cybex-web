import BaseStore from "./BaseStore";
import {
    List
} from "immutable";
import alt from "alt-instance";
import CrowdFundActions from "actions/CrowdFundActions";

class CrowdFundStore extends BaseStore {
    bindListeners;
    setState;
    state = {
        allFunds: List()
    };
    constructor() {
        super();
        this.bindListeners({
            onAllFundsFetched: CrowdFundActions.allFundsFetched,
            onAccountPartiFundsFetched: CrowdFundActions.accountPartiFundsFetched,
        });
    }

    onAllFundsFetched({ res, start, size }) {
        let allFunds = this.state.allFunds.take(start);
        allFunds = allFunds.concat(res);
        this.setState({
            allFunds
        });
        console.debug("Store: ", this);
    }
    onAccountPartiFundsFetched(partiCrowds) {
        this.setState({
            partiCrowds
        });
        console.debug("Store: ", this);        
    }

}

export default alt.createStore(CrowdFundStore, "CrowdFundStore");