/**
 * Jewelry Entity
 * Domain model representing a jewelry item
 */
export class Jewelry {
  constructor({
    id,
    name,
    slug,
    category,
    price,
    images,
    metal,
    style,
    birthstoneMonth = null,
    deliveryDays,
    inStock = true,
    description,
    specifications,
    isNew = false,
    popularity = 0,
    createdAt = new Date(),
    sizeVariants = [],
    retailer = null,
  }) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.category = category;
    this.price = price;
    this.images = images;
    this.metal = metal;
    this.style = style;
    this.birthstoneMonth = birthstoneMonth;
    this.deliveryDays = deliveryDays;
    this.inStock = inStock;
    this.description = description;
    this.specifications = specifications;
    this.isNew = isNew;
    this.popularity = popularity;
    this.createdAt = createdAt;
    this.sizeVariants = sizeVariants;
    this.retailer = retailer;
  }

  get formattedPrice() {
    return `$${this.price.toLocaleString()}`;
  }

  get deliveryDateEstimate() {
    const date = new Date();
    date.setDate(date.getDate() + this.deliveryDays);
    return date;
  }

  hasMultipleMetals(jewelryList) {
    const metalsInSet = new Set(jewelryList.map(j => j.metal));
    return metalsInSet.size >= 3;
  }

  // Size Variant Methods

  /**
   * Check if product has multiple size options
   * @returns {boolean}
   */
  get hasMultipleSizes() {
    return this.sizeVariants && this.sizeVariants.length > 0;
  }

  /**
   * Get size variant by size value
   * @param {string} sizeValue - Size value (e.g., "6", "7.5")
   * @returns {Object|null} Size variant object or null
   */
  getSizeByValue(sizeValue) {
    if (!this.hasMultipleSizes) return null;
    return this.sizeVariants.find(v => v.size === sizeValue) || null;
  }

  /**
   * Get all available sizes (in stock or available for order)
   * @returns {Array} Array of available size variants
   */
  get availableSizes() {
    if (!this.hasMultipleSizes) return [];
    return this.sizeVariants.filter(v => v.available);
  }

  /**
   * Get price range for products with multiple sizes
   * @returns {Object|null} {min, max, formatted} or null
   */
  get priceRange() {
    if (!this.hasMultipleSizes) return null;
    
    const prices = this.sizeVariants.map(v => v.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    
    return {
      min,
      max,
      formatted: min === max 
        ? `$${min.toLocaleString()}` 
        : `$${min.toLocaleString()} - $${max.toLocaleString()}`
    };
  }

  /**
   * Get formatted price for a specific size
   * @param {string} sizeValue - Size value
   * @returns {string} Formatted price
   */
  getFormattedPriceForSize(sizeValue) {
    const sizeVariant = this.getSizeByValue(sizeValue);
    if (!sizeVariant) return this.formattedPrice;
    return `$${sizeVariant.price.toLocaleString()}`;
  }

  /**
   * Check if a specific size is available
   * @param {string} sizeValue - Size value
   * @returns {boolean}
   */
  isSizeAvailable(sizeValue) {
    const sizeVariant = this.getSizeByValue(sizeValue);
    return sizeVariant ? sizeVariant.available : false;
  }
}

