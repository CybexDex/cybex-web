import alt from "alt-instance";
import {
  Apis
} from "cybexjs-ws";
import WalletDb from "stores/WalletDb";
import WalletApi from "api/WalletApi";
import { debugGen } from "utils";
import * as moment from "moment";

const debug = debugGen("CrowdFundActions");

class CrowdFundActions {

  async queryAllCrowdFunds(start: number = 0, size: number = 20, accountId?) {
    let startId = "1.16." + start.toString()
    let res = await Apis.instance().db_api().exec("list_crowdfund_objects", [startId, size]);
    res = res.map(crow => ({
      ...crow,
      beginMoment: moment.utc(crow.begin)
    }));
    if (accountId) {
      let accountCrowds = await Promise.all([
        this.queryAccountInitCrowds(accountId),
        this.queryAccountPartiCrowds(accountId)
      ]);
      debug("AccountCrowd: ", accountCrowds);
    }
    debug("Query All Funds RES: ", res);
    this.allFundsFetched({
      start,
      size,
      res
    });
  }

  async queryAccountInitCrowds(accountId) {
    let res = await Apis.instance().db_api().exec("get_crowdfund_objects", [accountId]);
    debug("Query Init RES: ", res);
    this.accountInitFundsFetched(res);
    return (res);
  }

  async queryAccountPartiCrowds(accountId) {
    let res = await Apis.instance().db_api().exec("get_crowdfund_contract_objects", [accountId]);
    debug("Query Fund RES: ", res);
    this.accountPartiFundsFetched(res);
    return (res);    
  }

  async initCrowdFund(crowdParams: {
    u: number, t: number, owner: string, asset_id: string
  }) {
    let operation = {
      fee: {
        asset_id: 0,
        amount: 0
      },
      ...crowdParams
    };
    let tr = WalletApi.new_transaction();
    tr.add_type_operation("initiate_crowdfund", operation);

    try {
      await WalletDb.process_transaction(tr, null, true);
      return dispatch => dispatch(true);
    } catch {
      return dispatch => dispatch(false);
    }
  }

  async partiCrowd(crowdParams: {
    valuation: number, cap: number, buyer: string, crowdfund: string
  }) {
    let operation = {
      fee: {
        asset_id: 0,
        amount: 0
      },
      ...crowdParams
    };
    let tr = WalletApi.new_transaction();
    tr.add_type_operation("participate_crowdfund", operation);

    try {
      await WalletDb.process_transaction(tr, null, true);
      return dispatch => dispatch(true);
    } catch {
      return dispatch => dispatch(false);
    }
  }

  allFundsFetched(fetchedData) {
    return fetchedData;
  }

  accountInitFundsFetched(fetchedData) {
    return fetchedData;
  }

  accountPartiFundsFetched(fetchedData) {
    return fetchedData;
  }


}

const CrowdFundActionsWrapped = alt.createActions(CrowdFundActions);
export default CrowdFundActionsWrapped;