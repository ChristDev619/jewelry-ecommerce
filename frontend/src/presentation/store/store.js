import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createFilterSlice } from './slices/filterSlice';
import { createWishlistSlice } from './slices/wishlistSlice';

/**
 * Global Store
 * Combines all slices using Zustand
 */
const useStore = create(
  devtools(
    persist(
      (set, get) => ({
        ...createFilterSlice(set, get),
        ...createWishlistSlice(set, get),
      }),
      {
        name: 'jewelry-store',
        partialize: (state) => ({
          wishlist: state.wishlist,
          sortBy: state.sortBy,
          showDeliveryDate: state.showDeliveryDate,
        }),
      }
    )
  )
);

export default useStore;

