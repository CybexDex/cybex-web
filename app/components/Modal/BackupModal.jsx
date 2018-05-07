import * as React from "react";
import * as PropTypes from "prop-types";
import ZfApi from "react-foundation-apps/src/utils/foundation-api";
import { Link } from "react-router";
import BaseModal from "../Modal/BaseModal";
import Trigger from "react-foundation-apps/src/trigger";
import utils from "common/utils";
import Translate from "react-translate-component";

export default class BackupModal extends React.Component {
  constructor(props) {
    super(props);
    this.modalId = "modal_backup";
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  show() {
    ZfApi.publish(this.modalId, "open");
  }

  hide() {
    ZfApi.publish(this.modalId, "close");
  }

  render() {
    return (
      <BaseModal id="modal_backup" overlay={true}>
        <Translate component="h3" content="backup.title" />
        <div className="grid-block vertical text-justify">
          <Translate content={"backup.content"} />
          <div className="button-group" style={{ paddingTop: "2rem" }}>
            <button onClick={this.hide} className="button" type="submit">
              <Link to="/wallet/backup/create">
                <Translate
                  style={{ color: "white" }}
                  content={"backup.go_backup"}
                />
              </Link>
            </button>
            <Trigger close="modal_backup">
              <button className="button info">
                <Translate content={"backup.no_backup"} />
              </button>
            </Trigger>
          </div>
        </div>
      </BaseModal>
    );
  }
}
