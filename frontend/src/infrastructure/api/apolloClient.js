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
          // Merge strategy for paginated products
          keyArgs: ['filters', 'sort'],
          merge(existing = { data: [] }, incoming) {
            return {
              ...incoming,
              data: [...existing.data, ...incoming.data],
            };
          },
        },
      },
    },
    ProductEntity: {
      keyFields: ['id'],
    },
    RetailerEntity: {
      keyFields: ['id'],
    },
    CategoryEntity: {
      keyFields: ['id'],
    },
    MetalEntity: {
      keyFields: ['id'],
    },
    StyleEntity: {
      keyFields: ['id'],
    },
    BirthstoneEntity: {
      keyFields: ['id'],
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

