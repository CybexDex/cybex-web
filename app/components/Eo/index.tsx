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
import moment from "moment";
import Slider from "react-slick";
// import 'slick-carousel/slick/slick.css';


class EO extends React.Component<any, any> {
  // nestedRef;
  constructor(props) {
    super(props);
    this.state = {
      data:[[]],
      offset:0,
      showMore: 'block'
    };

  }
  canClick = true;
  componentDidMount(){
    fetchJson.fetchJsonList(this.state.offset, (data)=>{
      let showMore = 'block';
      if(data.result.length < 4){
        showMore = 'none';
      }
      let newDate = this.state.data;
      newDate[0] = data.result
      this.setState({
        offset: this.state.offset+4,
        data: newDate,
        showMore: showMore
      });
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
  
  addMore() {
    
    if(this.canClick){
      this.canClick = false;
      fetchJson.fetchJsonList(this.state.offset, (data)=>{
        let showMore = 'block';
        if(data.result.length < 4){
          showMore = 'none';
        }
        let newDate = this.state.data;
        newDate[this.state.offset/4] = data.result
        this.setState({
          offset: this.state.offset+4,
          data: newDate,
          showMore: showMore
        }, ()=>{
          this.canClick = true;
        });

      });
    }
    
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
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    
    return (
      <div>
        <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
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
      {data.map((f,j) => {
        if(f.length<4 && f.length !== 0){
          let comingSoonLength = 4 - f.length;
          for(let i = 0; i< comingSoonLength; i++){
            f.push({comingSoon: true});
          }
        }
        return (
          <div className="waterfall">
      {f.map((e,i)=>{
        let percent = e.current_percent*100;
        percent = percent.toFixed(2);
        let showPercent = `${percent>100?100:percent}%`;
        let endAt = moment(e.end_at);
        let now = moment();
        let remainStr = `${0-endAt.diff(now,'days')} ${moment(moment(e.end_at).valueOf() - moment().valueOf()).format('hh:mm')}`
        return(
          e.comingSoon==true?(
              <div className="pin coming-soon" key={i}>
                <div className="info-holder">
                <div className="text-holder">
                <h3>coming soon</h3>
                <p>即将上线...</p>
                </div>
                </div>
              </div>
            ):(
            <div className={`pin${(j==0&&i==0)?' special':''}`} key={i}>
            <div className="info-holder">
            <div className="top-holder">
              <img src={logo_demo} width={100} height={100} />
              <h3 className="title">{e.name}<span>
              {e.status == 'ok'? (
                <p className="status-label">[ <Translate content="EIO.ok" />... ]</p>
              ):(
                (e.status == 'pre')? (
                  <p className="status-label">[ <Translate content="EIO.pre" /> ]</p>
                ):(
                  e.status == 'finish'? (
                    <p className="status-label">[ <Translate content="EIO.finish" /> ]</p>
                  ):(
                    <p className="status-label">[ <Translate content="EIO.pause" /> ]</p>
                  )
                )
              )}
              </span></h3>
              <h4 className="adds_keyword">{e.adds_keyword}asdfdsafasdfsdf fdsafsadfasd</h4>
              {((j%2==0&&i%4==0)||(j%2==1&&i%4==2))?(
                <p className="proj-desc">{e.adds_detail} dsfasdfadsf adsfasdfasdfasdfsadfasdfsadf sdfasdfasdfadsadsfsda</p>
              ):null}
              </div>
              <div className="bottom-holder">
              <Link to={`/ieo/detail/${e.id}`}>
              <div className="button primery-button"><Translate content="EIO.Details" /></div>
              </Link>

              <div className="percent-holder">
                <div className="info-item">
                <div>
                  <div className="percent">
                    <div className="percent-in" style={{width: showPercent}}></div>
                    {/* <div className="info-text" style={{left: `${percent}%`}}>{`${percent}%`}</div> */}
                  </div>
                  <div className="info-text" style={{left: `${percent}%`}}>{`${percent}%`}</div>
                </div>
                </div>
              </div>
              {((j%2==0&&i%4==0)||(j%2==1&&i%4==2))?(
                <p className="raised"><Translate content="EIO.Raised" />: {e.current_base_token_count} {e.base_token_name}</p>
              ):null}
              <p className="raised">{remainStr}</p>
              </div>
              </div>
            </div>
          )
          
        )


      })}
      </div>
        )
      })}
      </div>
        <div className="btn-coming-soon" style={{display: this.state.showMore}} onClick={this.addMore.bind(this)}>Add More</div>
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
