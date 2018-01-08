import * as React from "react";
import { connect } from "alt-react";
import CrowdFundActions from "actions//CrowdFundActions";
import CrowdFundStore from "stores/CrowdFundStore";
import AccountStore from "stores/AccountStore";
import NotificationStore from "stores/NotificationStore";
import * as immutable from "immutable";
import Translate from "react-translate-component";
import ChainTypes from "../Utility/ChainTypes";
import * as moment from "moment";
import { debugGen, getClassName } from "utils";
import { FundTableEntry } from "./FundTableEntry";
import { CrowdPartiModal } from "./CrowdPartiModal";
import BaseModal from "components/Modal/BaseModal";
import ZfApi from "react-foundation-apps/src/utils/foundation-api";


// import {} from "PropTypes";
const debug = debugGen("AccountCrowdFund");

type Fund = {
  id: string,
  asset_id: string,
  u: number,
  V: number,
  t: number,
  owner: string,
  begin: Date,
  beginMoment?: moment.Moment
};

type CrowdFundProps = {
  allFunds: immutable.List<Fund>;
  partiCrowds: immutable.List<any>;
  account: immutable.Map<any, any>;
  notification?: any
};

enum CROWS_STATUS {
  OWNER,
  OPEN_NOT_IN,
  OPEN_CAN_WITHDRAW,
  OPEN_CANT_WITHDRAW,
  CLOSED
}

enum TABS {
  ALL,
  ONGOING
}

let CrowdFund = class extends React.Component<CrowdFundProps, { fund, tab }> {

  static propTypes = {
    allFunds: React.PropTypes.object,
    allPartedFunds: React.PropTypes.array,
    account: ChainTypes.ChainAccount.isRequired
  }

  static defaultProps = {
    allFunds: null,
    allPartedFunds: [],
    account: null
  }

  constructor(props) {
    super(props);
    debug("constructor");
    this.state = {
      fund: null,
      tab: TABS.ALL
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.notification !== nextProps.notification) {
      this.queryAllFunds();
      this.queryAccountPartiCrowds();
    }
  }

  componentWillMount() {
    this.queryAllFunds();
    this.queryAccountPartiCrowds();
  }

  getCurrentAccount() {
    if (!this.props.account) {
      throw new Error("No avaliable account");
    }
    return this.props.account;
  }

  queryAllFunds = () => {
    debug("queryAllFunds");
    CrowdFundActions.queryAllCrowdFunds(0, 20, this.getCurrentAccount().get("id"));
  }

  queryAccountPartiCrowds = () => {
    debug("queryAllFunds");
    let account = this.getCurrentAccount();
    CrowdFundActions.queryAccountPartiCrowds(account.get("id"));
  }


  handlePartiCrowd = (fund) => {
    console.debug("Parem: ", fund);
    this.setState({
      fund
    });
    ZfApi.publish("partCrowdModal", "open");
  }

  partiCrowd = ({
    valuation,
    cap,
    fund
  }) => {
    debug("partiCrowd");
    let account = this.getCurrentAccount();
    CrowdFundActions.partiCrowd({
      valuation, cap, buyer: account.get("id"), crowdfund: fund.id
    });

  }

  withdrawCrowd = (contract) => {
    debug("withdrawCrowd");
    let account = this.getCurrentAccount();

    CrowdFundActions.withdrawCrowdFund(
      account.get("id"),
      contract.id
    );
  }

  setTab(tab) {
    this.setState({
      tab
    });
  }

  render() {
    debug("render", this.props);
    let allFunds = this.props.allFunds.toArray();
    let onGoingFunds = allFunds.filter(fund => fund.beginMoment.clone().add(fund.u, "s").isAfter(moment.utc()));
    let { partiCrowds } = this.props;
    let { fund, tab } = this.state;
    return (
      <div className="table-wrapper">
        {!!onGoingFunds.length && <div className="hide-selector">
          {
            [TABS.ALL, TABS.ONGOING].map(tabItem =>
              <div
                className={getClassName("hide-selector-item", { inactive: tabItem !== tab })}
                onClick={tabItem === tab ? () => 0 : () => this.setTab(tabItem)}
              >
                <Translate content={"crowdfund." + TABS[tabItem]} />
              </div>
            )
          }
        </div>
        }
        <table className="table dashboard-table crowd-table table-with-highlight" style={{ "tableLayout": "fixed" }}>
          <thead>
            <tr>
              <Translate component="th" content="crowdfund.asset" />
              <Translate component="th" content="crowdfund.begin" />
              <Translate component="th" content="crowdfund.endTime" />
              <Translate component="th" content="crowdfund.lockTime" />
              <Translate component="th" content="crowdfund.currentVol" />
              <Translate component="th" content="crowdfund.action" />
            </tr>
          </thead>
          {tab === TABS.ALL ? allFunds.map(fund =>
            <FundTableEntry
              key={fund.id}
              fund={fund}
              asset={fund.asset_id}
              partiCrowds={partiCrowds}
              partiCrowd={this.handlePartiCrowd}
              withdrawCrowd={this.withdrawCrowd}
            />
          ) : onGoingFunds.map(fund =>
            <FundTableEntry
              key={fund.id}
              fund={fund}
              asset={fund.asset_id}
              partiCrowds={partiCrowds}
              partiCrowd={this.handlePartiCrowd}
              withdrawCrowd={this.withdrawCrowd}
            />)
          }
        </table>
        <BaseModal id="partCrowdModal" overlay={true}>
          <br />
          <div className="grid-block vertical">
            {fund && <CrowdPartiModal
              onSubmit={(params) => this.partiCrowd(params)}
              onClose={() => { ZfApi.publish("partCrowdModal", "close") }}
              asset={fund.asset_id}
              fund={fund}
            />}
          </div>
        </BaseModal>
      </div>
    );
  }
}

CrowdFund = connect(CrowdFund, {
  listenTo() {
    return [CrowdFundStore];
  },
  getProps() {
    return {
      allFunds: CrowdFundStore.getState().allFunds,
      notification: NotificationStore.getState().notification,
      partiCrowds:
        CrowdFundStore
          .getState()
          .partiCrowds
          .reduce((crowds, nextCrowd) => nextCrowd.crowdfund in crowds ? {
            ...crowds,
            [nextCrowd.crowdfund]: [...crowds[nextCrowd.crowdfund], nextCrowd]
          } : {
              ...crowds,
              [nextCrowd.crowdfund]: [nextCrowd]
            }, {})
    };
  }
});
export { CrowdFund }

export default CrowdFund;
