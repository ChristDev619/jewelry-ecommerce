/**
 * Product Detail Page
 * Single product view with full details and size selection
 */

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductDetail } from '../../hooks/data';
import SizeSelector from '../../components/product/SizeSelector';
import styles from './ProductDetail.module.css';

function ProductDetail() {
  const { productSlug } = useParams();
  const { product, loading, error } = useProductDetail(productSlug);
  const [selectedSize, setSelectedSize] = useState(null);

  // Auto-select first available size when product loads
  useEffect(() => {
    if (product?.hasMultipleSizes && !selectedSize) {
      const firstAvailable = product.availableSizes[0];
      if (firstAvailable) {
        setTimeout(() => {
          setSelectedSize(firstAvailable);
        }, 0);
      }
    }
  }, [product, selectedSize]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading product...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Error loading product: {error.message}</div>
        <Link to="/" className={styles.backLink}>← Back to products</Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Product not found</div>
        <Link to="/" className={styles.backLink}>← Back to products</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>← Back to products</Link>

      <div className={styles.productDetail}>
        <div className={styles.imageSection}>
          <div className={styles.mainImage}>
            {product.images && product.images.length > 0 ? (
              <img src={product.images[0]} alt={product.name} />
            ) : (
              <div className={styles.placeholderImage}>No Image</div>
            )}
          </div>
        </div>

        <div className={styles.detailsSection}>
          <h1 className={styles.productName}>{product.name}</h1>
          
          {/* Dynamic Price Display */}
          <div className={styles.priceSection}>
            {selectedSize && selectedSize.price !== product.price && (
              <span className={styles.originalPrice}>
                ${product.price.toLocaleString()}
              </span>
            )}
            <span className={styles.price}>
              ${(selectedSize ? selectedSize.price : product.price).toLocaleString()}
            </span>
          </div>

          {/* Badges */}
          <div className={styles.badges}>
            {product.isNew && <span className={styles.badge}>New Arrival</span>}
            
            {/* Dynamic availability based on size selection */}
            {selectedSize ? (
              <span 
                className={`
                  ${styles.badge} 
                  ${selectedSize.available ? styles.inStock : styles.outOfStock}
                `}
              >
                {selectedSize.availabilityMessage}
              </span>
            ) : product.inStock ? (
              <span className={`${styles.badge} ${styles.inStock}`}>In Stock</span>
            ) : (
              <span className={`${styles.badge} ${styles.outOfStock}`}>Out of Stock</span>
            )}
          </div>

          {/* Size Selector - Only show for products with size variants */}
          {product.hasMultipleSizes && (
            <div className={styles.sizeSection}>
              <h3 className={styles.sectionTitle}>Select Size</h3>
              <SizeSelector
                sizes={product.sizeVariants}
                selectedSize={selectedSize?.size}
                onSizeChange={(size) => {
                  const variant = product.getSizeByValue(size);
                  setSelectedSize(variant);
                }}
                disabled={loading}
              />
            </div>
          )}

          {product.description && (
            <div className={styles.description}>
              <h2>Description</h2>
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          )}

          <div className={styles.specifications}>
            <h2>Specifications</h2>
            <ul>
              {product.metalName && (
                <li><strong>Metal:</strong> {product.metalName}</li>
              )}
              {product.styleName && (
                <li><strong>Style:</strong> {product.styleName}</li>
              )}
              {product.specifications?.weight && (
                <li><strong>Weight:</strong> {product.specifications.weight}</li>
              )}
              {product.specifications?.diamonds && (
                <li><strong>Diamonds:</strong> {product.specifications.diamonds}</li>
              )}
              {product.specifications?.width && (
                <li><strong>Width:</strong> {product.specifications.width}</li>
              )}
              {product.sku && (
                <li><strong>SKU:</strong> {product.sku}</li>
              )}
            </ul>
          </div>

          {product.retailer && (
            <div className={styles.retailer}>
              <h2>Sold By</h2>
              <Link 
                to={`/retailers/${product.retailer.slug}`}
                className={styles.retailerLink}
              >
                {product.retailer.name}
              </Link>
            </div>
          )}

          {/* Dynamic Delivery Information */}
          <div className={styles.delivery}>
            <div className={styles.deliveryIcon}>📦</div>
            <div className={styles.deliveryText}>
              {selectedSize ? (
                <>
                  <strong>
                    {selectedSize.available 
                      ? `Ships in ${selectedSize.deliveryDays} days`
                      : `Made to order - ${selectedSize.deliveryDays} days`
                    }
                  </strong>
                  {selectedSize.stockQuantity > 0 && selectedSize.stockQuantity <= 2 && (
                    <span className={styles.lowStockWarning}>
                      Only {selectedSize.stockQuantity} left in stock!
                    </span>
                  )}
                </>
              ) : (
                <strong>Estimated delivery: {product.deliveryDays} days</strong>
              )}
            </div>
          </div>

          {/* Add to Cart Button - Disabled if size required but not selected */}
          <button 
            className={styles.addToCartButton}
            disabled={product.hasMultipleSizes && (!selectedSize || !selectedSize.available)}
            onClick={() => {
              if (selectedSize) {
                alert(`Added to cart:\n${product.name}\nSize: ${selectedSize.size}\nPrice: $${selectedSize.price.toLocaleString()}`);
              } else {
                alert(`Added to cart:\n${product.name}\nPrice: ${product.formattedPrice}`);
              }
            }}
          >
            {product.hasMultipleSizes && !selectedSize 
              ? 'Select a Size'
              : product.hasMultipleSizes && !selectedSize.available
              ? 'Size Unavailable'
              : 'Add to Cart'
            }
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

