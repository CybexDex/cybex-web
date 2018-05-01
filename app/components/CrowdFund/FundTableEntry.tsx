import * as React from "react"; import * as PropTypes from "prop-types";
import { getClassName } from "utils//ClassName";
import { DATETIME_FORMAT_FULL } from "utils/Contansts";
import * as moment from "moment";
import Translate from "react-translate-component";
import BindToChainState from "../Utility/BindToChainState";
import ChainTypes from "../Utility/ChainTypes";
import { debugGen } from "utils";
import { Map } from "immutable";

const debug = debugGen("FundTableEntry");

enum ContractState {
  NORMAL = 1,
  CANCEL = 2
}

let FundTableEntry = class extends React.Component<{ fund, partiCrowds, partiCrowd, withdrawCrowd, asset?}, { expand }> {
  static propTypes = {
    asset: ChainTypes.ChainAsset
  }

  static defaultProps = {
    asset: Map()
  }

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
    let { fund, partiCrowds, partiCrowd, withdrawCrowd, asset } = this.props;
    let partedCrowd = partiCrowds[fund.id] || [];
    let { expand } = this.state;
    let endM = fund.beginMoment.clone().add(fund.u, "s");
    let nowM = moment.utc();
    let beforeEnd = nowM.isBefore(endM);
    let symbol = asset.get("symbol");
    let lockM = fund.beginMoment.clone().add(fund.t, "s");
    let beforeLockEnd = nowM.isBefore(lockM);
    debug(this.props);
    return (
      <tbody className={getClassName("", { "table-toggable": partedCrowd.length, expand })}>
        <tr className="entry-main">
          <td className="toggle">
            {
              partedCrowd.length ?
                <a href="javascript:;" onClick={this.toggleExpand}>
                  {symbol}
                </a> :
                symbol
            }
          </td>
          <td>{fund.beginMoment.format(DATETIME_FORMAT_FULL)}</td>
          <td>{fund.beginMoment.clone().add(fund.u, "s").format(DATETIME_FORMAT_FULL)}</td>
          <td>{lockM.format(DATETIME_FORMAT_FULL)}</td>
          <td>{fund.V / 100000}</td>
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
            return (
              <tr key={partied.id} className="entry-sub">
                <td>-</td>
                <td>{partied.whenM.format(DATETIME_FORMAT_FULL)}</td>
                <td>-</td>
                {/* <td>{endM.format(DATETIME_FORMAT_FULL)}</td> */}
                {/* <td>{lockM.format(DATETIME_FORMAT_FULL)}</td> */}
                <td>-</td>
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

FundTableEntry = BindToChainState(FundTableEntry);

export {
  FundTableEntry
}

export default FundTableEntry;