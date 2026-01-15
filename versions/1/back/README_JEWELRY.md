# 💎 Jewelry E-Commerce Backend

Strapi-powered backend with GraphQL API for jewelry e-commerce platform.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start Strapi
npm run dev

# Access admin panel
http://localhost:1337/admin

# Access GraphQL playground
http://localhost:1337/graphql
```

---

## 📦 What's Included

### Content Types
- ✅ **Products** - Jewelry items with full specifications
- ✅ **Retailers** - Multi-vendor support
- ✅ **Categories** - Product categorization
- ✅ **Metals** - Gold, Platinum, Silver types
- ✅ **Styles** - Design styles (Solitaire, Halo, etc.)
- ✅ **Birthstones** - Monthly birthstone associations

### Features
- ✅ **GraphQL API** - Modern query language
- ✅ **REST API** - Traditional REST endpoints
- ✅ **SQLite Database** - Lightweight, zero-config
- ✅ **Admin Panel** - Beautiful UI for content management
- ✅ **Relationships** - Fully relational data structure
- ✅ **SEO-Friendly** - Slugs for all entities
- ✅ **Image Support** - Media library included

---

## 🌱 Seed Data

Import sample jewelry data:

```bash
# Stop Strapi first (Ctrl+C)
npm run seed:jewelry

# Then restart
npm run dev
```

This imports:
- 8 metal types
- 11 jewelry styles
- 12 birthstones
- 5 categories
- 1 default retailer
- 16 jewelry products

---

## 📚 Documentation

- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - Complete setup instructions
- **[GRAPHQL_EXAMPLES.md](./GRAPHQL_EXAMPLES.md)** - GraphQL query examples
- **[JEWELRY_STRAPI_STRUCTURE.md](./JEWELRY_STRAPI_STRUCTURE.md)** - Architecture overview

---

## 🔗 API Endpoints

### GraphQL
```
http://localhost:1337/graphql
```

### REST API
```
GET /api/products
GET /api/products/:id
GET /api/retailers
GET /api/categories
GET /api/metals
GET /api/styles
GET /api/birthstones
```

---

## 🎯 Example Queries

### Get All Products
```graphql
query {
  products {
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

### Filter by Category
```graphql
query {
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

More examples in [GRAPHQL_EXAMPLES.md](./GRAPHQL_EXAMPLES.md)

---

## 🔐 Permissions

Public API access is pre-configured for:
- Products (read-only)
- Retailers (read-only)
- Categories (read-only)
- Metals (read-only)
- Styles (read-only)
- Birthstones (read-only)

---

## 🛠️ Tech Stack

- **Strapi v5.33.3** - Headless CMS
- **GraphQL Plugin** - GraphQL API layer
- **SQLite** - Database
- **Node.js >= 20** - Runtime

---

## 📝 Scripts

```bash
npm run dev           # Start development server
npm run build         # Build admin panel
npm run start         # Start production server
npm run seed:jewelry  # Import jewelry data
npm run seed:example  # Import example blog data
```

---

## 🎨 Customization

### Change Retailer Name
Edit `scripts/seed-jewelry.js` line 400

### Add Products
Use admin panel or edit seed script

### Update Schema
Use Content-Type Builder in admin panel

---

## 🐛 Troubleshooting

**Issue**: Seed script fails  
**Fix**: Stop Strapi before running seed

**Issue**: GraphQL not working  
**Fix**: Check `@strapi/plugin-graphql` is installed

**Issue**: Empty API response  
**Fix**: Run `npm run seed:jewelry`

---

## 📞 Support

- Strapi Docs: https://docs.strapi.io
- GraphQL Docs: https://graphql.org/learn
- Strapi Discord: https://discord.strapi.io

---

## ✨ Ready to Go!

Your jewelry e-commerce backend is fully configured and ready to use!

Next steps:
1. Start Strapi: `npm run dev`
2. Create admin account
3. Run seed script: `npm run seed:jewelry`
4. Test GraphQL: http://localhost:1337/graphql
5. Integrate with frontend

**Happy coding! 💎**

