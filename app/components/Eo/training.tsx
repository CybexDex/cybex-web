import * as React from "react";
import * as PropTypes from "prop-types";
// import { Provider } from 'react-redux';
// import configureStore from './configureStore.js';
// import EOComponent from './Eo';
// import EoStore from "stores/EoStore";
// const store = configureStore();
import './training.scss';

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
          <h2 className="base-title">
          </h2>
          <div className="kyc-btn button primery-button">
          </div>
        </div>
        <div className="container">
          <div className="Combined-Shape">
            <div className="content">
            <h2 className="step">STEP</h2>
            <div className="right-pointer"></div>
            <div className="bottom-pointer"></div>
            </div>
          </div>
          <div className="right-top">456</div>
          <div className="right-bottom">456</div>
        </div>
        <div className="gap"><div className="dashed-border"></div></div>
        <div className="container">
          <div className="Combined-Shape">
          <div className="content">
            <div className="right-pointer"></div>
            <div className="bottom-pointer"></div>
            </div>
          </div>
          <div className="right-top">456</div>
          <div className="right-bottom">456</div>
        </div>
        <div className="gap"><div className="dashed-border"></div></div>
        <div className="container">
          <div className="Combined-Shape">
          <div className="content">
            <div className="right-pointer"></div>
            <div className="bottom-pointer"></div>
            </div>
          </div>
          <div className="right-top">456</div>
          <div className="right-bottom">456</div>
        </div>
        <div className="gap"><div className="dashed-border"></div></div>
        <div className="container-large">
          <div className="Combined-Shape">
          <div className="content">
            <div className="right-pointer"></div>
            <div className="bottom-pointer"></div>
            </div>
          </div>
          <div className="right-top">456</div>
          <div className="right-middle">456</div>
          <div className="right-bottom">456</div>
        </div>
        <div className="gap">
          <div className="dashed-border"></div>
        </div>
        <div className="container">
          <div className="Combined-Shape">
          <div className="content">
            <div className="right-pointer"></div>
            <div className="bottom-pointer"></div>
            </div>
          </div>
          <div className="right-top">456</div>
          <div className="right-bottom">456</div>
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
