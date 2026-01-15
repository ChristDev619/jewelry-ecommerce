/**
 * Jewelry Entity
 * Domain model representing a jewelry item
 */
export class Jewelry {
  constructor({
    id,
    name,
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
  }) {
    this.id = id;
    this.name = name;
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
}

