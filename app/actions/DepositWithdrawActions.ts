import alt from "alt-instance";
import {
  Apis
} from "cybexjs-ws";
import WalletDb from "stores/WalletDb";
import WalletApi from "api/WalletApi";
import { debugGen } from "utils";
import * as moment from "moment";
// import { Action } from "utils/Types";

const debug = debugGen("DepositWithdrawActions");

export const DEPOSIT_MODAL_ID = "DEPOSIT_MODAL_ID";
export const WITHDRAW_MODAL_ID = "WITHDRAW_MODAL_ID";

class DepositWithdrawActions {
  showDepositModal(account, modalId = DEPOSIT_MODAL_ID) {
    return {
      modalId,
      account
    };
  }
  
  showWithdrawModal(account, modalId = WITHDRAW_MODAL_ID) {
    return {
      modalId,
      account
    };
  }

  async updateDepositAddress(type, account) {
    
  }

  afterDepositAddressUpdated(address: string) {
    return address;
  }



}

const DepositWithdrawActionsWrapped = alt.createActions(DepositWithdrawActions);
export default DepositWithdrawActionsWrapped;