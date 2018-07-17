import { debugGen } from "utils";
import alt from "alt-instance";

const debug = debugGen("GatewayActions");

import { NotificationActions } from "actions//NotificationActions";
import SettingsStore from "stores/SettingsStore";

class IEOActions {
  async updateAccountIEORecord(account: Cybex.Account) {
    if (!account || !account.get) return;
    
  }

  onIEORecordUpdate(records: ETO.IEORecord[]) {
    return records;
  }
}

const IEOActionsWrapper: IEOActions = alt.createActions(IEOActions);
export { IEOActionsWrapper as IEOActions };
export default IEOActions;
