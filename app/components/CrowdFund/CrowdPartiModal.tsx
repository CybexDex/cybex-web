import * as React from "react";
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
import { ChangeEvent } from "react";

const inputStyle = {
    "margin": 2
};

let CrowdPartiModal = class extends React.Component<{ onSubmit, onClose, fund, asset }, { valuation, cap, [x: string]: any }> {

    static propTypes = {
        asset: ChainTypes.ChainAsset.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            valuation: 500,
            cap: 5000
        }
    }

    onSubmit = (e: Event) => {
        e.preventDefault();
        let { valuation, cap } = this.state;
        let { fund } = this.props;
        this.props.onSubmit({
            valuation: valuation * 100000,
            cap: cap * 100000,
            fund
        });
    }

    onFieldChange = (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [field]: e.target.value
        });
    }

    render() {
        let { fund, asset } = this.props;
        let { valuation, cap } = this.state;
        let valid = valuation > 0 && cap > 0 && parseFloat(cap) > parseFloat(valuation);
        return (
            <form className="grid-block vertical full-width-content">
                <h4>{asset && asset.get("symbol")}</h4>
                <div className="grid-container " style={{ paddingTop: "2rem" }}>
                    <div className="content-block">
                        <label htmlFor="crowdValuation">
                            <Translate component="span" content="crowdfund.valuation" />
                        </label>
                        <input
                            className="period-horizontal"
                            defaultValue={valuation}
                            type="number"
                            name="crowdValuation"
                            style={inputStyle}
                            onChange={this.onFieldChange("valuation")} />
                    </div>
                    <div className="content-block">
                        <label htmlFor="crowdCap">
                            <Translate component="span" content="crowdfund.cap" />
                        </label>
                        <input
                            className="period-horizontal"
                            defaultValue={cap}
                            type="number"
                            style={inputStyle}
                            name="crowdCap"
                            onChange={this.onFieldChange("cap")} />
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

CrowdPartiModal = BindToChainState(CrowdPartiModal);
export { CrowdPartiModal }

export default CrowdPartiModal;
