import { useMemo } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import FilterBar from '../../components/layout/FilterBar';
import ProductGrid from '../../components/layout/ProductGrid';
import ProductCard from '../../components/common/ProductCard';
import useJewelryFilters from '../../hooks/useJewelryFilters';
import useWishlist from '../../hooks/useWishlist';
import { useProducts } from '../../hooks/data';
import useStore from '../../store/store';
import { sortJewelry } from '../../../shared/utils/filter.utils';

/**
 * JewelryListing Page
 * Main page component for displaying jewelry with filters from Strapi GraphQL
 */
const JewelryListing = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { filters, maxDeliveryDays } = useJewelryFilters();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const showDeliveryDate = useStore((state) => state.showDeliveryDate);
  const sortBy = useStore((state) => state.sortBy);

  // Fetch products from Strapi using GraphQL
  const { products: rawProducts, loading, error } = useProducts({
    filters: {
      ...filters,
      category: category || filters.category,
    },
    sort: ['popularity:desc'],
  });

  // Apply client-side sorting based on selected sort option
  const products = useMemo(() => {
    return sortJewelry(rawProducts, sortBy);
  }, [rawProducts, sortBy]);

  const handleProductClick = (item) => {
    // Navigate to product detail page with retailer slug
    console.log('Product clicked:', { 
      slug: item.slug, 
      retailer: item.retailer,
      hasRetailerSlug: !!item.retailer?.slug 
    });
    
    if (item.retailer?.slug && item.slug) {
      navigate(`/retailers/${item.retailer.slug}/products/${item.slug}`);
    } else {
      console.warn('Missing navigation data:', {
        hasSlug: !!item.slug,
        hasRetailer: !!item.retailer,
        hasRetailerSlug: !!item.retailer?.slug
      });
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #faf9f7 0%, #ffffff 25%, #faf9f7 75%, #f5f4f2 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(212, 175, 55, 0.03) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }
      }}
    >
      {/* Page Header */}
      <Header
        title="Rings"
        description="Bold bands. Delicate designs. Discover rings designed to celebrate life's most meaningful moments."
      />

      {/* Filter Bar */}
      <FilterBar resultCount={products.length} maxDeliveryDays={maxDeliveryDays} />

      {/* Loading State */}
      {loading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
          }}
        >
          <CircularProgress sx={{ color: '#8B7355' }} />
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Box
          sx={{
            textAlign: 'center',
            paddingY: 8,
          }}
        >
          <Typography variant="h4" gutterBottom color="error">
            Error loading products
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {error.message}
          </Typography>
        </Box>
      )}

      {/* Product Grid */}
      {!loading && !error && (
        <ProductGrid>
          {products.length === 0 ? (
            // Empty State
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              sx={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                paddingY: 8,
              }}
            >
              <Typography variant="h4" gutterBottom color="text.secondary">
                No products found
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Try adjusting your filters to see more results
              </Typography>
            </Box>
          ) : (
            // Product Cards
            products.map((item, index) => (
              <Box
                key={item.id}
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard
                  item={item}
                  isWishlisted={isInWishlist(item.id)}
                  onWishlistToggle={toggleWishlist}
                  showDeliveryIcon={showDeliveryDate}
                  onClick={() => handleProductClick(item)}
                />
              </Box>
            ))
          )}
        </ProductGrid>
      )}
    </Box>
  );
};

export default JewelryListing;
