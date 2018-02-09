import * as React from "react";
import Translate from "react-translate-component";

import gql from "graphql-tag";
import { graphql } from "react-apollo";

import GatewayActions from "actions/GatewayActions";

let NewDepositMut = gql`
  mutation Mutation($accountName: String!, $type: String!) {
    newDepositAddress(
      accountName: $accountName,
      asset: $type
    ) {
      address
      accountName
      timestamp
      asset
    }
  }
`;

let NewDepositAddress: any = class extends React.Component<{ DepositAddress?, accountName, type }, any> {

  constructor(props) {
    super(props);
    this.state = {
      address: ""
    };
  }

  genNewAddress = async () => {
    let { DepositAddress, accountName, type } = this.props;
    let res = await DepositAddress({
      variables: {
        accountName,
        type
      }
    });
    let depositInfo = res.data.newDepositAddress;
    GatewayActions.afterUpdateDepositInfo({
      account: depositInfo.accountName,
      type: depositInfo.asset,
      address: depositInfo.address
    });
  }

  render() {
    let { DepositAddress } = this.props;
    if (DepositAddress && DepositAddress.error) {
      return (
        <h4>{JSON.stringify(DepositAddress.error)}</h4>
      );
    }
    if (DepositAddress && DepositAddress.loading) {
      return (
        <h4>Loading...</h4>
      );
    }
    return (
      <div>
        <button className="button" onClick={this.genNewAddress}>
          <Translate content="gateway.generate_new" />
        </button>
      </div>
    );
  }
}

NewDepositAddress = graphql(NewDepositMut, { name: "DepositAddress" })(NewDepositAddress);

export {
  NewDepositAddress
}
export default NewDepositAddress;