import type { Schema, Struct } from '@strapi/strapi';

export interface ProductSizeVariant extends Struct.ComponentSchema {
  collectionName: 'components_product_size_variants';
  info: {
    description: 'Product size with pricing, availability, and delivery information';
    displayName: 'Size Variant';
    icon: 'apps';
  };
  attributes: {
    availabilityMessage: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'In Stock'>;
    available: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    deliveryDays: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<5>;
    price: Schema.Attribute.Decimal & Schema.Attribute.Required;
    size: Schema.Attribute.String & Schema.Attribute.Required;
    sku: Schema.Attribute.String;
    stockQuantity: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface ProductSpecifications extends Struct.ComponentSchema {
  collectionName: 'components_product_specifications';
  info: {
    description: 'Detailed specifications for jewelry products';
    displayName: 'Product Specifications';
  };
  attributes: {
    customNotes: Schema.Attribute.Text;
    diamonds: Schema.Attribute.String;
    gemstones: Schema.Attribute.String;
    length: Schema.Attribute.String;
    size: Schema.Attribute.String;
    weight: Schema.Attribute.String;
    width: Schema.Attribute.String;
  };
}

export interface RetailerReturnPolicy extends Struct.ComponentSchema {
  collectionName: 'components_retailer_return_policies';
  info: {
    description: 'Retailer return and exchange policies';
    displayName: 'Return Policy';
  };
  attributes: {
    details: Schema.Attribute.RichText;
    exchangeAvailable: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    refundAvailable: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    restockingFee: Schema.Attribute.Decimal;
    returnWindow: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<30>;
  };
}

export interface RetailerShippingPolicy extends Struct.ComponentSchema {
  collectionName: 'components_retailer_shipping_policies';
  info: {
    description: 'Retailer shipping information and policies';
    displayName: 'Shipping Policy';
  };
  attributes: {
    averageDeliveryDays: Schema.Attribute.Integer;
    details: Schema.Attribute.RichText;
    domesticShipping: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    freeShippingThreshold: Schema.Attribute.Decimal;
    internationalShipping: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    shippingCost: Schema.Attribute.Decimal;
  };
}

export interface SharedAddress extends Struct.ComponentSchema {
  collectionName: 'components_shared_addresses';
  info: {
    description: 'Physical address information';
    displayName: 'Address';
  };
  attributes: {
    city: Schema.Attribute.String;
    coordinates: Schema.Attribute.JSON;
    country: Schema.Attribute.String & Schema.Attribute.DefaultTo<'USA'>;
    postalCode: Schema.Attribute.String;
    state: Schema.Attribute.String;
    street: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedSocialLinks extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: 'Social media profile links';
    displayName: 'Social Links';
  };
  attributes: {
    facebook: Schema.Attribute.String;
    instagram: Schema.Attribute.String;
    pinterest: Schema.Attribute.String;
    tiktok: Schema.Attribute.String;
    twitter: Schema.Attribute.String;
    youtube: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'product.size-variant': ProductSizeVariant;
      'product.specifications': ProductSpecifications;
      'retailer.return-policy': RetailerReturnPolicy;
      'retailer.shipping-policy': RetailerShippingPolicy;
      'shared.address': SharedAddress;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.social-links': SharedSocialLinks;
    }
  }
}
