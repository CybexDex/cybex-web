import React, { Component } from "react";
import AltContainer from "alt-container";
import Translate from "react-translate-component";
import BindToChainState from "../Utility/BindToChainState";
import ChainTypes from "../Utility/ChainTypes";
import CachedPropertyStore from "stores/CachedPropertyStore";
import BlockchainStore from "stores/BlockchainStore";
import { ChainStore } from "cybexjs";
import WalletDb from "stores/WalletDb";
import SettingsStore from "stores/SettingsStore";
import SettingsActions from "actions/SettingsActions";
import Icon from "../Icon/Icon";
import counterpart from "counterpart";
import { Reconnect } from "./Reconnect";
class Footer extends React.Component {

    static propTypes = {
        dynGlobalObject: ChainTypes.ChainObject.isRequired,
        synced: React.PropTypes.bool.isRequired
    };

    static defaultProps = {
        dynGlobalObject: "2.1.0"
    };

    static contextTypes = {
        router: React.PropTypes.object
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
        const { state } = this;
        const { synced } = this.props;
        const connected = !(this.props.rpc_connection_status === "closed");

        // Current Node Details
        let currentNode = SettingsStore.getState().settings.get("activeNode");
        let currentNodePing = SettingsStore.getState().apiLatencies[currentNode];

        let block_height = this.props.dynGlobalObject.get("head_block_number");
        let version_match = APP_VERSION.match(/2\.0\.(\d\w+)/);
        let version = version_match ? `.${version_match[1]}` : ` ${APP_VERSION}`;
        let updateStyles = { display: "inline-block", verticalAlign: "top" };
        let logoProps = {};

        return (
            <div className="show-for-medium grid-block shrink footer">
                <div className="align-justify grid-block">
                    <div className="grid-block">
                        {/* <Translate component="div" className="logo" content="footer.title" /> */}
                        {/* <span className="version">
                                {version}
                            </span> */}
                        <Translate className="contact highlight link" content="footer.contact" component="div" onClick={this.onContact} />
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

                    {this.props.backup_recommended ? <span>
                        <div className="grid-block">
                            <a className="shrink txtlabel facolor-alert"
                                data-tip="Please understand that you are responsible for making your own backup&hellip;"
                                data-type="warning"
                                onClick={this.onBackup.bind(this)}><Translate content="footer.backup" />
                            </a>
                            &nbsp;&nbsp;
                        </div>
                    </span> : null}
                    {this.props.backup_brainkey_recommended ? <span>
                        <div className="grid-block">
                            <a className="grid-block shrink txtlabel facolor-alert" onClick={this.onBackupBrainkey.bind(this)}><Translate content="footer.brainkey" /></a>
                            &nbsp;&nbsp;
                        </div>
                    </span> : null}
                    {block_height ?
                        (<div className="grid-block shrink">

                            <span>
                                <span className="footer-block-title"><Translate content="footer.block" /></span>
                                &nbsp;#{block_height}
                            </span>
                        </div>) :
                        <div className="grid-block shrink"><Translate content="footer.loading" /></div>}
                    <Reconnect synced={this.props.synced} connected={connected} currentNodePing={currentNodePing} />
                </div>
            </div>
        );
    }

    onBackup() {
        this.context.router.push("/wallet/backup/create");
    }

    onBackupBrainkey() {
        this.context.router.push("/wallet/backup/brainkey");
    }

    onContact = () => {
        this.context.router.push("/contact");
    }

    onAccess() {
        SettingsActions.changeViewSetting({ activeSetting: 6 });
        this.context.router.push("/settings");
    }
}
Footer = BindToChainState(Footer, { keep_updating: true });

class AltFooter extends Component {

    render() {
        var wallet = WalletDb.getWallet();
        return <AltContainer
            stores={[CachedPropertyStore, BlockchainStore, WalletDb]}
            inject={{
                backup_recommended: () =>
                    (wallet && (!wallet.backup_date || CachedPropertyStore.get("backup_recommended"))),
                rpc_connection_status: () => BlockchainStore.getState().rpc_connection_status
            }}
        ><Footer {...this.props} />
        </AltContainer>;
    }
}

export default AltFooter;
