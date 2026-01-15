/**
 * GraphQL Queries Index
 * Export all queries
 */

// Product queries
export {
  GET_PRODUCTS,
  GET_PRODUCT_BY_SLUG,
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCTS_BY_RETAILER,
  SEARCH_PRODUCTS,
  GET_NEW_ARRIVALS,
  GET_POPULAR_PRODUCTS,
} from './products.queries';

// Retailer queries
export {
  GET_RETAILERS,
  GET_RETAILER_BY_SLUG,
  GET_RETAILER_WITH_PRODUCTS,
} from './retailers.queries';

// Filter queries
export {
  GET_CATEGORIES,
  GET_METALS,
  GET_STYLES,
  GET_BIRTHSTONES,
  GET_ALL_FILTERS,
} from './filters.queries';

