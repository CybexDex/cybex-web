import { ChainStore } from "cybexjs";
import * as React from "react";
import * as PropTypes from "prop-types";
import AccountStore from "stores/AccountStore";
import SettingsStore from "stores/SettingsStore";
import VolumeActions from "actions/VolumeActions";
import NotificationStore from "stores/NotificationStore";
// import SyncError from "./components/SyncError";
import LoadingIndicator from "./components/LoadingIndicator";
// import Header from "components/Layout/Header";
import ReactTooltip from "react-tooltip";
import NotificationSystem from "react-notification-system";
// import MobileMenu from "components/Layout/MobileMenu";
// import TransactionConfirm from "./components/Blockchain/TransactionConfirm";
// import WalletUnlockModal from "./components/Wallet/WalletUnlockModal";
// import { DEFAULT_SUPPORT_MODAL } from "./components/Modal/BrowserSupportModal";
// import BackupModal from "components/Modal/BackupModal";
import WalletDb from "stores/WalletDb";
import Footer from "./components/Layout/Footer";
import CachedPropertyStore from "stores/CachedPropertyStore";
import { withRouter } from "react-router-dom";
import { ModalActions } from "./actions/ModalActions";
// import { DEFAULT_LOGOUT_MODAL_ID } from "components/Modal/LogoutModal";
import * as Loadable from "react-loadable";
import titleUtils from "common/titleUtils";
import { LoadComponent } from "./Routes";
import counterpart from "counterpart";
import { Route, Switch, Redirect } from "react-router-dom";
import { RefreshTip } from "RefreshTip";
import { EtoRefer } from "services/eto";
import {
  DEFAULT_SUPPORT_MODAL,
  DEFAULT_LOGOUT_MODAL_ID
} from "./components/Modal/ModalID";
let patch = false;
(function(window) {
  if (window) {
    let agent = window.navigator.userAgent;
    // Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"
    let version = /Chrome\/(.+)(?=\s)/i.exec(agent);
    if (version && version[1] && parseInt(version[1]) < 60) {
      console.info("Patch: ", version);
      patch = true;
    }
  }
})(window);

// Router
// import MobileMenu from "components/Layout/MobileMenu";
// import TransactionConfirm from "./components/Blockchain/TransactionConfirm";
// import WalletUnlockModal from "./components/Wallet/WalletUnlockModal";
// import BrowserSupportModal, {
//   DEFAULT_SUPPORT_MODAL
// } from "./components/Modal/BrowserSupportModal";
// import BackupModal from "components/Modal/BackupModal";
const BrowserSupportModal: any = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "syncerror" */ "./components/Modal/BrowserSupportModal"
    ),
  loading: LoadingIndicator
} as any);
const BackupModal: any = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "syncerror" */ "./components/Modal/BackupModal"
    ),
  loading: LoadingIndicator
} as any);
const LogoutModal: any = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "syncerror" */ "./components/Modal/LogoutModal"
    ),
  loading: LoadingIndicator
} as any);
const MobileMenu: any = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "syncerror" */ "./components/Layout/MobileMenu"
    ),
  loading: LoadingIndicator
} as any);
const TransactionConfirm: any = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "syncerror" */ "./components/Blockchain/TransactionConfirm"
    ),
  loading: LoadingIndicator
} as any);
const WalletUnlockModal: any = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "syncerror" */ "./components/Wallet/WalletUnlockModal"
    ),
  loading: LoadingIndicator
} as any);
const SyncError = Loadable({
  loader: () =>
    import(/* webpackChunkName: "syncerror" */ "./components/SyncError"),
  loading: LoadingIndicator
} as any);
const Header = Loadable({
  loader: () =>
    import(/* webpackChunkName: "header" */ "./components/Layout/Header"),
  loading: LoadingIndicator
} as any);
const Exchange = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "exchange" */ "./components/Exchange/ExchangeContainer"
    ),
  loading: LoadingIndicator
} as any);
const Gateway = Loadable({
  loader: () =>
    import(/* webpackChunkName: "gateway" */ "./components/Gateway/Gateway"),
  loading: LoadingIndicator
} as any);
const Eto = Loadable({
  loader: () => import(/* webpackChunkName: "ETO" */ "./components/Eo/index"),
  loading: LoadingIndicator
} as any);

const Explorer = Loadable({
  loader: () =>
    import(/* webpackChunkName: "explorer" */ "./components/Explorer/Explorer"),
  loading: LoadingIndicator
} as any);

const AccountPage = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "account" */ "./components/Account/AccountPage"
    ),
  loading: LoadingIndicator
} as any);

const Transfer = Loadable({
  loader: () =>
    import(/* webpackChunkName: "transfer" */ "./components/Transfer/Transfer"),
  loading: LoadingIndicator
} as any);

const Settings = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "settings" */ "./components/Settings/SettingsContainer"
    ),
  loading: LoadingIndicator
} as any);

// const Help = Loadable({
//   loader: () => import(/* webpackChunkName: "help" */ "./components/Help"),
//   loading: LoadingIndicator
// } as any);

const Asset = Loadable({
  loader: () =>
    import(/* webpackChunkName: "asset" */ "./components/Blockchain/Asset"),
  loading: LoadingIndicator
} as any);

const Block = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "block" */ "./components/Blockchain/BlockContainer"
    ),
  loading: LoadingIndicator
} as any);

const DashboardPage = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "dashboard" */ "./components/Dashboard/DashboardContainer"
    ),
  loading: LoadingIndicator
} as any);

const WalletManager = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "wallet" */ "./components/Wallet/WalletManager"
    ),
  loading: LoadingIndicator
} as any);
const GameCenter = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "wallet" */ "./components/GameCenter/GameCenter"
    ),
  loading: LoadingIndicator
} as any);

const ExistingAccount = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "existing-account" */ "./components/Wallet/ExistingAccount"
    ),
  loading: LoadingIndicator
} as any);

const CreateWorker = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "create-worker" */ "./components/Account/CreateWorker"
    ),
  loading: LoadingIndicator
} as any);
const EtoStatic = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "EtoStatic" */ "./components/StaticPages/EtoStatic"
    ),
  loading: LoadingIndicator
} as any);

const Login = Loadable({
  loader: () => import("./components/Login/Login"),
  loading: LoadingIndicator
} as any);
const CreateSelector = Loadable({
  loader: () => import("./components/Login/CreateSelector"),
  loading: LoadingIndicator
} as any);
const BrainkeyWallet = Loadable({
  loader: () =>
    import("components/Wallet/WalletCreate").then(
      ({ CreateWalletFromBrainkey }) => CreateWalletFromBrainkey
    ),
  loading: LoadingIndicator
} as any);
const Contact = Loadable({
  loader: () => import("./components/HelpDrawer/Contact"),
  loading: LoadingIndicator
} as any);
const EtoV2 = Loadable({
  loader: () => import("./components/Eto/Eto"),
  loading: LoadingIndicator
} as any);

let App = class extends React.Component<any, any> {
  syncCheckInterval;
  backupModal;
  priceSubscription;

  static contextTypes = {
    router: PropTypes.shape({
      route: PropTypes.object.isRequired
    }).isRequired,
    location: PropTypes.object
  };

  // static childContextTypes = {
  //   router: PropTypes.shape({
  //     route: PropTypes.object.isRequired
  //   }).isRequired,
  //   location: PropTypes.object
  // };

  constructor(props) {
    super(props);
    // console.debug("APP: ", this.props, this.context);
    let referrer = (location.href.match(/\?refer\=(.+?)(?:$|\&|\#|\/)/i) ||
      [])[1];
    if (referrer) {
      sessionStorage.setItem(EtoRefer, referrer);
    }
    // Check for mobile device to disable chat
    const user_agent = navigator.userAgent.toLowerCase();
    let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    let syncFail =
      ChainStore.subError &&
      ChainStore.subError.message ===
        "ChainStore sync error, please check your system clock"
        ? true
        : false;
    this.state = {
      loading: false,
      hasError: false,
      synced: this._syncStatus(),
      syncFail,
      theme: SettingsStore.getState().settings.get("themes"),
      isMobile: !!(
        /android|ipad|ios|iphone|windows phone/i.test(user_agent) || isSafari
      ),
      incognito: false,
      incognitoWarningDismissed: false
    };
    VolumeActions.fetchPriceData();

    this.priceSubscription = setInterval(() => {
      VolumeActions.fetchPriceData();
    }, 180 * 1000);

    this._rebuildTooltips = this._rebuildTooltips.bind(this);
    this._onSettingsChange = this._onSettingsChange.bind(this);
    this._chainStoreSub = this._chainStoreSub.bind(this);
    this._syncStatus = this._syncStatus.bind(this);
  }

  componentWillUnmount() {
    NotificationStore.unlisten(this._onNotificationChange);
    SettingsStore.unlisten(this._onSettingsChange);
    ChainStore.unsubscribe(this._chainStoreSub);
    clearInterval(this.syncCheckInterval);
    clearInterval(this.priceSubscription);
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(err, info) {
    console.error("App Catch: ", err, info);
    // this.setState({ hasError: true });
  }
  /**
   * Returns the current blocktime, or exception if not yet available
   * @returns {Date}
   */
  getBlockTime() {
    let dynGlobalObject = ChainStore.getObject("2.1.0");
    if (dynGlobalObject) {
      let block_time = dynGlobalObject.get("time");
      if (!/Z$/.test(block_time)) {
        block_time += "Z";
      }
      return new Date(block_time);
    } else {
      throw new Error("Blocktime not available right now");
    }
  }

  /**
   * Returns the delta between the current time and the block time in seconds, or -1 if block time not available yet
   *
   * Note: Could be integrating properly with BlockchainStore to send out updates, but not necessary atp
   */
  getBlockTimeDelta() {
    try {
      let bt =
        (this.getBlockTime().getTime() +
          ChainStore.getEstimatedChainTimeOffset()) /
        1000;
      let now = new Date().getTime() / 1000;
      return Math.abs(now - bt);
    } catch (err) {
      return -1;
    }
  }

  _syncStatus(setState = false) {
    let synced = this.getBlockTimeDelta() < 5;
    if (setState && synced !== this.state.synced) {
      this.setState({ synced });
    }
    return synced;
  }

  _setListeners() {
    try {
      NotificationStore.listen(this._onNotificationChange.bind(this));
      SettingsStore.listen(this._onSettingsChange);
      ChainStore.subscribe(this._chainStoreSub);
      AccountStore.tryToSetCurrentAccount();
    } catch (e) {
      console.error("e:", e);
    }
  }

  componentDidMount() {
    console.debug("[Timing] APP Start");
    this._setListeners();
    this.syncCheckInterval = setInterval(this._syncStatus, 5000);
    const user_agent = navigator.userAgent.toLowerCase();
    let version = /Chrome\/(.+)(?=\s)/i.exec(user_agent);
    let lower = version && parseInt(version[1]) < 60;

    if (
      !(
        user_agent.indexOf("firefox") > -1 ||
        user_agent.indexOf("chrome") > -1 ||
        user_agent.indexOf("edge") > -1 ||
        user_agent.indexOf("safari") > -1
      ) ||
      lower
    ) {
      // this.refs.browser_modal.show();
      // console.debug("Show Support Modal");
      ModalActions.showModal(DEFAULT_SUPPORT_MODAL, true);
    }
    // ModalActions.showModal(DEFAULT_ETHMODAL_ID, true);
    // console.debug("Context: ", this);
    this.context.router.history.listen(this._rebuildTooltips);
    // Todo
    this.showBackupTip();
    this._rebuildTooltips();
  }

  _onIgnoreIncognitoWarning() {
    this.setState({ incognitoWarningDismissed: true });
  }

  onRouteChanged() {
    document.title = titleUtils.GetTitleByPath(this.props.location.pathname);
  }

  showBackupTip() {
    var wallet = WalletDb.getWallet();
    let backup_recommended =
      wallet &&
      (!wallet.backup_date || CachedPropertyStore.get("backup_recommended"));
    if (
      this.props.location.pathname.search("wallet/backup/create") === -1 &&
      backup_recommended
    )
      this.backupModal.show();
  }

  _rebuildTooltips() {
    ReactTooltip.hide();

    setTimeout(() => {
      if (this.refs.tooltip) {
        (this.refs.tooltip as any).globalRebuild();
      }
    }, 1500);
  }

  _onLocaleChange(state) {
    // console.debug("[APP]locale change: ", state);
    this.forceUpdate();
  }

  _chainStoreSub() {
    let synced = this._syncStatus();
    if (synced !== this.state.synced) {
      this.setState({ synced });
    }
    if (ChainStore.subscribed !== this.state.synced || ChainStore.subError) {
      let syncFail =
        ChainStore.subError &&
        ChainStore.subError.message ===
          "ChainStore sync error, please check your system clock"
          ? true
          : false;
      this.setState({
        syncFail
      });
    }
  }

  /** Usage: NotificationActions.[success,error,warning,info] */
  _onNotificationChange() {
    let notification = NotificationStore.getState().notification;
    if (notification.autoDismiss === void 0) {
      notification.autoDismiss = 10;
    }
    if (this.refs.notificationSystem)
      (this.refs.notificationSystem as any).addNotification(notification);
  }

  _onSettingsChange() {
    let { settings, viewSettings } = SettingsStore.getState();
    if (settings.get("themes") !== this.state.theme) {
      this.setState({
        theme: settings.get("themes")
      });
    }
  }

  // /** Non-static, used by passing notificationSystem via react Component refs */
  // _addNotification(params) {
  //     console.log("add notification:", this.refs, params);
  //     this.refs.notificationSystem.addNotification(params);
  // }

  render() {
    let { isMobile, theme } = this.state;
    let { walletMode, location, match, ...others } = this.props;

    let content: any = null;

    let showFooter = 1;
    // if(incognito && !incognitoWarningDismissed){
    //     content = (
    //         <Incognito onClickIgnore={this._onIgnoreIncognitoWarning.bind(this)}/>
    //     );
    // } else
    if (this.state.syncFail) {
      content = <SyncError />;
    } else if (this.state.loading) {
      content = (
        <div className="grid-frame vertical">
          <LoadingIndicator
            loadingText={"Connecting to APIs and starting app"}
          />
        </div>
      );
    } else {
      content = (
        <div className={"cybex-layout" + (patch ? " patch" : "")}>
          <Header />
          <MobileMenu isUnlocked={this.state.isUnlocked} id="mobile-menu" />
          {/* <Nav isVertical={true} hideLabel={true} /> */}
          <div className="main-body">
            <Switch>
              {/* <Redirect from="*missing*" to="/dashboard" /> */}
              <Route path="/dashboard" exact component={DashboardPage} />

              <Route path="/account/:account_name" component={AccountPage} />

              {/* <Route path="/accounts" component={DashboardAccountsOnly} /> */}
              <Route path="/market/:marketID" component={Exchange} />
              <Route path="/settings/:tab" component={Settings} />
              <Route path="/settings" component={Settings} />

              <Route path="/transfer" exact component={Transfer} />
              <Route path="/gateway" exact component={Gateway} />
              {/* <Route path="/create-account" component={LoginSelector} /> */}

              {/* Explorer routes */}
              <Route path="/explorer/" component={Explorer} />
              {/* <Route path="/explorer/:tab" component={Explorer} /> */}
              <Route path="/asset/:symbol" component={Asset} />
              <Route exact path="/block/:height" component={Block} />
              <Route exact path="/block/:height/:txIndex" component={Block} />

              {/* Wallet backup/restore routes */}
              <Route path="/wallet" component={WalletManager} />
              <Route path="/game" component={GameCenter} />

              <Route path="/existing-account" component={ExistingAccount} />

              <Route path="/create-worker" component={CreateWorker} />
              <Route path="/eto-static" component={EtoStatic} />
              <Route path="/eto" component={EtoV2} />

              <Route path="/login" component={Login} />
              <Route
                path="/create-wallet-brainkey"
                component={BrainkeyWallet}
              />
              <Route path="/create-account" component={CreateSelector} />
              <Route path="/contact" component={Contact} />

              <Redirect from="/" to="/dashboard" />
            </Switch>
          </div>
          <Footer synced={this.state.synced} />
          <ReactTooltip
            ref="tooltip"
            place="top"
            // type={theme === "lightTheme" ? "dark" : "light"}
            effect="solid"
          />
        </div>
      );
    }

    return (
      <div
        style={{ backgroundColor: !this.state.theme ? "#2a2a2a" : null }}
        className={this.state.theme}
      >
        <div id="content-wrapper">
          {this.state.hasError ? <RefreshTip /> : content}
          <NotificationSystem
            ref="notificationSystem"
            allowHTML={true}
            style={{
              Containers: {
                DefaultStyle: {
                  width: "425px"
                }
              }
            }}
          />
          <TransactionConfirm />
          <BackupModal
            ref={backup => {
              this.backupModal = backup;
            }}
          />
          <WalletUnlockModal />
          {/* Logout Modal*/}
          <LogoutModal modalId={DEFAULT_LOGOUT_MODAL_ID} />
          <BrowserSupportModal modalId={DEFAULT_SUPPORT_MODAL} />
        </div>
      </div>
    );
  }
};

App = withRouter(App);
export { App };
export default App;
