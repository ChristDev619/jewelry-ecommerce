/**
 * useProducts Hook
 * Custom hook for fetching products with filters
 */

import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../../infrastructure/graphql/queries';
import { ProductMapper } from '../../../infrastructure/mappers';
import { useMemo } from 'react';

export function useProducts(options = {}) {
  const {
    filters = {},
    sort = ['popularity:desc'],
    pagination = { page: 1, pageSize: 25 },
  } = options;

  // Build GraphQL filters
  const graphqlFilters = useMemo(() => buildFilters(filters), [filters]);

  const { data, loading, error, refetch, fetchMore } = useQuery(GET_PRODUCTS, {
    variables: {
      filters: graphqlFilters,
      sort,
      pagination,
    },
    fetchPolicy: 'cache-and-network',
  });

  const products = useMemo(() => {
    if (!data?.products_connection?.nodes) return [];
    return ProductMapper.toDomainList(data.products_connection.nodes);
  }, [data]);

  const paginationData = useMemo(() => {
    if (!data?.products_connection?.pageInfo) return null;
    return ProductMapper.extractPagination(data.products_connection.pageInfo);
  }, [data]);

  return {
    products,
    pagination: paginationData,
    loading,
    error,
    refetch,
    fetchMore,
  };
}

// Helper to build GraphQL filters
function buildFilters(filters) {
  const graphqlFilters = { and: [] };

  if (filters.category) {
    graphqlFilters.and.push({ category: { slug: { eq: filters.category } } });
  }

  if (filters.metal) {
    graphqlFilters.and.push({ metal: { code: { eq: filters.metal } } });
  }

  if (filters.style) {
    graphqlFilters.and.push({ style: { code: { eq: filters.style } } });
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    const priceFilter = {};
    if (filters.minPrice !== undefined) priceFilter.gte = filters.minPrice;
    if (filters.maxPrice !== undefined) priceFilter.lte = filters.maxPrice;
    graphqlFilters.and.push({ price: priceFilter });
  }

  if (filters.inStock !== undefined) {
    graphqlFilters.and.push({ inStock: { eq: filters.inStock } });
  }

  if (filters.isNew !== undefined) {
    graphqlFilters.and.push({ isNew: { eq: filters.isNew } });
  }

  if (filters.birthstoneMonth) {
    graphqlFilters.and.push({ birthstoneMonth: { month: { eq: filters.birthstoneMonth } } });
  }

  return graphqlFilters.and.length === 0 ? null : graphqlFilters;
}

