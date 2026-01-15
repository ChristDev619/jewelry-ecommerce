import useStore from '../store/store';

/**
 * Custom Hook: useJewelryFilters
 * Manages jewelry filter state from store and converts to GraphQL format
 */
const useJewelryFilters = () => {
  const { filters, sortBy, maxDeliveryDays } = useStore();

  // Convert store filters to GraphQL-compatible format
  const graphqlFilters = {};

  // Handle metal filters (array in store, but we need to send individual values or use OR logic)
  // For now, we'll take the first selected metal (or enhance to support multiple)
  if (filters.metals && filters.metals.length > 0) {
    graphqlFilters.metal = filters.metals[0]; // TODO: Support multiple metals with OR logic
  }

  // Handle style filters
  if (filters.styles && filters.styles.length > 0) {
    graphqlFilters.style = filters.styles[0]; // TODO: Support multiple styles with OR logic
  }

  // Handle price range
  if (filters.priceRange) {
    if (filters.priceRange.min !== undefined && filters.priceRange.min !== null) {
      graphqlFilters.minPrice = filters.priceRange.min;
    }
    if (filters.priceRange.max !== undefined && filters.priceRange.max !== null) {
      graphqlFilters.maxPrice = filters.priceRange.max;
    }
  }

  // Handle birthstone months
  if (filters.birthstoneMonths && filters.birthstoneMonths.length > 0) {
    graphqlFilters.birthstoneMonth = filters.birthstoneMonths[0]; // TODO: Support multiple months
  }

  // Calculate actual max delivery days from filters or default
  const calculatedMaxDeliveryDays = maxDeliveryDays || 14;

  return {
    filters: graphqlFilters,
    sortBy,
    maxDeliveryDays: calculatedMaxDeliveryDays,
  };
};

export default useJewelryFilters;
