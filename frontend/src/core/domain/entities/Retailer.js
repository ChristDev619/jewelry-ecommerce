/**
 * Retailer Entity
 * Domain model representing a jewelry retailer/store
 */

export class Retailer {
  constructor({
    id,
    name,
    slug,
    description = '',
    email,
    phone = '',
    website = '',
    rating = 0,
    establishedYear = null,
    isActive = true,
    address = null,
    socialMedia = null,
    shippingPolicy = null,
    returnPolicy = null,
    logo = null,
  }) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.description = description;
    this.email = email;
    this.phone = phone;
    this.website = website;
    this.rating = rating;
    this.establishedYear = establishedYear;
    this.isActive = isActive;
    this.address = address;
    this.socialMedia = socialMedia;
    this.shippingPolicy = shippingPolicy;
    this.returnPolicy = returnPolicy;
    this.logo = logo;
  }

  get displayRating() {
    return this.rating.toFixed(1);
  }

  get yearsInBusiness() {
    if (!this.establishedYear) return null;
    return new Date().getFullYear() - this.establishedYear;
  }

  get fullAddress() {
    if (!this.address) return '';
    const { street, city, state, postalCode, country } = this.address;
    return `${street}, ${city}, ${state} ${postalCode}, ${country}`;
  }

  hasFreeShipping(orderAmount) {
    if (!this.shippingPolicy?.freeShippingThreshold) return false;
    return orderAmount >= this.shippingPolicy.freeShippingThreshold;
  }
}

