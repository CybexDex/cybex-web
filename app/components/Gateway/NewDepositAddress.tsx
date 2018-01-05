import * as React from "react";

import gql from "graphql-tag";
import { graphql } from "react-apollo";

let NewDepositMut = gql`
  mutation Mutation($cybexAccount: String!, $assetType: String!) {
    createDepositRecord(
      cybexAccount: $cybexAccount,
      assetType: $assetType
    ) {
      outerAddress
      cybexAccount
      timestamp
    }
  }
`;

let NewDepositAddress: any = class extends React.Component<{ Mutation?}, any> {
  constructor(props) {
    super(props);
  }

  genNewAddress = async () => {
    let { Mutation } = this.props;
    let res = await Mutation({
      variables: {
        cybexAccount: "invest21",
        assetType: "BTC"
      }
    });
    console.debug("RES: ", res);
  }

  render() {
    let { Mutation } = this.props;
    if (Mutation && Mutation.error) {
      return (
        <h4>{JSON.stringify(Mutation.error)}</h4>
      );
    }
    console.debug("MU: ", Mutation);
    return (
      <div>
        <h4>{JSON.stringify(Mutation)}</h4>
        <button onClick={this.genNewAddress}>Get New Address</button>
      </div>
    );
  }
}

NewDepositAddress = graphql(NewDepositMut, { name: "Mutation" })(NewDepositAddress);

export {
  NewDepositAddress
}
export default NewDepositAddress;