import alt from "alt-instance";
import {
  Apis
} from "cybexjs-ws";
import WalletDb from "stores/WalletDb";
import WalletApi from "api/WalletApi";

class CrowdFuncActions {

  async queryAllCrowdFunds(start: number = 0, size: number = 20) {
    let startId = "1.16." + start.toString()
    let res = await Apis.instance().db_api().exec("list_crowdfund_objects", [startId, size]);
    console.debug("RES: ", res);
    this.allFundsFetched({
      start,
      size,
      res
    });
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
      await WalletDb.process_transaction();
      return dispatch => dispatch(true);
    } catch {
      return dispatch => dispatch(false);      
    }
  }

  allFundsFetched(fetchedData) {
    return fetchedData;
  }

}

const CrowdFuncActionsWrapped = alt.createActions(CrowdFuncActions);
export default CrowdFuncActionsWrapped;