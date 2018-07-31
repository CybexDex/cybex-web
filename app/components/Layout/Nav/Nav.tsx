import * as React from "react";
import * as PropTypes from "prop-types";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { getClassName } from "utils/ClassName";
import Icon from "components/Icon/Icon";
import SettingsStore from "stores/SettingsStore";
import AccountStore from "stores/AccountStore";
import SettingsActions from "actions/SettingsActions";
import { connect } from "alt-react";
import { Apis } from "cybexjs-ws";
import Translate from "react-translate-component";
// For logout
import { ModalActions } from "actions/ModalActions";
import LogoutModal, {
  DEFAULT_LOGOUT_MODAL_ID
} from "components/Modal/LogoutModal";
import { NavItem } from "components/Common";
import { Colors } from "components/Common/Colors";
import { ExplorerNav } from "components/Explorer/ExplorerNav";

interface NavLink {
  id: string;
  routeTo?: ((...args: any[]) => string) | string;
  name: string;
  icon?: string;
  isActive?: boolean;
  activeMatcher?: RegExp;
  beFilter?: boolean;
  displayOnlyWhen?: string;
  down?: boolean;
  children?;
}

const NavLinks: Array<NavLink> = [
  {
    id: "eto",
    routeTo: "/eto/detail/1025",
    activeMatcher: /^\/eto/,
    name: "eto",
    icon: "ETO"
  },
  {
    id: "account",
    routeTo: accountName => `/account/${accountName}/dashboard`,
    activeMatcher: /^\/account/,
    name: "account",
    icon: "wallet",
    displayOnlyWhen: "currentAccount"
  },
  {
    id: "exchange",
    routeTo: lastMarket => `/market/${lastMarket}`,
    activeMatcher: /^\/market/,
    name: "exchange",
    icon: "exchange"
  },
  {
    id: "gateway",
    routeTo: "/gateway",
    name: "gateway",
    icon: "gateway",
    displayOnlyWhen: "currentAccount"
  },
  {
    id: "transfer",
    routeTo: "/transfer",
    name: "transfer",
    icon: "transfer"
  },
  {
    id: "explorer",
    routeTo: "/explorer/blocks",
    activeMatcher: /^\/ledger|explorer/,
    name: "explorer",
    icon: "explorer",
    children: <ExplorerNav />
  }
];

let logoutItem = {
  id: "logout",
  // routeTo: "/transfer",
  name: "logout",
  icon: "logout"
};

let sideStyles = {
  base: {
    position: "absolute",
    transition: "all 0.3s",
    background: Colors.$colorGradientFoilex
  },
  horizontal: {
    bottom: 0,
    left: 0,
    transform: "translateX(-50%)",
    height: "0.334rem",
    width: "6.3334rem",
    borderRadius: "4px 4px 0 0"
  },
  vertical: {
    top: "-50%",
    left: 0,
    transform: "translateY(-50%)",
    height: "3.334rem",
    width: "0.3334rem",
    borderRadius: "0 4px 4px 0"
  }
};

type NavProps = {
  settings?: any;
  isVertical?;
  currentAccount?: string;
  lastMarket?: string;
  [x: string]: any;
};

const getNavId = id => `$nav__${id}`;

let Nav = class extends React.PureComponent<
  NavProps,
  { isExpand; siderTop; siderLeft }
> {
  constructor(props: NavProps) {
    super(props);
    this.state = {
      isExpand: true,
      siderTop: -100,
      siderLeft: 0
    };
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static defaultProps = {
    isVertical: false
  };

  componentDidMount() {
    // this._updateSide();
  }
  // componentDidUpdate() {
  //   this._updateSide();
  // }

  toggleNav() {
    SettingsActions.toggleNav(true);
  }

  logout = () => {
    ModalActions.showModal(DEFAULT_LOGOUT_MODAL_ID);
  };

  isActive = (link: NavLink) =>
    link.activeMatcher
      ? link.activeMatcher.test(this.props.location.pathname)
      : this.props.location.pathname.search(this.getRoute(link)) !== -1;

  getRoute = (link: NavLink) => {
    let routerConfig = this.getRouterConfig();
    return typeof link.routeTo === "function"
      ? link.routeTo.call(this, routerConfig[link.id])
      : link.routeTo;
  };

  getRouterConfig = () => {
    let { currentAccount, lastMarket } = this.props;
    let routerConfig = {
      account: currentAccount,
      exchange: lastMarket || "CYB_JADE.ETH"
    };
    return routerConfig;
  };

  render() {
    let { settings, currentAccount, lastMarket, isVertical } = this.props;
    let routerConfig = this.getRouterConfig();
    let isExpand = settings.get("navState");
    let sideStyle: any = {
      ...sideStyles.base,
      ...(isVertical ? sideStyles.vertical : sideStyles.horizontal)
    };
    if (isVertical) {
      sideStyle.top = this.state.siderTop + "px";
    } else {
      sideStyle.left = this.state.siderLeft + "px";
    }
    return (
      <nav
        id="mainNav"
        className={getClassName("nav transition", {
          expand: isExpand,
          "nav-hor": !isVertical
        })}
      >
        <div className="nav-items">
          {NavLinks.filter(
            link =>
              link.displayOnlyWhen ? !!this.props[link.displayOnlyWhen] : true
          ).map(link => {
            let routeTo = this.getRoute(link);

            let id = getNavId(link.id);
            return [
              link.down && isVertical ? (
                <div key="$nav__divider" style={{ flexGrow: 1 }} />
              ) : null,
              <NavItem
                {...link}
                {...this.props}
                key={id}
                id={id}
                onClick={e => {
                  this.props.history.push(routeTo);
                }}
                active={
                  link.activeMatcher
                    ? link.activeMatcher.test(this.props.location.pathname)
                    : this.props.location.pathname.search(routeTo) !== -1
                }
                linkTo={routeTo}
              />
            ];
          })}
        </div>
        {/* <i style={sideStyle as any} /> */}
      </nav>
    );
  }
};

Nav = connect(
  Nav,
  {
    listenTo() {
      return [AccountStore, SettingsStore];
    },
    getProps() {
      const chainID = Apis.instance().chain_id;
      return {
        settings: SettingsStore.getState().settings,
        currentAccount:
          AccountStore.getState().currentAccount ||
          AccountStore.getState().passwordAccount,
        lastMarket: SettingsStore.getState().viewSettings.get(
          `lastMarket${chainID ? "_" + chainID.substr(0, 8) : ""}`
        )
      };
    }
  }
);

Nav = withRouter(Nav);

export default Nav;
export { Nav };
