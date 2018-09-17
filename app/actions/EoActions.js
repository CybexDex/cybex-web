import alt from "alt-instance";
import { Apis } from "cybexjs-ws";
import utils from "common/utils";
import WalletApi from "api/WalletApi";
import ApplicationApi from "api/ApplicationApi";
import WalletDb from "stores/WalletDb";
import { ChainStore } from "cybexjs";
import big from "bignumber.js";


class EoActions {
  demo() {
    return {demo:123};
  }
}

export default alt.createActions(EoActions);
