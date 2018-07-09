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
      <div>
        
          <div className="title-container">
          <h2 className="base-title">
          </h2>
          <div className="kyc-btn button primery-button">
          </div>
        </div>
        <div className="container">
          <div className="Combined-Shape"></div>
          <div className="Mask"></div>
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
