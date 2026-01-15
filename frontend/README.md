# Luxury Jewelry E-Commerce Frontend

An elegant and modern jewelry listing application built with React, Material-UI, and Tailwind CSS following clean architecture principles.

## 🚀 Features

- **Advanced Filtering System**: Filter by metal type, style, price range, and birthstone month
- **Real-time Sorting**: Sort by recommended, price (low to high, high to low), newest, and popularity
- **Wishlist Management**: Add/remove items from wishlist with persistent storage
- **Delivery Date Calculator**: Smart delivery date estimation
- **Responsive Design**: Mobile-first design that works beautifully on all screen sizes
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Clean Architecture**: SOLID principles, separation of concerns, and maintainable code structure

## 🏗️ Architecture

The project follows Clean Architecture principles with clear separation of concerns:

```
src/
├── core/                    # Business logic layer
│   ├── domain/             # Domain entities and interfaces
│   └── use-cases/          # Application business rules
├── infrastructure/         # External concerns
│   ├── data/              # Mock data (will connect to backend)
│   └── repositories/      # Data access implementations
├── presentation/          # UI layer
│   ├── components/       # React components
│   │   ├── common/      # Reusable UI components
│   │   ├── layout/      # Layout components
│   │   └── jewelry/     # Feature-specific components
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   └── store/           # State management (Zustand)
└── shared/              # Shared utilities
    ├── constants/       # Application constants
    ├── theme/          # MUI theme configuration
    └── utils/          # Utility functions
```

## 🛠️ Tech Stack

- **React 19** - Latest React with modern features
- **Vite** - Lightning-fast build tool
- **Material-UI v5** - Comprehensive component library
- **Tailwind CSS v3** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **Framer Motion** - Animation library
- **date-fns** - Modern date utility library
- **React Icons** - Popular icon library

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Design Principles

### SOLID Principles
- **Single Responsibility**: Each component has one clear purpose
- **Open/Closed**: Components are extendable via props
- **Liskov Substitution**: Component interfaces are consistent
- **Interface Segregation**: Specific, focused prop interfaces
- **Dependency Inversion**: Depends on abstractions (custom hooks)

### DRY (Don't Repeat Yourself)
- Reusable components (Button, Card, Chip)
- Custom hooks for shared logic
- Utility functions for common operations
- Shared constants across the app

### Code Quality
- Clean, readable code with meaningful names
- Comprehensive component documentation
- PropTypes for type safety
- Consistent code formatting

## 🌟 Key Components

### FilterBar
Advanced filtering interface with dropdown menus for:
- Metal types (14K/18K White/Yellow/Rose Gold, Platinum, Sterling Silver)
- Jewelry styles (Cluster, Marquise, Stackable, etc.)
- Price ranges
- Birthstone months
- Active filter chips with individual removal
- Sort dropdown

### ProductCard
Elegant product display featuring:
- High-quality images
- Delivery truck icon
- Wishlist heart icon
- Smooth hover animations
- Price and product name
- "NEW" badge for new items

### ProductGrid
Responsive grid layout:
- 4 columns on desktop (1200px+)
- 3 columns on tablet (960px - 1199px)
- 2 columns on mobile landscape (600px - 959px)
- 1 column on mobile portrait (<600px)

## 🎯 State Management

Uses Zustand for lightweight, performant state management:

- **Filter State**: All active filters (metals, styles, price, birthstone)
- **Wishlist State**: User's favorited items (persisted to localStorage)
- **UI Preferences**: Sort order, delivery date visibility

## 🚦 Future Enhancements

- [ ] Connect to Strapi backend API
- [ ] Product detail page with lightbox gallery
- [ ] User authentication and profiles
- [ ] Shopping cart functionality
- [ ] Checkout process
- [ ] Product quick view modal
- [ ] Search functionality
- [ ] Advanced filtering (diamond clarity, carat weight, etc.)
- [ ] Comparison feature
- [ ] Recently viewed items
- [ ] Product recommendations

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 👨‍💻 Development

The application is ready for integration with the Strapi backend. Key integration points:

1. Replace mock data in `src/infrastructure/data/jewelryData.js` with API calls
2. Implement repository pattern in `src/infrastructure/repositories/`
3. Add loading and error states in components
4. Implement pagination for large result sets

## 🎨 Customization

### Colors
Edit `src/shared/theme/muiTheme.js` and `tailwind.config.js` to customize the color palette.

### Typography
Fonts are defined in both MUI theme and Tailwind config:
- Headings: Playfair Display (serif)
- Body: Inter (sans-serif)

## 📄 License

This project is part of a luxury e-commerce application.

---

**Built with ❤️ using modern web technologies and best practices**
