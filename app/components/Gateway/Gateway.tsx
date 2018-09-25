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
import { JadePool, GatewayAsset } from "services//GatewayConfig";
import { FundRecordEntry, FundRecordRes } from "services//GatewayModels";
import Icon from "../Icon/Icon";
import Translate from "react-translate-component";
import ReactTooltip from "react-tooltip";
import DateTime from "components/Common/DateTime";
import { getId } from "components/Common/utils";

import counterpart from "counterpart";
import { List } from "immutable";
import { Colors } from "components/Common/Colors";
import { Table } from "components/Common/Table";

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

const GatewayOperaions = ({
  address,
  hash,
  asset
}: {
  address: string;
  hash: string;
  asset: GatewayAsset;
}) => {
  return hash && asset ? (
    <Translate
      content="gateway.details"
      component="a"
      href={asset.getExplorerUrlByTx(hash)}
      target="_blank"
    />
  ) : (
    <span>-</span>
  );
};

let GatewayTable = class extends React.Component<any, any> {
  static propTypes = {
    assets: ChainTypes.ChainAssetsList.isRequired,
    balances: ChainTypes.ChainObjectsList.isRequired
  };

  static defaultProps = {
    assets: List()
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
    let { assets, balances, filter, account } = this.props;
    let balancesMap = balances
      .filter(bal => bal && bal.get)
      .reduce((map, bal) => {
        return {
          ...map,
          [bal.get("asset_type")]: bal
        };
      }, {});
    let assetRows =
      assets.filter(a => !!a && a.get).map(asset => {
        let balOfAsset = balancesMap[asset.get("id")];
        let a = asset
          .set("balance", balOfAsset ? balOfAsset.get("id") : balOfAsset)
          .set(
            "balanceAmount",
            balOfAsset ? balOfAsset.get("balance") : balOfAsset
          )
          .set("canWithdraw", balOfAsset && balOfAsset.get("balance") > 0);
        return a;
      }) || [];
    return (
      <div className="cybex-records">
        <Table
          showPagination={false}
          defaultPageSize={assetRows.length}
          noDataText={counterpart.translate("gateway.no_filterd_asset")}
          className="text-center"
          data={assetRows}
          columns={[
            {
              Header: counterpart.translate("account.asset"),
              id: "symbol",
              accessor: asset => asset.get("symbol"),
              Cell: row => {
                return <LinkToAssetById asset={row.original.get("id")} />;
              },
              sortMethod: (_a, _b) => {
                let [a, b] = [_a, _b].map(
                  asset => utils.replaceName(asset).name
                );
                return a > b ? 1 : -1;
              }
            },
            {
              Header: counterpart.translate("account.qty"),
              accessor: asset => asset,
              id: "qty",
              Cell: row => {
                return row.original.get("canWithdraw") ? (
                  <BalanceComponent
                    balance={row.original.get("balance")}
                    hide_asset={true}
                  />
                ) : (
                  "-"
                );
              },
              sortMethod: (_a, _b) => {
                let [a, b] = [_a, _b].map(asset =>
                  utils.get_asset_amount(asset.get("balanceAmount"), asset)
                );
                return a > b ? 1 : -1;
              }
            },
            {
              Header: counterpart.translate("gateway.deposit"),
              accessor: asset => asset.get("symbol"),
              id: "deposit",
              Cell: row => {
                return (
                  <a
                    onClick={this._showDepositWithdraw.bind(
                      this,
                      row.original.get("symbol"),
                      false
                    )}
                  >
                    <Icon name="deposit" className="icon-14px" />
                  </a>
                );
              },
              sortMethod: (_a, _b) => {
                let [a, b] = [_a, _b].map(
                  asset => utils.replaceName(asset).name
                );
                return a > b ? 1 : -1;
              }
            },
            {
              Header: counterpart.translate("gateway.withdraw"),
              id: "withdraw",
              accessor: asset => asset,
              Cell: row => {
                let asset = row.original;
                return asset.get("canWithdraw") ? (
                  <a
                    onClick={this._showWithdrawModal.bind(
                      this,
                      asset.get("symbol"),
                      false
                    )}
                  >
                    <Icon name="withdraw" className="icon-14px" />
                  </a>
                ) : (
                  <a
                    href="javascript:;"
                    data-for={"noBalance" + asset.get("id")}
                    data-place="right"
                    data-offset="{ 'left': -6 }"
                    className="disabled"
                    style={{ opacity: 0.3 }}
                    data-tip
                  >
                    <Icon name="withdraw" className="icon-14px" />
                    <ReactTooltip
                      id={"noBalance" + asset.get("id")}
                      effect="solid"
                    >
                      {noBalanceTip}
                    </ReactTooltip>
                  </a>
                );
              },
              sortMethod: (_a, _b) => {
                let [a, b] = [_a, _b].map(asset =>
                  utils.get_asset_amount(asset.get("balanceAmount"), asset)
                );
                return a > b ? 1 : -1;
              }
            }
          ]}
          defaultSorted={[
            {
              id: "qty",
              desc: true
            }
          ]}
        />
      </div>
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
      <div className="cybex-records" style={{ position: "relative" }}>
        <Table
          data={records}
          noDataText={counterpart.translate("gateway.no_record_one_month")}
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
              accessor: d => counterpart.translate("gateway.state." + d.state)
            },
            {
              Header: counterpart.translate("gateway.last_update"),
              maxWidth: 170,
              id: "update",
              accessor: d => d.updateAt,
              Cell: row => (
                <DateTime
                  id={getId("gateway")}
                  dateTime={row.original.updateAt}
                  notDisplayUTC={true}
                />
              )
            },
            {
              Header: counterpart.translate("gateway.operation"),
              maxWidth: 100,
              id: "operation",
              accessor: d => null,
              Cell: row => (
                <GatewayOperaions
                  address={row.original.address}
                  hash={row.original.hash}
                  asset={ADDRESS_TYPES[row.original.asset]}
                />
              )
            }
          ]}
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
    let assets = oriAssets.filter(
      asset => utils.replaceName(asset).name.search(nameFilter) !== -1
    );
    return (
      <div className="page-layout">
        <div className="grid-block main-content">
          <div className="grid-container cybex-records">
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
