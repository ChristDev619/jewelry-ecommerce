import { useMemo } from 'react';
import useStore from '../store/store';
import { applyFilters, sortJewelry } from '../../shared/utils/filter.utils';
import jewelryData from '../../infrastructure/data/jewelryData';

/**
 * Custom Hook: useJewelryFilters
 * Manages jewelry filtering and sorting logic
 */
const useJewelryFilters = () => {
  const { filters, sortBy } = useStore();

  // Apply filters and sorting
  const filteredAndSortedJewelry = useMemo(() => {
    let result = jewelryData;

    // Apply filters
    result = applyFilters(result, filters);

    // Apply sorting
    result = sortJewelry(result, sortBy);

    return result;
  }, [filters, sortBy]);

  // Get max delivery days from filtered results
  const maxDeliveryDays = useMemo(() => {
    if (filteredAndSortedJewelry.length === 0) return 7;
    return Math.max(...filteredAndSortedJewelry.map((item) => item.deliveryDays));
  }, [filteredAndSortedJewelry]);

  return {
    jewelry: filteredAndSortedJewelry,
    count: filteredAndSortedJewelry.length,
    maxDeliveryDays,
  };
};

export default useJewelryFilters;

