import React from 'react';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { CLIENT_HEADER, fetchQuery } from '../utils/network';

export const fetchXSRFToken = ({ token, authType }: { token: string; authType: 'f' | 'g' }) =>
  fetchQuery('query {viewer {xsrfToken}}');

const cache = new InMemoryCache({
  addTypename: false,
  dataIdFromObject: object => object.id
});
//@ts-ignore
cache.originalReadQuery = cache.readQuery;
cache.readQuery = (...args) => {
  try {
    //@ts-ignore
    return cache.originalReadQuery(...args);
  } catch (err) {
    return undefined;
  }
};

const client = new ApolloClient({
  uri: 'https://devapi.foretell.net/graphql',
  credentials: 'include',
  headers: {
    CLIENT: JSON.stringify(CLIENT_HEADER),
    'X-XSRF-TOKEN': localStorage.getItem('X-XSRF-TOKEN')
  },
  cache
});

const AppApolloProvider = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default AppApolloProvider;
