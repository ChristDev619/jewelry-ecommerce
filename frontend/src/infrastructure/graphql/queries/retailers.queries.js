/**
 * Retailer GraphQL Queries
 * All retailer-related queries (Strapi v5 structure)
 */

import { gql } from '@apollo/client';
import {
  RETAILER_CORE_FRAGMENT,
  RETAILER_DETAIL_FRAGMENT,
} from '../fragments';

// Get all retailers
export const GET_RETAILERS = gql`
  ${RETAILER_CORE_FRAGMENT}
  query GetRetailers($filters: RetailerFiltersInput) {
    retailers(filters: $filters) {
      ...RetailerCore
    }
  }
`;

// Get retailer by slug with full details
export const GET_RETAILER_BY_SLUG = gql`
  ${RETAILER_DETAIL_FRAGMENT}
  query GetRetailerBySlug($slug: String!) {
    retailers(filters: { slug: { eq: $slug } }) {
      ...RetailerDetail
    }
  }
`;

// Get retailer with products
export const GET_RETAILER_WITH_PRODUCTS = gql`
  ${RETAILER_DETAIL_FRAGMENT}
  query GetRetailerWithProducts($slug: String!, $productsLimit: Int = 50) {
    retailers(filters: { slug: { eq: $slug } }) {
      ...RetailerDetail
      products(pagination: { limit: $productsLimit }) {
        documentId
        name
        slug
        price
        inStock
      }
    }
  }
`;
