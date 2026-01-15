# Project Structure Documentation

## 📁 Complete Directory Structure

```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── core/                                # CORE LAYER - Business Logic
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   └── Jewelry.js              # Jewelry domain entity
│   │   │   └── repositories/                # Repository interfaces
│   │   └── use-cases/                       # Application business rules
│   │
│   ├── infrastructure/                      # INFRASTRUCTURE LAYER
│   │   ├── data/
│   │   │   └── jewelryData.js              # Mock jewelry data (16 items)
│   │   └── repositories/                    # Repository implementations
│   │
│   ├── presentation/                        # PRESENTATION LAYER - UI
│   │   ├── components/
│   │   │   ├── common/                      # Reusable Components
│   │   │   │   ├── FilterChip/
│   │   │   │   │   ├── FilterChip.jsx      # Active filter chip
│   │   │   │   │   └── index.js
│   │   │   │   └── ProductCard/
│   │   │   │       ├── ProductCard.jsx     # Jewelry product card
│   │   │   │       └── index.js
│   │   │   ├── layout/                      # Layout Components
│   │   │   │   ├── FilterBar/
│   │   │   │   │   ├── FilterBar.jsx       # Complete filtering interface
│   │   │   │   │   └── index.js
│   │   │   │   ├── Header/
│   │   │   │   │   ├── Header.jsx          # Page header
│   │   │   │   │   └── index.js
│   │   │   │   └── ProductGrid/
│   │   │   │       ├── ProductGrid.jsx     # Responsive grid layout
│   │   │   │       └── index.js
│   │   │   └── jewelry/                     # Feature-specific components
│   │   ├── hooks/                           # Custom React Hooks
│   │   │   ├── useJewelryFilters.js        # Filter & sort logic
│   │   │   └── useWishlist.js              # Wishlist management
│   │   ├── pages/
│   │   │   └── JewelryListing/
│   │   │       ├── JewelryListing.jsx      # Main listing page
│   │   │       └── index.js
│   │   └── store/                           # State Management (Zustand)
│   │       ├── slices/
│   │       │   ├── filterSlice.js          # Filter state & actions
│   │       │   └── wishlistSlice.js        # Wishlist state & actions
│   │       └── store.js                     # Combined store
│   │
│   ├── shared/                              # SHARED LAYER
│   │   ├── constants/
│   │   │   └── jewelry.constants.js        # App constants
│   │   ├── theme/
│   │   │   └── muiTheme.js                 # MUI theme config
│   │   └── utils/
│   │       ├── date.utils.js               # Date formatting
│   │       └── filter.utils.js             # Filter utilities
│   │
│   ├── assets/
│   │   └── react.svg
│   ├── App.css
│   ├── App.jsx                              # Root component
│   ├── index.css                            # Global styles
│   └── main.jsx                             # Entry point
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js                        # PostCSS configuration
├── PROJECT_STRUCTURE.md                     # This file
├── README.md                                # Main documentation
├── tailwind.config.js                       # Tailwind configuration
└── vite.config.js                           # Vite configuration
```

## 🎯 Layer Responsibilities

### Core Layer (Business Logic)
- **Domain Entities**: Business objects (Jewelry class)
- **Repositories**: Data access interfaces
- **Use Cases**: Application-specific business rules
- **Independent of frameworks**: Pure JavaScript/business logic

### Infrastructure Layer
- **Data Sources**: Mock data, API clients (future)
- **Repository Implementations**: Concrete data access
- **External Services**: Third-party integrations

### Presentation Layer (UI)
- **Components**: React components organized by purpose
  - `common/`: Reusable UI elements
  - `layout/`: Page structure components
  - `jewelry/`: Feature-specific components
- **Hooks**: Custom React hooks for logic reuse
- **Pages**: Top-level page components
- **Store**: Global state management

### Shared Layer
- **Constants**: Application-wide constants
- **Theme**: Styling configuration
- **Utils**: Helper functions and utilities

## 🔄 Data Flow

```
User Interaction
      ↓
Component (Presentation)
      ↓
Custom Hook (Presentation)
      ↓
Zustand Store (Presentation)
      ↓
Use Case (Core) [Future]
      ↓
Repository Interface (Core)
      ↓
Repository Implementation (Infrastructure)
      ↓
Data Source (Infrastructure)
```

## 📊 State Management Architecture

### Zustand Store Slices

1. **filterSlice.js**
   - Manages all filter states (metals, styles, price, birthstone)
   - Handles sort preferences
   - Delivery date preferences

2. **wishlistSlice.js**
   - Manages user's wishlist items
   - Persisted to localStorage
   - CRUD operations for wishlist

### Custom Hooks

1. **useJewelryFilters**
   - Applies filters to jewelry data
   - Handles sorting
   - Returns filtered & sorted results

2. **useWishlist**
   - Provides wishlist operations
   - Checks if item is wishlisted
   - Toggles wishlist status

## 🎨 Component Hierarchy

```
App
└── JewelryListing (Page)
    ├── Header
    ├── FilterBar
    │   ├── Filter Dropdowns (Style, Metal, Price, Birthstone)
    │   ├── FilterChip (multiple, for active filters)
    │   └── Sort Dropdown
    └── ProductGrid
        └── ProductCard (multiple, one per jewelry item)
```

## 🔐 SOLID Principles Implementation

### Single Responsibility Principle
- Each component has one clear purpose
- `FilterChip`: Only displays filter chips
- `ProductCard`: Only displays product information
- `FilterBar`: Only handles filtering UI

### Open/Closed Principle
- Components accept props for customization
- Extendable without modifying source code

### Liskov Substitution Principle
- All ProductCards are interchangeable
- Components maintain consistent interfaces

### Interface Segregation Principle
- Props are specific to component needs
- No component forced to depend on unused props

### Dependency Inversion Principle
- Components depend on hooks (abstractions)
- Hooks provide interface to store
- Easy to swap implementations

## 📦 Key Files Explained

### jewelryData.js
Mock data with 16 jewelry items including:
- Rings in various metals and styles
- Realistic pricing ($450 - $15,800)
- Multiple metal types and styles
- Birthstone associations

### jewelryConstants.js
Defines all selectable options:
- 8 metal types
- 12 jewelry styles
- 5 price ranges
- 12 birthstone months
- 5 sort options

### muiTheme.js
Material-UI theme with:
- Custom color palette (primary, secondary, accent)
- Typography hierarchy (Playfair Display + Inter)
- Component style overrides
- Consistent spacing and shadows

### filterSlice.js & wishlistSlice.js
Zustand state slices with:
- State definitions
- Action creators
- Selectors
- Middleware (persist, devtools)

## 🚀 Future Backend Integration

When connecting to Strapi backend:

1. **Create API Service** in `infrastructure/`
2. **Implement Repository** for jewelry data
3. **Update Use Cases** to use repository
4. **Add Loading States** in components
5. **Handle Errors** gracefully
6. **Implement Pagination** for large datasets

## 🎓 Learning Resources

This architecture is based on:
- **Clean Architecture** by Robert C. Martin
- **SOLID Principles** for maintainable code
- **React Best Practices** from official docs
- **Modern State Management** with Zustand

---

**Questions? Check README.md for more information!**

