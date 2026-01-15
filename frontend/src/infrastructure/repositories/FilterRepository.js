/**
 * Filter Repository
 * Data access layer for filter options (categories, metals, styles, etc.)
 * Updated for Strapi v5 flat GraphQL structure
 */

import apolloClient from '../api/apolloClient';
import {
  GET_CATEGORIES,
  GET_METALS,
  GET_STYLES,
  GET_BIRTHSTONES,
  GET_ALL_FILTERS,
} from '../graphql/queries';

export class FilterRepository {
  /**
   * Get all categories
   * @returns {Promise<Array>}
   */
  static async getCategories() {
    try {
      const { data } = await apolloClient.query({
        query: GET_CATEGORIES,
      });

      return data.categories.map(cat => ({
        id: cat.documentId,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        order: cat.order,
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  /**
   * Get all metal types
   * @returns {Promise<Array>}
   */
  static async getMetals() {
    try {
      const { data } = await apolloClient.query({
        query: GET_METALS,
      });

      return data.metals.map(metal => ({
        id: metal.documentId,
        name: metal.name,
        code: metal.code,
        slug: metal.slug,
        color: metal.color,
        purity: metal.purity,
        description: metal.description,
        order: metal.order,
      }));
    } catch (error) {
      console.error('Error fetching metals:', error);
      throw error;
    }
  }

  /**
   * Get all styles
   * @returns {Promise<Array>}
   */
  static async getStyles() {
    try {
      const { data } = await apolloClient.query({
        query: GET_STYLES,
      });

      return data.styles.map(style => ({
        id: style.documentId,
        name: style.name,
        code: style.code,
        slug: style.slug,
        description: style.description,
        order: style.order,
      }));
    } catch (error) {
      console.error('Error fetching styles:', error);
      throw error;
    }
  }

  /**
   * Get all birthstones
   * @returns {Promise<Array>}
   */
  static async getBirthstones() {
    try {
      const { data } = await apolloClient.query({
        query: GET_BIRTHSTONES,
      });

      return data.birthstones.map(birthstone => ({
        id: birthstone.documentId,
        month: birthstone.month,
        name: birthstone.name,
        slug: birthstone.slug,
        color: birthstone.color,
        description: birthstone.description,
      }));
    } catch (error) {
      console.error('Error fetching birthstones:', error);
      throw error;
    }
  }

  /**
   * Get all filter options at once
   * @returns {Promise<{categories, metals, styles, birthstones}>}
   */
  static async getAllFilters() {
    try {
      const { data } = await apolloClient.query({
        query: GET_ALL_FILTERS,
      });

      return {
        categories: data.categories.map(cat => ({
          id: cat.documentId,
          name: cat.name,
          slug: cat.slug,
          order: cat.order,
        })),
        metals: data.metals.map(metal => ({
          id: metal.documentId,
          name: metal.name,
          code: metal.code,
          slug: metal.slug,
          color: metal.color,
          order: metal.order,
        })),
        styles: data.styles.map(style => ({
          id: style.documentId,
          name: style.name,
          code: style.code,
          slug: style.slug,
          order: style.order,
        })),
        birthstones: data.birthstones.map(birthstone => ({
          id: birthstone.documentId,
          month: birthstone.month,
          name: birthstone.name,
          slug: birthstone.slug,
          color: birthstone.color,
        })),
      };
    } catch (error) {
      console.error('Error fetching all filters:', error);
      throw error;
    }
  }
}
