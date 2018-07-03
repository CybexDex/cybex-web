import * as React from "react"; 
import * as PropTypes from "prop-types";

import Modal from "react-foundation-apps/src/modal";
import foundationApi from "react-foundation-apps/src/utils/foundation-api";

// import Button from "../../Common/Button";
import BindToChainState from "../../Utility/BindToChainState";
import AccountInfo from "../../Account/AccountInfo";
// import AccountStore from "../../../stores/AccountStore";
import DetailModal from "./Modal.jsx";
import Trigger from "react-foundation-apps/src/trigger";
import AccountStore from "stores/AccountStore";
import { connect } from "alt-react";
import "./join.scss";
import * as fetchJson from "../service";
import Translate from "react-translate-component";




export class BaseModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fadeOut: false
    };
  }

  onClose = () => {
    this.setState({
      fadeOut: true
    });
    // setTimeout(() => {
    //   ModalActions.hideModal(this.props.modalId);
    // }, 300);
    // if (this.props.onClose) {
    //   this.props.onClose();
    // }
  };
  componentDidMount(){
    let data = {
      project: this.props.params.id
    }
    fetchJson.fetchDetails(data,(res)=>{
      this.setState({data: res.result});
    });
  }
  componentWillReceiveProps(n){
    this.setState({
      isShow: n.isShow
    });
  }
  cao = () => {
    foundationApi.publish(this.props.id, "close");
  }
  render() {
    console.log(this.state)
    const data = this.state.data || {}
    const {
      name, 
      token_name,
      status,
      current_user_count,
      current_base_token_count,
      base_max_quota,
      rate,
      adds_token_total,
      adds_ico_total,
      start_at,
      adds_on_market_time,
      adds_advantage,
      offer_at,
      base_token_count,
      district_restriction,
      base_token_name,
      adds_website,
      whitepaper,
      adds_detail,
      current_percent
    } = data;
    return (
      <div className="join-container">
        <div className="join-content">
          <div className="input-item">
            <h3>{name}({token_name})</h3>
            <p><Translate content="EIO.current_ETH_balance" />: {current_user_count} <br />
            <Translate content="EIO.Quota_Remaining" />: {current_base_token_count} <br />
            <Translate content="EIO.Personal_Limit" />: {base_max_quota}</p>
          </div>
          <div className="input-item">
          <input type="text" className="enter-info" placeholder="please enter" />
          <Trigger open="ieo-detail-modal">
          <button className="join-action detail-join-btn">Submit</button>
          </Trigger>
          <button className="add-money detail-join-btn" onClick={this.cao}>Add Money</button>
          <p className="error-msg">21312321</p>
          </div>
          <div className="input-item">
            <p className="description">jkaslkdfk sadfkklsdafjs sadfasdfsadfdsa</p>
          </div>
          {/* <Button ButtonSize="xsmall" ButtonType="secondary">submit</Button> */}
        </div>
        <DetailModal id="ieo-detail-modal">
          </DetailModal>
      </div>
      // <div className={`detail-modal${isShow ? ` show`:` hide`}`}>
      //   <div className="modal-container">
      //     <div className="modal-title">123</div>
      //     <div className="modal-content">456</div>
      //     <div className="modal-footer">789</div>
      //   </div>
      //   <div className={`over-lay${isShow ? ` show`:` hide`}`}></div>
      // </div>
    );
  }
}
// console.log(BindToChainState(BaseModal));
// export default BaseModal;
// const Cao = BindToChainState(BaseModal);

export default connect(BaseModal,{
    listenTo() {
      return [AccountStore];
    },
    getProps(props) {
      return {
        myAccounts: AccountStore.getMyAccounts(),
        accountsWithAuthState: AccountStore.getMyAccountsWithAuthState(),
        isMyAccount: AccountStore.getState()
      }
      // let assets = Map(),
      //   assetsList = List();
      // if (props.account.get("assets", []).size) {
      //   props.account.get("assets", []).forEach(id => {
      //     assetsList = assetsList.push(id);
      //   });
      // } else {
      //   assets = AssetStore.getState().assets;
      // }
      // let crowdsInited = CrowdFundStore.getState().initCrowds;
      // return {
      //   assets,
      //   assetsList,
      //   notification: NotificationStore.getState().notification,
      //   crowdsInited
      // };
    }
  })
// export default BindToChainState(BaseModal);
