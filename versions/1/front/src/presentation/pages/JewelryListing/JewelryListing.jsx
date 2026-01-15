import { Box, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import Header from '../../components/layout/Header';
import FilterBar from '../../components/layout/FilterBar';
import ProductGrid from '../../components/layout/ProductGrid';
import ProductCard from '../../components/common/ProductCard';
import useJewelryFilters from '../../hooks/useJewelryFilters';
import useWishlist from '../../hooks/useWishlist';
import useStore from '../../store/store';

/**
 * JewelryListing Page
 * Main page component for displaying jewelry with filters
 */
const JewelryListing = () => {
  const { jewelry, count, maxDeliveryDays } = useJewelryFilters();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const showDeliveryDate = useStore((state) => state.showDeliveryDate);

  const handleProductClick = (item) => {
    console.log('Product clicked:', item);
    // Future: Navigate to product detail page
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
      <FilterBar resultCount={count} maxDeliveryDays={maxDeliveryDays} />

      {/* Product Grid */}
      <ProductGrid>
        {jewelry.length === 0 ? (
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
              No rings found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your filters to see more results
            </Typography>
          </Box>
        ) : (
          // Product Cards
          jewelry.map((item, index) => (
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

      {/* Loading State (for future API integration) */}
      {/* {isLoading && (
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
      )} */}
    </Box>
  );
};

export default JewelryListing;
