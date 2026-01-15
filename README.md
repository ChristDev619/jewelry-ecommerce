# 💎 Luxe Jewels - E-Commerce Platform

A modern, full-stack jewelry e-commerce platform built with React, Strapi, and GraphQL.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🌟 Features

- 🛍️ **Product Catalog** - Browse premium jewelry collection with advanced filtering
- 🔍 **Smart Filters** - Filter by metal type, style, price range, and birthstone month
- 💎 **Product Details** - Detailed specifications, images, and descriptions
- 🏪 **Multi-Retailer Support** - Support for multiple jewelry retailers with unique slugs
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- ⚡ **Fast Performance** - Built with Vite and optimized for speed
- 🎨 **Modern UI/UX** - Elegant design with smooth animations

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Material-UI (MUI)** - Component library
- **Apollo Client** - GraphQL client
- **Zustand** - State management
- **React Router** - Routing
- **Framer Motion** - Animations

### Backend
- **Strapi v5** - Headless CMS
- **GraphQL** - API query language
- **SQLite** - Database (development)
- **Node.js** - Runtime environment

## 📁 Project Structure

```
jewelry-ecommerce/
├── backend/           # Strapi backend
│   ├── src/
│   │   ├── api/      # API content types
│   │   └── components/
│   ├── config/
│   ├── database/
│   └── scripts/      # Seed scripts
│
├── frontend/         # React frontend
│   ├── src/
│   │   ├── core/           # Domain entities
│   │   ├── infrastructure/ # API, GraphQL, Mappers
│   │   ├── presentation/   # Components, Pages, Hooks
│   │   ├── shared/         # Utils, Constants
│   │   └── assets/         # Styles, Images
│   └── public/
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/jewelry-ecommerce.git
   cd jewelry-ecommerce
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

1. **Backend - Create `.env` file in `backend/` directory:**
   ```env
   HOST=0.0.0.0
   PORT=1337
   APP_KEYS=your-app-keys-here
   API_TOKEN_SALT=your-api-token-salt
   ADMIN_JWT_SECRET=your-admin-jwt-secret
   TRANSFER_TOKEN_SALT=your-transfer-token-salt
   JWT_SECRET=your-jwt-secret
   ```

2. **Frontend - Create `.env` file in `frontend/` directory:**
   ```env
   VITE_GRAPHQL_URL=http://localhost:1337/graphql
   VITE_API_URL=http://localhost:1337/api
   ```

### Seed Database

```bash
cd backend
npm run seed:jewelry
```

This will populate the database with:
- 8 Metal types
- 11 Jewelry styles
- 12 Birthstones
- 5 Categories
- 1 Default retailer (Gabriel & Co)
- 16 Sample products

### Running the Application

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
```
Backend runs on: http://localhost:1337
Admin panel: http://localhost:1337/admin

**Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```
Frontend runs on: http://localhost:5173

## 📊 Content Types

### Product
- Name, slug, price, SKU
- Images (multiple)
- Relations: Retailer, Category, Metal, Style, Birthstone
- Specifications (weight, diamonds, gemstones, etc.)
- SEO metadata

### Retailer
- Name, slug, contact info
- Address, social media
- Shipping & return policies

### Metal, Style, Birthstone, Category
- Filterable attributes for products

## 🎨 Architecture

### Frontend Architecture (Clean Architecture)

```
Core (Domain Layer)
├── Entities: Business objects (Jewelry, Retailer)
└── Use Cases: Business logic

Infrastructure Layer
├── API: Configuration, Apollo Client
├── GraphQL: Queries, Fragments
├── Mappers: Strapi → Domain entities
└── Repositories: Data access patterns

Presentation Layer
├── Components: UI components
├── Pages: Route pages
├── Hooks: Custom React hooks
└── Store: Zustand state management
```

### Design Principles
- ✅ **SOLID** principles
- ✅ **DRY** (Don't Repeat Yourself)
- ✅ **Separation of Concerns**
- ✅ **Repository Pattern**
- ✅ **Clean Architecture**

## 🔧 Scripts

### Backend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run seed:jewelry # Seed database with jewelry data
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🌐 API Endpoints

### GraphQL Endpoint
```
http://localhost:1337/graphql
```

### Sample Query
```graphql
query GetProducts {
  products_connection {
    nodes {
      documentId
      name
      price
      images {
        url
      }
      metal {
        name
      }
    }
  }
}
```

## 📝 Environment Variables

See `.env.example` files in both `backend/` and `frontend/` directories.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

## 🙏 Acknowledgments

- [Strapi](https://strapi.io/) - Headless CMS
- [React](https://react.dev/) - UI Framework
- [Material-UI](https://mui.com/) - Component Library
- [Apollo GraphQL](https://www.apollographql.com/) - GraphQL Client
- [Unsplash](https://unsplash.com/) - Product Images

---

⭐ **Star this repository if you find it helpful!**

