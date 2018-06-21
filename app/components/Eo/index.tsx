import * as React from "react";
import * as PropTypes from "prop-types";
// import { Provider } from 'react-redux';
// import configureStore from './configureStore.js';
// import EOComponent from './Eo';
import EoStore from "stores/EoStore";
// const store = configureStore();

class EO extends React.Component<any, any> {
  // nestedRef;
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillMount() {
  }

  componentWillReceiveProps(np) {
    
  }



  render() {
  

    return (
      <div>123</div>
    );
  }
}

// export default EO;
export default connect(
  EO,
  {
    listenTo() {
      return [EoStore];
    },
    getProps() {
      return {
        // currentAccount: AccountStore.getState().currentAccount
      };
    }
  }
);
