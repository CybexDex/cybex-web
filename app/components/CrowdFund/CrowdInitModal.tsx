import * as React from "react"; import * as PropTypes from "prop-types";
import Translate from "react-translate-component";
import ChainTypes from "../Utility/ChainTypes";
import BindToChainState from "../Utility/BindToChainState";
import utils from "common/utils";
import counterpart from "counterpart";
import AssetActions from "actions/AssetActions";
import AccountSelector from "../Account/AccountSelector";
import AmountSelector from "../Utility/AmountSelector";
import { getObjectExtensionField } from "utils";
import { Period } from "components/Forms/Period";
import { getClassName } from "utils//ClassName";


export class CrowdInitModal extends React.Component<{ onSubmit, onClose, asset }, { u, t, [x: string]: any }> {

    constructor(props) {
        super(props);
        this.state = {
            u: 18000,
            t: 3600
        }
    }

    onSubmit = (e: Event) => {
        e.preventDefault();
        let { u, t } = this.state;
        let { asset } = this.props;
        this.props.onSubmit({ t, u, asset });
    }

    onPeriodChange = (field: string) => (period: number) => {
        this.setState({
            [field]: period
        });
    }

    render() {
        let { asset } = this.props;
        let { u, t } = this.state;
        let valid = u > 0 && t > 0;
        return (
            <form className="grid-block vertical full-width-content">
                <h4>{asset && asset.symbol}</h4>
                <div className="grid-container " style={{ paddingTop: "2rem" }}>
                    <div className="content-block">
                        <label htmlFor="crowdU">
                            <Translate component="span" content="crowdfund.timeLimit" />
                        </label>
                        <Period
                            className="period-horizontal"
                            defaultPeriod={u}
                            name="crowdU"
                            onPeriodChange={this.onPeriodChange("u")} />
                    </div>
                    <div className="content-block">
                        <label htmlFor="crowdT">
                            <Translate component="span" content="crowdfund.timeToLock" />
                        </label>
                        <Period
                            className="period-horizontal"
                            defaultPeriod={t}
                            name="crowdT"
                            onPeriodChange={this.onPeriodChange("t")} />
                    </div>
                    <div className="content-block button-group">
                        <Translate
                            component="button"
                            className={getClassName("button", { "disabled": !valid })}
                            type="submit"
                            content="modal.issue.submit"
                            onClick={this.onSubmit}
                        />
                        <Translate
                            className="button"
                            component="button"
                            onClick={this.props.onClose}
                            content="cancel"
                        />
                    </div>
                </div>
            </form>
        );
    }
}
export default CrowdInitModal;
// export default BindToChainState(IssueModal);
