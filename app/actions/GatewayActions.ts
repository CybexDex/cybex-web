import alt from "alt-instance";
import {
  Apis
} from "cybexjs-ws";
import WalletDb from "stores/WalletDb";
import WalletApi from "api/WalletApi";
import { debugGen } from "utils";
import * as moment from "moment";
import { getDepositAddress } from "services//GatewayService";
import { NotificationActions } from "actions//NotificationActions";

const debug = debugGen("GatewayActions");

export const DEPOSIT_MODAL_ID = "DEPOSIT_MODAL_ID";
export const WITHDRAW_MODAL_ID = "WITHDRAW_MODAL_ID";

class GatewayActions {
  async showDepositModal(account, type, modalId = DEPOSIT_MODAL_ID) {
    let valid = await this.updateDepositAddress(account, type);
    if (!valid) return;
    this.openModal(modalId);
  }

  async showWithdrawModal(account, type) {
    let valid = await this.updateWithdrawInfo(account, type);
    if (!valid) return;
    this.openModal(WITHDRAW_MODAL_ID);
  }

  async updateDepositAddress(account, type) {
    let address;
    try {
      address = await getDepositAddress(type);
      debug("Address: ", address);
      NotificationActions.info(address);
    } catch (e) {
      debug(e);
      NotificationActions.error(e.message);
      return false
    }
    let res = {
      type, account, address
    };
    this.afterUpdateDepositInfo(res);
    return res;
  }

  async updateWithdrawInfo(account, type) {
    this.afterUpdateWithdrawInfo(account, type);
    return true;
  }

  afterUpdateWithdrawInfo(account, type) {
    // for mock
    return {
      gatewayFee: 0,
    }
  }

  afterUpdateDepositInfo(depositInfo) {
    return depositInfo;
  }

  closeModal(modalId) {
    return modalId;
  }

  openModal(modalId) {
    return modalId;
  }
}

const GatewayActionsWrapped: GatewayActions = alt.createActions(GatewayActions);
export { GatewayActionsWrapped as GatewayActions }
export default GatewayActionsWrapped;