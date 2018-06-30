import * as React from "react";
import * as PropTypes from "prop-types";
import GatewayActions, {
  DEPOSIT_MODAL_ID,
  WITHDRAW_MODAL_ID
} from "actions/GatewayActions";
import GatewayStore from "stores/GatewayStore";
import AccountStore from "stores/AccountStore";
import WalletUnlockStore from "stores/WalletUnlockStore";
import { JadePool } from "services//GatewayConfig";
import Icon from "../Icon/Icon";
import Translate from "react-translate-component";
import ReactTooltip from "react-tooltip";

import counterpart from "counterpart";
import { List } from "immutable";

import ChainTypes from "../Utility/ChainTypes";
import EquivalentPrice from "../Utility/EquivalentPrice";
import BindToChainState from "../Utility/BindToChainState";
import BalanceComponent from "../Utility/BalanceComponent";
import LinkToAssetById from "../Utility/LinkToAssetById";
import DepositModal from "components//Gateway/DepositModal";
import WithdrawModal from "components//Gateway/WithdrawModal";
import { connect } from "alt-react";

const { ADDRESS_TYPES } = JadePool;

const oriAssets = Object.keys(ADDRESS_TYPES);

const noBalanceTip = counterpart.translate("gateway.no_balance");

let AssetRow = class extends React.Component<any, any> {
  static propTypes = {
    balance: ChainTypes.ChainObject
  };
  _showWithdrawModal = asset => {
    let { account } = this.props;
    GatewayActions.showWithdrawModal(asset);
  };
  _showDepositWithdraw(asset) {
    let { account } = this.props;
    GatewayActions.showDepositModal(account.get("name"), asset);
  }

  render() {
    let { asset, balance } = this.props;
    console.debug("Asset: ", balance);
    let canWithdraw = balance && balance.get && balance.get("balance") > 0;
    // let canWithdraw = !!asset.get("balance") && asset.get("balance") > 0;
    return (
      <>
        <tr>
          <td>
            <LinkToAssetById asset={asset.get("id")} />
          </td>
          <td>
            {canWithdraw ? (
              <BalanceComponent
                balance={asset.get("balance")}
                hide_asset={true}
              />
            ) : (
              "-"
            )}
          </td>
          <td>
            <a
              onClick={this._showDepositWithdraw.bind(
                this,
                asset.get("symbol"),
                false
              )}
            >
              <Icon name="deposit" className="icon-14px" />
            </a>
          </td>
          <td>
            {(canWithdraw && (
              <a
                className={!canWithdraw ? "disabled" : ""}
                onClick={
                  canWithdraw
                    ? this._showWithdrawModal.bind(
                        this,
                        asset.get("symbol"),
                        false
                      )
                    : () => {}
                }
              >
                <Icon name="withdraw" className="icon-14px" />
              </a>
            )) || (
              <a
                href="javascript:;"
                data-for="noBalance"
                data-place="right"
                data-offset="{ 'left': -6 }"
                style={{ opacity: 0.3 }}
                data-tip
              >
                <Icon name="withdraw" className="icon-14px" />
              </a>
            )}
          </td>
        </tr>
        <ReactTooltip id="noBalance" effect="solid">
          {noBalanceTip}
        </ReactTooltip>
      </>
    );
  }
};

AssetRow = BindToChainState(AssetRow);

let GatewayTable = class extends React.Component<any, any> {
  static propTypes = {
    assets: ChainTypes.ChainAssetsList.isRequired
  };

  static defaultProps = {
    assets: List()
  };

  render() {
    let { assets, balances, filter, account } = this.props;
    let assetRows = assets.filter(a => !!a).map(asset => {
      console.debug("Balance: ", balances);
      let a = asset.set("balance", balances.get(asset.get("id")));
      return a;
    });
    return (
      <table className="table gateway-table dashboard-table with-shadow">
        <thead>
          <tr>
            <Translate component="th" content="account.asset" />
            <Translate component="th" content="account.qty" />
            {/* <Translate component="th" content="account.eq_value_header"></Translate> */}
            <Translate component="th" content="gateway.deposit" />
            <Translate component="th" content="gateway.withdraw" />
          </tr>
        </thead>
        <tbody>
          {assetRows.map(asset => (
            <AssetRow
              key={asset.get("id")}
              asset={asset}
              account={account}
              balance={asset.get("balance")}
            />
          ))}
        </tbody>
      </table>
    );
  }
};
GatewayTable = BindToChainState(GatewayTable, { keep_update: true });

let GatewayRecords = class extends React.Component<{ account; isLocked? }, {}> {
  static propTypes = {
    isLocked: PropTypes.bool.isRequired
  };

  static defaultProps = {
    isLocked: true
  };

  constructor(props) {
    super(props);
    if (!props.isLocked) {
      GatewayActions.queryFundRecords(props.account);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.isLocked && !this.props.isLocked) ||
      prevProps.account !== this.props.account
    ) {
      console.debug("[GatewayRecords] Updated", prevProps, this.props);
      GatewayActions.queryFundRecords(this.props.account);
    }
  }

  query = () => {
    GatewayActions.queryFundRecords(this.props.account);
  };
  login = () => {
    GatewayActions.loginGatewayQuery(this.props.account);
  };
  render() {
    return (
      <>
        <button onClick={this.query}>Query</button>
        <button onClick={this.login}>Login</button>
      </>
    );
  }
};

GatewayRecords = connect(
  GatewayRecords,
  {
    listenTo() {
      return [WalletUnlockStore];
    },
    getProps(props) {
      console.debug(
        "WalletUnlockStore.getState()",
        WalletUnlockStore.getState()
      );
      return {
        isLocked: WalletUnlockStore.getState().locked
      };
    }
  }
);

let GatewayContainer = class extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      nameFilter: "",
      onlyCanWithdraw: false
    };
  }

  static propTypes = {
    account: ChainTypes.ChainAccount.isRequired
  };
  componentWillMount() {}

  onNameFilterChange = e => {
    let nameFilter = e.target.value.toUpperCase();
    this.setState({
      nameFilter
    });
  };

  onWithdrawFilterChange = e => {
    let onlyCanWithdraw = e.target.checked;
    this.setState({
      onlyCanWithdraw
    });
  };

  render() {
    let { depositModal, withdrawModal, account } = this.props;
    let { nameFilter } = this.state;
    let assets = oriAssets.filter(asset => asset.search(nameFilter) !== -1);
    return (
      <div className="page-layout">
        <div className="grid-block main-content">
          <div className="grid-container gateway-wrapper app-tables overview-tabs">
            <div className="filter-wrapper">
              <input
                name="nameFilter"
                id="nameFilter"
                type="text"
                onChange={this.onNameFilterChange}
                value={this.state.nameFilter}
                placeholder={counterpart.translate("gateway.find_asset")}
              />

              {/* <label htmlFor="onlyCanWithdraw">
                <input type="checkbox" checked={this.state.onlyCanWithdraw} onChange={this.onWithdrawFilterChange} />
                <Translate content="account.asset" />
              </label> */}
            </div>
            <GatewayTable
              filter={this.state}
              assets={assets}
              account={account}
              balances={account.get("balances", null)}
            />
            <GatewayRecords account={account} />
            {depositModal && (
              <DepositModal
                balances={account.get("balances", null)}
                modalId={DEPOSIT_MODAL_ID}
                fade={true}
              />
            )}
            {withdrawModal && (
              <WithdrawModal
                balances={account.get("balances", null)}
                account={account}
                issuer={account.get("id")}
                modalId={WITHDRAW_MODAL_ID}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
};

GatewayContainer = BindToChainState(GatewayContainer);
GatewayContainer = connect(
  GatewayContainer,
  {
    listenTo() {
      return [AccountStore, GatewayStore];
    },
    getProps() {
      return {
        account: AccountStore.getState().currentAccount,
        depositModal: GatewayStore.getState().modals.get(DEPOSIT_MODAL_ID),
        withdrawModal: GatewayStore.getState().modals.get(WITHDRAW_MODAL_ID)
      };
    }
  }
);

export { GatewayContainer as Gateway };
export default GatewayContainer;
