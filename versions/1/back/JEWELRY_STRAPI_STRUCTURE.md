# Jewelry E-Commerce Strapi Structure

## Overview
This document outlines the recommended Strapi content type structure for a multi-retailer jewelry e-commerce platform.

## Content Type Architecture

### 1. **Product (api::product.product)**
Main collection type for jewelry items.

**Fields:**
- `name` (String, required) - Product name
- `slug` (UID, auto-generated from name) - SEO-friendly URL
- `description` (Rich Text) - Detailed product description
- `price` (Decimal, required) - Product price
- `images` (Media, multiple) - Product image gallery
- `sku` (String, unique) - Stock keeping unit
- `inStock` (Boolean, default: true) - Availability status
- `isNew` (Boolean, default: false) - New arrival flag
- `popularity` (Integer) - Popularity score for sorting
- `deliveryDays` (Integer) - Estimated delivery time

**Relations:**
- `retailer` (Many-to-One → Retailer) - Product seller
- `category` (Many-to-One → Category) - Product category
- `metal` (Many-to-One → Metal) - Metal type
- `style` (Many-to-One → Style) - Design style
- `birthstoneMonth` (Many-to-One → Birthstone, nullable) - Associated birthstone

**Components:**
- `specifications` (Component: product.specifications) - Product specs
- `seo` (Component: shared.seo) - SEO metadata

---

### 2. **Retailer (api::retailer.retailer)**
Collection type for managing multiple retailers/vendors.

**Fields:**
- `name` (String, required, unique) - Retailer name
- `slug` (UID, auto-generated from name) - SEO-friendly URL
- `description` (Rich Text) - Retailer bio/about
- `logo` (Media, single) - Retailer logo
- `email` (Email, required) - Contact email
- `phone` (String) - Contact phone
- `website` (String) - Official website URL
- `isActive` (Boolean, default: true) - Active status
- `rating` (Decimal) - Average rating
- `establishedYear` (Integer) - Year established

**Relations:**
- `products` (One-to-Many ← Product) - Products from this retailer
- `shippingPolicies` (Component: retailer.shipping-policy) - Shipping details
- `returnPolicy` (Component: retailer.return-policy) - Return policy

**Components:**
- `address` (Component: shared.address) - Physical location
- `socialMedia` (Component: shared.social-links) - Social media profiles

---

### 3. **Category (api::category.category)**
Collection type for product categories.

**Fields:**
- `name` (String, required, unique) - Category name (e.g., "Rings", "Necklaces")
- `slug` (UID, auto-generated from name)
- `description` (Text) - Category description
- `icon` (Media, single) - Category icon/image
- `order` (Integer) - Display order
- `isActive` (Boolean, default: true)

**Relations:**
- `products` (One-to-Many ← Product) - Products in this category
- `parent` (Many-to-One → Category, nullable) - For subcategories

---

### 4. **Metal (api::metal.metal)**
Collection type for metal types.

**Fields:**
- `name` (String, required, unique) - Display name (e.g., "14K White Gold")
- `code` (String, unique) - Code identifier (e.g., "14K_WHITE_GOLD")
- `slug` (UID, auto-generated from name)
- `description` (Text) - Metal description
- `color` (String) - Color hex code for UI
- `purity` (String) - Purity level (e.g., "14K", "18K", "950 Platinum")
- `order` (Integer) - Display order

**Relations:**
- `products` (One-to-Many ← Product)

---

### 5. **Style (api::style.style)**
Collection type for jewelry styles/designs.

**Fields:**
- `name` (String, required, unique) - Style name (e.g., "Solitaire", "Halo")
- `code` (String, unique) - Code identifier (e.g., "SOLITAIRE", "HALO")
- `slug` (UID, auto-generated from name)
- `description` (Text) - Style description
- `image` (Media, single) - Representative image
- `order` (Integer) - Display order

**Relations:**
- `products` (One-to-Many ← Product)

---

### 6. **Birthstone (api::birthstone.birthstone)**
Collection type for birthstone associations.

**Fields:**
- `month` (Enumeration) - Month (JANUARY, FEBRUARY, ..., DECEMBER)
- `name` (String, required) - Stone name (e.g., "Diamond", "Sapphire")
- `slug` (UID, auto-generated from name)
- `color` (String) - Primary color
- `description` (Text) - Stone significance/meaning
- `image` (Media, single) - Stone image

**Relations:**
- `products` (One-to-Many ← Product)

---

## Component Architecture

### 1. **product.specifications**
Reusable component for product specifications.

**Fields:**
- `weight` (String) - Product weight (e.g., "3.2g")
- `diamonds` (String) - Diamond carat weight (e.g., "0.75ct")
- `gemstones` (String, nullable) - Other gemstone details
- `width` (String) - Ring/band width
- `length` (String, nullable) - Length for necklaces/bracelets
- `size` (String, nullable) - Size information
- `customNotes` (Text, nullable) - Additional specifications

---

### 2. **retailer.shipping-policy**
Component for retailer shipping information.

**Fields:**
- `domesticShipping` (Boolean, default: true)
- `internationalShipping` (Boolean, default: false)
- `freeShippingThreshold` (Decimal, nullable) - Minimum order for free shipping
- `shippingCost` (Decimal) - Standard shipping cost
- `averageDeliveryDays` (Integer) - Average delivery time
- `details` (Rich Text) - Detailed policy text

---

### 3. **retailer.return-policy**
Component for return policy details.

**Fields:**
- `returnWindow` (Integer) - Days allowed for returns
- `refundAvailable` (Boolean, default: true)
- `exchangeAvailable` (Boolean, default: true)
- `restockingFee` (Decimal, nullable) - Fee percentage
- `details` (Rich Text) - Detailed policy text

---

### 4. **shared.address**
Reusable component for addresses.

**Fields:**
- `street` (String)
- `city` (String)
- `state` (String)
- `postalCode` (String)
- `country` (String)
- `coordinates` (JSON, nullable) - Lat/long for maps

---

### 5. **shared.social-links**
Reusable component for social media profiles.

**Fields:**
- `facebook` (String, nullable)
- `instagram` (String, nullable)
- `twitter` (String, nullable)
- `pinterest` (String, nullable)
- `youtube` (String, nullable)

---

## Database Relationships Diagram

```
┌─────────────┐         ┌──────────────┐
│  Retailer   │────────>│   Product    │
│             │ 1:N     │              │
└─────────────┘         └──────────────┘
                               │
                               │ M:1
                ┌──────────────┼──────────────┬──────────────┐
                │              │              │              │
                V              V              V              V
         ┌──────────┐   ┌──────────┐   ┌─────────┐   ┌────────────┐
         │ Category │   │  Metal   │   │  Style  │   │ Birthstone │
         └──────────┘   └──────────┘   └─────────┘   └────────────┘
```

---

## API Endpoints (Auto-generated by Strapi)

### Products
- `GET /api/products` - List all products (with filtering, sorting, pagination)
- `GET /api/products/:id` - Get single product
- `GET /api/products?filters[retailer][slug][$eq]=retailer-name` - Filter by retailer
- `GET /api/products?filters[category][slug][$eq]=rings` - Filter by category

### Retailers
- `GET /api/retailers` - List all retailers
- `GET /api/retailers/:slug` - Get retailer by slug
- `GET /api/retailers/:id?populate=products` - Get retailer with products

### Categories, Metals, Styles, Birthstones
- Similar CRUD endpoints for each

---

## Migration Strategy

### Phase 1: Create Content Types
1. Create all content type schemas in Strapi admin or via CLI
2. Set up relationships between entities
3. Configure permissions for public API access

### Phase 2: Create Seed Script
1. Adapt existing `scripts/seed.js` to import jewelry data
2. Transform frontend `jewelryData.js` into Strapi-compatible format
3. Upload product images to Strapi media library

### Phase 3: Frontend Integration
1. Replace static data imports with Strapi API calls
2. Update frontend models to match Strapi response structure
3. Implement filtering/sorting using Strapi query parameters

---

## SEO & URL Structure

### Product URLs
```
/products/[category-slug]/[product-slug]
Example: /products/rings/14k-white-gold-diamond-cluster-ring
```

### Retailer URLs
```
/retailers/[retailer-slug]
Example: /retailers/gabriels-fine-jewelry
```

### Category URLs
```
/categories/[category-slug]
Example: /categories/rings
```

---

## Advantages of This Structure

1. **Scalability**: Easy to add new retailers, categories, and products
2. **SEO-Friendly**: Slug fields for all major entities
3. **Flexibility**: Component-based specifications allow for product variations
4. **Maintainability**: Normalized data structure reduces redundancy
5. **Multi-tenancy**: Ready for multiple retailers from day one
6. **Filtering**: Rich filtering capabilities through Strapi's query system
7. **Performance**: Can populate relations selectively for optimal loading

---

## Next Steps

1. **Create Content Types**: Use Strapi Content-Type Builder or create schema.json files
2. **Set Up Components**: Define reusable components
3. **Create Seed Script**: Migrate existing data to Strapi
4. **Configure API Permissions**: Allow public read access
5. **Update Frontend**: Integrate with Strapi API

