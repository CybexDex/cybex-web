import * as React from "react"; 
import * as PropTypes from "prop-types";

import Modal from "react-foundation-apps/src/modal";
import Trigger from "react-foundation-apps/src/trigger";
import foundationApi from "react-foundation-apps/src/utils/foundation-api";

// import Button from "../../Common/Button";
import BindToChainState from "../../Utility/BindToChainState";
import AccountInfo from "../../Account/AccountInfo";
// import AccountStore from "../../../stores/AccountStore";
import AccountStore from "stores/AccountStore";
import { connect } from "alt-react";
import "./Modal.scss";



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
    console.log(Trigger);
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
    // let { fade, overlay, noCloseBtn, overlayClose } = this.props;
    // let { fadeOut, isShow } = this.state;
    return (
      <Modal
        id={this.props.id}
        // overlay={props.overlay}
        // onClose={props.onClose}
        // className={props.className}
        // overlayClose={props.overlayClose}
      >
      <div className="modal-container">
        <div className="modal-content">
          <div className="input-item">
            <h3>Demo Demo</h3>
            <p>jkaslkdfk sadfkklsdafjs sadfasdfsadfdsa</p>
          </div>
          <div className="input-item">
          <input type="text" className="enter-info" placeholder="please enter" />
          <button className="join-action detail-modal-btn" disabled>Submit</button>
          <button className="add-money detail-modal-btn" onClick={this.cao}>Add Money</button>
          <p className="error-msg">21312321</p>
          </div>
          <div className="input-item">
            <p className="description">jkaslkdfk sadfkklsdafjs sadfasdfsadfdsa</p>
          </div>
          {/* <Button ButtonSize="xsmall" ButtonType="secondary">submit</Button> */}
        </div>
      </div>
      
      <Trigger close={this.props.id}>
        <a href="#" className="close-button">
          &times;
        </a>
      </Trigger>
        {/* {!props.noCloseBtn && (
          <Trigger close={props.id}>
            <a href="#" className="close-button">
              &times;
            </a>
          </Trigger>
        )}
        {props.children} */}
      </Modal>
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
