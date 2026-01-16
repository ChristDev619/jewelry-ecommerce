/**
 * Product Mapper
 * Maps Strapi Product responses to Jewelry domain entity
 * Following Single Responsibility Principle
 * Updated for Strapi v5 flat GraphQL structure
 */

import { Jewelry } from '../../core/domain/entities/Jewelry';
import { API_CONFIG } from '../api/config';

// Extract base URL from GraphQL endpoint
const STRAPI_BASE_URL = API_CONFIG.GRAPHQL_ENDPOINT.replace('/graphql', '');

export class ProductMapper {
  /**
   * Map Strapi product response to Jewelry domain entity
   * @param {Object} strapiProduct - Product from Strapi GraphQL response
   * @returns {Jewelry} Domain entity
   */
  static toDomain(strapiProduct) {
    if (!strapiProduct) {
      console.warn('Invalid Strapi product data:', strapiProduct);
      return null;
    }

    return new Jewelry({
      id: strapiProduct.documentId,
      name: strapiProduct.name,
      slug: strapiProduct.slug,
      sku: strapiProduct.sku,
      category: strapiProduct.category?.name || 'RINGS',
      categorySlug: strapiProduct.category?.slug,
      price: parseFloat(strapiProduct.price) || 0,
      images: strapiProduct.images?.length > 0 
        ? strapiProduct.images.map(img => {
            // If URL is relative, prepend Strapi base URL
            const url = img.url;
            return url.startsWith('http') ? url : `${STRAPI_BASE_URL}${url}`;
          })
        : ['https://via.placeholder.com/400x400/8B7355/ffffff?text=' + encodeURIComponent(strapiProduct.name?.substring(0, 20) || 'Ring')],
      metal: strapiProduct.metal?.code || strapiProduct.metal?.name,
      metalName: strapiProduct.metal?.name,
      metalColor: strapiProduct.metal?.color,
      style: strapiProduct.style?.code || strapiProduct.style?.name,
      styleName: strapiProduct.style?.name,
      birthstoneMonth: strapiProduct.birthstoneMonth?.month || null,
      deliveryDays: strapiProduct.deliveryDays || 7,
      inStock: strapiProduct.inStock !== undefined ? strapiProduct.inStock : true,
      description: strapiProduct.description,
      specifications: strapiProduct.specifications || {},
      isNew: strapiProduct.isNew || false,
      popularity: strapiProduct.popularity || 0,
      createdAt: strapiProduct.createdAt ? new Date(strapiProduct.createdAt) : new Date(),
      // Size variants
      sizeVariants: strapiProduct.sizeVariants?.map(variant => ({
        size: variant.size,
        price: parseFloat(variant.price) || 0,
        available: variant.available !== undefined ? variant.available : true,
        stockQuantity: variant.stockQuantity || 0,
        availabilityMessage: variant.availabilityMessage || 'In Stock',
        deliveryDays: variant.deliveryDays || 7,
        sku: variant.sku || null,
      })) || [],
      // Additional Strapi-specific fields
      retailer: strapiProduct.retailer ? {
        id: strapiProduct.retailer.documentId,
        name: strapiProduct.retailer.name,
        slug: strapiProduct.retailer.slug,
      } : null,
    });
  }

  /**
   * Map array of Strapi products to array of Jewelry entities
   * @param {Array} strapiProducts - Array of products from Strapi
   * @returns {Array<Jewelry>} Array of domain entities
   */
  static toDomainList(strapiProducts) {
    if (!Array.isArray(strapiProducts)) {
      console.warn('Expected array of products, got:', strapiProducts);
      return [];
    }

    return strapiProducts
      .map(product => this.toDomain(product))
      .filter(product => product !== null);
  }

  /**
   * Extract pagination metadata from Strapi response
   * @param {Object} pageInfo - pageInfo object from Strapi v5 response
   * @returns {Object} Pagination info
   */
  static extractPagination(pageInfo) {
    if (!pageInfo) {
      return {
        total: 0,
        page: 1,
        pageSize: 25,
        pageCount: 0,
      };
    }

    return {
      total: pageInfo.total || 0,
      page: pageInfo.page || 1,
      pageSize: pageInfo.pageSize || 25,
      pageCount: pageInfo.pageCount || 0,
    };
  }
}
