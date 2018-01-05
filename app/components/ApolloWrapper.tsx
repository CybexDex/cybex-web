import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = new HttpLink({ uri: "http://localhost:5681/graphql" });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export const ApolloWrapper = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);
