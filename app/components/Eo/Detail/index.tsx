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
import "./Mock.scss";
import ZfApi from "react-foundation-apps/src/utils/foundation-api";
import counterpart from 'counterpart';
import LegalModal from "./LegalModal";
import LegalModalEn from "./LegalModalEn";
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
                        <div>
                    <input
                      type="checkbox"
                      checked={true}
                      readOnly={true}
                      className="legal-input"
                    />
                    <label className="legal-label"><Trigger open="ieo-legal-modal"><div className="legal-info"><a href="#"><Translate content="EIO.IHaveRead" /></a></div></Trigger></label>
                      <Link to={`/eto/join/${this.props.params.id}`}>
                      <div className="button primery-button ok">
                      <Translate content="EIO.Join_ETO_now" />
                      </div>
                      </Link>
                      </div>
                    
                  )
                }else if(this.state.data.status == 'pre'){
                  <div>
                    <input
                      type="checkbox"
                      checked={true}
                      readOnly={true}
                      className="legal-input"
                    />
                    <label className="legal-label"><Trigger open="ieo-legal-modal"><div className="legal-info"><a href="#"><Translate content="EIO.IHaveRead" /></a></div></Trigger></label>
                  <div className="button primery-button disabled pre">
                  <Translate content="EIO.Wait_for_ETO" />
                  </div>
                  </div>
                }else{
                  return null;
                }
              }})
            break;
            case 'waiting':
              this.setState({reserve_status:()=>{
                if(this.state.data.status == 'ok' || this.state.data.status == 'pre'){
                  return (
                    <div>
                      <input
                        type="checkbox"
                        checked={true}
                        readOnly={true}
                        className="legal-input"
                      />
                      <label className="legal-label"><Trigger open="ieo-legal-modal"><div className="legal-info"><a href="#"><Translate content="EIO.IHaveRead" /></a></div></Trigger></label>
                    <div className="button primery-button disabled waiting">
                      <Translate content="EIO.Verifying" />
                    </div>
                    </div>
                  )
                }else{
                  return null 
                }
              }})
            break;
            case 'reject':
              this.setState({reserve_status:()=>{
                if(this.state.data.status == 'ok' || this.state.data.status == 'pre'){
                  return (
                  <div>
                  <div className="button primery-button disabled reject">
                    {/* 审核不通过 */}
                    <Translate content="EIO.Reservation_failed" />
                  </div>
                  <p>{res2.result.reason}</p>
                  </div>
                )}else{
                  return null
                }
              }})
            break;
            case 'pending':
              this.setState({reserve_status:()=>{
                if(this.state.data.status == 'ok' || this.state.data.status == 'pre'){
                return (
                  <div>
                    <input
                      type="checkbox"
                      checked={true}
                      readOnly={true}
                      className="legal-input"
                    />
                    <label className="legal-label"><Trigger open="ieo-legal-modal"><div className="legal-info"><a href="#"><Translate content="EIO.IHaveRead" /></a></div></Trigger></label>
                  <div className="button primery-button disabled waiting">
                  <Translate content="EIO.Verifying" />
                  </div>
                  </div>
                )
              }else{
                return null;
              }
              }})
            break;
            default:
            this.setState({reserve_status:()=>{
              if(res2.result.kyc_status == 'ok'){
                if(this.state.data.is_user_in == 0){
                  return(
                  <div className="button primery-button disabled can-not-reserve">
                    {/* 停止预约 */}
                    <Translate content="EIO.Stop_reserve" />
                  </div>
                  )
                }else{
                  if(this.state.data.status == 'ok' || this.state.data.status == 'pre'){
                    return (
                      this.state.data.create_user_type == 'code'?(
                        <div>
                          <input
                            type="checkbox" 
                            onChange={this.changeCheckbox.bind(this)} 
                            className="legal-input"
                          />
                          <label className="legal-label"><Trigger open="ieo-legal-modal"><div className="legal-info"><a href="#"><Translate content="EIO.IHaveRead" /></a></div></Trigger></label>
                          <div className="button primery-button ok">
                          {this.state.canBeReserve?(
                            <Trigger open="ieo-detail-modal"><div><Translate content="EIO.Reserve_Now" /></div></Trigger>
                          ):(
                            <div><Translate content="EIO.Reserve_Now" /></div>
                          )}
                            
                          </div>
                        </div>
                        ):(
                          <div>
                            <input
                              type="checkbox" 
                              onChange={this.changeCheckbox.bind(this)} 
                              className="legal-input"
                            />
                            <label className="legal-label"><Trigger open="ieo-legal-modal"><div className="legal-info"><a href="#"><Translate content="EIO.IHaveRead" /></a></div></Trigger></label>
                            {this.state.canBeReserve?(
                            <div className="button primery-button can-reserve" onClick={this.reserve.bind(this)}>
                              <Translate content="EIO.Reserve_Now" />
                            </div>):(
                              <div className="button primery-button can-reserve">
                              <Translate content="EIO.Reserve_Now" />
                            </div>
                            )}
                          </div>
                      )
                    )
                  }else{
                    return null;
                  }
                } 
              }else{
                return(
                  null
                  // <div className="button primery-button disabled can-not-reserve">
                  //   立即预约
                  // </div>
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
      res.result.offer_at = res.result.offer_at ? this.formatTime(res.result.offer_at) : null;
      

      // let remainStr = `${endAt.diff(now,'days')} ${moment(this.state.countDownTime).format('hh:mm')}`
      

      this.setState({
        // countDownTime,
        data: res.result,
        // remainStr
      }, ()=>{
        // setInterval(()=>{
        //   this.setState({
        //     countDownTime: (this.state.countDownTime>1000)?(this.state.countDownTime-1000): 0
        //   })
        // },1000)

        
      });
      if(!this.props.myAccounts[0]){
        this.setState({reserve_status: ()=>{
          return (
            <div>
            {res.result.status !== 'ok' || res.result.status !== 'pre'? (
            <Link to={`/login`}>
              <div className="button primery-button">
              
                {/* <span>请登录后参与</span> */}
                <Translate content="EIO.Not_login" />
              
              </div>
              </Link>
            ):(
                
              null
              
            )}
            </div>
          )
        }});
      }else{
        fetchJson.fetchKYC({cybex_name: this.props.myAccounts[0], project:this.props.params.id}, (res2)=>{
          switch(res2.result.status){
            case 'ok':
              this.setState({reserve_status:()=>{
                if(res.result.status == 'ok'){
                  return (
                        <div>
                    <input
                      type="checkbox"
                      checked={true}
                      readOnly={true}
                      className="legal-input"
                    />
                    <label className="legal-label"><Trigger open="ieo-legal-modal"><div className="legal-info"><a href="#"><Translate content="EIO.IHaveRead" /></a></div></Trigger></label>
                      <Link to={`/eto/join/${this.props.params.id}`}>
                      <div className="button primery-button ok">
                      <Translate content="EIO.Join_ETO_now" />
                      </div>
                      </Link>
                      </div>
                    
                  )
                }else if(res.result.status == 'pre'){
                  return(
                    <div>
                      <input
                        type="checkbox"
                        checked={true}
                        readOnly={true}
                        className="legal-input"
                      />
                      <label className="legal-label"><Trigger open="ieo-legal-modal"><div className="legal-info"><a href="#"><Translate content="EIO.IHaveRead" /></a></div></Trigger></label>
                    <div className="button primery-button disabled pre">
                    <Translate content="EIO.Wait_for_ETO" />
                      {/* 等待众筹开始 */}
                    </div>
                    </div>
                  )
                }else{
                  return null;
                }
              }})
            break;
            case 'waiting':
              this.setState({reserve_status:()=>{
                if(res.result.status == 'ok' || res.result.status == 'pre'){
                  return (
                    <div>
                      <input
                        type="checkbox"
                        checked={true}
                        readOnly={true}
                        className="legal-input"
                      />
                      <label className="legal-label"><Trigger open="ieo-legal-modal"><div className="legal-info"><a href="#"><Translate content="EIO.IHaveRead" /></a></div></Trigger></label>
                    <div className="button primery-button disabled waiting">
                      {/* 审核中 */}
                      <Translate content="EIO.Verifying" />
                    </div>
                    </div>
                  )
                }else{
                  return null 
                }
              }})
            break;
            case 'reject':
              this.setState({reserve_status:()=>{
                if(res.result.status == 'ok' || res.result.status == 'pre'){
                  return (
                  <div>
                  <div className="button primery-button disabled reject">
                    {/* 审核不通过 */}
                    <Translate content="EIO.Reservation_failed" />
                  </div>
                  <p>{res2.result.reason}</p>
                  </div>
                )}else{
                  return null
                }
              }})
            break;
            case 'pending':
              this.setState({reserve_status:()=>{
                if(res.result.status == 'ok' || res.result.status == 'pre'){
                return (
                  <div>
                    <input
                      type="checkbox"
                      checked={true}
                      readOnly={true}
                      className="legal-input"
                    />
                    <label className="legal-label"><Trigger open="ieo-legal-modal"><div className="legal-info"><a href="#"><Translate content="EIO.IHaveRead" /></a></div></Trigger></label>
                  <div className="button primery-button disabled waiting">
                    {/* 审核中 */}
                    <Translate content="EIO.Verifying" />
                  </div>
                  </div>
                )
              }else{
                return null;
              }
              }})
            break;
            default:
            this.setState({reserve_status:()=>{
              if(res2.result.kyc_status == 'ok'){
                if(res.result.is_user_in == 0){
                  return(
                  <div className="button primery-button disabled can-not-reserve">
                    {/* 停止预约 */}
                    <Translate content="EIO.Stop_reserve" />
                  </div>
                  )
                }else{
                  if(res.result.status == 'ok' || res.result.status == 'pre'){
                    return (
                      res.result.create_user_type == 'code'?(
                        <div>
                          <input
                            type="checkbox" 
                            onChange={this.changeCheckbox.bind(this)} 
                            className="legal-input"
                          />
                          <label className="legal-label"><Trigger open="ieo-legal-modal"><div className="legal-info"><a href="#"><Translate content="EIO.IHaveRead" /></a></div></Trigger></label>
                          <div className="button primery-button ok">
                          {this.state.canBeReserve?(
                            <Trigger open="ieo-detail-modal"><div><Translate content="EIO.Reserve_Now" /></div></Trigger>
                          ):(
                            <div><Translate content="EIO.Reserve_Now" /></div>
                          )}
                            
                          </div>
                        </div>
                        ):(
                          <div>
                            <input
                              type="checkbox" 
                              onChange={this.changeCheckbox.bind(this)} 
                              className="legal-input"
                            />
                            <label className="legal-label"><Trigger open="ieo-legal-modal"><div className="legal-info"><a href="#"><Translate content="EIO.IHaveRead" /></a></div></Trigger></label>
                            {this.state.canBeReserve?(
                            <div className="button primery-button can-reserve" onClick={this.reserve.bind(this)}>
                              <Translate content="EIO.Reserve_Now" />
                            </div>):(
                              <div className="button primery-button can-reserve">
                              <Translate content="EIO.Reserve_Now" />
                            </div>
                            )}
                          </div>
                      )
                    )
                  }else{
                    return null;
                  }
                }
              }else{
                return(
                  null
                  // <div className="button primery-button disabled can-not-reserve">
                  //   立即预约
                  // </div>
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
                  <a href="https://www.icoape.com/" target="_blank">
                  <div className="kyc-btn button primery-button">
                    <Translate content="EIO.Accept_KYC_Verification" />
                  </div>
                  </a>
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
      create_user_type,
      current_token_count,
      token_name,
      finish_at
    } = data;
    let base_tokens = data.base_tokens ||[]

    let percent = current_percent*100;
        percent = percent.toFixed(2);
    // let showPercent = `${percent>100?100:percent}%`;
    let showPercent = `${percent>99?99:(percent<2?(percent==0?0:2):percent)}%`;
    let now = moment();

    let countDownTime = moment(end_at).valueOf() - moment().valueOf();
      let endAt = moment(end_at);
      let startAt = moment(start_at);
      let finishAt = moment(finish_at);
    
    let remainStr;
      let projectStatus;
      let lang = counterpart.getLocale();
      const shortEnglishHumanizer = humanize.humanizer({
        language: lang,
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
          zh: {
            y: function() { return '年' },
            mo: function() { return '月' },
            d: function() { return '天' },
            h: function() { return '小时' },
            m: function() { return '分钟' },
            s: function() { return '秒' }
          },
          en: {
            y: function() { return 'Y' },
            mo: function() { return 'M' },
            d: function() { return 'D' },
            h: function() { return 'H' },
            m: function() { return 'M' },
            s: function() { return 'S' }
          }
        }
      })
      switch(status){
        case 'pre':
        // countDownTime = moment(startAt).valueOf() - moment().valueOf();
        remainStr = shortEnglishHumanizer(startAt.diff(now)).replace(/[\,]/g,'');
        break;
        case 'finish':
        // countDownTime = moment(finishAt).valueOf() - moment(endAt).valueOf();
        remainStr = shortEnglishHumanizer(endAt.diff(startAt)).replace(/[\,]/g,'');
        break;
        case 'ok':
        // countDownTime = moment(endAt).valueOf() - moment().valueOf();
        remainStr = shortEnglishHumanizer(endAt.diff(now)).replace(/[\,]/g,'');
        break;
        case 'fail':
        // countDownTime = moment(finishAt).valueOf();
        remainStr = shortEnglishHumanizer(finishAt.diff(now)).replace(/[\,]/g,'');
        break;
        default:
      }
    
    
    // let remainStr = this.state.remainStr;
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
          <div className="info-detail">{current_user_count} <Translate content="EIO.man" /></div>
        </div>):null}
        
        {current_token_count?(<div className="info-item">
          <div className="info-title">
            <span><Translate content="EIO.Raised" />: </span>
            {/* <Translate content="EIO.Raised" />: */}
          </div>
          <div className="info-detail">{adds_token_total + current_token_count}{base_token_name}</div>
          {/* <div className="info-detail">{current_base_token_count}{base_token_name}</div> */}
          {/* <p className="raised">当前完成认购: {e.adds_token_total + e.current_token_count}NES</p> */}
        </div>):null}
        
        {base_tokens?(<div className="info-item">
          <div className="info-title">
            <Translate content="EIO.Redeeming_Ratio" />: 
          </div>
          <div className="info-detail">
            1 {base_token_name} = {rate} {token_name}
            
          </div>
        </div>):null}

        {/* {rate?(<div className="info-item">
          <div className="info-title">
            <Translate content="EIO.Redeeming_Ratio" />: 
          </div>
          <div className="info-detail">1{base_token_name}={rate}{token}</div>
        </div>):null} */}
        
        {base_max_quota?(<div className="info-item">
          <div className="info-title">
            <Translate content="EIO.Personal_Limit" />: 
          </div>
          <div className="info-detail">{base_min_quota}-{base_max_quota} {base_token_name}</div>
        </div>):null}
        
        {remainStr?(<div className="info-item large-time">
          <div className="info-title">
          <img className="icon-time" src={time} />
          {status == 'ok'? (
              <span className={`sub-time ${status}`}> <Translate content="EIO.Time_remains" /> </span>
            ):(
              (status == 'pre')? (
                <span className={`sub-time ${status}`}> <Translate content="EIO.In" /> </span>
              ):(
                status == 'finish'? (
                  <span className={`sub-time ${status}`}> <Translate content="EIO.Ended" /> </span>
                ):(
                  <span className={`sub-time ${status}`}> <Translate content="EIO.Ended" /> </span>
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
                  status == 'pause')? (
                    <span className="sub finish">[ <Translate content="EIO.pause" /> ]</span>
                  ):(
                    null
                  )
                  
                )
              )
            }
          </h3>
          
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
            <div className="info-detail">{numeral(adds_token_total).format('0,0.[0000000000]')}</div>
          </div>):null}

          
          {start_at?(<div className="info-item">
            <div className="info-title">
            <Translate content="EIO.ETO_Period" />: 
            </div>
            <div className="info-detail">{start_at}</div>
          </div>):null}
          
          {end_at?(<div className="info-item">
            <div className="info-title">
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
            <Translate content="EIO.ETO_Quota" />: 
            </div>
            <div className="info-detail">{base_token_count}{base_token_name}</div>
          </div>):null}
          
          {district_restriction?(<div className="info-item">
            <div className="info-title">
            <Translate content="EIO.District_Restriction" />: 
            </div>
            <div className="info-detail">{district_restriction}</div>
          </div>):null}
          
          <div className="info-item">
            <div className="info-title">
            <Translate content="EIO.ETO_token" />: 
            </div>
            <div className="info-detail">{
              base_token_name
              // base_tokens.map((e,i)=>{
              //   return (
              //     <span key={i}>{e.base_token_name} </span>
              //   )
              // })
            }</div>
          </div>
          
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
            <div className="info-detail"><a href={adds_detail} target="_blank">{adds_detail}</a></div>
          </div>):null}




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
          {lang=='zh'?(
            <LegalModal id="ieo-legal-modal">
            </LegalModal>
          ):(
            <LegalModalEn id="ieo-legal-modal">
          </LegalModalEn>
          )}
          
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


