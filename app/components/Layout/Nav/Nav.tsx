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

interface NavLink {
  id: string;
  routeTo?: ((...args: any[]) => string) | string;
  name: string;
  icon?: string;
  isActive?: boolean;
  activeMatcher?: RegExp;
  beFilter?: boolean;
  displayOnlyWhen?: string;
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
  }
];

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
export class Nav extends React.Component<NavProps, { isExpand }> {
  constructor(props: NavProps) {
    super(props);
    this.state = {
      isExpand: true
    };
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  toggleNav() {
    SettingsActions.toggleNav(true);
  }

  logout = () => {
    ModalActions.showModal(DEFAULT_LOGOUT_MODAL_ID);
  };

  render() {
    let { settings, currentAccount, lastMarket } = this.props;
    let routerConfig = {
      account: currentAccount,
      exchange: lastMarket || "CYB_JADE.ETH"
    };
    let isExpand = settings.get("navState");
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
            let routeTo =
              typeof link.routeTo === "function"
                ? link.routeTo.call(this, routerConfig[link.id])
                : link.routeTo;
            return (
              <NavItem
                key={link.id}
                id={link.id}
                onClick={() => this.context.router.push(link.routeTo)}
                active={
                  link.activeMatcher
                    ? link.activeMatcher.test(this.props.location.pathname)
                    : this.props.location.pathname.search(routeTo) !== -1
                }
                linkTo={link.routeTo}
                {...link}
              />
            );
          })}
          {/* Logout Button */}
          {/* {currentAccount && (
            <a className="nav-link" href="javascript:;" onClick={this.logout}>
              <NavLink icon="safe-vault" id="logout" name="logout" />
            </a>
          )} */}
        </div>
        <a
          href="javascript:;"
          className="nav-toggle"
          onClick={this.toggleNav.bind(this)}
        >
          <i
            className={getClassName("", {
              "icon-lock-open": !isExpand,
              "icon-lock-lock": isExpand
            })}
          />
        </a>
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
