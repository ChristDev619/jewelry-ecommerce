# 🚀 Jewelry E-Commerce Migration Guide

## Overview
This guide will help you migrate from static frontend data to a Strapi-powered backend with GraphQL support.

---

## 📋 Prerequisites

- Node.js >= 20.0.0
- npm >= 6.0.0
- SQLite (included with Strapi)

---

## 🔧 Step 1: Install Dependencies

```bash
cd backend
npm install
```

This will install:
- `@strapi/strapi` - Core Strapi framework
- `@strapi/plugin-graphql` - GraphQL plugin
- All other dependencies

---

## 🎯 Step 2: Start Strapi

```bash
npm run dev
```

Strapi will start on: `http://localhost:1337`

### First Time Setup:
1. Open `http://localhost:1337/admin`
2. Create your admin account
3. Fill in:
   - First name
   - Last name
   - Email
   - Password (min 8 characters)

---

## 📊 Step 3: Verify Content Types

After logging into the admin panel, check the left sidebar:

### Content Manager
You should see these collection types:
- ✅ **Products** - Jewelry items
- ✅ **Retailers** - Store information
- ✅ **Categories** - Product categories
- ✅ **Metals** - Metal types (14K Gold, Platinum, etc.)
- ✅ **Styles** - Design styles (Solitaire, Halo, etc.)
- ✅ **Birthstones** - Monthly birthstones

### Content-Type Builder
Click on "Content-Type Builder" to see:
- All schemas with their fields
- Relationships between content types
- Components (specifications, policies, etc.)

---

## 🌱 Step 4: Seed Data

**IMPORTANT**: Stop Strapi before running the seed script (Ctrl+C)

```bash
npm run seed:jewelry
```

This will:
- ✅ Import 8 metal types
- ✅ Import 11 jewelry styles
- ✅ Import 12 birthstones
- ✅ Import 5 categories
- ✅ Create 1 default retailer (Gabriel & Co)
- ✅ Import 16 jewelry products
- ✅ Set up public API permissions
- ✅ Create all relationships

### Expected Output:
```
🚀 Starting jewelry data migration...

📦 Importing Metals...
  ✓ Created metal: 14K White Gold
  ✓ Created metal: 14K Yellow Gold
  ...

💎 Importing Styles...
  ✓ Created style: Solitaire
  ✓ Created style: Halo
  ...

🎂 Importing Birthstones...
  ✓ Created birthstone: Diamond
  ✓ Created birthstone: Sapphire
  ...

📂 Importing Categories...
  ✓ Created category: Rings
  ...

🏪 Importing Default Retailer...
  ✓ Created retailer: Gabriel & Co

💍 Importing Products...
  ✓ Created product: 14K White Gold Diamond Cluster...
  ...

✨ All data imported successfully!

📊 Summary:
  • Metals: 8
  • Styles: 11
  • Birthstones: 12
  • Categories: 5
  • Retailers: 1
  • Products: 16
```

---

## 🔄 Step 5: Restart Strapi

```bash
npm run dev
```

Now go to `http://localhost:1337/admin` and explore:
- Click **Products** → See all 16 jewelry items
- Click any product → See all its relations (retailer, category, metal, style)
- Click **Retailers** → See Gabriel & Co with all its products

---

## 🎮 Step 6: Test GraphQL API

### Access GraphQL Playground
Open: `http://localhost:1337/graphql`

You'll see the GraphQL Playground interface!

### Example Queries:

#### 1. Get All Products
```graphql
query GetAllProducts {
  products {
    data {
      id
      attributes {
        name
        price
        inStock
        isNew
        popularity
      }
    }
  }
}
```

#### 2. Get Products with Relations
```graphql
query GetProductsWithRelations {
  products {
    data {
      id
      attributes {
        name
        slug
        price
        description
        inStock
        
        retailer {
          data {
            attributes {
              name
              email
            }
          }
        }
        
        category {
          data {
            attributes {
              name
            }
          }
        }
        
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

#### 3. Filter Products by Category
```graphql
query GetRings {
  products(filters: { category: { name: { eq: "Rings" } } }) {
    data {
      id
      attributes {
        name
        price
        category {
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

#### 4. Filter by Metal Type
```graphql
query GetWhiteGoldProducts {
  products(filters: { metal: { code: { eq: "14K_WHITE_GOLD" } } }) {
    data {
      attributes {
        name
        price
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

#### 5. Filter by Price Range
```graphql
query GetProductsByPrice {
  products(
    filters: { 
      price: { gte: 1000, lte: 5000 } 
    }
    sort: "price:asc"
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

#### 6. Get Single Product by Slug
```graphql
query GetProductBySlug {
  products(filters: { slug: { eq: "14k-white-gold-diamond-cluster-marquis-station-ring" } }) {
    data {
      attributes {
        name
        slug
        price
        description
        retailer {
          data {
            attributes {
              name
              website
            }
          }
        }
      }
    }
  }
}
```

#### 7. Get Retailer with Products
```graphql
query GetRetailerWithProducts {
  retailers(filters: { slug: { eq: "gabriel-and-co" } }) {
    data {
      attributes {
        name
        email
        website
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

#### 8. Get Products by Birthstone Month
```graphql
query GetBirthstoneProducts {
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
              color
            }
          }
        }
      }
    }
  }
}
```

#### 9. Complex Filtering (Multiple Conditions)
```graphql
query ComplexFilter {
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
        metal {
          data {
            attributes {
              name
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
  }
}
```

#### 10. Pagination
```graphql
query GetProductsPaginated {
  products(
    pagination: { page: 1, pageSize: 5 }
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

---

## 🔐 Step 7: API Permissions (Already Set)

The seed script already configured public API permissions. To verify:

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. Check these permissions are enabled:
   - ✅ Product: find, findOne
   - ✅ Retailer: find, findOne
   - ✅ Category: find, findOne
   - ✅ Metal: find, findOne
   - ✅ Style: find, findOne
   - ✅ Birthstone: find, findOne

---

## 🌐 REST API (Also Available)

If you prefer REST over GraphQL:

### Endpoints:

```bash
# Get all products
GET http://localhost:1337/api/products

# Get all products with relations populated
GET http://localhost:1337/api/products?populate=*

# Get single product by ID
GET http://localhost:1337/api/products/1

# Get products with specific relations
GET http://localhost:1337/api/products?populate[retailer]=*&populate[metal]=*&populate[category]=*

# Filter by category
GET http://localhost:1337/api/products?filters[category][name][$eq]=Rings

# Filter by price range
GET http://localhost:1337/api/products?filters[price][$gte]=1000&filters[price][$lte]=5000

# Sort by price
GET http://localhost:1337/api/products?sort=price:asc

# Pagination
GET http://localhost:1337/api/products?pagination[page]=1&pagination[pageSize]=10
```

---

## 🎨 Frontend Integration

### Option 1: GraphQL (Recommended)

Install Apollo Client in your frontend:

```bash
cd ../frontend
npm install @apollo/client graphql
```

**Create Apollo Client:**

```javascript
// src/infrastructure/api/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:1337/graphql',
  }),
  cache: new InMemoryCache(),
});

export default client;
```

**Update main.jsx:**

```javascript
import { ApolloProvider } from '@apollo/client';
import client from './infrastructure/api/apolloClient';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
```

**Example Query Hook:**

```javascript
// src/infrastructure/repositories/ProductRepository.js
import { gql, useQuery } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($filters: ProductFiltersInput) {
    products(filters: $filters) {
      data {
        id
        attributes {
          name
          slug
          price
          description
          inStock
          isNew
          popularity
          deliveryDays
          
          retailer {
            data {
              attributes {
                name
                slug
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
              }
            }
          }
          
          style {
            data {
              attributes {
                name
                code
              }
            }
          }
          
          specifications {
            weight
            diamonds
            gemstones
            width
          }
        }
      }
    }
  }
`;

export const useProducts = (filters = {}) => {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { filters },
  });
  
  return {
    products: data?.products?.data || [],
    loading,
    error,
  };
};
```

**Use in Component:**

```javascript
// src/presentation/pages/JewelryListing/JewelryListing.jsx
import { useProducts } from '../../infrastructure/repositories/ProductRepository';

function JewelryListing() {
  const { products, loading, error } = useProducts();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product.attributes} 
        />
      ))}
    </div>
  );
}
```

### Option 2: REST API with Fetch

```javascript
// src/infrastructure/repositories/ProductRepository.js
export const fetchProducts = async (filters = {}) => {
  const params = new URLSearchParams({
    'populate[retailer]': '*',
    'populate[category]': '*',
    'populate[metal]': '*',
    'populate[style]': '*',
    'populate[specifications]': '*',
  });
  
  const response = await fetch(
    `http://localhost:1337/api/products?${params}`
  );
  
  const data = await response.json();
  return data.data;
};
```

---

## 🔍 Data Structure Comparison

### Before (Frontend Static Data):
```javascript
{
  id: 'ring-001',
  name: '14K White Gold Diamond Cluster...',
  category: 'RINGS',
  price: 1500,
  metal: '14K_WHITE_GOLD',
  style: 'CLUSTER',
  // ...
}
```

### After (Strapi GraphQL Response):
```javascript
{
  data: {
    products: {
      data: [
        {
          id: "1",
          attributes: {
            name: "14K White Gold Diamond Cluster...",
            slug: "14k-white-gold-diamond-cluster...",
            price: 1500,
            category: {
              data: {
                attributes: {
                  name: "Rings",
                  slug: "rings"
                }
              }
            },
            metal: {
              data: {
                attributes: {
                  name: "14K White Gold",
                  code: "14K_WHITE_GOLD"
                }
              }
            }
          }
        }
      ]
    }
  }
}
```

---

## 🛠️ Customization

### Change Retailer Name

Edit `backend/scripts/seed-jewelry.js`, line ~400:

```javascript
const retailerData = {
  name: 'Your Store Name',  // Change this
  email: 'youremail@example.com',
  // ...
};
```

Then reseed:
```bash
# Clear database first (delete .tmp folder or use Strapi admin)
npm run seed:jewelry
```

### Add More Products

1. **Via Admin UI**: 
   - Go to Content Manager → Products → Create new entry
   - Fill in all fields
   - Select relations from dropdowns
   - Save & Publish

2. **Via Seed Script**:
   - Add to `productsData` array in `seed-jewelry.js`
   - Re-run seed script

---

## 🐛 Troubleshooting

### Issue: Seed script fails
**Solution**: Make sure Strapi is stopped before running seed script.

### Issue: "Cannot find module"
**Solution**: Run `npm install` in backend folder.

### Issue: GraphQL playground not working
**Solution**: Check if `@strapi/plugin-graphql` is installed in package.json.

### Issue: API returns empty data
**Solution**: 
1. Check if data was seeded: `npm run seed:jewelry`
2. Verify permissions in Settings → Users & Permissions → Public

### Issue: Relations not showing in API
**Solution**: Use `populate` parameter:
- GraphQL: Include relation fields in query
- REST: Add `?populate=*` to URL

---

## 📚 Next Steps

1. ✅ **Test all GraphQL queries** in playground
2. ✅ **Explore admin panel** - Add/edit products
3. ✅ **Update frontend** to use GraphQL/REST API
4. ✅ **Customize retailer** information
5. ✅ **Add product images** via admin panel
6. ✅ **Test filtering** and pagination

---

## 🎉 You're All Set!

Your jewelry e-commerce backend is now:
- ✅ Powered by Strapi
- ✅ Using SQLite database
- ✅ GraphQL API enabled
- ✅ REST API available
- ✅ Multi-retailer ready
- ✅ SEO-friendly (slugs everywhere)
- ✅ Fully relational structure
- ✅ 16 products pre-loaded

**Happy coding! 💎**

