import * as React from "react";
import { DepositAddress } from "./DepositAddress";
import { NewDepositAddress } from "components/Gateway/NewDepositAddress";

// ApolloProvider
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

class GatewayContainer extends React.Component<any, any> {
  render() {
    return (
      <div>
        <DepositAddress />
        <NewDepositAddress />
      </div>
    );
  }
}


const httpLink = new HttpLink({ uri: "http://localhost:5681/graphql" });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export const ApolloWrapper = () => (
  <ApolloProvider client={client}>
    <GatewayContainer />
  </ApolloProvider>
);

export { ApolloWrapper as Gateway }
export default ApolloWrapper;