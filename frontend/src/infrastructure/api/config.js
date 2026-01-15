/**
 * API Configuration
 * Central configuration for API endpoints
 */

export const API_CONFIG = {
  GRAPHQL_ENDPOINT: import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:1337/graphql',
  REST_ENDPOINT: import.meta.env.VITE_API_URL || 'http://localhost:1337/api',
  UPLOAD_ENDPOINT: import.meta.env.VITE_UPLOAD_URL || 'http://localhost:1337/uploads',
};

export const CACHE_CONFIG = {
  PRODUCTS_TTL: 5 * 60 * 1000, // 5 minutes
  FILTERS_TTL: 30 * 60 * 1000, // 30 minutes
};

