import * as React from "react";
import * as PropTypes from "prop-types";

import { getClassName } from "utils//ClassName";
import { connect } from "alt-react";
import { ModalStore } from "stores/ModalStore";
import IntlStore from "stores/IntlStore";
import { ModalActions } from "actions/ModalActions";
import Translate from "react-translate-component";
import Icon from "../Icon/Icon";
import counterpart from "counterpart";
import utils from "lib/common/utils";
import { BaseModal } from "./BaseModalNew";
import { Input, Button } from "components/Common";
import CopyButton from "components/Utility/CopyButton";
import * as moment from "moment";
import { Aes } from "cybexjs";

const style = {
  position: "fixed",
  left: 0,
  top: 0
};

type props = { locale; modalId; open?; className?; accountName };

export const DEFAULT_DECODE_MODAL_ID = "decode_modal";

class DecodeModal extends React.Component<
  props,
  { fadeOut?; neverShow?; crypto?; secret?; generatedPassword? }
> {
  constructor(props) {
    super(props);
    this.state = {
      neverShow: false,
      crypto: "",
      secret: "",
      generatedPassword: ""
    };
  }

  componentWillUpdate(np) {
    if (np.open !== this.props.open) {
      this.setState({
        generatedPassword: ""
      });
    }
  }

  handleNeverShow = e => {
    let neverShow = e.target.checked;
    this.setState({
      neverShow
    });
    ModalActions.neverShow(this.props.modalId, neverShow);
    return e.target.value;
  };

  tryDecode = e => {
    e.preventDefault();
    console.debug("TryDecode: ", this.state);
    let key = Aes.fromSeed(this.state.secret);
    let generatedPassword = key.decryptHexToText(this.state.crypto);

    this.setState({
      generatedPassword
    });
  };

  handleInputChange = field => value => {
    this.setState({
      [field]: value
    });
  };

  render() {
    let { modalId, open, locale, accountName } = this.props;
    return (
      open && (
        <BaseModal modalId={this.props.modalId}>
          <Translate
            className="text-center"
            unsafe
            component="h3"
            content="decode.title"
          />

          <Translate
            className="text-center"
            unsafe
            component="p"
            content="decode.tip"
          />
          <div className="form-group">
            <Translate
              htmlFor="crypto"
              component="label"
              content="decode.crypto"
            />
            <Input id="crypto" onChange={this.handleInputChange("crypto")} />
          </div>
          <div className="form-group">
            <Translate
              htmlFor="secret"
              component="label"
              content="decode.secret"
            />
            <Input id="secret" onChange={this.handleInputChange("secret")} />
          </div>
          {this.state.generatedPassword && (
            <div className="form-group">
              <Translate
                htmlFor="crypto"
                component="label"
                content="decode.wif"
              />
              <span className="inline-label">
                <input
                  style={{ maxWidth: "calc(100% - 48px)", fontSize: "80%" }}
                  disabled
                  value={this.state.generatedPassword}
                  type="text"
                />
                <CopyButton
                  text={this.state.generatedPassword}
                  tip="tooltip.copy_password"
                  dataPlace="top"
                />
              </span>
            </div>
          )}
          <Button type="secondary" onClick={this.tryDecode}>
            <Translate content="decode.do" />
          </Button>
        </BaseModal>
      )
    );
  }
}

const DecodeModalWapper = connect(
  DecodeModal,
  {
    listenTo() {
      return [ModalStore];
    },
    getProps(props) {
      let { modalId } = props;
      return {
        open: ModalStore.getState().showingModals.has(modalId)
      };
    }
  }
);

export default DecodeModalWapper;
