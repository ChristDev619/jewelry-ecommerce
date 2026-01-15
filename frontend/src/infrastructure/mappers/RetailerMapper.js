/**
 * Retailer Mapper
 * Maps Strapi Retailer responses to Retailer domain entity
 * Updated for Strapi v5 flat GraphQL structure
 */

import { Retailer } from '../../core/domain/entities/Retailer';

export class RetailerMapper {
  /**
   * Map Strapi retailer response to Retailer domain entity
   * @param {Object} strapiRetailer - Retailer from Strapi GraphQL response
   * @returns {Retailer} Domain entity
   */
  static toDomain(strapiRetailer) {
    if (!strapiRetailer) {
      console.warn('Invalid Strapi retailer data:', strapiRetailer);
      return null;
    }

    return new Retailer({
      id: strapiRetailer.documentId,
      name: strapiRetailer.name,
      slug: strapiRetailer.slug,
      description: strapiRetailer.description,
      email: strapiRetailer.email,
      phone: strapiRetailer.phone,
      website: strapiRetailer.website,
      rating: strapiRetailer.rating || 0,
      establishedYear: strapiRetailer.establishedYear,
      isActive: strapiRetailer.isActive !== undefined ? strapiRetailer.isActive : true,
      address: strapiRetailer.address || null,
      socialMedia: strapiRetailer.socialMedia || null,
      shippingPolicy: strapiRetailer.shippingPolicy || null,
      returnPolicy: strapiRetailer.returnPolicy || null,
      logo: strapiRetailer.logo?.url || null,
    });
  }

  /**
   * Map array of Strapi retailers to array of Retailer entities
   * @param {Array} strapiRetailers - Array of retailers from Strapi
   * @returns {Array<Retailer>} Array of domain entities
   */
  static toDomainList(strapiRetailers) {
    if (!Array.isArray(strapiRetailers)) {
      console.warn('Expected array of retailers, got:', strapiRetailers);
      return [];
    }

    return strapiRetailers
      .map(retailer => this.toDomain(retailer))
      .filter(retailer => retailer !== null);
  }
}
