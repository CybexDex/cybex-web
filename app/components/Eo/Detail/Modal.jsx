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
import "./Modal.scss";
import Translate from "react-translate-component";
import * as fetchJson from "../service";
import counterpart from 'counterpart';
import ChainTypes from "components/Utility/ChainTypes";


export class BaseModal extends React.Component {
  // static propTypes = {
  //   currentAccount: ChainTypes.ChainAccount
  // };
  constructor(props) {
    
    let timePassed = window.localStorage.getItem('timePassed');
    let timeNow = new Date().valueOf();
    let countDown = -1;
    let _countDown = parseInt((timeNow - timePassed)/1000);
    
    if(_countDown < 30){
      countDown = 30 - _countDown;
    }

    // let countDown = (30 - timePassed) > -1 ? 30 - timePassed : -1;
    super(props);
    this.state = {
      fadeOut: false,
      countDown: countDown,
      errorMsg: null
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
    // console.log(this);
    // let countDown = (30 - timePassed) > -1 ? 30 - timePassed : -1;
    // this.state = {
    //   fadeOut: false,
    //   countDown: countDown
    // };
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
      user: this.props.currentAccount,
      project: this.props.project,
      msg: {
        code: this.refs.codeInput.value
      }
    });
  }

  sentdata(data){
    fetchJson.fetchCreatUser(data, (res)=>{
      if(res.code !== 0){
        this.setState({
          errorMsg: counterpart.getLocale() == 'zh'? res.result.zh: res.result.en,
          countDown: 30
        });
        window.localStorage.setItem('timePassed', new Date().valueOf());
      } else {
        this.props.cb();
        this.setState({
          errorMsg: null
        });
        this.refs.codeInput.value = null;
      }
    });
  }
  render() {
    let countDown = this.state.countDown;
    if(countDown>-1){
      setTimeout(()=>{
        countDown--;
        this.setState({
          countDown: countDown
        });
        // window.localStorage.setItem('timePassed', new Date().valueOf());
      },1000);
    }
    let lang = counterpart.getLocale();
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
        {/* <button className="cancel detail-modal-btn" onClick={this.cao}>Cancel</button> */}
          <div className="title-holder">
            <h3>
            <Translate content="EIO.PleaseEnterCode" />
              {/* 请添加邀请码 */}
            </h3>
            
          </div>
          {/* <div className="input-item"> */}
          <div className="flex-container">
          <div className="flex-item flex-input-holder">
          <input type="text" className="enter-info" ref="codeInput" placeholder={lang=="zh"?"请输入邀请码":"Please enter invitation code"} defaultValue="" />
          {this.state.errorMsg?(
            <icon className="icon icon-error"><p>!</p></icon>
          ):null}
          
          </div>
          <div className="flex-item flex-button-holder">
          {this.state.countDown<0?
            (
              <div className="button primery-button" onClick={this.submits.bind(this)}><Translate content="EIO.Add" /></div>
            ):(
              <div className="button primery-button disabled">{`${this.state.countDown} sec`}</div>
            )}
          
          </div>
          
          {/* <div className="divider"></div> */}
          
          </div>
          {/* <p className="error-msg">21312321</p>
          </div>
          <div className="input-item">
            <p className="description">jkaslkdfk sadfkklsdafjs sadfasdfsadfdsa</p>
          </div> */}
          {/* <Button ButtonSize="xsmall" ButtonType="secondary">submit</Button> */}
        </div>
        <p className="error-msg-holder">{this.state.errorMsg}</p>
        <p className="footer-msg">
        <Translate content="EIO.helpTips" />
        {/* 邀请码获取方式请联系小助手微信：CybexServiceA */}
        </p>
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
        isMyAccount: AccountStore.getState(),
        currentAccount: AccountStore.getState().currentAccount
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
