/**
 * Retailer GraphQL Fragments
 * Reusable fragments for retailer queries (Strapi v5 flat structure)
 */

import { gql } from '@apollo/client';

// Core retailer fields
export const RETAILER_CORE_FRAGMENT = gql`
  fragment RetailerCore on Retailer {
    documentId
    name
    slug
    email
    website
    rating
    isActive
  }
`;

// Retailer with full details
export const RETAILER_DETAIL_FRAGMENT = gql`
  fragment RetailerDetail on Retailer {
    documentId
    name
    slug
    description
    email
    phone
    website
    rating
    establishedYear
    isActive
    
    address {
      street
      city
      state
      postalCode
      country
    }
    
    socialMedia {
      facebook
      instagram
      twitter
      pinterest
      youtube
      tiktok
    }
    
    shippingPolicy {
      domesticShipping
      internationalShipping
      freeShippingThreshold
      shippingCost
      averageDeliveryDays
      details
    }
    
    returnPolicy {
      returnWindow
      refundAvailable
      exchangeAvailable
      restockingFee
      details
    }
  }
`;
