/**
 * Product GraphQL Fragments
 * Reusable fragments for product queries (Strapi v5 flat structure)
 */

import { gql } from '@apollo/client';

// Core product fields (lightweight, for lists)
export const PRODUCT_CORE_FRAGMENT = gql`
  fragment ProductCore on Product {
    documentId
    name
    slug
    price
    inStock
    isNew
    popularity
    deliveryDays
  }
`;

// Product with basic relations
export const PRODUCT_WITH_RELATIONS_FRAGMENT = gql`
  fragment ProductWithRelations on Product {
    documentId
    name
    slug
    price
    sku
    inStock
    isNew
    popularity
    deliveryDays
    
    images {
      documentId
      url
      alternativeText
      width
      height
    }
    
    metal {
      documentId
      name
      code
      color
    }
    
    style {
      documentId
      name
      code
    }
    
    category {
      documentId
      name
      slug
    }
    
    retailer {
      documentId
      name
      slug
    }
  }
`;

// Complete product details (for product detail page)
export const PRODUCT_DETAIL_FRAGMENT = gql`
  fragment ProductDetail on Product {
    documentId
    name
    slug
    description
    price
    sku
    inStock
    isNew
    popularity
    deliveryDays
    createdAt
    updatedAt
    
    images {
      documentId
      url
      alternativeText
      width
      height
    }
    
    specifications {
      weight
      diamonds
      gemstones
      width
      length
      size
      customNotes
    }
    
    metal {
      documentId
      name
      code
      slug
      color
      purity
      description
    }
    
    style {
      documentId
      name
      code
      slug
      description
    }
    
    category {
      documentId
      name
      slug
      description
    }
    
    birthstoneMonth {
      documentId
      month
      name
      color
      description
    }
    
    retailer {
      documentId
      name
      slug
      email
      phone
      website
      rating
      
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
  }
`;
