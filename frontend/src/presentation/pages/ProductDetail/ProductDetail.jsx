/**
 * Product Detail Page
 * Single product view with full details
 */

import { useParams, Link } from 'react-router-dom';
import { useProductDetail } from '../../hooks/data';
import styles from './ProductDetail.module.css';

function ProductDetail() {
  const { retailerSlug, productSlug } = useParams();
  const { product, loading, error } = useProductDetail(productSlug);

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
          
          <div className={styles.price}>{product.formattedPrice}</div>

          <div className={styles.badges}>
            {product.isNew && <span className={styles.badge}>New Arrival</span>}
            {product.inStock ? (
              <span className={`${styles.badge} ${styles.inStock}`}>In Stock</span>
            ) : (
              <span className={`${styles.badge} ${styles.outOfStock}`}>Out of Stock</span>
            )}
          </div>

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

          <div className={styles.delivery}>
            <p>Estimated delivery: {product.deliveryDays} days</p>
          </div>

          <button className={styles.addToCartButton}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

