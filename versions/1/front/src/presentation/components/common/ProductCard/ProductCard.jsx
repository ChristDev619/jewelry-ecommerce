import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { FaHeart, FaRegHeart, FaTruck } from 'react-icons/fa';
import { formatPrice } from '../../../../shared/utils/date.utils';
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
    <Card className={styles.productCard} onClick={onClick} elevation={0}>
      {/* Delivery Icon */}
      {showDeliveryIcon && (
        <Box className={`${styles.iconContainer} ${styles.deliveryIcon}`}>
          <FaTruck color="#8B7355" size={16} />
        </Box>
      )}

      {/* Wishlist Icon */}
      <Box
        onClick={handleWishlistClick}
        className={`${styles.iconContainer} ${styles.wishlistIcon}`}
      >
        {isWishlisted ? (
          <FaHeart color="#D32F2F" size={16} />
        ) : (
          <FaRegHeart color="#666" size={16} />
        )}
      </Box>

      {/* Product Image */}
      <Box className={styles.imageContainer}>
        <CardMedia
          component="img"
          image={item.images[0]}
          alt={item.name}
          className={styles.productImage}
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
        <Box className={styles.contentTop}>
          {/* Product Name */}
          <Typography className={styles.title}>
            {item.name}
          </Typography>

          {/* Price */}
          <Typography className={styles.price}>
            {formatPrice(item.price)}
          </Typography>
        </Box>

        {/* New Badge */}
        <Box className={styles.badgeContainer}>
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
