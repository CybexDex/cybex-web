import * as React from "react";
import * as PropTypes from "prop-types";
// import { Provider } from 'react-redux';
// import configureStore from './configureStore.js';
// import EOComponent from './Eo';
// import EoStore from "stores/EoStore";
// const store = configureStore();
import Anthem from './anthem';
import jdenticon from "jdenticon";
import sha256 from "js-sha256";
import { Link } from "react-router"; 
let logo_demo = require('assets/cybex_rainbow_lg.png');
import ReactSwipe from 'react-swipe';
import * as fetchJson from "./service";
import './transfer.scss';
import Translate from "react-translate-component";
import BindToChainState from "../Utility/BindToChainState";
import AccountInfo from "../Account/AccountInfo";
import { connect } from "alt-react";
import AccountStore from "stores/AccountStore";

class EO extends React.Component<any, any> {
  // nestedRef;
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount(){
    console.log(this.props)
    fetchJson.fetchJsonList((data)=>{
      this.setState({data: data.result});
    });
    fetchJson.fetchBanner((res)=>{
      this.setState({bannerData: res.result});
    })
    fetchJson.fetchKYC({cybex_name: this.props.myAccounts[0]}, (res)=>{
      this.setState({kyc_status: res.result});
    })
  }
  next() {
    this.reactSwipe.next();
  }

  prev() {
    this.reactSwipe.prev();
  }
  


  render() {
    const data = this.state.data || [];
    const bannerData = this.state.bannerData || [];
    const swipeOptions = {
      startSlide: 0,
      auto: 0,
      speed: 300,
      disableScroll: true,
      continuous: true,
      callback() {
        console.log('slide changed');
      },
      transitionEnd() {
        console.log('ended transition');
      }
    };
    
    return (
      <div>
        <div className="slider-holder">
        <ReactSwipe ref={reactSwipe => this.reactSwipe = reactSwipe} className="mySwipe" swipeOptions={swipeOptions}>
        {/* {bannerData.map((e,i)=>{
          <div key={i}>
            <div className="item">
              <img src={require('assets/img_demo_1.jpg')} />
            </div>
          </div>
        })} */}
        <div key={1}>
          <div className="item">
            <img src={require('assets/img_demo_1.jpg')} />
          </div>
        </div>
        <div key={2}>
          <div className="item">
            <div className="item-in">
            <img src={require('assets/img_demo_2.jpg')} />
            </div>
          </div>
        </div>
        <div key={3}>
          <div className="item">
            <img src={require('assets/img_demo_3.jpg')} />
          </div>
        </div>
        </ReactSwipe>
        <div>
          <div className="slide-btn slide-btn-left" onClick={this.prev.bind(this)}>&lt;</div>
          <div className="slide-btn slide-btn-right" onClick={this.next.bind(this)}>&gt;</div>
        </div>
        </div>

        {this.state.kyc_status=="not_start"?(
          <div className="title-container">
          <div className="kyc-btn">
            <h4><Translate content="EIO.KYC_Verification" /></h4>
            <p><Translate content="EIO.Accept_KYC_Verification" /></p>
          </div>
        </div>
        ):null
      
        }
      <div className="container">
      <div className="waterfall">
      {data.map((e,i)=>{
        let percent = e.current_percent*100;
        percent = percent.toFixed(2);
        let showPercent = `${percent>100?100:percent}%`
        return(
          <div className="pin" key={i}>
            <img src={logo_demo} width={100} height={100} />
            <h3 className="title">{e.name}<span>
            {e.status == 'ok'? (
              <p>[<Translate content="EIO.ok" />]</p>
            ):(
              (e.status == 'pre')? (
                <p>[<Translate content="EIO.pre" />]</p>
              ):(
                e.status == 'finish'? (
                  <p>[<Translate content="EIO.finish" />]</p>
                ):(
                  <p>[<Translate content="EIO.pause" />]</p>
                )
              )
            )}
            
            </span></h3>
            <p>{e.adds_detail}</p>
            <Link to={`/ieo/detail/${e.id}`}>
            <div className="button primery-button"><Translate content="EIO.Details" /></div>
            </Link>
            <div className="info-item">
              <div className="percent">
                <div className="percent-in" style={{width: showPercent}}></div>
              </div>
              <div className="info-text">{`${percent}%`}</div>
            </div>
          </div>
        )
      })}
      

      </div>
      </div>
      </div>
    );
  }
}

export default connect(EO,{
  listenTo() {
    return [AccountStore];
  },
  getProps(props) {
    return {
      myAccounts: AccountStore.getMyAccounts(),
      accountsWithAuthState: AccountStore.getMyAccountsWithAuthState(),
      isMyAccount: AccountStore.getState()
    }
  }
})
// export default EO;
