import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { FaHeart, FaRegHeart, FaTruck } from 'react-icons/fa';
import { formatPrice } from '../../../../shared/utils/date.utils';
import OptimizedImage from '../OptimizedImage';
import styles from './ProductCard.module.css';

/**
 * ProductCard Component
 * Reusable card component for displaying jewelry items
 */
const ProductCard = ({ 
  item, 
  isWishlisted = false, 
  onWishlistToggle, 
  showDeliveryIcon = true,
  onClick 
}) => {
  const handleWishlistClick = (e) => {
    e.stopPropagation();
    onWishlistToggle?.(item.id);
  };

  return (
    <Card 
      className={styles.productCard} 
      onClick={onClick} 
      elevation={0}
      role="article"
      aria-label={`${item.name} - ${formatPrice(item.price)}`}
    >
      {/* Delivery Icon */}
      {showDeliveryIcon && (
        <Box 
          className={`${styles.iconContainer} ${styles.deliveryIcon}`}
          aria-label="Fast delivery available"
          role="img"
        >
          <FaTruck color="#8B7355" size={16} aria-hidden="true" />
        </Box>
      )}

      {/* Wishlist Icon */}
      <IconButton
        onClick={handleWishlistClick}
        className={`${styles.iconContainer} ${styles.wishlistIcon}`}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        size="small"
      >
        {isWishlisted ? (
          <FaHeart color="#D32F2F" size={16} aria-hidden="true" />
        ) : (
          <FaRegHeart color="#666" size={16} aria-hidden="true" />
        )}
      </IconButton>

      {/* Product Image */}
      <Box className={styles.imageContainer}>
        <OptimizedImage
          src={item.images && item.images[0] || 'https://via.placeholder.com/400'}
          alt={`${item.name} - ${item.metal || ''} ${item.style || 'jewelry'}`}
          className={styles.productImage}
          loading="lazy"
        />

        {/* Multiple Metals Indicator */}
        {item.hasMultipleMetal && (
          <Box className={styles.metalsIndicator}>
            <Typography className={styles.metalsText}>
              3 Metals
            </Typography>
          </Box>
        )}
      </Box>

      <CardContent className={styles.content}>
        {/* Product Name */}
        <Typography className={styles.title}>
          {item.name}
        </Typography>

        {/* Price and Badge Row */}
        <Box className={styles.priceRow}>
          {/* Price */}
          <Typography className={styles.price}>
            {formatPrice(item.price)}
          </Typography>

          {/* New Badge */}
          {item.isNew && (
            <span className={styles.badge}>
              NEW
            </span>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
