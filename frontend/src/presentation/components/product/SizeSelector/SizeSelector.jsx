/**
 * SizeSelector Component
 * Displays available sizes for jewelry products with visual feedback
 * Shows availability status and allows size selection
 */

import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SizeSelector.module.css';

const SizeSelector = ({ 
  sizes = [], 
  selectedSize = null, 
  onSizeChange, 
  disabled = false 
}) => {
  const [hoveredSize, setHoveredSize] = useState(null);

  if (!sizes || sizes.length === 0) {
    return null;
  }

  const handleSizeClick = (size) => {
    if (disabled || !size.available) return;
    onSizeChange(size.size);
  };

  return (
    <div className={styles.sizeSelector}>
      <div className={styles.sizeGrid}>
        {sizes.map((sizeVariant) => {
          const isSelected = selectedSize === sizeVariant.size;
          const isHovered = hoveredSize === sizeVariant.size;
          const isAvailable = sizeVariant.available;
          const isDisabled = disabled || !isAvailable;

          return (
            <button
              key={sizeVariant.size}
              className={`
                ${styles.sizeButton}
                ${isSelected ? styles.selected : ''}
                ${isDisabled ? styles.disabled : ''}
                ${isHovered && !isDisabled ? styles.hovered : ''}
              `}
              onClick={() => handleSizeClick(sizeVariant)}
              onMouseEnter={() => setHoveredSize(sizeVariant.size)}
              onMouseLeave={() => setHoveredSize(null)}
              disabled={isDisabled}
              aria-label={`Size ${sizeVariant.size}`}
              aria-pressed={isSelected}
              title={
                !isAvailable 
                  ? `Size ${sizeVariant.size} - ${sizeVariant.availabilityMessage}` 
                  : `Size ${sizeVariant.size} - $${sizeVariant.price.toLocaleString()}`
              }
            >
              <span className={styles.sizeLabel}>{sizeVariant.size}</span>
              
              {/* Availability indicator */}
              {!isAvailable && (
                <span className={styles.unavailableMark}>×</span>
              )}
              
              {/* Stock indicator for low stock */}
              {isAvailable && sizeVariant.stockQuantity > 0 && sizeVariant.stockQuantity <= 2 && (
                <span className={styles.lowStockDot} title="Low stock">•</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected size info */}
      {selectedSize && (
        <div className={styles.selectedInfo}>
          {(() => {
            const selected = sizes.find(s => s.size === selectedSize);
            if (!selected) return null;

            return (
              <div className={styles.infoContent}>
                <div className={styles.priceInfo}>
                  <span className={styles.label}>Price:</span>
                  <span className={styles.value}>${selected.price.toLocaleString()}</span>
                </div>
                <div className={styles.availabilityInfo}>
                  <span 
                    className={`
                      ${styles.availabilityBadge} 
                      ${selected.stockQuantity > 5 ? styles.inStock : ''}
                      ${selected.stockQuantity > 0 && selected.stockQuantity <= 5 ? styles.lowStock : ''}
                      ${selected.stockQuantity === 0 ? styles.madeToOrder : ''}
                    `}
                  >
                    {selected.availabilityMessage}
                  </span>
                </div>
                <div className={styles.deliveryInfo}>
                  <span className={styles.label}>Delivery:</span>
                  <span className={styles.value}>
                    {selected.deliveryDays <= 3 
                      ? `${selected.deliveryDays} days` 
                      : `${selected.deliveryDays} days (${selected.availabilityMessage})`
                    }
                  </span>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Size guide link */}
      <div className={styles.sizeGuide}>
        <button 
          type="button" 
          className={styles.sizeGuideLink}
          onClick={(e) => {
            e.preventDefault();
            // In a real app, this would open a size guide modal
            alert('Size Guide:\n\n' + 
              'US Ring Sizes:\n' +
              '5 - 15.7mm diameter\n' +
              '6 - 16.5mm diameter\n' +
              '7 - 17.3mm diameter\n' +
              '8 - 18.2mm diameter\n' +
              '9 - 19.0mm diameter\n\n' +
              'Tip: Measure an existing ring that fits well!'
            );
          }}
        >
          📏 Size Guide
        </button>
      </div>
    </div>
  );
};

SizeSelector.propTypes = {
  sizes: PropTypes.arrayOf(
    PropTypes.shape({
      size: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      available: PropTypes.bool,
      stockQuantity: PropTypes.number,
      availabilityMessage: PropTypes.string,
      deliveryDays: PropTypes.number,
      sku: PropTypes.string,
    })
  ).isRequired,
  selectedSize: PropTypes.string,
  onSizeChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default SizeSelector;

