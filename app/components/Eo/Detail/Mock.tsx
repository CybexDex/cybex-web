import * as React from "react";
import * as PropTypes from "prop-types";
// import { Provider } from 'react-redux';
// import configureStore from './configureStore.js';
// import EOComponent from './Eo';
// import EoStore from "stores/EoStore";
// const store = configureStore();
import jdenticon from "jdenticon";
import sha256 from "js-sha256";
import { Link } from "react-router"; 
import DetalModal from "./Modal.jsx";
import Trigger from "react-foundation-apps/src/trigger";
import * as fetchJson from "../service";
import Translate from "react-translate-component";
import * as moment from "moment";
// import * as humanize from "humanize-duration";
import * as humanize from "../humanize.js";
import * as numeral from "numeral";
import BindToChainState from "../../Utility/BindToChainState";
import AccountInfo from "../../Account/AccountInfo";
import { connect } from "alt-react";
import AccountStore from "stores/AccountStore";
import "./detail.scss";
import { TokenKind } from "graphql";
let logo_demo = require('assets/img_demo_1.jpg');
let time = require('assets/time.png');
let fockImg = require('assets/mockImg.png')

class Detail extends React.Component<any, any> {
  // nestedRef;
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      reserve_status: ()=>null,
      kyc_status: ()=>null
    }
  }
  reserve(){
    fetchJson.fetchKYC({cybex_name: this.props.myAccounts[0],project:this.props.params.id,create:1}, (res2) => {
      switch(res2.result.status){
        case 'ok':
          this.setState({reserve_status:()=>{
            if(this.state.data.status == 'ok'){
              return (
                <Link to={`/ieo/join/${this.props.params.id}`}>
                <div className="button primery-button disabled ok">
                <Translate content="EIO.Reserve_Now" />
                </div>
                </Link>
              )
            }else if(this.state.data.status == 'pre'){
              return (
                <div className="button primery-button disabled pre">
                  等待众筹开始
                </div>
              )
            }
          }})
        break;
        case 'waiting':
          this.setState({reserve_status:()=>{
            return (
              <div className="button primery-button disabled waiting">
                审核中
                {/* <Translate content="EIO.Reserve_Now" /> */}
              </div>
            )
          }})
        break;
        case 'reject':
          this.setState({reserve_status:()=>{
            return (
              <div>
              <div className="button primery-button disabled reject">
                审核失败
                {/* <Translate content="EIO.Reserve_Now" /> */}
              </div>
              <p>{res2.result.reason}</p>
              </div>
            )
          }})
        break;
        case 'pending':
          this.setState({reserve_status:()=>{
            return (
              <div className="button primery-button disabled waiting">
                审核中
                {/* <Translate content="EIO.Reserve_Now" /> */}
              </div>
            )
          }})
        break;
        default:
        this.setState({reserve_status:()=>{
          if(res2.result.kyc_status == 'ok'){
            return (
              <div className="button primery-button" onClick={this.reserve.bind(this)}>
                立即预约
                {/* <Translate content="EIO.Reserve_Now" /> */}
              </div>
            )
          }else{
            return(
              <div className="button primery-button disabled">
                立即预约
              {/* <Translate content="EIO.Reserve_Now" /> */}
              </div>
            )
          }
          
        }})
      }
    })
}
formatTime(input){
  // console.log(moment(moment(moment.utc(input).toDate()).local()).format('YYYY-MM-DD hh:mm:ss'))
  // console.log(moment(moment.utc(input).toDate()).local().format('YYYY-MM-DD HH:mm:ss'))
  return moment(moment.utc(input).toDate()).local().format('YYYY-MM-DD HH:mm:ss');
}
  componentDidMount(){
    let data = {
      project: this.props.params.id
    }

  }
  kycNotPass() {
    alert('Kyc Not Passed')
  }

  public openModal = () => {
    this.setState({
      showModal: true
    })
  }

  render() {
    const data = this.state.data || {}
    let
      name = null, 
      status = "pre",
      base_soft_cap = null,
      base_hard_cap = "2000ETH",
      current_user_count,
      current_base_token_count,
      base_max_quota = "2",
      base_min_quota,
      rate = "1ETH = 10万个NES",
      adds_token_total = "20亿，每年增发5%",
      adds_ico_total,
      start_at = "8月11日 11:00  (GMT +8, 新加坡时间）",
      end_at = null,
      up_at = "计划2018年11月，某知名交易所（投资方）",
      adds_on_market_time,
      adds_advantage = "Genesis有比DPOS更先进的DDPOS共识机制，有内置的基于投票的系统升级机制，同时通过侧链提供高扩展性。一个侧链就是一个虚拟国，每个虚拟国可以有完全不同的治理机制，实现无限的可能性。 Genesis项目的代码进展状况良好，testnet预计年底前上线。另外，这次IEO的融资额度非常小，又是第一轮融资，相当于散户直接可以参与基石轮。",
      offer_at,
      base_token_count = "2000ETH",
      district_restriction,
      base_token_name = "ETH",
      adds_website = "thegenesis.space",
      whitepaper = "http://thegenesis.space/whitepapers/Genesis%20Space%20Whitepaper.pdf",
      adds_detail,
      current_percent = 0,
      adds_banner,
      token = "NES",
      adds_keyword;
    let percent = current_percent*100;
        percent = percent.toFixed(2);
    // let showPercent = `${percent>100?100:percent}%`;
    let showPercent = `${percent>99?99:(percent<2?(percent==0?0:2):percent)}%`;
    let endAt = moment(end_at);
    let now = moment();

    // setInterval(()=>{
    //   this.setState({
    //     countDownTime: this.state.countDownTime-1000
    //   })
    // },1000)
    
    // console.log(endAt.diff(now,'days'),'sdafadsfdasfdsaf')

        // console.log(moment(moment(end_at).valueOf() - moment().valueOf()).format('hh:mm:ss'),'asdfdsdsf');
    // let remainStr = `${(endAt.diff(now,'days'))<0?0:(endAt.diff(now,'days'))} days ${moment(moment(end_at).valueOf() - moment().valueOf()).format('hh:mm')}`
    // let remainStr = `${endAt.diff(now,'days')} days ${moment(this.state.countDownTime).format('hh:mm:ss')}`
    // let remainStr = `${endAt.diff(now,'days')} days ${moment(this.state.countDownTime).format('hh:mm')}`
    let remainStr = this.state.remainStr;
    return (
      <div className="detail">
        <div className="left-part">
        <img src={fockImg} />
        {percent?(<div className="info-item">
          <div className="percent">
            <div className={`percent-in ${status}`} style={{width: showPercent}}></div>
          </div>
          <div className="info-text">{percent}%</div>
        </div>):null}
        
        {/* {name?(<div className="info-item">
          <div className="info-title">
            <Translate content="EIO.Project_Name" />: 
          </div>
          <div className="info-detail">{name}</div>
        </div>):null} */}
        
        {current_user_count?(<div className="info-item">
          <div className="info-title">
            <Translate content="EIO.Participants" />: 
          </div>
          <div className="info-detail">{current_user_count}人</div>
        </div>):null}
        
        {current_base_token_count?(<div className="info-item">
          <div className="info-title">
            <Translate content="EIO.Raised" />:
          </div>
          <div className="info-detail">{current_base_token_count}</div>
        </div>):null}
        
        {rate?(<div className="info-item">
          <div className="info-title">
            <Translate content="EIO.Redeeming_Ratio" />: 
          </div>
          <div className="info-detail">{rate}</div>
        </div>):null}
        
        {base_max_quota?(<div className="info-item">
          <div className="info-title">
            <Translate content="EIO.Personal_Limit" />: 
          </div>
          <div className="info-detail">{base_max_quota}个ETH</div>
        </div>):null}
        
        <div className="info-item large-time">
          <div className="info-title">
          <img className="icon-time" src={time} />
              <span className={`sub-time ${status}`}> 开始日期 </span>
          </div>
          <div className="info-detail">8月11日 11:00 (GMT +8, 新加坡时间）</div>
        </div>
        </div>
        <div className="right-part">
          <h3 className="title">
            <span className="main">
            Genesis Space
            </span>
            {status == 'ok'? (
              <span className="sub ok">[ <Translate content="EIO.ok" />...]</span>
            ):(
              (status == 'pre')? (
                <span className="sub pre">[ <Translate content="EIO.pre" /> ]</span>
              ):(
                status == 'finish'? (
                  <span className="sub finish">[ <Translate content="EIO.finish" /> ]</span>
                ):(
                  <span className="sub finish">[ <Translate content="EIO.pause" /> ]</span>
                )
              )
            )}
          </h3>
          
          {token?(<div className="info-item">
            <div className="info-title">
              <Translate content="EIO.Token_Name" />: 
            </div>
            <div className="info-detail">{token}</div>
          </div>):null}

          {name?(<div className="info-item">
            <div className="info-title">
              <Translate content="EIO.Project_Name" />: 
            </div>
            <div className="info-detail">{name}</div>
          </div>):null}
          
          {adds_token_total?(<div className="info-item">
            <div className="info-title">
              <Translate content="EIO.Total_Token_Supply" />: 
            </div>
            <div className="info-detail">{adds_token_total}</div>
          </div>):null}
          
          {base_hard_cap?(<div className="info-item">
            <div className="info-title">
            <Translate content="EIO.Hard_cap" />: 
            </div>
            <div className="info-detail">{base_hard_cap}</div>
          </div>):null}
          
          {start_at?(<div className="info-item">
            <div className="info-title">
            <Translate content="EIO.IEO_Period" />: 
            </div>
            <div className="info-detail">{start_at}</div>
          </div>):null}
          
          {end_at?(<div className="info-item">
            <div className="info-title">
            <Translate content="EIO.End_at" />: 
            </div>
            <div className="info-detail">{end_at}</div>
          </div>):null}

          {up_at?(<div className="info-item">
            <div className="info-title">
            <span>上市时间</span>: 
            </div>
            <div className="info-detail">{up_at}</div>
          </div>):null}

          {base_soft_cap?(<div className="info-item">
            <div className="info-title">
            <Translate content="EIO.Soft_cap" />: 
            </div>
            <div className="info-detail">{base_soft_cap}</div>
          </div>):null}

          

          {adds_on_market_time?(<div className="info-item">
            <div className="info-title">
            <Translate content="EIO.Listing_Time" />: 
            </div>
            <div className="info-detail">{adds_on_market_time}</div>
          </div>):null}
          
          {adds_advantage?(<div className="info-item">
            <div className="info-title">
            <Translate content="EIO.Project_Strengths" />: 
            </div>
            <div className="info-detail">{adds_advantage}</div>
          </div>):null}

          {adds_detail?(<div className="info-item">
            <div className="info-title">
            <Translate content="EIO.Project_Details" />: 
            </div>
            <div className="info-detail">{adds_detail}</div>
          </div>):null}
          
          {offer_at?(<div className="info-item">
            <div className="info-title">
            <Translate content="EIO.Token_Releasing_Time" />: 
            </div>
            <div className="info-detail">{offer_at}</div>
          </div>):null}
          
          {base_token_count?(<div className="info-item">
            <div className="info-title">
            <Translate content="EIO.IEO_Quota" />: 
            </div>
            <div className="info-detail">{base_token_count}</div>
          </div>):null}
          
          {district_restriction?(<div className="info-item">
            <div className="info-title">
            <Translate content="EIO.District_Restriction" />: 
            </div>
            <div className="info-detail">{district_restriction}</div>
          </div>):null}
          
          {base_token_name?(<div className="info-item">
            <div className="info-title">
            <Translate content="EIO.IEO_token" />: 
            </div>
            <div className="info-detail">{base_token_name}</div>
          </div>):null}
          
          {adds_website?(<div className="info-item">
          
            <div className="info-title">
            <Translate content="EIO.Official_Website" />: 
            </div>
            <div className="info-detail"><a href="http://thegenesis.space" target="_blank">{adds_website}</a></div>
          </div>):null}
          {whitepaper?(<div className="info-item">
            <div className="info-title">
            <Translate content="EIO.Whitepaper" />: 
            </div>
            <div className="info-detail"><a href={whitepaper} target="_blank">{whitepaper}</a></div>
          </div>):null}
          
          
          

          <div className="button-holder">
          <div className="button primery-button disabled pre">
                      等待众筹开始
                    </div>
          
                    <div className="kyc-btn-holder">
                  <Link to="/ieo/training">
                  <div className="kyc-btn button primery-button">
                    <Translate content="EIO.Accept_KYC_Verification" />
                  </div>
                  </Link>
                </div>
            
          {/* {this.state.kyc_status == "not-login"? (
            <Link to={`/login`}>
            <div className="button primery-button">
            <Translate content="EIO.participate" />
            </div>
            </Link>
          ): (
            this.state.kyc_status !== "not_start"? (
              // <Link to={`/ieo/join/${this.props.params.id}`}>
              <div className="button primery-button disabled" onClick={this.kycNotPass.bind(this)}>
              <Translate content="EIO.Reserve_Now" />
              </div>
              // </Link>
            ):(

              <div className="button primery-button disabled">
              <Translate content="EIO.Verifying" />
              </div>
            )
          )} */}
          
          
          {/* </Trigger> */}
          
          </div>
          
          
        </div>
          {/* <DetalModal id="ieo-detail-modal" isShow={this.state.showModal}>
          </DetalModal> */}
      </div>
    );
  }
}
//  export default Detail;

 export default connect(Detail,{
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


