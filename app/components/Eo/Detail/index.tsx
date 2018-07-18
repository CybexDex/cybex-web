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
import AlertModal from './AlertModal.jsx';
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
import ZfApi from "react-foundation-apps/src/utils/foundation-api";
import { TokenKind } from "graphql";
let logo_demo = require('assets/img_demo_1.jpg');
let time = require('assets/time.png');

class Detail extends React.Component<any, any> {
  // nestedRef;
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      reserve_status: ()=>null,
      kyc_status: ()=>null,
      canBeReserve: false
    }
  }
  reserve(){
    fetchJson.fetchKYC({cybex_name: this.props.myAccounts[0],project:this.props.params.id,create:1}, (res2) => {
      switch(res2.result.status){
        case 'ok':
          this.setState({reserve_status:()=>{
            if(this.state.data.status == 'ok'){
              return (
                <Link to={`/eto/join/${this.props.params.id}`}>
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

        this.setState({reserve_status:()=>{
          if(res2.result.kyc_status == 'ok'){
            if(this.state.data.is_user_in == 0){
              return(
              <div className="button primery-button disabled can-not-reserve">
                停止预约
                {/* <Translate content="EIO.Reserve_Now" /> */}
              </div>
              )
            }else{
              return (
                this.state.data.create_user_type == 'code'?(
                    <div className="button primery-button ok">
                      <Trigger open="ieo-detail-modal"><div>立即预约</div></Trigger>
                    </div>
                  ):(
                <div className="button primery-button can-reserve" onClick={this.reserve.bind(this)}>
                  立即预约
                  {/* <Translate content="EIO.Reserve_Now" /> */}
                </div>
                )
              )
            }
            
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

    fetchJson.fetchDetails(data,(res)=>{
      if(res.result.control !== 'online'){
        alert('go-back')
      }
      res.result.end_at = this.formatTime(res.result.end_at);
      res.result.start_at = this.formatTime(res.result.start_at);
      res.result.created_at = this.formatTime(res.result.created_at);
      res.result.finish_at = this.formatTime(res.result.finish_at);
      res.result.offer_at =  this.formatTime(res.result.offer_at);
      let countDownTime = moment(res.result.end_at).valueOf() - moment().valueOf();
      let endAt = moment(res.result.end_at);
      let startAt = moment(res.result.start_at);
      let finishAt = moment(res.result.finish_at);
      let now = moment();

      // let remainStr = `${endAt.diff(now,'days')} ${moment(this.state.countDownTime).format('hh:mm')}`
      let remainStr;
      let projectStatus;
      const shortEnglishHumanizer = humanize.humanizer({
        language: 'shortEn',
        units: [ 'd', 'h', 'm'],
        unitMeasures: {
          y: 365 * 86400000,
          mo: 30 * 86400000,
          w: 7 * 86400000,
          d: 86400000,
          h: 3600000,
          m: 60000,
          s: 1000
        },
        round: true,
        languages: {
          shortEn: {
            y: function() { return '年' },
            mo: function() { return '月' },
            d: function() { return '天' },
            h: function() { return '小时' },
            m: function() { return '分钟' },
            s: function() { return '秒' }
          }
        }
      })
      switch(res.result.status){
        case 'pre':
        countDownTime = moment(startAt).valueOf() - moment().valueOf();
        remainStr = shortEnglishHumanizer(startAt.diff(now)).replace(/[\,]/g,'');
        break;
        case 'finish':
        countDownTime = moment(finishAt).valueOf() - moment(endAt).valueOf();
        remainStr = shortEnglishHumanizer(endAt.diff(startAt)).replace(/[\,]/g,'');
        break;
        case 'ok':
        countDownTime = moment(endAt).valueOf() - moment().valueOf();
        remainStr = shortEnglishHumanizer(endAt.diff(now)).replace(/[\,]/g,'');
        break;
        case 'fail':
        countDownTime = moment(finishAt).valueOf();
        remainStr = shortEnglishHumanizer(finishAt.diff(now)).replace(/[\,]/g,'');
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
            this.state.canBeReserve?(
              <Link to={`/login`}>
              <div className="button primery-button">
              <Translate content="EIO.Reserve_Now" />
              </div>
              </Link>
            ):(
              <div className="button primery-button disabled">
              <Translate content="EIO.Reserve_Now" />
              </div>
            )
            
          )
        }});
      }else{
        // return (
        //   res.result.create_user_type == 'code'?(
        //     <div className="button primery-button pre">
        //       <Trigger open="ieo-detail-modal"><div>立即预约</div></Trigger>
        //     </div>
        //   ):(<div className="button primery-button disabled pre">
        //   等待众筹开始
        // </div>)
        // )
        fetchJson.fetchKYC({cybex_name: this.props.myAccounts[0], project:this.props.params.id}, (res2)=>{
          switch(res2.result.status){
            case 'ok':
              this.setState({reserve_status:()=>{
                if(res.result.status == 'ok'){
                  return (
                    // res.result.create_user_type == 'code'?(
                    //   <div className="button primery-button ok">
                    //     <Trigger open="ieo-detail-modal"><div>立即预约</div></Trigger>
                    //   </div>
                    // ):(
                      this.state.canBeReserve?(
                      <Link to={`/eto/join/${this.props.params.id}`}>
                      <div className="button primery-button ok">
                      <Translate content="EIO.Join_IEO_now" />
                      </div>
                      </Link>
                      ):(
                        <div className="button primery-button ok disabled">
                        <Translate content="EIO.Join_IEO_now" />
                        </div>
                      )
                    // )
                    
                  )
                }else if(res.result.status == 'pre'){
                  <div className="button primery-button disabled pre">
                    等待众筹开始
                  </div>
                  // if(res.result.is_user_in == 0){
                  //   return (
                  //     <div className="button primery-button disabled can-not-reserve">
                  //       停止预约
                  //       {/* <Translate content="EIO.Reserve_Now" /> */}
                  //     </div>
                  //   )
                  // }else{
                  //   return (
                  //     <div className="button primery-button disabled pre">
                  //     等待众筹开始
                  //   </div>
                  //   )
                  // }
                  
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
                if(res.result.is_user_in == 0){
                  return(
                  <div className="button primery-button disabled can-not-reserve">
                    停止预约
                    {/* <Translate content="EIO.Reserve_Now" /> */}
                  </div>
                  )
                }else{
                  if(this.state.canBeReserve){
                    return (
                      res.result.create_user_type == 'code'?(
                          <div className="button primery-button ok">
                            <Trigger open="ieo-detail-modal"><div>立即预约</div></Trigger>
                          </div>
                        ):(
                      <div className="button primery-button can-reserve" onClick={this.reserve.bind(this)}>
                        立即预约
                        {/* <Translate content="EIO.Reserve_Now" /> */}
                      </div>
                      )
                    )
                  }else{
                    res.result.create_user_type == 'code'?(
                      <div className="button primery-button ok disabled">
                        <div>立即预约</div>
                      </div>
                    ):(
                    <div className="button primery-button can-reserve disabled">
                      立即预约
                      {/* <Translate content="EIO.Reserve_Now" /> */}
                    </div>
                  )
                  }
                  
                }
                
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
                <div className="kyc-btn-holder">
                  <Link to="/eto/training">
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

  public openModal = () => {
    this.setState({
      showModal: true
    })
  }

  sentdata(){
    ZfApi.publish("ieo-detail-modal", "close");
    ZfApi.publish("ieo-alert-modal", "open");
    setTimeout(()=>{
      ZfApi.publish("ieo-alert-modal", "close");
      this.reserve();
    },3000)
  }

  changeCheckbox(e){
    this.setState({
      canBeReserve: e.target.checked
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
      base_min_quota,
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
      adds_banner,
      token,
      adds_keyword,
      create_user_type
    } = data;

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
        <img src={adds_banner} />
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
          <div className="info-title">
            <Translate content="EIO.Raised" />:
          </div>
          <div className="info-detail">{current_base_token_count}{base_token_name}</div>
        </div>):null}
        
        {rate?(<div className="info-item">
          <div className="info-title">
            <Translate content="EIO.Redeeming_Ratio" />: 
          </div>
          <div className="info-detail">1{base_token_name}={rate}{token}</div>
        </div>):null}
        
        {base_max_quota?(<div className="info-item">
          <div className="info-title">
            <Translate content="EIO.Personal_Limit" />: 
          </div>
          <div className="info-detail">{base_max_quota}{base_token_name}</div>
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
            <div className="info-detail">{numeral(adds_token_total).format('0,0.[0000000000]')}个</div>
          </div>):null}

          
          {start_at?(<div className="info-item">
            <div className="info-title">
            <Translate content="EIO.IEO_Period" />: 
            </div>
            <div className="info-detail">{start_at}</div>
          </div>):null}
          
          {end_at?(<div className="info-item">
            <div className="info-title">
            <Translate content="EIO.End_at" />: 
            </div>
            <div className="info-detail">{end_at}</div>
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
            <div className="info-detail">{base_token_count}{base_token_name}</div>
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
            <div className="info-detail"><a href={adds_website} target="_blank">{adds_website}</a></div>
          </div>):null}
          {whitepaper?(<div className="info-item">
            <div className="info-title">
            <Translate content="EIO.Whitepaper" />: 
            </div>
            <div className="info-detail"><a href={whitepaper} target="_blank">{whitepaper}</a></div>
          </div>):null}
          
          {adds_detail?(<div className="info-item">
            <div className="info-title">
            <Translate content="EIO.Project_Details" />: 
            </div>
            <div className="info-detail">{adds_detail}</div>
          </div>):null}

          <div className="info-item">
            <div className="info-title">
            <input 
              type="checkbox" 
              onChange={this.changeCheckbox.bind(this)} 
            />
            <label>阅读并同意</label>
            </div>
          </div>

          <div className="button-holder">
          {/* {create_user_type?(
            <Trigger open="ieo-detail-modal"><div>123</div></Trigger>
          ):null} */}
          {/* <Trigger open="ieo-detail-modal"><div>123</div></Trigger> */}
          
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
          
          {/* {this.state.kyc_status()}
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
              // <Link to={`/eto/join/${this.props.params.id}`}>
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
          <DetalModal id="ieo-detail-modal" cb={this.sentdata.bind(this)} project={this.props.params.id} isShow={this.state.showModal}>
          </DetalModal>
          <AlertModal ref="caos" id="ieo-alert-modal" cb={this.sentdata.bind(this)} project={this.props.params.id} isShow={this.state.showAlertModal}>
          </AlertModal>
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


