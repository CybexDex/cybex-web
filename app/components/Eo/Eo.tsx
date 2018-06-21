import * as React from "react";
import * as PropTypes from "prop-types";

class EOComponent extends React.Component<any, any> {
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
      <div>EO</div>
    );
  }
}

// export default connect(
//   Transfer,
//   {
//     listenTo() {
//       return [AccountStore];
//     },
//     getProps() {
//       return {
//         currentAccount: AccountStore.getState().currentAccount,
//         passwordAccount: AccountStore.getState().passwordAccount
//       };
//     }
//   }
// );
