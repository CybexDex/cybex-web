import BaseStore from "./BaseStore";
import { List, Set, Map, fromJS } from "immutable";
import alt from "alt-instance";
import { Store } from "alt-instance";
import { HtlcActions } from "actions/HtlcActions";
import { debugGen } from "utils//Utils";
import AccountActions from "actions/AccountActions";

import ls from "lib/common/localStorage";
import { AbstractStore } from "./AbstractStore";
import { Htlc } from "../services/htlc";
const STORAGE_KEY = "__graphene__";
let ss = new ls(STORAGE_KEY);

const debug = debugGen("HtlcStore");
export type HtlcState = {
  records: { [id: string]: Htlc.HtlcRecord[] };
};
class HtlcStore extends AbstractStore<HtlcState> {
  state: HtlcState = {
    records: [] as any
  };
  constructor() {
    super();
    this.bindListeners({
      handleRecordUpdate: HtlcActions.updateHtlcRecords
    });
  }
  handleRecordUpdate({ accountID, records }) {
    this.setState({
      records: { ...this.state.records, [accountID]: records }
    });
  }
}

const StoreWrapper = alt.createStore(HtlcStore, "HtlcStore");
export { StoreWrapper as HtlcStore };

export default StoreWrapper;
