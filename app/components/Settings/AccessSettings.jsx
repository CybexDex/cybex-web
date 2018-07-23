import * as React from "react";
import * as PropTypes from "prop-types";
import Translate from "react-translate-component";
import SettingsActions from "actions/SettingsActions";
import SettingsStore from "stores/SettingsStore";
import { settingsAPIs } from "../../api/apiConfig";
import willTransitionTo from "../../routerTransition";
import { withRouter } from "react-router-dom";
import { connect } from "alt-react";
import { ChainConfig, Apis } from "cybexjs-ws";
const URL_FRAGMENT_OF_TESTNET = "121.40";
const autoSelectAPI = "wss://fake.automatic-selection.com";
const testnetAPI =
  settingsAPIs.WS_NODE_LIST.find(
    a => a.url.indexOf(URL_FRAGMENT_OF_TESTNET) !== -1
  ) || {};

class ApiNode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovered: false
    };
  }

  setHovered() {
    this.setState({ hovered: true });
  }

  clearHovered() {
    this.setState({ hovered: false });
  }

  activate(url) {
    SettingsActions.changeSetting({
      setting: "apiServer",
      value: url
    });
    if (
      SettingsStore.getSetting("activeNode") !=
      SettingsStore.getSetting("apiServer")
    ) {
      setTimeout(
        function() {
          willTransitionTo(false);
        }.bind(this),
        50
      );
    }
  }

  remove(url, name, e) {
    this.props.triggerModal(e, url, name);
  }

  render() {
    const { props, state } = this;
    const {
      allowActivation,
      allowRemoval,
      automatic,
      autoActive,
      name,
      url,
      displayUrl,
      ping,
      up
    } = props;

    let color;
    let green = "#00FF00";
    let yellow = "yellow";
    let red = "red";
    let latencyKey;

    if (ping < 400) {
      color = green;
      latencyKey = "low_latency";
    } else if (ping >= 400 && ping < 800) {
      color = yellow;
      latencyKey = "medium_latency";
    } else {
      color = red;
      latencyKey = "high_latency";
    }
    /*
        * The testnet latency is not checked in the connection manager,
        * so we force enable activation of it even though it shows as 'down'
        */
    const isTestnet = url === testnetAPI.url;

    var Status =
      isTestnet && !ping ? null : (
        <div className="api-status">
          <Translate
            style={{ color: up ? green : red, marginBottom: 0 }}
            component="h3"
            content={"settings." + (up ? "node_up" : "node_down")}
          />
          {up && (
            <Translate content={`settings.${latencyKey}`} style={{ color }} />
          )}
          {!up && <span style={{ color: "red" }}>__</span>}
        </div>
      );

    return (
      <div
        className="api-node card"
        onMouseEnter={this.setHovered.bind(this)}
        onMouseLeave={this.clearHovered.bind(this)}
      >
        <h3 style={{ marginBottom: 0, marginTop: 0 }}>{name}</h3>
        <p style={{ marginBottom: 0 }}>{displayUrl}</p>
        {automatic &&
          autoActive && (
            <div className="api-status">
              <Translate content="account.votes.active_short" component="h3" />
            </div>
          )}
        {!allowActivation && !allowRemoval && !automatic && Status}
        {allowActivation && !automatic && !state.hovered && Status}
        {allowRemoval &&
          state.hovered &&
          !(automatic && autoActive) && (
            <div className="button" onClick={this.remove.bind(this, url, name)}>
              <Translate id="remove" content="settings.remove" />
            </div>
          )}
        {allowActivation &&
          state.hovered &&
          !(automatic && autoActive) &&
          (automatic || isTestnet ? true : true) && (
            <div className="button" onClick={this.activate.bind(this, url)}>
              <Translate content="settings.activate" />
            </div>
          )}
      </div>
    );
  }
}

ApiNode.defaultProps = {
  name: "Test node",
  url: "wss://testnode.net/wss",
  displayUrl: "wss://testnode.net/wss",
  up: true,
  ping: null,
  allowActivation: false,
  allowRemoval: false
};

const ApiNodeWithRouter = withRouter(ApiNode);

class AccessSettings extends React.Component {
  constructor(props) {
    super(props);

    let isDefaultNode = {};

    settingsAPIs.WS_NODE_LIST.forEach(node => {
      isDefaultNode[node.url] = true;
    });

    this.isDefaultNode = isDefaultNode;
    this.chain = ChainConfig.address_prefix;
  }

  getNodeIndexByURL(url) {
    const { props } = this;

    var index = null;

    for (var i = 0; i < props.nodes.length; i++) {
      let node = props.nodes[i];
      if (node.url == url) {
        index = i;
        break;
      }
    }

    return index;
  }

  getCurrentNodeIndex() {
    const { props } = this;
    let currentNode = this.getNodeIndexByURL.call(this, props.currentNode);

    return currentNode;
  }

  getNode(node) {
    const { props } = this;

    return {
      name: node.location || "Unknown location",
      url: node.url,
      up: node.url in props.apiLatencies,
      ping: props.apiLatencies[node.url]
    };
  }

  setPrefix() {
    let e = document.getElementById("setPrefix");
    // console.debug("SetPrefix: ", e);
    if (!e || !e.value) return;
    let value = e.value;
    let chainKey = "PREFIX_" + Apis.instance().chain_id;
    if (localStorage) {
      localStorage.setItem(chainKey, value);
    }
    location.reload();
  }

  renderNode(node, allowActivation) {
    const { props } = this;

    let automatic = node.url === autoSelectAPI;

    let displayUrl = automatic ? "..." : node.url;

    let name =
      !!node.name &&
      typeof node.name === "object" &&
      "translate" in node.name ? (
        <Translate component="span" content={node.name.translate} />
      ) : (
        node.name
      );

    let allowRemoval =
      !automatic && !this.isDefaultNode[node.url] ? true : false;

    return (
      <ApiNodeWithRouter
        {...node}
        autoActive={props.currentNode === autoSelectAPI}
        automatic={automatic}
        allowActivation={allowActivation}
        allowRemoval={allowActivation && allowRemoval}
        key={node.url}
        name={name}
        displayUrl={displayUrl}
        triggerModal={props.triggerModal}
      />
    );
  }

  render() {
    const { props } = this;
    let getNode = this.getNode.bind(this);
    let renderNode = this.renderNode.bind(this);
    let currentNodeIndex = this.getCurrentNodeIndex.call(this);
    let nodes = props.nodes.map(node => {
      return getNode(node);
    });

    let activeNode = getNode(props.nodes[currentNodeIndex] || props.nodes[0]);

    if (activeNode.url == autoSelectAPI) {
      let nodeUrl = props.activeNode;
      currentNodeIndex = this.getNodeIndexByURL.call(this, nodeUrl);
      activeNode = getNode(props.nodes[currentNodeIndex]);
    }
    // console.debug("Nodes: ", nodes);
    // nodes = nodes.slice(0, currentNodeIndex).concat(nodes.slice(currentNodeIndex+1)).sort(function(a,b){
    nodes = nodes
      .filter((node, index) => index !== currentNodeIndex && node.url)
      .sort(function(a, b) {
        // console.debug("A: ", a, "; Test: ", testnetAPI);
        let isTestnet = a.url === testnetAPI.url;
        if (a.url == autoSelectAPI) {
          return -1;
        } else if (a.up && b.up) {
          return a.ping - b.ping;
        } else if (!a.up && !b.up) {
          if (isTestnet) return -1;
          return 1;
        } else if (a.up && !b.up) {
          return -1;
        } else if (b.up && !a.up) {
          return 1;
        }

        return 0;
      });

    return (
      <div className="nodes-wrapper" style={{ paddingTop: "1em" }}>
        <Translate component="p" content="settings.active_node" />
        <div className="active-node">{renderNode(activeNode, false)}</div>

        <div className="available-nodes">
          <Translate component="p" content="settings.available_nodes" />
          {nodes.map(node => {
            return renderNode(node, true);
          })}
        </div>
        <div className="button-wrapper">
          <Translate
            id="add"
            onClick={props.triggerModal.bind(this)}
            component="button"
            className="button"
            content="settings.add_api"
          />
        </div>
        {/* <div className="form-group grid-block grid-x-padding full-container">
                    Specified Prefix - {Apis.instance().chain_id}
                    <input className="small-10 medium-10" id="setPrefix" type="text" value={this.nodePrefix} />
                    <button className="small-2 medium-2" onClick={this.setPrefix.bind(this)}>Confirm</button>
                </div> */}
      </div>
    );
  }
}

AccessSettings = connect(
  AccessSettings,
  {
    listenTo() {
      return [SettingsStore];
    },
    getProps() {
      return {
        currentNode: SettingsStore.getState().settings.get("apiServer"),
        activeNode: SettingsStore.getState().settings.get("activeNode"),
        apiLatencies: SettingsStore.getState().apiLatencies
      };
    }
  }
);

export default AccessSettings;
