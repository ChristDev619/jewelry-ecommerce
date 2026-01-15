import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import muiTheme from './shared/theme/muiTheme';
import JewelryListing from './presentation/pages/JewelryListing';
import ProductDetail from './presentation/pages/ProductDetail';

/**
 * Main App Component
 * Provides theme, routing, and Apollo Client
 */
function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <BrowserRouter>
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
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
