/**
 * Product GraphQL Queries
 * All product-related queries (Strapi v5 structure)
 */

import { gql } from '@apollo/client';
import {
  PRODUCT_CORE_FRAGMENT,
  PRODUCT_WITH_RELATIONS_FRAGMENT,
  PRODUCT_DETAIL_FRAGMENT,
} from '../fragments';

// Get all products with optional filters (using connection for pagination)
export const GET_PRODUCTS = gql`
  ${PRODUCT_WITH_RELATIONS_FRAGMENT}
  query GetProducts(
    $filters: ProductFiltersInput
    $sort: [String]
    $pagination: PaginationArg
  ) {
    products_connection(filters: $filters, sort: $sort, pagination: $pagination) {
      nodes {
        ...ProductWithRelations
      }
      pageInfo {
        total
        page
        pageSize
        pageCount
      }
    }
  }
`;

// Get single product by slug
export const GET_PRODUCT_BY_SLUG = gql`
  ${PRODUCT_DETAIL_FRAGMENT}
  query GetProductBySlug($slug: String!) {
    products(filters: { slug: { eq: $slug } }) {
      ...ProductDetail
    }
  }
`;

// Get products by category
export const GET_PRODUCTS_BY_CATEGORY = gql`
  ${PRODUCT_WITH_RELATIONS_FRAGMENT}
  query GetProductsByCategory(
    $categorySlug: String!
    $sort: [String]
    $pagination: PaginationArg
  ) {
    products_connection(
      filters: { category: { slug: { eq: $categorySlug } } }
      sort: $sort
      pagination: $pagination
    ) {
      nodes {
        ...ProductWithRelations
      }
      pageInfo {
        total
        page
        pageSize
        pageCount
      }
    }
  }
`;

// Get products by retailer
export const GET_PRODUCTS_BY_RETAILER = gql`
  ${PRODUCT_WITH_RELATIONS_FRAGMENT}
  query GetProductsByRetailer(
    $retailerSlug: String!
    $sort: [String]
    $pagination: PaginationArg
  ) {
    products_connection(
      filters: { retailer: { slug: { eq: $retailerSlug } } }
      sort: $sort
      pagination: $pagination
    ) {
      nodes {
        ...ProductWithRelations
      }
      pageInfo {
        total
        page
        pageSize
        pageCount
      }
    }
  }
`;

// Search products
export const SEARCH_PRODUCTS = gql`
  ${PRODUCT_WITH_RELATIONS_FRAGMENT}
  query SearchProducts(
    $searchTerm: String!
    $pagination: PaginationArg
  ) {
    products_connection(
      filters: {
        or: [
          { name: { containsi: $searchTerm } }
          { description: { containsi: $searchTerm } }
        ]
      }
      pagination: $pagination
    ) {
      nodes {
        ...ProductWithRelations
      }
      pageInfo {
        total
        page
        pageSize
        pageCount
      }
    }
  }
`;

// Get new arrivals
export const GET_NEW_ARRIVALS = gql`
  ${PRODUCT_WITH_RELATIONS_FRAGMENT}
  query GetNewArrivals($limit: Int = 8) {
    products(
      filters: { isNew: { eq: true } }
      sort: "popularity:desc"
      pagination: { limit: $limit }
    ) {
      ...ProductWithRelations
    }
  }
`;

// Get popular products
export const GET_POPULAR_PRODUCTS = gql`
  ${PRODUCT_WITH_RELATIONS_FRAGMENT}
  query GetPopularProducts($limit: Int = 8) {
    products(
      filters: { inStock: { eq: true } }
      sort: "popularity:desc"
      pagination: { limit: $limit }
    ) {
      ...ProductWithRelations
    }
  }
`;
