import alt from "alt-instance";
import {
  Apis
} from "cybexjs-ws";

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

  allFundsFetched(fetchedData) {
    return fetchedData;
  }

}

const CrowdFuncActionsWrapped = alt.createActions(CrowdFuncActions);
export default CrowdFuncActionsWrapped;