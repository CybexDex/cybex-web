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
import * as moment from "moment";
import { Gtag } from "services/Gtag";

const style = {
  position: "fixed",
  left: 0,
  top: 0
};

type props = { locale?; modalId; open?; className?; accountName? };

export const DEFAULT_ETH_MODAL_ID = "common";

class CommonModal extends React.Component<
  props,
  { fadeOut?; neverShow?; current? }
> {
  constructor(props) {
    super(props);

    let stepOneStart = moment("2018-09-01T05:00:00Z");
    // let stepOneStart = moment("2018-08-31T10:19:00Z");
    // let stepOneEnd = moment("2018-08-31T10:20:59Z");
    let stepOneEnd = moment("2018-09-07T15:59:59Z");
    let now = moment();
    let stepOne = {
      title: "modal.jct.jct_one_title",
      href: "modal.jct.jct_one_href",
      img: "modal.jct.jct_one_img",
      alt: "modal.jct.jct_one_alt"
    };

    let current =
      now.isSameOrAfter(stepOneStart) && now.isSameOrBefore(stepOneEnd)
        ? stepOne
        : null;

    this.state = {
      neverShow: false,
      current
    };
  }

  handleNeverShow = e => {
    let neverShow = e.target.checked;
    this.setState({
      neverShow
    });
    ModalActions.neverShow(this.props.modalId, neverShow);
    return e.target.value;
  };

  reportEvent = () => {
    Gtag.eventActivity("JCT", "AirDrop");
  }

  render() {
    let { modalId, open, locale, accountName } = this.props;
    let current = this.state.current;
    console.debug("CommonModal: ", this);
    return (
      open &&
      current && (
        <BaseModal modalId={this.props.modalId}>
          <div className="modal-content game-modal">
            <div className="img-container">
              <a href={counterpart.translate(current.href)} target="_blank" onClick={this.reportEvent}>
                <img
                  src={counterpart.translate(current.img)}
                  alt={counterpart.translate(current.alt)}
                />
              </a>
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
      )
    );
  }
}

const CommonModalWrapper = connect(
  CommonModal,
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

export default CommonModalWrapper;
