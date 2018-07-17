import * as React from "react"; 
import * as PropTypes from "prop-types";

import Modal from "react-foundation-apps/src/modal";
import Trigger from "react-foundation-apps/src/trigger";
import foundationApi from "react-foundation-apps/src/utils/foundation-api";

// import Button from "../../Common/Button";
import BindToChainState from "../../Utility/BindToChainState";
import AccountInfo from "../../Account/AccountInfo";
import { Button } from "components/Common/Button";
// import AccountStore from "../../../stores/AccountStore";
import AccountStore from "stores/AccountStore";
import { connect } from "alt-react";
import "./AlertModal.scss";
import Translate from "react-translate-component";
import * as fetchJson from "../service";



export class AlertModal extends React.Component {

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
  submits() {
    this.sentdata({
      user:this.props.accountsWithAuthState[0],
      project: this.props.project,
      msg: {
        code: this.refs.codeInput.value
      }
    });
  }

  sentdata(data){
    fetchJson.fetchCreatUser(data, (res)=>{
      if(res.code == -1){
        this.setState({
          errorMsg: res.result
        });
      }
      this.props.cb()
    });
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
        success
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
export default AlertModal;

// export default connect(BaseModal,{
//     listenTo() {
//       return [AccountStore];
//     },
//     getProps(props) {
//       return {
//         myAccounts: AccountStore.getMyAccounts(),
//         accountsWithAuthState: AccountStore.getMyAccountsWithAuthState(),
//         isMyAccount: AccountStore.getState()
//       }
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
  //   }
  // })
// export default BindToChainState(BaseModal);
