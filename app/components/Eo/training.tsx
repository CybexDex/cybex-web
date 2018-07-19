import * as React from "react";
import * as PropTypes from "prop-types";
// import { Provider } from 'react-redux';
// import configureStore from './configureStore.js';
// import EOComponent from './Eo';
// import EoStore from "stores/EoStore";
// const store = configureStore();
import { Link } from "react-router-dom"; 
import './training.scss';
import Translate from "react-translate-component";
import * as counterpart from "counterpart";

class Training extends React.Component<any, any> {
  // nestedRef;
  constructor(props) {
    super(props);
    this.state = {
    };

  }
  componentDidMount(){
    
  }
  next() {
  }

  prev() {
  }

  render() {

    return (
      <div className="training">
          <div className="title-container">
          <div className="trangle-holder left">
          <div className="trangle"></div>
          </div>
          <Translate component="h2" unsafe content="training.step_title" className="base-title"/>
          <div className="trangle-holder right">
          <div className="trangle"></div>
          </div>
          {/* <div className="kyc-btn button primery-button">
          </div> */}
        </div>
        <div className="container">
          <div className="Combined-Shape">
            <div className="content">
            <div className="steps">
              <img src={require('../../assets/step/step1.png')} />
              <p className="step-info">
              <Translate className="text-justify" content="training.step_one"/>
            <span className="spetial"><a href="https://www.icoape.com/" target="_blank">https://www.icoape.com/</a></span>
            </p>
            </div>
            <div className="right-pointer"></div>
            <div className="bottom-pointer"></div>
            </div>
  
          </div>
          <div className="right-top"><img src={counterpart.translate("assets.eto_step_1")} /></div>
          <div className="right-bottom"><img src={counterpart.translate("assets.eto_step_2")} /></div>
        </div>
        <div className="gap"><div className="dashed-border"></div></div>
        <div className="container">
          <div className="Combined-Shape">
          <div className="content">
            <div className="steps">
              <img src={require('../../assets/step/step2.png')} />
              <p className="step-info">
              <Translate className="text-justify" content="training.step_two"/>
            </p>
            </div>
            <div className="right-pointer"></div>
            <div className="bottom-pointer"></div>
            </div>
          </div>
          <div className="right-top"><img src={counterpart.translate("assets.eto_step_3")} /></div>
          <div className="right-bottom"><img src={counterpart.translate("assets.eto_step_4")} /></div>
        </div>
        <div className="gap"><div className="dashed-border"></div></div>
        <div className="container">
          <div className="Combined-Shape">
          <div className="content">
            <div className="steps">
              <img src={require('../../assets/step/step3.png')} />
              <p className="step-info">
              <Translate className="text-justify" content="training.step_three"/>
            </p>
            </div>
            <div className="right-pointer"></div>
            <div className="bottom-pointer"></div>
            </div>
          </div>
          <div className="right-top"><img src={counterpart.translate("assets.eto_step_5")} /></div>
          <div className="right-bottom"><img src={counterpart.translate("assets.eto_step_6")} /></div>
        </div>
        <div className="gap"><div className="dashed-border"></div></div>

        

        <div className="container">
          <div className="Combined-Shape">
          <div className="content">
            <div className="steps">
              <img src={require('../../assets/step/step4.png')} />
            </div>
            <p className="step-info">
            <span></span><br />
            <Translate className="text-justify" content="training.step_four"/>
            <Translate className="spectial text-justify" content="training.step_four_sp"/>
            </p>
            <div className="right-pointer"></div>
            <div className="bottom-pointer"></div>
            </div>
          </div>
          <div className="right-top"><img src={counterpart.translate("assets.eto_step_7")} /></div>
          <div className="right-bottom"><img src={counterpart.translate("assets.eto_step_8")} /></div>
        </div>

        <div className="gap">
          <div className="dashed-border"></div>
        </div>

          <div className="container-large">
          <div className="Combined-Shape">
          <div className="content">
            <div className="steps">
              <img src={require('../../assets/step/step5.png')} />
              <p className="step-info">
            <Translate className="text-justify" content="training.step_five"/>
            <Translate  className="spectial text-justify" unsafe content="training.step_five_sp"/>
            </p>
            </div>
            <div className="right-pointer"></div>
            <div className="bottom-pointer"></div>
            </div>
          </div>
          <div className="right-top"><img src={counterpart.translate("assets.eto_step_9")} /></div>
          <div className="right-middle"><img src={counterpart.translate("assets.eto_step_10")} /></div>
          <div className="right-bottom"><img src={counterpart.translate("assets.eto_step_11")} /></div>
        </div>
        
        



        <div className="gap">
          <div className="dashed-border"></div>
        </div>
        <div className="container">
          <div className="Combined-Shape">
          <div className="content">
            <div className="steps">
              <img src={require('../../assets/step/step6.png')} className="last-img" />
              <p className="step-info">
              <Translate className="text-justify" content="training.step_six"/>
            <Translate className="spectial text-justify" unsafe content="training.step_six_sp"/>
            <Translate className="spectial text-justify" unsafe content="training.step_six_sp_1"/>
            
            </p>
            </div>
            <div className="right-pointer"></div>
            </div>
          </div>
          <div className="right-top"><img src={counterpart.translate("assets.eto_step_12")} /></div>
          <div className="right-bottom"><img src={counterpart.translate("assets.eto_step_13")} /></div>
        </div>
      </div>
    );
  }
}

// export default connect(EO,{
//   listenTo() {
//     return [AccountStore];
//   },
//   getProps(props) {
//     return {
//       myAccounts: AccountStore.getMyAccounts(),
//       accountsWithAuthState: AccountStore.getMyAccountsWithAuthState(),
//       isMyAccount: AccountStore.getState()
//     }
//   }
// })
export default Training;
