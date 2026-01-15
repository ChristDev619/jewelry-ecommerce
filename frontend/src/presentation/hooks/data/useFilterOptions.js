/**
 * useFilterOptions Hook
 * Custom hook for fetching all filter options (categories, metals, styles, etc.)
 */

import { useQuery } from '@apollo/client';
import { GET_ALL_FILTERS } from '../../../infrastructure/graphql/queries';
import { useMemo } from 'react';

export function useFilterOptions() {
  const { data, loading, error } = useQuery(GET_ALL_FILTERS, {
    fetchPolicy: 'cache-first', // These don't change often
  });

  const filterOptions = useMemo(() => {
    if (!data) {
      return {
        categories: [],
        metals: [],
        styles: [],
        birthstones: [],
      };
    }

    return {
      categories: data.categories?.map(cat => ({
        id: cat.documentId,
        name: cat.name,
        slug: cat.slug,
        order: cat.order,
      })) || [],
      
      metals: data.metals?.map(metal => ({
        id: metal.documentId,
        name: metal.name,
        code: metal.code,
        slug: metal.slug,
        color: metal.color,
        order: metal.order,
      })) || [],
      
      styles: data.styles?.map(style => ({
        id: style.documentId,
        name: style.name,
        code: style.code,
        slug: style.slug,
        order: style.order,
      })) || [],
      
      birthstones: data.birthstones?.map(birthstone => ({
        id: birthstone.documentId,
        month: birthstone.month,
        name: birthstone.name,
        slug: birthstone.slug,
        color: birthstone.color,
      })) || [],
    };
  }, [data]);

  return {
    filterOptions,
    loading,
    error,
  };
}

