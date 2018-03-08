import * as React from "react";

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
import * as moment from "moment";

const rainbow = require("assets/cybex_rainbow_lg.png");

const style = {
  position: "fixed",
  left: 0,
  top: 0
};

type props = { locale, modalId, open?, className?, accountName };


class GameModal extends React.Component<props, { fadeOut?, neverShow?}> {
  constructor(props) {
    super(props);
    this.state = {
      neverShow: false
    };
  }

  handleNeverShow = (e) => {
    let neverShow = e.target.checked;
    this.setState({
      neverShow
    });
    console.debug("new: ", neverShow);
    ModalActions.neverShow(this.props.modalId, neverShow);
    return e.target.value;
  }

  render() {
    let { modalId, open, locale, accountName } = this.props;
    return (
      open && <BaseModal modalId={this.props.modalId}>
        <Translate className="text-center" component="h3" content="cybex.game.title" />
        <div className="modal-content game-modal">
          <section>
            <img src={rainbow} alt="The badge of Rainbow Cybex" />
          </section>
        </div>
        <div className="modal-footer">
          <p className="text-center">
            <strong>{accountName}</strong>
            <Translate content="cybex.game.content" />
          </p>
        </div>
      </BaseModal>
    );
  }
}

const GameModalWapper = connect(GameModal, {
  listenTo() {
    return [ModalStore];
  },
  getProps(props) {
    let { modalId } = props;
    return {
      open: ModalStore.getState().showingModals.has(modalId)
    };
  }
});


export default GameModalWapper;