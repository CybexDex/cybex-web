import * as React from "react";
import * as PropTypes from "prop-types";

import { connect } from "alt-react";
import ApplicationApi from "api/ApplicationApi";
import AccountStore from "stores/AccountStore";
import utils from "common/utils";
import notify from "actions/NotificationActions";
import Translate from "react-translate-component";
import { Button, ButtonType } from "components/Common/Button";

class CreateWorker extends React.Component<any, any> {
  formInstance: HTMLFormElement;
  constructor(props) {
    super(props);

    this.state = {
      title: null,
      start: new Date(),
      end: null,
      pay: null,
      url: "http://",
      vesting: 7
    };
  }

  shouldComponentUpdate(np, ns) {
    return (
      np.currentAccount !== this.props.currentAccount,
      !utils.are_equal_shallow(ns, this.state)
    );
  }

  onSubmit(e) {
    e.preventDefault();
    ApplicationApi.createWorker(this.state, this.props.currentAccount).catch(
      error => {
        console.log("error", error);
        let error_msg =
          error.message && error.message.length && error.message.length > 0
            ? error.message.split("stack")[0]
            : "unknown error";

        notify.addNotification({
          message: `Failed to create worker: ${error_msg}`,
          level: "error",
          autoDismiss: 10
        });
      }
    );
  }

  checkValid = () => {
    return this.formInstance && this.formInstance.checkValidity();
  };

  render() {
    return (
      <div className="grid-block" style={{ paddingTop: 20 }}>
        <div className="grid-content large-9 large-offset-3 small-12">
          <Translate content="explorer.workers.create" component="h3" />
          <form
            ref={form => (this.formInstance = form)}
            style={{ maxWidth: 800 }}
          >
            <Translate content="explorer.workers.create_text_1" component="p" />
            <Translate content="explorer.workers.create_text_2" component="p" />

            <label>
              <Translate content="explorer.workers.title" />
              <input
                required
                onChange={e => {
                  this.setState({ title: e.target.value });
                }}
                type="text"
              />
            </label>
            <Translate content="explorer.workers.name_text" component="p" />
            <div
              style={{
                width: "50%",
                paddingRight: "2.5%",
                display: "inline-block"
              }}
            >
              <label>
                <Translate content="account.votes.start" />
                <input
                  required
                  onChange={e => {
                    this.setState({ start: new Date(e.target.value) });
                  }}
                  type="date"
                />
              </label>
            </div>
            <div
              style={{
                width: "50%",
                paddingLeft: "2.5%",
                display: "inline-block"
              }}
            >
              <label>
                <Translate content="account.votes.end" />
                <input
                  required
                  onChange={e => {
                    this.setState({ end: new Date(e.target.value) });
                  }}
                  type="date"
                />
              </label>
            </div>
            <Translate content="explorer.workers.date_text" component="p" />

            <label>
              <Translate content="explorer.workers.daily_pay" />
              <input
                required
                onChange={e => {
                  this.setState({ pay: e.target.value });
                }}
                type="number"
              />
            </label>
            <Translate content="explorer.workers.pay_text" component="p" />

            <label>
              <Translate content="explorer.workers.website" />
              <input
                required
                onChange={e => {
                  this.setState({ url: e.target.value });
                }}
                type="text"
              />
            </label>
            <Translate content="explorer.workers.url_text" component="p" />

            <label>
              <Translate content="explorer.workers.vesting_pay" />
              <input
                defaultValue={this.state.vesting}
                onChange={e => {
                  this.setState({ vesting: parseInt(e.target.value) });
                }}
                required
                type="number"
              />
            </label>
            <Translate content="explorer.workers.vesting_text" component="p" />

            <div className="button-group">
              <Button
                disabled={!this.checkValid()}
                type="primary"
                onClick={this.onSubmit.bind(this)}
              >
                <Translate content="account.votes.create_worker_publish" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  CreateWorker,
  {
    listenTo() {
      return [AccountStore];
    },
    getProps() {
      return {
        currentAccount: AccountStore.getState().currentAccount
      };
    }
  }
);
