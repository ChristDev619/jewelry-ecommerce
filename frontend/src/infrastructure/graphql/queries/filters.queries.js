/**
 * Filter Options GraphQL Queries
 * Queries for fetching filter metadata (categories, metals, styles, etc.)
 * Updated for Strapi v5 flat GraphQL structure
 */

import { gql } from '@apollo/client';

// Get all categories
export const GET_CATEGORIES = gql`
  query GetCategories {
    categories(sort: "order:asc") {
      documentId
      name
      slug
      description
      order
    }
  }
`;

// Get all metals
export const GET_METALS = gql`
  query GetMetals {
    metals(sort: "order:asc") {
      documentId
      name
      code
      slug
      color
      purity
      description
      order
    }
  }
`;

// Get all styles
export const GET_STYLES = gql`
  query GetStyles {
    styles(sort: "order:asc") {
      documentId
      name
      code
      slug
      description
      order
    }
  }
`;

// Get all birthstones
export const GET_BIRTHSTONES = gql`
  query GetBirthstones {
    birthstones {
      documentId
      month
      name
      slug
      color
      description
    }
  }
`;

// Get all filter options at once
export const GET_ALL_FILTERS = gql`
  query GetAllFilters {
    categories(sort: "order:asc") {
      documentId
      name
      slug
      order
    }
    
    metals(sort: "order:asc") {
      documentId
      name
      code
      slug
      color
      order
    }
    
    styles(sort: "order:asc") {
      documentId
      name
      code
      slug
      order
    }
    
    birthstones {
      documentId
      month
      name
      slug
      color
    }
  }
`;
