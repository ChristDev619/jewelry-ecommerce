/**
 * Filter utilities for jewelry listing
 */

/**
 * Apply filters to jewelry array
 * @param {Array} jewelry - Array of jewelry items
 * @param {Object} filters - Filter criteria
 * @returns {Array} Filtered jewelry array
 */
export const applyFilters = (jewelry, filters) => {
  let filtered = [...jewelry];

  // Filter by metal
  if (filters.metals && filters.metals.length > 0) {
    filtered = filtered.filter(item => filters.metals.includes(item.metal));
  }

  // Filter by style
  if (filters.styles && filters.styles.length > 0) {
    filtered = filtered.filter(item => filters.styles.includes(item.style));
  }

  // Filter by price range
  if (filters.priceRange) {
    const { min, max } = filters.priceRange;
    filtered = filtered.filter(item => item.price >= min && item.price <= max);
  }

  // Filter by birthstone month
  if (filters.birthstoneMonths && filters.birthstoneMonths.length > 0) {
    filtered = filtered.filter(item => 
      item.birthstoneMonth && filters.birthstoneMonths.includes(item.birthstoneMonth)
    );
  }

  // Filter by delivery date preference
  if (filters.maxDeliveryDays) {
    filtered = filtered.filter(item => item.deliveryDays <= filters.maxDeliveryDays);
  }

  return filtered;
};

/**
 * Sort jewelry array
 * @param {Array} jewelry - Array of jewelry items
 * @param {string} sortBy - Sort criteria
 * @returns {Array} Sorted jewelry array
 */
export const sortJewelry = (jewelry, sortBy) => {
  const sorted = [...jewelry];

  switch (sortBy) {
    case 'price_low_high':
      return sorted.sort((a, b) => a.price - b.price);
    
    case 'price_high_low':
      return sorted.sort((a, b) => b.price - a.price);
    
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    case 'popular':
      return sorted.sort((a, b) => b.popularity - a.popularity);
    
    case 'recommended':
    default:
      // Recommended: balance of popularity and newness
      return sorted.sort((a, b) => {
        const scoreA = a.popularity * 0.7 + (a.isNew ? 20 : 0);
        const scoreB = b.popularity * 0.7 + (b.isNew ? 20 : 0);
        return scoreB - scoreA;
      });
  }
};

/**
 * Count active filters
 * @param {Object} filters - Filter object
 * @returns {number} Number of active filters
 */
export const countActiveFilters = (filters) => {
  let count = 0;
  
  if (filters.metals?.length > 0) count += filters.metals.length;
  if (filters.styles?.length > 0) count += filters.styles.length;
  if (filters.priceRange) count += 1;
  if (filters.birthstoneMonths?.length > 0) count += filters.birthstoneMonths.length;
  
  return count;
};

