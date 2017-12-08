import * as React from "React";
import { connect } from "alt-react";
import CrowdFundActions from "actions//CrowdFundActions";
import CrowdFundStore from "stores/CrowdFundStore";
import * as immutable from "immutable";
// import {} from "PropTypes";

const debug: (fileName: string) => (...toPrint) => void =
  filename => (...toPrint) => console.debug(`[${filename}]:`, ...toPrint);
const log = debug("AccountCrowdFund");

type Fund = {
  id: string,
  asset_id: string,
  u: number,
  V: number,
  t: number,
  owner: string,
  begin: Date
};

type CrowdFundProps = {
  allFunds: immutable.List<Fund>
};

export class CrowdFund extends React.Component<CrowdFundProps, any> {

  static propTypes = {
    allFunds: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    log("constructor");
  }

  queryAllFunds = () => {
    log("queryAllFunds");
    CrowdFundActions.queryAllCrowdFunds(0, 20);
  }

  render() {
    log("render", this.props);
    let allFunds = this.props.allFunds.toArray();
    return (
      <table className="table dashboard-table crowd-table">
        <thead>
          <tr>
            <th>众筹资产</th>
            <th>起始时间</th>
            <th>单位价格</th>
            <th>锁定时间</th>
            <th>当前众筹额</th>
          </tr>
        </thead>
        {allFunds.map(fund =>
          <tr key={fund.id}>
            <td>{fund.asset_id}</td>
            <td>{fund.begin}</td>
            <td>{fund.u}</td>
            <td>{fund.t}</td>
            <td>{fund.V}</td>
          </tr>
        )}
        <button className="button" onClick={this.queryAllFunds}>Query All Funds</button>
      </table>
    );
  }
}

export default connect(CrowdFund, {
  listenTo() {
    return [CrowdFundStore];
  },
  getProps() {
    log("Props:", CrowdFundStore.getState().allFunds);
    return {
      allFunds: CrowdFundStore.getState().allFunds
    };
  }
});
