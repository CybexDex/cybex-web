import * as React from "react";
import * as PropTypes from "prop-types";
import AltContainer from "alt-container";
import Translate from "react-translate-component";
import BindToChainState from "../Utility/BindToChainState";
import ChainTypes from "../Utility/ChainTypes";
import CachedPropertyStore from "stores/CachedPropertyStore";
import BlockchainStore from "stores/BlockchainStore";
import WalletDb from "stores/WalletDb";
import SettingsStore from "stores/SettingsStore";
import SettingsActions from "actions/SettingsActions";
import { Reconnect } from "./Reconnect";
import { Link } from "react-router-dom";

class Footer extends React.Component {
  static propTypes = {
    dynGlobalObject: ChainTypes.ChainObject.isRequired,
    synced: PropTypes.bool.isRequired
  };

  static defaultProps = {
    dynGlobalObject: "2.1.0"
  };

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.dynGlobalObject !== this.props.dynGlobalObject ||
      nextProps.backup_recommended !== this.props.backup_recommended ||
      nextProps.rpc_connection_status !== this.props.rpc_connection_status ||
      nextProps.synced !== this.props.synced
    );
  }

  handleClick() {
    this.backupModal.show();
  }

  render() {
    const connected = !(this.props.rpc_connection_status === "closed");

    // Current Node Details
    let currentNode = SettingsStore.getState().settings.get("activeNode");
    let currentNodePing = SettingsStore.getState().apiLatencies[currentNode];

    let block_height = this.props.dynGlobalObject.get("head_block_number");

    return (
      <div className="grid-block shrink footer">
        <div className="align-justify grid-block">
          {/* <VolumnContainer /> */}

          <div className="grid-block">
            {/* <Translate component="div" className="logo" content="footer.title" /> */}
            {/* <span className="version">
                                {version}
                            </span> */}
            {/* <Translate
              className="contact highlight link hide-for-small-only"
              content="nav.help"
              component="div"
              onClick={this.onHelp}
            /> */}
            <Link to="/contact">
              <Translate
                className="contact link margin-left"
                content="footer.contact"
              />
            </Link>
          </div>
          {/* {this.props.synced ?
                        null :
                        <div className="grid-block shrink txtlabel error">
                            <Translate content="footer.nosync" />&nbsp; &nbsp;
                            </div>} */}

          {
            // !connected ?
            //     <div className="grid-block shrink txtlabel error">
            //         <Translate content="footer.connection" />&nbsp; &nbsp;
            // </div> : null
          }

          {this.props.backup_recommended ? (
            <span>
              <div className="grid-block">
                <a
                  className="shrink txtlabel facolor-alert"
                  data-tip="Please understand that you are responsible for making your own backup&hellip;"
                  data-type="warning"
                  onClick={this.onBackup.bind(this)}
                >
                  <Translate content="footer.backup" />
                </a>
                &nbsp;&nbsp;
              </div>
            </span>
          ) : null}
          {this.props.backup_brainkey_recommended ? (
            <span>
              <div className="grid-block">
                <a
                  className="grid-block shrink txtlabel facolor-alert"
                  onClick={this.onBackupBrainkey.bind(this)}
                >
                  <Translate content="footer.brainkey" />
                </a>
                &nbsp;&nbsp;
              </div>
            </span>
          ) : null}
          {block_height ? (
            <div className="grid-block shrink">
              <span>
                <span className="footer-block-title">
                  <Translate content="footer.block" />
                </span>
                &nbsp;#{block_height}
              </span>
            </div>
          ) : (
            <div className="grid-block shrink">
              <Translate content="footer.loading" />
            </div>
          )}
          <Reconnect
            synced={this.props.synced}
            connected={connected}
            currentNodePing={currentNodePing}
          />
        </div>
      </div>
    );
  }

  onBackup() {
    this.context.router.history.push("/wallet/backup/create");
  }

  onBackupBrainkey() {
    this.context.router.history.push("/wallet/backup/brainkey");
  }

  onContact = () => {
    this.context.router.history.push("/contact");
  };
  onHelp = () => {
    this.context.router.history.push("/help/introduction/cybex");
  };

  onAccess() {
    SettingsActions.changeViewSetting({ activeSetting: 6 });
    this.context.router.history.push("/settings");
  }
}
Footer = BindToChainState(Footer, { keep_updating: true });

class AltFooter extends React.Component {
  render() {
    var wallet = WalletDb.getWallet();
    return (
      <AltContainer
        stores={[CachedPropertyStore, BlockchainStore, WalletDb]}
        inject={{
          backup_recommended: () =>
            wallet &&
            (!wallet.backup_date ||
              CachedPropertyStore.get("backup_recommended")),
          rpc_connection_status: () =>
            BlockchainStore.getState().rpc_connection_status
        }}
      >
        <Footer {...this.props} />
      </AltContainer>
    );
  }
}

export default AltFooter;
