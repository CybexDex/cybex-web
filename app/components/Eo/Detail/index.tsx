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

class Detail extends React.Component<any, any> {
  // nestedRef;
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }

  componentDidMount(){
    let data = {
      project: this.props.params.id
    }
    fetchJson.fetchDetails(data,(res)=>{
      this.setState({data: res.result});
      // window.sessionStorage.setItem('detailData', res.result)
    });
    fetchJson.fetchKYC({cybex_name: this.props.myAccounts[0]}, (res)=>{
      this.setState({kyc_status: res.result});
    })
  }

  public openModal = () => {
    this.setState({
      showModal: true
    })
  }

  render() {
    console.log(this.state)
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
      current_percent
    } = data;
    let percent = current_percent*100;
        percent = percent.toFixed(2);
    let showPercent = `${percent>100?100:percent}%`;
    let endAt = moment(end_at);
    let now = moment();
    // console.log(endAt.diff(now,'days'),'sdafadsfdasfdsaf')

        // console.log(moment(moment(end_at).valueOf() - moment().valueOf()).format('hh:mm:ss'),'asdfdsdsf');
    let remainStr = `${endAt.diff(now,'days')} ${moment(moment(end_at).valueOf() - moment().valueOf()).format('hh:mm:ss')}`
    return (
      <div className="detail">
        <div className="left-part">
        <img src={logo_demo} />
        <div className="info-item">
          <div className="percent">
            <div className="percent-in" style={{width: showPercent}}></div>
          </div>
          <div className="info-text">{percent}%</div>
        </div>
        <div className="info-item">
          <div className="info-title">
            <Translate content="EIO.Project_Name" />: 
          </div>
          <div className="info-detail">{name}</div>
        </div>
        <div className="info-item">
          <div className="info-title">
            <Translate content="EIO.Participants" />: 
          </div>
          <div className="info-detail">{current_user_count}</div>
        </div>
        <div className="info-item">
          <div className="info-title">
            <Translate content="EIO.Raised" />:
          </div>
          <div className="info-detail">{current_base_token_count}</div>
        </div>
        <div className="info-item">
          <div className="info-title">
            <Translate content="EIO.Redeeming_Ratio" />: 
          </div>
          <div className="info-detail">{rate}</div>
        </div>
        <div className="info-item">
          <div className="info-title">
            <Translate content="EIO.Personal_Limit" />: 
          </div>
          <div className="info-detail">{base_max_quota}</div>
        </div>
        <div className="info-item">
          <div className="info-title">
          </div>
          <div className="info-detail">{remainStr}</div>
        </div>
        
        
        
        </div>
        <div className="right-part">
          <h3 className="title">
            <Translate content="EIO.Project_Details" />
          </h3>
          {status == 'ok'? (
            <p>[<Translate content="EIO.ok" />]</p>
          ):(
            (status == 'pre')? (
              <p>[<Translate content="EIO.pre" />]</p>
            ):(
              status == 'finish'? (
                <p>[<Translate content="EIO.finish" />]</p>
              ):(
                <p>[<Translate content="EIO.pause" />]</p>
              )
            )
          )}
          
          
          
          
          <div className="info-item">
            <div className="info-title">
              <Translate content="EIO.Project_Name" />: 
            </div>
            <div className="info-detail">{name}</div>
          </div>
          <div className="info-item">
            <div className="info-title">
              <Translate content="EIO.Total_Token_Supply" />: 
            </div>
            <div className="info-detail">{adds_token_total}</div>
          </div>
          <div className="info-item">
            <div className="info-title">
            <Translate content="EIO.Total_IEO_Supply" />:             
            </div>
            <div className="info-detail">{adds_ico_total}</div>
          </div>
          <div className="info-item">
            <div className="info-title">
            <Translate content="EIO.IEO_Period" />: 
            </div>
            <div className="info-detail">{start_at}</div>
          </div>
          <div className="info-item">
            <div className="info-title">
            <Translate content="EIO.Listing_Time" />: 
            </div>
            <div className="info-detail">{adds_on_market_time}</div>
          </div>
          <div className="info-item">
            <div className="info-title">
            <Translate content="EIO.Project_Strengths" />: 
            </div>
            <div className="info-detail">{adds_advantage}</div>
          </div>
          <div className="info-item">
            <div className="info-title">
            <Translate content="EIO.Token_Releasing_Time" />: 
            </div>
            <div className="info-detail">{offer_at}</div>
          </div>
          <div className="info-item">
            <div className="info-title">
            <Translate content="EIO.IEO_Quota" />: 
            </div>
            <div className="info-detail">{base_token_count}</div>
          </div>
          <div className="info-item">
            <div className="info-title">
            <Translate content="EIO.District_Restriction" />: 
            </div>
            <div className="info-detail">{district_restriction}</div>
          </div>
          <div className="info-item">
            <div className="info-title">
            <Translate content="EIO.IEO_token" />: 
            </div>
            <div className="info-detail">{base_token_name}</div>
          </div>
          <div className="info-item">
            <div className="info-title">
            <Translate content="EIO.Official_Website" />: 
            </div>
            <div className="info-detail">{adds_website}</div>
          </div>
          <div className="info-item">
            <div className="info-title">
            <Translate content="EIO.Whitepaper" />: 
            </div>
            <div className="info-detail">{whitepaper}</div>
          </div>
          <div className="info-item">
            <div className="info-title">
            <Translate content="EIO.Project_Details" />: 
            </div>
            <div className="info-detail">{adds_detail}</div>
          </div>

          <div className="button-holder">
          {/* <Trigger open="ieo-detail-modal"> */}
          {this.state.kyc_status == "not_start"? (
            <Link to={`/eo/join/${this.props.params.id}`}>
            <div className="button primery-button">
            <Translate content="EIO.participate" />
            </div>
            </Link>
          ):(
            <div className="button primery-button disabled">
            <Translate content="EIO.participate" />
            </div>
          )}
          
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


