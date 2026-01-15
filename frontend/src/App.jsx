import { lazy, Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import muiTheme from './shared/theme/muiTheme';

// Lazy load pages for better performance
const JewelryListing = lazy(() => import('./presentation/pages/JewelryListing'));
const ProductDetail = lazy(() => import('./presentation/pages/ProductDetail'));

// Loading fallback component
const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #faf9f7 0%, #ffffff 25%, #faf9f7 75%, #f5f4f2 100%)',
    }}
  >
    <CircularProgress sx={{ color: '#8B7355' }} />
  </Box>
);

/**
 * Main App Component
 * Provides theme, routing, and Apollo Client
 */
function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Home / All Products */}
            <Route path="/" element={<JewelryListing />} />
            
            {/* Products by category */}
            <Route path="/products" element={<JewelryListing />} />
            <Route path="/products/:category" element={<JewelryListing />} />
            
            {/* Product detail with retailer slug */}
            <Route 
              path="/retailers/:retailerSlug/products/:productSlug" 
              element={<ProductDetail />} 
            />
            
            {/* Fallback */}
            <Route path="*" element={<JewelryListing />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
