import * as React from "react"; import * as PropTypes from "prop-types"; 
import ZfApi from "react-foundation-apps/src/utils/foundation-api";
import BaseModal from "../Modal/BaseModal";
import Trigger from "react-foundation-apps/src/trigger";
import utils from "common/utils";
import Translate from "react-translate-component";

export default class ConfirmModal extends React.Component {

    show() {
        let modalId = "modal_confirm_" + this.props.type;
        ZfApi.publish(modalId, "open");
    }

    _onForce(value, e) {
        let modalId = "modal_confirm_" + this.props.type;
        e.preventDefault();

        ZfApi.publish(modalId, "close");
        if (value) this.props.onForce();
    }

    render() {
        let { type, diff, hasOrders } = this.props;

        return (
            <BaseModal id={"modal_confirm_" + type} overlay={true}>
                <Translate component="h3" content="transaction.confirm" />
                <div className="grid-block vertical">
                    {!hasOrders ?
                        <Translate content={"exchange.confirm_no_orders_" + type} />
                    : <Translate content={"exchange.confirm_" + type} diff={utils.format_number(diff, 2)} />}
                    <div className="button-group" style={{paddingTop: "2rem"}}>
                        <input onClick={this._onForce.bind(this, true)} className="button success" type="submit" value="Yes" />
                        <Trigger close={"modal_confirm_" + type}>
                            <input className="button info" type="submit" value="No" />
                        </Trigger>
                    </div>
                </div>
            </BaseModal>
        );
    }
}
