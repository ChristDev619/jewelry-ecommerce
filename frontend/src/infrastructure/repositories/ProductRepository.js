/**
 * Product Repository
 * Data access layer for products using Repository pattern
 * Single Responsibility: Handle all product data operations
 * Updated for Strapi v5 GraphQL structure
 */

import apolloClient from '../api/apolloClient';
import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_SLUG,
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCTS_BY_RETAILER,
  SEARCH_PRODUCTS,
  GET_NEW_ARRIVALS,
  GET_POPULAR_PRODUCTS,
} from '../graphql/queries';
import { ProductMapper } from '../mappers';

export class ProductRepository {
  /**
   * Get all products with optional filters
   * @param {Object} options - Query options
   * @returns {Promise<{products: Array, pagination: Object}>}
   */
  static async getAll({ filters = {}, sort = ['popularity:desc'], pagination = {} } = {}) {
    try {
      const { data } = await apolloClient.query({
        query: GET_PRODUCTS,
        variables: {
          filters: this._buildFilters(filters),
          sort,
          pagination,
        },
      });

      return {
        products: ProductMapper.toDomainList(data.products_connection.nodes),
        pagination: ProductMapper.extractPagination(data.products_connection.pageInfo),
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  /**
   * Get single product by slug
   * @param {String} slug - Product slug
   * @returns {Promise<Jewelry>}
   */
  static async getBySlug(slug) {
    try {
      const { data } = await apolloClient.query({
        query: GET_PRODUCT_BY_SLUG,
        variables: { slug },
      });

      const products = data.products;
      if (!products || products.length === 0) {
        return null;
      }

      return ProductMapper.toDomain(products[0]);
    } catch (error) {
      console.error(`Error fetching product by slug ${slug}:`, error);
      throw error;
    }
  }

  /**
   * Get products by category
   * @param {String} categorySlug - Category slug
   * @param {Object} options - Query options
   * @returns {Promise<{products: Array, pagination: Object}>}
   */
  static async getByCategory(categorySlug, { sort = ['popularity:desc'], pagination = {} } = {}) {
    try {
      const { data } = await apolloClient.query({
        query: GET_PRODUCTS_BY_CATEGORY,
        variables: { categorySlug, sort, pagination },
      });

      return {
        products: ProductMapper.toDomainList(data.products_connection.nodes),
        pagination: ProductMapper.extractPagination(data.products_connection.pageInfo),
      };
    } catch (error) {
      console.error(`Error fetching products by category ${categorySlug}:`, error);
      throw error;
    }
  }

  /**
   * Get products by retailer
   * @param {String} retailerSlug - Retailer slug
   * @param {Object} options - Query options
   * @returns {Promise<{products: Array, pagination: Object}>}
   */
  static async getByRetailer(retailerSlug, { sort = ['popularity:desc'], pagination = {} } = {}) {
    try {
      const { data } = await apolloClient.query({
        query: GET_PRODUCTS_BY_RETAILER,
        variables: { retailerSlug, sort, pagination },
      });

      return {
        products: ProductMapper.toDomainList(data.products_connection.nodes),
        pagination: ProductMapper.extractPagination(data.products_connection.pageInfo),
      };
    } catch (error) {
      console.error(`Error fetching products by retailer ${retailerSlug}:`, error);
      throw error;
    }
  }

  /**
   * Search products
   * @param {String} searchTerm - Search query
   * @param {Object} options - Query options
   * @returns {Promise<{products: Array, pagination: Object}>}
   */
  static async search(searchTerm, { pagination = {} } = {}) {
    try {
      const { data } = await apolloClient.query({
        query: SEARCH_PRODUCTS,
        variables: { searchTerm, pagination },
      });

      return {
        products: ProductMapper.toDomainList(data.products_connection.nodes),
        pagination: ProductMapper.extractPagination(data.products_connection.pageInfo),
      };
    } catch (error) {
      console.error(`Error searching products for "${searchTerm}":`, error);
      throw error;
    }
  }

  /**
   * Get new arrival products
   * @param {Number} limit - Number of products
   * @returns {Promise<Array>}
   */
  static async getNewArrivals(limit = 8) {
    try {
      const { data } = await apolloClient.query({
        query: GET_NEW_ARRIVALS,
        variables: { limit },
      });

      return ProductMapper.toDomainList(data.products);
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
      throw error;
    }
  }

  /**
   * Get popular products
   * @param {Number} limit - Number of products
   * @returns {Promise<Array>}
   */
  static async getPopular(limit = 8) {
    try {
      const { data } = await apolloClient.query({
        query: GET_POPULAR_PRODUCTS,
        variables: { limit },
      });

      return ProductMapper.toDomainList(data.products);
    } catch (error) {
      console.error('Error fetching popular products:', error);
      throw error;
    }
  }

  /**
   * Build GraphQL filters from simple filter object
   * @private
   */
  static _buildFilters(filters) {
    const graphqlFilters = { and: [] };

    // Category filter
    if (filters.category) {
      graphqlFilters.and.push({
        category: { slug: { eq: filters.category } },
      });
    }

    // Metal filter
    if (filters.metal) {
      graphqlFilters.and.push({
        metal: { code: { eq: filters.metal } },
      });
    }

    // Style filter
    if (filters.style) {
      graphqlFilters.and.push({
        style: { code: { eq: filters.style } },
      });
    }

    // Price range filter
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      const priceFilter = {};
      if (filters.minPrice !== undefined) {
        priceFilter.gte = filters.minPrice;
      }
      if (filters.maxPrice !== undefined) {
        priceFilter.lte = filters.maxPrice;
      }
      graphqlFilters.and.push({ price: priceFilter });
    }

    // In stock filter
    if (filters.inStock !== undefined) {
      graphqlFilters.and.push({ inStock: { eq: filters.inStock } });
    }

    // New arrivals filter
    if (filters.isNew !== undefined) {
      graphqlFilters.and.push({ isNew: { eq: filters.isNew } });
    }

    // Birthstone filter
    if (filters.birthstoneMonth) {
      graphqlFilters.and.push({
        birthstoneMonth: { month: { eq: filters.birthstoneMonth } },
      });
    }

    // If no filters, return null (fetch all)
    if (graphqlFilters.and.length === 0) {
      return null;
    }

    return graphqlFilters;
  }
}
