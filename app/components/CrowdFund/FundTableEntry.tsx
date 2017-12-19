import * as React from "react";
import { getClassName } from "utils//ClassName";
import { DATETIME_FORMAT_FULL } from "utils/Contansts";
import * as moment from "moment";
import Translate from "react-translate-component";


enum ContractState {
  NORMAL = 1,
  CANCEL = 2
}

export class FundTableEntry extends React.Component<{ fund, partiCrowds, partiCrowd, withdrawCrowd }, { expand }> {
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    };
  }

  toggleExpand = () => {
    this.setState(prevState => ({
      expand: !prevState.expand
    }));
  }

  render() {
    let { fund, partiCrowds, partiCrowd, withdrawCrowd } = this.props;
    let partedCrowd = partiCrowds[fund.id] || [];
    let { expand } = this.state;
    let endM = fund.beginMoment.clone().add(fund.u, "s");
    let nowM = moment.utc();
    let beforeEnd = nowM.isBefore(endM);
    return (
      <tbody className={getClassName("", { "table-toggable": partedCrowd.length, expand })}>
        <tr className="entry-main">
          <td className="toggle">
            {
              partedCrowd.length ?
                <a href="javascript:;" onClick={this.toggleExpand}>
                  {fund.asset_id}
                </a> :
                fund.asset_id
            }
          </td>
          <td>{fund.beginMoment.format(DATETIME_FORMAT_FULL)}</td>
          <td>{fund.beginMoment.clone().add(fund.u, "s").format(DATETIME_FORMAT_FULL)}</td>
          <td>{fund.t}</td>
          <td>{fund.V  / 100000}</td>
          <td>{
            beforeEnd ?
              <Translate
                component="button"
                content="crowdfund.partCrowd"
                className={getClassName("button outline", {})}
                onClick={() => partiCrowd(fund)} /> :
              <Translate content="crowdfund.crowdFinish" />
          }</td>
        </tr>
        {
          expand && partedCrowd.map(partied => {
            let lockM = partied.whenM.clone().add(fund.t, "s");
            let beforeLockEnd = nowM.isBefore(lockM);
            return (
              <tr key={partied.id} className="entry-sub">
                <td>{fund.asset_id}</td>
                <td>{partied.whenM.format(DATETIME_FORMAT_FULL)}</td>
                <td>{endM.format(DATETIME_FORMAT_FULL)}</td>
                <td>{lockM.format(DATETIME_FORMAT_FULL)}</td>
                <td>{partied.valuation / 100000}</td>
                <td>{
                  partied.state === ContractState.CANCEL ?
                    <Translate content="crowdfund.crowdWithdrawed" /> :
                    beforeEnd ?
                      beforeLockEnd ?
                        <Translate
                          component="button"
                          content="crowdfund.crowdWithdraw"
                          className={getClassName("button outline", {})}
                          onClick={() => withdrawCrowd(partied)} /> :
                        <Translate content="crowdfund.crowdWorking" /> :
                      <Translate content="crowdfund.crowdFinish" />
                }</td>
              </tr>
            );
          })
        }
      </tbody>
    )
  }
}