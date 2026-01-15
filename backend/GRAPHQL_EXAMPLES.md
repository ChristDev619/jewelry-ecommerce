# 🎮 GraphQL Query Examples

Quick reference for common GraphQL queries for your jewelry e-commerce.

Access GraphQL Playground: `http://localhost:1337/graphql`

---

## 📦 Basic Queries

### Get All Products (Simple)
```graphql
query {
  products {
    data {
      id
      attributes {
        name
        price
        inStock
      }
    }
  }
}
```

### Get All Products (Complete)
```graphql
query {
  products {
    data {
      id
      attributes {
        name
        slug
        description
        price
        sku
        inStock
        isNew
        popularity
        deliveryDays
        
        retailer {
          data {
            id
            attributes {
              name
              slug
              email
              website
            }
          }
        }
        
        category {
          data {
            id
            attributes {
              name
              slug
            }
          }
        }
        
        metal {
          data {
            id
            attributes {
              name
              code
              color
              purity
            }
          }
        }
        
        style {
          data {
            id
            attributes {
              name
              code
              description
            }
          }
        }
        
        birthstoneMonth {
          data {
            id
            attributes {
              month
              name
              color
            }
          }
        }
        
        specifications {
          weight
          diamonds
          gemstones
          width
          length
        }
      }
    }
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
  }
}
```

---

## 🔍 Filtering Queries

### Filter by Category
```graphql
query GetRings {
  products(filters: { category: { name: { eq: "Rings" } } }) {
    data {
      attributes {
        name
        price
      }
    }
  }
}
```

### Filter by Metal Type
```graphql
query GetGoldProducts {
  products(filters: { metal: { code: { contains: "GOLD" } } }) {
    data {
      attributes {
        name
        metal {
          data {
            attributes {
              name
            }
          }
        }
      }
    }
  }
}
```

### Filter by Style
```graphql
query GetHaloRings {
  products(filters: { style: { code: { eq: "HALO" } } }) {
    data {
      attributes {
        name
        price
        style {
          data {
            attributes {
              name
            }
          }
        }
      }
    }
  }
}
```

### Filter by Price Range
```graphql
query GetAffordableProducts {
  products(filters: { price: { gte: 500, lte: 2000 } }) {
    data {
      attributes {
        name
        price
      }
    }
  }
}
```

### Filter by In Stock
```graphql
query GetAvailableProducts {
  products(filters: { inStock: { eq: true } }) {
    data {
      attributes {
        name
        price
        inStock
      }
    }
  }
}
```

### Filter New Arrivals
```graphql
query GetNewProducts {
  products(filters: { isNew: { eq: true } }) {
    data {
      attributes {
        name
        price
        isNew
      }
    }
  }
}
```

### Filter by Birthstone
```graphql
query GetSeptemberBirthstones {
  products(filters: { birthstoneMonth: { month: { eq: "SEPTEMBER" } } }) {
    data {
      attributes {
        name
        price
        birthstoneMonth {
          data {
            attributes {
              month
              name
            }
          }
        }
      }
    }
  }
}
```

---

## 🔗 Complex Filtering (Multiple Conditions)

### AND Conditions
```graphql
query ComplexAndFilter {
  products(
    filters: {
      and: [
        { metal: { code: { eq: "18K_WHITE_GOLD" } } }
        { style: { code: { eq: "HALO" } } }
        { price: { lte: 15000 } }
        { inStock: { eq: true } }
      ]
    }
  ) {
    data {
      attributes {
        name
        price
      }
    }
  }
}
```

### OR Conditions
```graphql
query PremiumMetals {
  products(
    filters: {
      or: [
        { metal: { code: { eq: "18K_WHITE_GOLD" } } }
        { metal: { code: { eq: "PLATINUM" } } }
      ]
    }
  ) {
    data {
      attributes {
        name
        metal {
          data {
            attributes {
              name
            }
          }
        }
      }
    }
  }
}
```

---

## 📄 Sorting & Pagination

### Sort by Price (Ascending)
```graphql
query SortByPriceAsc {
  products(sort: "price:asc") {
    data {
      attributes {
        name
        price
      }
    }
  }
}
```

### Sort by Price (Descending)
```graphql
query SortByPriceDesc {
  products(sort: "price:desc") {
    data {
      attributes {
        name
        price
      }
    }
  }
}
```

### Sort by Popularity
```graphql
query SortByPopularity {
  products(sort: "popularity:desc") {
    data {
      attributes {
        name
        popularity
      }
    }
  }
}
```

### Pagination (Page-based)
```graphql
query PaginatedProducts {
  products(
    pagination: { page: 1, pageSize: 10 }
    sort: "price:desc"
  ) {
    data {
      attributes {
        name
        price
      }
    }
    meta {
      pagination {
        page
        pageSize
        pageCount
        total
      }
    }
  }
}
```

### Pagination (Offset-based)
```graphql
query OffsetPagination {
  products(
    pagination: { start: 0, limit: 5 }
  ) {
    data {
      attributes {
        name
        price
      }
    }
  }
}
```

---

## 🎯 Single Item Queries

### Get Product by Slug
```graphql
query GetProductBySlug {
  products(filters: { slug: { eq: "18k-white-gold-solitaire-diamond-engagement-ring" } }) {
    data {
      id
      attributes {
        name
        slug
        description
        price
        inStock
        deliveryDays
        
        retailer {
          data {
            attributes {
              name
              email
              phone
              website
            }
          }
        }
        
        specifications {
          weight
          diamonds
          width
        }
      }
    }
  }
}
```

### Get Product by ID
```graphql
query GetProductById {
  product(id: 1) {
    data {
      attributes {
        name
        price
      }
    }
  }
}
```

---

## 🏪 Retailer Queries

### Get All Retailers
```graphql
query GetRetailers {
  retailers {
    data {
      id
      attributes {
        name
        slug
        email
        website
        isActive
        rating
      }
    }
  }
}
```

### Get Retailer with Products
```graphql
query GetRetailerWithProducts {
  retailers(filters: { slug: { eq: "gabriel-and-co" } }) {
    data {
      attributes {
        name
        email
        website
        description
        
        address {
          street
          city
          state
          country
        }
        
        shippingPolicy {
          domesticShipping
          internationalShipping
          freeShippingThreshold
        }
        
        products {
          data {
            attributes {
              name
              price
              inStock
            }
          }
        }
      }
    }
  }
}
```

---

## 📂 Category Queries

### Get All Categories
```graphql
query GetCategories {
  categories {
    data {
      id
      attributes {
        name
        slug
        description
        order
      }
    }
  }
}
```

### Get Category with Products
```graphql
query GetCategoryWithProducts {
  categories(filters: { slug: { eq: "rings" } }) {
    data {
      attributes {
        name
        description
        products {
          data {
            attributes {
              name
              price
            }
          }
        }
      }
    }
  }
}
```

---

## 💎 Metal Queries

### Get All Metals
```graphql
query GetMetals {
  metals {
    data {
      id
      attributes {
        name
        code
        purity
        color
        description
      }
    }
  }
}
```

### Get Metal with Products
```graphql
query GetMetalWithProducts {
  metals(filters: { code: { eq: "18K_WHITE_GOLD" } }) {
    data {
      attributes {
        name
        purity
        products {
          data {
            attributes {
              name
              price
            }
          }
        }
      }
    }
  }
}
```

---

## 🎨 Style Queries

### Get All Styles
```graphql
query GetStyles {
  styles {
    data {
      id
      attributes {
        name
        code
        description
      }
    }
  }
}
```

---

## 🎂 Birthstone Queries

### Get All Birthstones
```graphql
query GetBirthstones {
  birthstones {
    data {
      id
      attributes {
        month
        name
        color
        description
      }
    }
  }
}
```

### Get Birthstone with Products
```graphql
query GetAprilBirthstone {
  birthstones(filters: { month: { eq: "APRIL" } }) {
    data {
      attributes {
        month
        name
        description
        products {
          data {
            attributes {
              name
              price
            }
          }
        }
      }
    }
  }
}
```

---

## 🔥 Real-World Use Cases

### Homepage: Featured New Products
```graphql
query FeaturedNewProducts {
  products(
    filters: { isNew: { eq: true } }
    sort: "popularity:desc"
    pagination: { limit: 8 }
  ) {
    data {
      attributes {
        name
        slug
        price
        isNew
        
        category {
          data {
            attributes {
              name
              slug
            }
          }
        }
      }
    }
  }
}
```

### Product Listing Page with Filters
```graphql
query ProductListingWithFilters(
  $categorySlug: String
  $metalCode: String
  $minPrice: Float
  $maxPrice: Float
  $page: Int
  $pageSize: Int
) {
  products(
    filters: {
      and: [
        { category: { slug: { eq: $categorySlug } } }
        { metal: { code: { eq: $metalCode } } }
        { price: { gte: $minPrice, lte: $maxPrice } }
        { inStock: { eq: true } }
      ]
    }
    sort: "popularity:desc"
    pagination: { page: $page, pageSize: $pageSize }
  ) {
    data {
      id
      attributes {
        name
        slug
        price
        inStock
        
        metal {
          data {
            attributes {
              name
              color
            }
          }
        }
        
        style {
          data {
            attributes {
              name
            }
          }
        }
      }
    }
    meta {
      pagination {
        total
        pageCount
      }
    }
  }
}
```

**Variables:**
```json
{
  "categorySlug": "rings",
  "metalCode": "18K_WHITE_GOLD",
  "minPrice": 1000,
  "maxPrice": 10000,
  "page": 1,
  "pageSize": 12
}
```

### Product Detail Page
```graphql
query ProductDetail($slug: String!) {
  products(filters: { slug: { eq: $slug } }) {
    data {
      id
      attributes {
        name
        slug
        description
        price
        sku
        inStock
        isNew
        deliveryDays
        
        retailer {
          data {
            attributes {
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
              }
              
              returnPolicy {
                returnWindow
                refundAvailable
                exchangeAvailable
              }
            }
          }
        }
        
        category {
          data {
            attributes {
              name
              slug
            }
          }
        }
        
        metal {
          data {
            attributes {
              name
              code
              color
              purity
            }
          }
        }
        
        style {
          data {
            attributes {
              name
              description
            }
          }
        }
        
        birthstoneMonth {
          data {
            attributes {
              month
              name
              color
              description
            }
          }
        }
        
        specifications {
          weight
          diamonds
          gemstones
          width
          length
          customNotes
        }
      }
    }
  }
}
```

**Variables:**
```json
{
  "slug": "18k-white-gold-solitaire-diamond-engagement-ring"
}
```

### Search Products
```graphql
query SearchProducts($searchTerm: String!) {
  products(
    filters: {
      or: [
        { name: { containsi: $searchTerm } }
        { description: { containsi: $searchTerm } }
      ]
    }
  ) {
    data {
      attributes {
        name
        slug
        price
        description
      }
    }
  }
}
```

**Variables:**
```json
{
  "searchTerm": "diamond"
}
```

### Related Products (Same Style)
```graphql
query RelatedProducts($styleCode: String!, $excludeId: ID!) {
  products(
    filters: {
      and: [
        { style: { code: { eq: $styleCode } } }
        { id: { ne: $excludeId } }
      ]
    }
    pagination: { limit: 4 }
  ) {
    data {
      attributes {
        name
        slug
        price
      }
    }
  }
}
```

---

## 💡 Pro Tips

1. **Use Variables** for dynamic queries (better performance)
2. **Request Only Needed Fields** to reduce payload size
3. **Use Pagination** for large datasets
4. **Combine Filters** for precise results
5. **Test in Playground** before implementing in frontend

---

## 🚀 Ready to Use!

Copy these queries into:
- GraphQL Playground for testing
- Your frontend GraphQL client (Apollo, urql, etc.)
- Postman/Insomnia for API testing

**Happy querying! 💎**

