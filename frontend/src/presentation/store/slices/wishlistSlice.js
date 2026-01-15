/**
 * Wishlist Slice
 * Manages wishlist state
 */

export const createWishlistSlice = (set, get) => ({
  wishlist: [],

  // Actions
  addToWishlist: (itemId) =>
    set((state) => ({
      wishlist: [...state.wishlist, itemId],
    })),

  removeFromWishlist: (itemId) =>
    set((state) => ({
      wishlist: state.wishlist.filter((id) => id !== itemId),
    })),

  toggleWishlist: (itemId) =>
    set((state) => {
      const isInWishlist = state.wishlist.includes(itemId);
      return {
        wishlist: isInWishlist
          ? state.wishlist.filter((id) => id !== itemId)
          : [...state.wishlist, itemId],
      };
    }),

  isInWishlist: (itemId) => {
    const state = get();
    return state.wishlist.includes(itemId);
  },

  clearWishlist: () => set({ wishlist: [] }),

  getWishlistCount: () => {
    const state = get();
    return state.wishlist.length;
  },
});

