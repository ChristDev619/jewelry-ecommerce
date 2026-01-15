/**
 * Retailer Repository
 * Data access layer for retailers using Repository pattern
 * Updated for Strapi v5 flat GraphQL structure
 */

import apolloClient from '../api/apolloClient';
import {
  GET_RETAILERS,
  GET_RETAILER_BY_SLUG,
  GET_RETAILER_WITH_PRODUCTS,
} from '../graphql/queries';
import { RetailerMapper } from '../mappers';

export class RetailerRepository {
  /**
   * Get all retailers
   * @param {Object} options - Query options
   * @returns {Promise<Array>}
   */
  static async getAll({ filters = {} } = {}) {
    try {
      const { data } = await apolloClient.query({
        query: GET_RETAILERS,
        variables: { filters },
      });

      return RetailerMapper.toDomainList(data.retailers);
    } catch (error) {
      console.error('Error fetching retailers:', error);
      throw error;
    }
  }

  /**
   * Get single retailer by slug
   * @param {String} slug - Retailer slug
   * @returns {Promise<Retailer>}
   */
  static async getBySlug(slug) {
    try {
      const { data } = await apolloClient.query({
        query: GET_RETAILER_BY_SLUG,
        variables: { slug },
      });

      const retailers = data.retailers;
      if (!retailers || retailers.length === 0) {
        return null;
      }

      return RetailerMapper.toDomain(retailers[0]);
    } catch (error) {
      console.error(`Error fetching retailer by slug ${slug}:`, error);
      throw error;
    }
  }

  /**
   * Get retailer with products
   * @param {String} slug - Retailer slug
   * @param {Number} productsLimit - Max number of products
   * @returns {Promise<{retailer: Retailer, products: Array}>}
   */
  static async getWithProducts(slug, productsLimit = 50) {
    try {
      const { data } = await apolloClient.query({
        query: GET_RETAILER_WITH_PRODUCTS,
        variables: { slug, productsLimit },
      });

      const retailers = data.retailers;
      if (!retailers || retailers.length === 0) {
        return { retailer: null, products: [] };
      }

      const retailerData = retailers[0];
      const retailer = RetailerMapper.toDomain(retailerData);
      const products = retailerData.products || [];

      return {
        retailer,
        products: products.map(p => ({
          id: p.documentId,
          name: p.name,
          slug: p.slug,
          price: p.price,
          inStock: p.inStock,
        })),
      };
    } catch (error) {
      console.error(`Error fetching retailer with products ${slug}:`, error);
      throw error;
    }
  }
}
