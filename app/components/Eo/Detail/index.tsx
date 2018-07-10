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
import moment from "moment";
import BindToChainState from "../../Utility/BindToChainState";
import AccountInfo from "../../Account/AccountInfo";
import { connect } from "alt-react";
import AccountStore from "stores/AccountStore";
import "./detail.scss";
let logo_demo = require('assets/img_demo_1.jpg');
let time = require('assets/time.png');

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
                <div className="button primery-button disabled">
                <Translate content="EIO.Reserve_Now" />
                </div>
                </Link>
              )
            }else if(this.state.data.status == 'pre'){
              return (
                <div className="button primery-button disabled">
                  等待众筹开始
                </div>
              )
            }
          }})
        break;
        case 'waiting':
          this.setState({reserve_status:()=>{
            return (
              <div className="button primery-button disabled">
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
              <div className="button primery-button disabled">
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
              <div className="button primery-button disabled">
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
  componentDidMount(){
    let data = {
      project: this.props.params.id
    }

    fetchJson.fetchDetails(data,(res)=>{
      let countDownTime = moment(res.result.end_at).valueOf() - moment().valueOf();
      let endAt = moment(res.result.end_at);
      let startAt = moment(res.result.start_at);
      let finishAt = moment(res.result.finish_at);
      let now = moment();
      // let remainStr = `${endAt.diff(now,'days')} ${moment(this.state.countDownTime).format('hh:mm')}`
      let remainStr;
      let projectStatus;
      switch(res.result.status){
        case 'pre':
        countDownTime = moment(startAt).valueOf() - moment().valueOf();
        remainStr = `${startAt.diff(now,'days')} 天 ${moment(countDownTime).format('hh:mm')}`
        break;
        case 'finish':
        countDownTime = moment(finishAt).valueOf();
        remainStr = `${0-finishAt.diff(now,'days')} 天 ${moment(countDownTime).format('hh:mm')}`
        break;
        case 'ok':
        countDownTime = moment(endAt).valueOf() - moment().valueOf();
        remainStr = `${endAt.diff(now,'days')} 天 ${moment(countDownTime).format('hh:mm')}`
        break;
        case 'fail':
        countDownTime = moment(finishAt).valueOf();
        remainStr = `${finishAt.diff(now,'days')} 天 ${moment(countDownTime).format('hh:mm')}`
        break;
        default:
      }

      this.setState({
        countDownTime,
        data: res.result,
        remainStr
      }, ()=>{
        // setInterval(()=>{
        //   this.setState({
        //     countDownTime: (this.state.countDownTime>1000)?(this.state.countDownTime-1000): 0
        //   })
        // },1000)

        
      });
      if(!this.props.myAccounts[0]){
        this.setState({kyc_status: ()=>{
          return (
            <Link to={`/login`}>
            <div className="button primery-button">
            <Translate content="EIO.Reserve_Now" />
            </div>
            </Link>
          )
        }});
      }else{
        fetchJson.fetchKYC({cybex_name: this.props.myAccounts[0], project:this.props.params.id}, (res2)=>{
          switch(res2.result.status){
            case 'ok':
              this.setState({reserve_status:()=>{
                if(res.result.status == 'ok'){
                  return (
                    <Link to={`/ieo/join/${this.props.params.id}`}>
                    <div className="button primery-button disabled ok">
                    <Translate content="EIO.Reserve_Now" />
                    </div>
                    </Link>
                  )
                }else if(res.result.status == 'pre'){
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
                    预约失败
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
                  <div className="button primery-button disabled pending">
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
                  <div className="button primery-button can-reserve" onClick={this.reserve.bind(this)}>
                    立即预约
                    {/* <Translate content="EIO.Reserve_Now" /> */}
                  </div>
                )
              }else{
                return(
                  <div className="button primery-button disabled can-not-reserve">
                    立即预约
                  {/* <Translate content="EIO.Reserve_Now" /> */}
                  </div>
                )
              }
              
            }})
          }
          if(res2.result.kyc_status=='ok'){
            this.setState({kyc_status:()=>null})
          }else{
            this.setState({kyc_status:()=>{
              return (
                <div>
                  <Link to="/ieo/training">
                  <div className="kyc-btn button primery-button">
                    <Translate content="EIO.Accept_KYC_Verification" />
                  </div>
                  </Link>
                </div>
              )
            }})
          }
        });
        // res.result.kyc_status = 'ok'
        
      }
    });
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
    const {
      name, 
      status,
      current_user_count,
      current_base_token_count,
      base_max_quota,
      rate,
      adds_token_total,
      adds_ico_total,
      start_at,
      end_at,
      adds_on_market_time,
      adds_advantage,
      offer_at,
      base_token_count,
      district_restriction,
      base_token_name,
      adds_website,
      whitepaper,
      adds_detail,
      current_percent,
      adds_banner
    } = data;
    let percent = current_percent*100;
        percent = percent.toFixed(2);
    let showPercent = `${percent>100?100:percent}%`;
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
        <img src={adds_banner} />
        {percent?(<div className="info-item">
          <div className="percent">
            <div className="percent-in" style={{width: showPercent}}></div>
          </div>
          <div className="info-text">{percent}%</div>
        </div>):null}
        
        {name?(<div className="info-item">
          <div className="info-title">
            <Translate content="EIO.Project_Name" />: 
          </div>
          <div className="info-detail">{name}</div>
        </div>):null}
        
        {current_user_count?(<div className="info-item">
          <div className="info-title">
            <Translate content="EIO.Participants" />: 
          </div>
          <div className="info-detail">{current_user_count}</div>
        </div>):null}
        
        {current_base_token_count?(<div className="info-item">
          <div className="info-title">
            <Translate content="EIO.Raised" />:
          </div>
          <div className="info-detail">{current_base_token_count}</div>
        </div>):null}
        
        {rate?(<div className="info-item">
          <div className="info-title">
            <Translate content="EIO.Redeeming_Ratio" />: 
          </div>
          <div className="info-detail">{rate}</div>
        </div>):null}
        
        {base_max_quota?(<div className="info-item">
          <div className="info-title">
            <Translate content="EIO.Personal_Limit" />: 
          </div>
          <div className="info-detail">{base_max_quota}</div>
        </div>):null}
        
        {remainStr?(<div className="info-item large-time">
          <div className="info-title">
          <img className="icon-time" src={time} />
          {status == 'ok'? (
              <span className={`sub-time ${status}`}> 距离结束 </span>
            ):(
              (status == 'pre')? (
                <span className={`sub-time ${status}`}> 距离开始 </span>
              ):(
                status == 'finish'? (
                  <span className={`sub-time ${status}`}> 完成时间 </span>
                ):(
                  <span className={`sub-time ${status}`}> 完成时间 </span>
                )
              )
            )}
          </div>
          <div className="info-detail">{remainStr}</div>
        </div>):null}
        </div>
        <div className="right-part">
          <h3 className="title">
            <span className="main">
              <Translate content="EIO.Project_Details" />
            </span>
            {status == 'ok'? (
              <span className="sub">[<Translate content="EIO.ok" />]</span>
            ):(
              (status == 'pre')? (
                <span className="sub">[<Translate content="EIO.pre" />]</span>
              ):(
                status == 'finish'? (
                  <span className="sub">[<Translate content="EIO.finish" />]</span>
                ):(
                  <span className="sub">[<Translate content="EIO.pause" />]</span>
                )
              )
            )}
          </h3>
          
          {name?(<div className="info-item">
            <div className="info-title">
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

          
          {start_at?(<div className="info-item">
            <div className="info-title">
            <Translate content="EIO.IEO_Period" />: 
            </div>
            <div className="info-detail">{start_at}</div>
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
            <div className="info-detail"><Link to={adds_website}>{adds_website}</Link></div>
          </div>):null}
          {whitepaper?(<div className="info-item">
            <div className="info-title">
            <Translate content="EIO.Whitepaper" />: 
            </div>
            <div className="info-detail"><Link to={whitepaper}>{whitepaper}</Link></div>
          </div>):null}
          
          {adds_detail?(<div className="info-item">
            <div className="info-title">
            <Translate content="EIO.Project_Details" />: 
            </div>
            <div className="info-detail">{adds_detail}</div>
          </div>):null}
          

          <div className="button-holder">
          {/* <Trigger open="ieo-detail-modal"> */}
          {/* {this.state.kyc_status()} */}
          {
            (status == 'ok'||status == 'pre') ? (
                this.state.reserve_status()
            ):null 
          }
          {
            (status == 'ok'||status == 'pre') ? (
              this.state.kyc_status()
             ):null 
          }
            
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


