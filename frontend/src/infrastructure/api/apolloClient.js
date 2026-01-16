/**
 * Apollo Client Configuration
 * GraphQL client setup with caching policies
 */

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { API_CONFIG } from './config';

// HTTP link for GraphQL endpoint
const httpLink = createHttpLink({
  uri: API_CONFIG.GRAPHQL_ENDPOINT,
  credentials: 'same-origin',
});

// Cache configuration
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        products: {
          // Simple merge - just replace with incoming data
          keyArgs: ['filters', 'sort'],
          merge(existing, incoming) {
            // For single product queries or direct fetches, just return incoming
            return incoming;
          },
        },
      },
    },
    Product: {
      keyFields: ['documentId'],
    },
    Retailer: {
      keyFields: ['documentId'],
    },
    Category: {
      keyFields: ['documentId'],
    },
    Metal: {
      keyFields: ['documentId'],
    },
    Style: {
      keyFields: ['documentId'],
    },
    Birthstone: {
      keyFields: ['documentId'],
    },
  },
});

// Apollo Client instance
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export default apolloClient;

