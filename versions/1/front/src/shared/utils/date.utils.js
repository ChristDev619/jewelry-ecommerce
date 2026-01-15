import { format, addDays } from 'date-fns';

/**
 * Calculate delivery date based on current date and delivery days
 * @param {number} deliveryDays - Number of days for delivery
 * @returns {string} Formatted delivery date
 */
export const calculateDeliveryDate = (deliveryDays) => {
  const deliveryDate = addDays(new Date(), deliveryDays);
  return format(deliveryDate, 'EEE MMM dd, yyyy');
};

/**
 * Format price to USD currency
 * @param {number} price - Price value
 * @returns {string} Formatted price
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

