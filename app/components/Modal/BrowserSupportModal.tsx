import * as React from "react";
import * as PropTypes from "prop-types";
import ZfApi from "react-foundation-apps/src/utils/foundation-api";
import Trigger from "react-foundation-apps/src/trigger";
import Translate from "react-translate-component";
// import BaseModal from "./BaseModal";
import BaseModal from "./BaseModalNew";
import { ModalActions } from "actions/ModalActions";
import { ModalStore } from "stores/ModalStore";
import { connect } from "alt-react";
export const DEFAULT_SUPPORT_MODAL = "support_modal";
export let BrowserSupportModal = class extends React.Component<{modalId, open?}, any> {
  

  _openLink() {
    let newWnd = window.open(
      "https://www.google.com/chrome/browser/desktop/",
      "_blank"
    );
    newWnd.opener = null;
  }
  _openLinkFirefox() {
    let newWnd = window.open("https://www.mozilla.org", "_blank");
    newWnd.opener = null;
  }

  handleNeverShow = e => {
    let neverShow = e.target.checked;
    this.setState({
      neverShow
    });
    ModalActions.neverShow(this.props.modalId, neverShow);
    return e.target.value;
  };
  render() {
    let version = /Chrome\/(.+)(?=\s)/i.exec(navigator.userAgent);
    let versionNum = version && parseInt(version[1]);
    let {modalId, open} = this.props;
    return this.props.open ? (
      <BaseModal modalId={modalId} overlay={true}>
        <div className="grid-block vertical no-overflow">
          <Translate component="h3" content="init_error.browser" />
          <Translate component="p" content="init_error.browser_text" />
          <br />
          {version &&
            versionNum < 60 && (
              <Translate
                component="p"
                content="init_error.browser_version"
                version={version}
              />
            )}
          <p>
            <a onClick={this._openLink}>Google Chrome</a>
          </p>
          <p>
            <a onClick={this._openLinkFirefox}>Firefox</a>
          </p>

          <div className="button-group no-overflow" style={{ paddingTop: 0 }}>
            <Translate
              component="button"
              className="button primary"
              onClick={() => ModalActions.hideModal(modalId)}
              content="init_error.understand"
            />
          </div>
        </div>
        <div className="modal-footer">
          <p className="text-center">
            <label htmlFor="eth_never">
              <input type="checkbox" onChange={this.handleNeverShow} />
              <Translate content="modal.never" />
            </label>
          </p>
        </div>
      </BaseModal>
    ) : null;
  }
};

BrowserSupportModal = connect(BrowserSupportModal, {
  listenTo() {
    return [ModalStore];
  },
  getProps(props) {
    return {
      open: ModalStore.getState().showingModals.has(props.modalId)
    };
  }
});

export default BrowserSupportModal;