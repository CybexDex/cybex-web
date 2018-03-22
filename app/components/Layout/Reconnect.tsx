import * as React from "react";
import { NetworkStore } from "stores/NetworkStore";
import { withRouter, Link } from "react-router";
import { connect } from "alt-react";
import willTransitionTo from "../../routerTransition";
import Translate from "react-translate-component";
import ReactTooltip from "react-tooltip";
import { getClassName } from "utils";

type ReconnectProps = {
  online?: boolean,
  connected: boolean,
  synced?: boolean,
  currentNodePing?: number,
  apiStatus?: string,
  initDone?: boolean,
  router: any
};

let Reconnect = class extends React.Component<ReconnectProps, { retry }> {
  timer;
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  componentWillReceiveProps(nextProps: ReconnectProps) {
    console.debug("Recive: ", this.props, nextProps);
    if (nextProps.apiStatus === "online") {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
    if (
      ((nextProps.apiStatus !== this.props.apiStatus && (nextProps.apiStatus === "offline" || nextProps.apiStatus === "error") && this.props.online) ||
        (nextProps.online !== this.props.online && this.props.apiStatus === "offline" && nextProps.online)) &&
      !this.timer && this.props.initDone
    ) {
      console.debug("To Reconnect");
      // (NetworkStore as any).setInitDone(false);
      this.reconnect();
    }
  }

  reconnect() {
    this.timer = setTimeout(() =>
      willTransitionTo(this.props.router, this.props.router.replace, () => { }, false),
      6000);
  }

  get currentStatus() {
    let { connected, online, synced, apiStatus } = this.props;
    return apiStatus === "online" && online && synced ?
      "ok" : !online ?
        "net_offline" : apiStatus === "offline" ?
          "api_offline" : !synced || apiStatus === "blocked" ?
            "nosync" : "unknown";
  }

  render() {
    let { connected, apiStatus, online, synced, currentNodePing } = this.props;

    return (
      <div className="connect-wrapper">
        <Link to="/settings">
          <Translate className={getClassName("reconnect-toggle text-center highlight", { "error": !online || apiStatus === "offline", "warning": this.currentStatus !== "ok" })} data-tip data-for="connection" content="footer.status.toggle" status={`${this.currentStatus}`} />
        </Link>
        <ReactTooltip id="connection" delayHide={1000} effect="solid">
          <table id="connectionStatus" className="status-table">
            <tr>
              <Translate component="td" content="footer.status.status" className="status-title text-left">
              </Translate>
              <Translate component="td" content={`footer.status.${this.currentStatus}`} className="status-content text-right">
              </Translate>
            </tr>
            <tr className="border-top">
              <Translate rowSpan="2" component="td" content="footer.status.api" className="status-title text-left">
              </Translate>
              <Translate component="td" content={`footer.status.apiStatus.${apiStatus}`} className="status-content text-right">
              </Translate>
            </tr>
            <tr>
              <td className="status-content text-right">
                {currentNodePing || "-"}ms
              </td>
            </tr>
            <tr className="border-top">
              <Translate component="td" content="footer.status.network" className="status-title text-left">
              </Translate>
              <Translate component="td" content={`footer.status.${online ? "online" : "offline"}`} className="status-content text-right">
              </Translate>
            </tr>
          </table>
        </ReactTooltip>

        {/* <Translate component="a" href="javascript:;" content="init_error.retry" onClick={this.reconnect.bind(this)} /> */}
      </div>
    )
  }
}

Reconnect = connect(Reconnect, {
  listenTo() {
    return [NetworkStore]
  },
  getProps() {
    return {
      ...NetworkStore.getState()
    };
  }
});

Reconnect = withRouter(Reconnect);

export { Reconnect };
export default Reconnect;