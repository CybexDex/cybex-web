import * as React from "react"; import * as PropTypes from "prop-types";
import { connect } from "alt-react";
import AccountStore from "stores/AccountStore";
import { ApolloWrapper } from "components//ApolloWrapper";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const ALL_LINKS_QUERY = gql`
  query AllDepositRecords {
    depositRecords(cybexAccount: "invest21") {
      outerAddress
      timestamp
      assetType
    }
  }
`;

let DepositAddress: any =
  class extends React.Component<{ depositRecordsQuery?, currentAccount?}, any> {
    render() {
      let { currentAccount, depositRecordsQuery } = this.props;
      if (depositRecordsQuery && depositRecordsQuery.error) {
        return (<div>Error</div>);
      }
      if (depositRecordsQuery && depositRecordsQuery.loading) {
        return (<div>Loading ...</div>);
      }
      return (
        <div>
          <h1>Address: {currentAccount}</h1>
          {JSON.stringify(depositRecordsQuery.depositRecords)}
        </div>
      );
    }
  }

DepositAddress = graphql(ALL_LINKS_QUERY, { name: 'depositRecordsQuery' })(DepositAddress)

DepositAddress = connect(DepositAddress, {
  listenTo() {
    return [AccountStore]
  },
  getProps() {
    return {
      currentAccount: AccountStore.getState().currentAccount ||
        AccountStore.getState().passwordAccount,
    };
  }
});

// DepositAddress = (
//     <DepositAddress />
//   </ApolloWrapper>
// );

export { DepositAddress }
export default DepositAddress;