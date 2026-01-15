# CSS Architecture Documentation

## 🎨 Overview

This project uses a **hybrid CSS architecture** combining:
- **CSS Modules** for component-scoped styles
- **CSS Custom Properties** (variables) for theming
- **Tailwind CSS** for utility classes
- **Material-UI** for complex interactive components

## 📁 Folder Structure

```
src/
├── assets/
│   └── styles/
│       ├── base/
│       │   ├── index.css              # Imports all base styles
│       │   ├── variables.css          # CSS custom properties
│       │   ├── reset.css              # Minimal CSS reset
│       │   └── typography.css         # Typography styles
│       │
│       ├── components/                # Shared component styles (future)
│       │
│       ├── layouts/                   # Layout-specific styles (future)
│       │
│       └── utilities/
│           ├── index.css              # Imports all utilities
│           └── animations.css         # Keyframe animations
│
├── presentation/
│   └── components/
│       ├── common/
│       │   ├── ProductCard/
│       │   │   ├── ProductCard.jsx
│       │   │   ├── ProductCard.module.css
│       │   │   └── index.js
│       │   └── FilterChip/
│       │       ├── FilterChip.jsx
│       │       ├── FilterChip.module.css
│       │       └── index.js
│       └── layout/
│           ├── Header/
│           │   ├── Header.jsx
│           │   ├── Header.module.css
│           │   └── index.js
│           ├── FilterBar/
│           │   ├── FilterBar.jsx
│           │   ├── FilterBar.module.css
│           │   └── index.js
│           └── ProductGrid/
│               ├── ProductGrid.jsx
│               ├── ProductGrid.module.css
│               └── index.js
```

## 🎯 Design Principles

### 1. **Separation of Concerns**
- **Base styles**: Global resets, variables, typography
- **Component styles**: Scoped to individual components
- **Utility styles**: Reusable animation/helper classes

### 2. **CSS Modules**
- **Scoped**: No naming conflicts
- **Maintainable**: Styles colocated with components
- **Type-safe**: Import as JavaScript objects

### 3. **CSS Custom Properties**
- **Themeable**: Easy to customize
- **Dynamic**: Can change at runtime
- **Consistent**: Single source of truth

## 🎨 Design Tokens (CSS Variables)

### Colors
```css
--color-primary: #2d2d2d;
--color-secondary: #8b7355;
--color-background: #fafaf8;
--color-text-primary: #2d2d2d;
--color-text-secondary: #666666;
```

### Spacing Scale
```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
--spacing-3xl: 64px;
```

### Typography
```css
--font-primary: 'Inter', sans-serif;
--font-heading: 'Playfair Display', serif;
--font-size-xs: 0.75rem;   /* 12px */
--font-size-sm: 0.875rem;  /* 14px */
--font-size-base: 1rem;    /* 16px */
--font-size-lg: 1.125rem;  /* 18px */
```

### Shadows
```css
--shadow-soft: 0 2px 15px rgba(0, 0, 0, 0.08);
--shadow-hover: 0 8px 30px rgba(0, 0, 0, 0.12);
--shadow-elevated: 0 12px 40px rgba(0, 0, 0, 0.15);
```

### Transitions
```css
--transition-fast: 0.2s ease;
--transition-normal: 0.3s ease;
--transition-slow: 0.4s ease;
```

## 📝 Usage Guidelines

### Component Styling

**✅ DO: Use CSS Modules for component styles**
```jsx
import styles from './ProductCard.module.css';

const ProductCard = () => (
  <div className={styles.productCard}>
    <h3 className={styles.title}>Product</h3>
  </div>
);
```

**✅ DO: Use CSS variables for values**
```css
.productCard {
  padding: var(--spacing-md);
  color: var(--color-text-primary);
  transition: var(--transition-normal);
}
```

**✅ DO: Use MUI sx for dynamic/conditional styles**
```jsx
<Card sx={{ backgroundColor: isActive ? 'primary.main' : 'white' }}>
```

**❌ DON'T: Use inline styles via sx for static styles**
```jsx
// Bad
<Card sx={{ padding: '16px', backgroundColor: 'white' }}>

// Good
<Card className={styles.card}>
```

### Naming Conventions

**CSS Module Classes (camelCase)**
```css
.productCard { }
.productCard__image { }
.productCard__title { }
.productCard--featured { }
```

**CSS Variables (kebab-case)**
```css
--color-primary
--spacing-md
--font-size-lg
```

### Responsive Design

**Use media queries in CSS modules**
```css
.productCard {
  padding: var(--spacing-lg);
}

@media (max-width: 960px) {
  .productCard {
    padding: var(--spacing-md);
  }
}

@media (max-width: 640px) {
  .productCard {
    padding: var(--spacing-sm);
  }
}
```

**Breakpoints**
```css
/* Mobile: 320px - 640px */
@media (max-width: 640px) { }

/* Tablet: 641px - 960px */
@media (max-width: 960px) { }

/* Desktop: 961px+ */
@media (min-width: 961px) { }
```

## 🔄 Migration Guide

### Converting from sx prop to CSS Modules

**Before:**
```jsx
<Box
  sx={{
    padding: '16px',
    backgroundColor: 'white',
    '&:hover': {
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
    },
  }}
>
```

**After:**
```jsx
// Component.jsx
import styles from './Component.module.css';

<Box className={styles.container}>

// Component.module.css
.container {
  padding: var(--spacing-md);
  background-color: var(--color-background-light);
  transition: var(--transition-normal);
}

.container:hover {
  box-shadow: var(--shadow-hover);
}
```

## 🎭 Animation Classes

**Fade In**
```jsx
<div className="fade-in">Content</div>
```

**Slide Up**
```jsx
<div className="slide-up">Content</div>
```

**Hover Lift**
```jsx
<div className="hover-lift">Card</div>
```

## 🚀 Performance Benefits

1. **Better Caching**: CSS files are cached separately from JS
2. **Smaller Bundles**: No style objects in JavaScript
3. **Faster Rendering**: No runtime style injection
4. **Parallel Loading**: CSS loads while JS parses

## 🛠️ Tools & Technologies

- **CSS Modules**: Built into Vite (no configuration needed)
- **PostCSS**: For vendor prefixing
- **Tailwind CSS**: Utility classes
- **Material-UI**: Component library with theme integration

## 📚 Best Practices

### 1. **Keep Styles Close to Components**
Each component should have its own `.module.css` file.

### 2. **Use CSS Variables**
Always prefer CSS variables over hardcoded values.

### 3. **Mobile-First**
Write base styles for mobile, add media queries for larger screens.

### 4. **Avoid Deep Nesting**
Keep selectors flat for better performance and maintainability.

### 5. **Use Semantic Class Names**
Class names should describe content, not appearance.

```css
/* Good */
.productCard { }
.productTitle { }

/* Bad */
.redBox { }
.bigText { }
```

## 🎨 Theme Customization

To customize the theme, edit:
1. **Colors**: `src/assets/styles/base/variables.css`
2. **Typography**: `src/assets/styles/base/typography.css`
3. **MUI Theme**: `src/shared/theme/muiTheme.js`
4. **Tailwind**: `tailwind.config.js`

## 📖 Additional Resources

- [CSS Modules Documentation](https://github.com/css-modules/css-modules)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Material-UI Styling](https://mui.com/material-ui/customization/how-to-customize/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Questions?** Check the component files for examples or ask the team!

