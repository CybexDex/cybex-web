import * as React from "react"; import * as PropTypes from "prop-types";

import { getClassName } from "utils//ClassName";
import { connect } from "alt-react";
import { ModalStore } from "stores/ModalStore";
import WalletManagerStore from "stores/WalletManagerStore";
import IntlStore from "stores/IntlStore";
import SettingsStore from "stores/SettingsStore";
import { ModalActions } from "actions/ModalActions";
import Translate from "react-translate-component";
import Icon from "../Icon/Icon";
import counterpart from "counterpart";
import utils from "lib/common/utils";

import { WalletDelete } from "components/Wallet/WalletManager";

import { BaseModal } from "./BaseModalNew";
import * as moment from "moment";
// For localstorage
import ls from "lib/common/localStorage";
import Utils from "lib/common/utils";
const STORAGE_KEY = "__graphene__";
const KEYS_TO_REMOVE = ["currentAccount", "passwordAccount"];
let ss = new ls(STORAGE_KEY);

export const DEFAULT_LOGOUT_MODAL_ID = "cybexLogoutModal";

type props = { locale, modalId, open?, walletMode?, current };

class LogoutModal extends React.Component<props, { fadeOut?, neverShow?, known1, known2, known3, walletMode?}> {
  constructor(props) {
    super(props);
    this.state = {
      neverShow: false,
      known1: false,
      known2: false,
      known3: false
    };
  }

  _canLogout() {
    return this.state.known1 && this.state.known2 && this.state.known3;
  }

  handleKnown = (e) => {
    let name = e.target.name;
    let value = e.target.checked;
    console.debug("Name: ", name, value);
    this.setState({
      [name]: value
    });
    return e.target.value;
  }

  passwordLogout = () => {
    KEYS_TO_REMOVE.forEach(key => {
      ss.remove(Utils.getChainKey(key));
    });
    location.href = "/dashboard";
  }

  _renderWalletLogout = () => (
    <div className="modal-content">
      <h5 style={{textAlign: "justify"}} >
        <Translate content="logout.wallet_tip"/>
      </h5>
      <div className="form-group">
        <WalletDelete />
      </div>
      <div className="modal-footer">
        <div className="text-center">
          <Translate content="logout.reload" component="button" onClick={this.passwordLogout} className={getClassName("button")} />
        </div>
      </div>
    </div>
  );

  _renderPasswordLogout = (canLogout: boolean) => (
    <div className="modal-content">
      <h5>
        <Translate content="logout.password_tip" />
      </h5>
      <div className="form-group">
        <div>
          <label htmlFor={this.props.modalId + "_never"}>
            <input name="known1" id={this.props.modalId + "_know1"} autoFocus checked={this.state.known1} type="checkbox" className="" onChange={this.handleKnown} />
            <Translate content="logout.password_s1" />
          </label>
        </div>
        <div>
          <label htmlFor={this.props.modalId + "_know2"}>
            <input name="known2" id={this.props.modalId + "_know2"} checked={this.state.known2} type="checkbox" className="" onChange={this.handleKnown} />
            <Translate content="logout.password_s2" />
          </label>
        </div>
        <div>
          <label htmlFor={this.props.modalId + "_know3"}>
            <input name="known3" id={this.props.modalId + "_know3"} checked={this.state.known3} type="checkbox" className="" onChange={this.handleKnown} />
            <Translate content="logout.password_s3" />
          </label>
        </div>
      </div>
      <div className="modal-footer">
        <div className="text-center">
          <Translate content="logout.logout" component="button" onClick={this.passwordLogout} className={getClassName("button", { "disabled": !canLogout })} disabled={!canLogout} />
        </div>
      </div>
    </div>)

  render() {
    let { modalId, open, locale, current, walletMode } = this.props;
    let canLogout = this._canLogout();
    return (open &&
      <BaseModal modalId={this.props.modalId}>
        <h3 className="text-center">
          <Translate content="logout.title" />
        </h3>
        {
          walletMode ?
            this._renderWalletLogout() :
            this._renderPasswordLogout(canLogout)
        }
      </BaseModal>);
  }
}

const LogoutModalWapper = connect(LogoutModal, {
  listenTo() {
    return [ModalStore, IntlStore, WalletManagerStore];
  },
  getProps(props) {
    let { modalId } = props;
    return {
      walletMode: !SettingsStore.getState().settings.get("passwordLogin"),
      locale: IntlStore.getState().currentLocale,
      open: ModalStore.getState().showingModals.has(modalId)
    };
  }
});


export { LogoutModalWapper as LogoutModal }

export default LogoutModalWapper;