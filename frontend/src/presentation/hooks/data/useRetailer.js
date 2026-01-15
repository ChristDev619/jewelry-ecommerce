/**
 * useRetailer Hook
 * Custom hook for fetching retailer data
 */

import { useQuery } from '@apollo/client';
import { GET_RETAILER_BY_SLUG } from '../../../infrastructure/graphql/queries';
import { RetailerMapper } from '../../../infrastructure/mappers';
import { useMemo } from 'react';

export function useRetailer(slug) {
  const { data, loading, error, refetch } = useQuery(GET_RETAILER_BY_SLUG, {
    variables: { slug },
    skip: !slug,
  });

  const retailer = useMemo(() => {
    if (!data?.retailers || data.retailers.length === 0) {
      return null;
    }
    return RetailerMapper.toDomain(data.retailers[0]);
  }, [data]);

  return {
    retailer,
    loading,
    error,
    refetch,
  };
}

