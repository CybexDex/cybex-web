import * as React from "react";
import * as PropTypes from "prop-types";
import GatewayActions, {
  DEPOSIT_MODAL_ID,
  WITHDRAW_MODAL_ID
} from "actions/GatewayActions";
import GatewayStore from "stores/GatewayStore";
import AccountStore from "stores/AccountStore";
import WalletUnlockActions from "actions/WalletUnlockActions";
import WalletUnlockStore from "stores/WalletUnlockStore";
import { JadePool } from "services//GatewayConfig";
import { FundRecordEntry, FundRecordRes } from "services//GatewayModels";
import Icon from "../Icon/Icon";
import Translate from "react-translate-component";
import ReactTooltip from "react-tooltip";

import counterpart from "counterpart";
import { List } from "immutable";
import { Colors } from "components/Common/Colors";

import ChainTypes from "../Utility/ChainTypes";
import EquivalentPrice from "../Utility/EquivalentPrice";
import BindToChainState from "../Utility/BindToChainState";
import BalanceComponent from "../Utility/BalanceComponent";
import FormattedAsset from "../Utility/FormattedAsset";
import LinkToAssetById from "../Utility/LinkToAssetById";
import { Tabs, Tab } from "../Utility/Tabs";

import utils from "common/utils";
import DepositModal from "components//Gateway/DepositModal";
import WithdrawModal from "components//Gateway/WithdrawModal";
import { connect } from "alt-react";
import { Club } from "components/StaticPages/Club";
//React Table
import ReactTable from "react-table";

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
        {!canWithdraw && (
          <ReactTooltip id="noBalance" effect="solid">
            {noBalanceTip}
          </ReactTooltip>
        )}
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
      let a = asset.set("balance", balances.get(asset.get("id")));
      return a;
    });
    return (
      <table className="table gateway-table dashboard-table">
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

let GatewayRecords = class extends React.Component<
  { account; isLocked?: boolean; fundRecords?: FundRecordRes; login? },
  {}
> {
  static propTypes = {
    isLocked: PropTypes.bool.isRequired
  };

  static defaultProps = {
    isLocked: true
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.isLocked) {
      WalletUnlockActions.unlock();
    } else {
      GatewayActions.queryFundRecords(this.props.account, this.props.login);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.isLocked && !this.props.isLocked) ||
      prevProps.account !== this.props.account
    ) {
      console.debug("[GatewayRecords] Updated", prevProps, this.props);
      GatewayActions.queryFundRecords(this.props.account, this.props.login);
    }
  }

  query = () => {
    GatewayActions.queryFundRecords(this.props.account, this.props.login);
  };
  login = () => {
    GatewayActions.loginGatewayQuery(this.props.account);
  };
  render() {
    let { fundRecords, isLocked } = this.props;
    let records = fundRecords.records || [];
    return (
      <div className="gateway-records" style={{ position: "relative" }}>
        {/*<table
          className="table gateway-table dashboard-table"
          style={
            isLocked ? { filter: "blur(5px)", transform: "scale(0.99)" } : {}
          }
        >
          <thead>
            <tr>
              <Translate component="th" content="account.asset" />
              <Translate component="th" content="gateway.type" />
              <Translate component="th" content="transfer.amount" />
              <Translate component="th" content="gateway.address" />
              <Translate component="th" content="proposal.status" />
              <Translate component="th" content="gateway.last_update" />
            </tr>
          </thead>
          <tbody>
            {fundRecords.records &&
              fundRecords.records.map(record => (
                <tr key={record.updateAt}>
                  <td>{record.coinType}</td>
                  <Translate
                    component="td"
                    content={`gateway.${record.fundType.toLowerCase()}`}
                  />
                  <td>
                    <FormattedAsset
                      asset={record.asset}
                      amount={record.amount}
                      hide_asset
                    />
                  </td>
                  <td>{record.address}</td>
                  <td>{record.state}</td>
                  <td>{record.updateAt}</td>
                </tr>
              ))}
            {!fundRecords.records ||
              (!fundRecords.records.length &&
                !isLocked && (
                  <tr>
                    <Translate
                      component="td"
                      colSpan={6}
                      content={`gateway.no_record_one_month`}
                    />
                  </tr>
                ))}
          </tbody>
              </table> */}
        <ReactTable
          data={records}
          noDataText={counterpart.translate(`gateway.no_record_one_month`)}
          previousText={counterpart.translate(`table.previousText`)}
          nextText={counterpart.translate(`table.nextText`)}
          loadingText={counterpart.translate(`table.loadingText`)}
          pageText={counterpart.translate(`table.pageText`)}
          ofText={counterpart.translate(`table.ofText`) + " "}
          rowsText={counterpart.translate(`table.rowsText`)}
          style={
            isLocked ? { filter: "blur(5px)", transform: "scale(0.99)" } : {}
          }
          columns={[
            {
              Header: counterpart.translate("account.asset"),
              accessor: "coinType",
              maxWidth: 80
            },
            {
              Header: counterpart.translate("gateway.type"),
              maxWidth: 80,
              accessor: record =>
                counterpart.translate(
                  `gateway.${record.fundType.toLowerCase()}`
                ),
              id: "fundType"
            },
            {
              Header: counterpart.translate("transfer.amount"),
              accessor: d => ({ asset: d.asset, amount: d.amount }),
              maxWidth: 120,
              id: "amount",
              sortMethod: (a, b) => {
                return a.amount - b.amount;
              },
              Cell: row => (
                <FormattedAsset
                  asset={row.original.asset}
                  amount={row.original.amount}
                  hide_asset
                />
              )
            },
            {
              Header: counterpart.translate("gateway.address"),
              id: "address",
              accessor: d => d.address
            },
            {
              Header: counterpart.translate("proposal.status"),
              id: "state",
              maxWidth: 80,
              accessor: d => d.state
            },
            {
              Header: counterpart.translate("gateway.last_update"),
              maxWidth: 180,
              id: "update",
              accessor: d => d.updateAt
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        {isLocked && (
          <div
            className="mask gateway-mask"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Colors.$colorMask
            }}
          >
            <Translate
              className="mask-tip"
              component="th"
              content="gateway.unlock_first"
            />
          </div>
        )}
        {/* <button onClick={this.query}>Query</button> */}
        {/* <button onClick={this.login}>Login</button> */}
      </div>
    );
  }
};

GatewayRecords = connect(
  GatewayRecords,
  {
    listenTo() {
      return [WalletUnlockStore, GatewayStore];
    },
    getProps(props) {
      console.debug(
        "WalletUnlockStore.getState()",
        WalletUnlockStore.getState()
      );
      return {
        isLocked: WalletUnlockStore.getState().locked,
        fundRecords: GatewayStore.getState().records,
        login: GatewayStore.getState().login
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
          <div className="grid-container">
            <Tabs
              defaultActiveTab={1}
              segmented={false}
              setting="overviewTab"
              className="overview-tabs app-tables gateway-wrapper"
              contentClass="no-padding"
              tabsClass="account-overview no-padding bordered-header content-block"
            >
              <Tab title="account.deposit_withdraw">
                <div className="filter-wrapper">
                  <input
                    name="nameFilter"
                    id="nameFilter"
                    type="text"
                    style={{ marginBottom: 0 }}
                    onChange={this.onNameFilterChange}
                    value={this.state.nameFilter}
                    placeholder={counterpart.translate("gateway.find_asset")}
                  />
                </div>
                <GatewayTable
                  filter={this.state}
                  assets={assets}
                  account={account}
                  balances={account.get("balances", null)}
                />
              </Tab>
              <Tab title="gateway.fund_records">
                <GatewayRecords account={account} />
              </Tab>
              <Tab title="gateway.fund_records">
                <Club />
              </Tab>
            </Tabs>
          </div>

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
