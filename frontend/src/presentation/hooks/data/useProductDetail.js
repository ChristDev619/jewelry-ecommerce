/**
 * useProductDetail Hook
 * Custom hook for fetching a single product by slug
 */

import { useQuery } from '@apollo/client';
import { GET_PRODUCT_BY_SLUG } from '../../../infrastructure/graphql/queries';
import { ProductMapper } from '../../../infrastructure/mappers';
import { useMemo } from 'react';

export function useProductDetail(slug) {
  const { data, loading, error, refetch } = useQuery(GET_PRODUCT_BY_SLUG, {
    variables: { slug },
    skip: !slug, // Don't run query if no slug provided
  });

  const product = useMemo(() => {
    if (!data?.products || data.products.length === 0) {
      return null;
    }
    return ProductMapper.toDomain(data.products[0]);
  }, [data]);

  return {
    product,
    loading,
    error,
    refetch,
  };
}

