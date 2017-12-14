import * as React from "React";
import { connect } from "alt-react";
import CrowdFundActions from "actions//CrowdFundActions";
import CrowdFundStore from "stores/CrowdFundStore";
import AccountStore from "stores/AccountStore";
import * as immutable from "immutable";
import Translate from "react-translate-component";
import ChainTypes from "../Utility/ChainTypes";
import * as moment from "moment";
import { debugGen } from "utils";

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
  account: immutable.Map<any, any>
};

let CrowdFund = class extends React.Component<CrowdFundProps, any> {

  static propTypes = {
    allFunds: React.PropTypes.object,
    account: ChainTypes.ChainAccount.isRequired
  }
  constructor(props) {
    super(props);
    debug("constructor");
    let account = this.getCurrentAccount();
    CrowdFundActions.queryAccountPartiCrowds(account.get("id"));
  }

  getCurrentAccount() {
    if (!this.props.account) {
      throw new Error("No avaliable account");
    }
    return this.props.account;
  }

  queryAllFunds = () => {
    debug("queryAllFunds");
    CrowdFundActions.queryAllCrowdFunds(0, 20);
  }

  queryAccountPartiCrowds = () => {
    debug("queryAllFunds");
    let account = this.getCurrentAccount();
    CrowdFundActions.queryAccountPartiCrowds(account.get("id"));
  }

  partiCrowd = (fund) => {
    debug("partiCrowd");
    let account = this.getCurrentAccount();

    CrowdFundActions.partiCrowd({
      valuation: 3000, cap: 200000, buyer: account.get("id"), crowdfund: fund.id
    });
  }
  render() {
    debug("render", this.props);
    let allFunds = this.props.allFunds.toArray();
    return (
      <div className="table-wrapper">
        <table className="table dashboard-table crowd-table">
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
          {allFunds.map(fund =>
            <tr key={fund.id}>
              <td>{fund.asset_id}</td>
              <td>{fund.beginMoment.format()}</td>
              <td>{fund.beginMoment.add(fund.u, "s").format()}</td>
              <td>{fund.t}</td>
              <td>{fund.V}</td>
              <td>{
                <button className="button outline" onClick={() => this.partiCrowd(fund)}>参与众筹</button>
              }</td>
            </tr>
          )}
        </table>
        <button className="button outline" onClick={this.queryAllFunds}>Query All Funds</button>
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
      partiCrowds: CrowdFundStore.getState().partiCrowds
    };
  }
});
export { CrowdFund }

export default CrowdFund;
