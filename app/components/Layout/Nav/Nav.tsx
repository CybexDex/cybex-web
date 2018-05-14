import * as React from "react";
import * as PropTypes from "prop-types";
import { Link, withRouter, WithRouterProps } from "react-router";
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
}

const NavLinks: Array<NavLink> = [
  // {
  //   id: "account",
  //   routeTo: accountName => `/account/${accountName}/dashboard`,
  //   activeMatcher: /^\/account/,
  //   name: "Account",
  //   icon: "wallet",
  //   displayOnlyWhen: "currentAccount"
  // },
  {
    id: "explorer",
    routeTo: "/ledger",
    activeMatcher: /^\/ledger|explorer/,
    name: "Explorer",
    icon: "explorer"
  },
  {
    id: "exchange",
    routeTo: lastMarket => `/market/${lastMarket}`,
    activeMatcher: /^\/market/,
    name: "Exchange",
    icon: "exchange"
  },
  {
    id: "gateway",
    routeTo: "/gateway",
    name: "Gateway",
    icon: "gateway",
    displayOnlyWhen: "currentAccount"
  },
  {
    id: "transfer",
    routeTo: "/transfer",
    name: "Transfer",
    icon: "transfer"
  },
  {
    id: "settings",
    routeTo: "/settings",
    name: "Settings",
    icon: "settings",
    down: true
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
    top: "-50%",
    left: 0,
    transition: "top 0.3s",
    transform: "translateY(-50%)",
    height: "3.334rem",
    width: "0.3334rem",
    borderRadius: "0 4px 4px 0",
    background: Colors.$colorGradientFoilex
  }
};
// const NavLink = ({ icon, name, isActive, id }: NavItem) => (
//   <div className={getClassName("nav-item transition", { active: isActive })}>
//     <i className={`icon-${icon}`} />
//     <div className="nav-title">
//       <Translate content={`nav.${id}`} />
//     </div>
//   </div>
// );

type NavProps = WithRouterProps & {
  settings: any;
  currentAccount: string;
  [x: string]: string;
};

const getNavId = id => `$nav__${id}`;

export class Nav extends React.Component<NavProps, { isExpand; siderTop }> {
  constructor(props: NavProps) {
    super(props);
    this.state = {
      isExpand: true,
      siderTop: -100
    };
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentDidMount() {
    let active = NavLinks.filter(this.isActive)[0];
    if (!active) return;
    let id = getNavId(active.id);
    this.updateSide(id);
  }

  toggleNav() {
    SettingsActions.toggleNav(true);
  }

  logout = () => {
    ModalActions.showModal(DEFAULT_LOGOUT_MODAL_ID);
  };

  updateSide = id => {
    let target = document.getElementById(id);
    let siderTop = target.offsetTop + target.offsetHeight / 2;
    this.setState({
      siderTop
    });
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
    let { settings, currentAccount, lastMarket } = this.props;
    let routerConfig = this.getRouterConfig();
    let isExpand = settings.get("navState");
    let sideStyle = { ...sideStyles.base };
    sideStyle.top = this.state.siderTop + "px";
    return (
      <nav
        id="mainNav"
        className={getClassName("nav transition", { expand: isExpand })}
      >
        <div className="nav-items">
          {NavLinks.filter(
            link =>
              link.displayOnlyWhen ? !!this.props[link.displayOnlyWhen] : true
          ).map(link => {
            let routeTo = this.getRoute(link);

            let id = getNavId(link.id);
            return [
              link.down ? (
                <div key="$nav__divider" style={{ flexGrow: 1 }} />
              ) : null,
              <NavItem
                {...link}
                key={id}
                id={id}
                onClick={e => {
                  this.context.router.push(routeTo);
                  this.updateSide(id);
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
          {/* Logout Button */}
          {currentAccount && (
            <NavItem
              {...logoutItem}
              key={getNavId(logoutItem.id)}
              id={getNavId(logoutItem.id)}
              onClick={this.logout}
            />
          )}
        </div>
        <i style={sideStyle as any} />
      </nav>
    );
  }
}

const NavWithProps = connect(Nav, {
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
});

export default withRouter(NavWithProps);
