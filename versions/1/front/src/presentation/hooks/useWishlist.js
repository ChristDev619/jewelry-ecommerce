import { useCallback } from 'react';
import useStore from '../store/store';

/**
 * Custom Hook: useWishlist
 * Manages wishlist operations
 */
const useWishlist = () => {
  const { wishlist, toggleWishlist, isInWishlist, getWishlistCount } = useStore();

  const handleWishlistToggle = useCallback(
    (itemId) => {
      toggleWishlist(itemId);
    },
    [toggleWishlist]
  );

  const checkIsWishlisted = useCallback(
    (itemId) => {
      return isInWishlist(itemId);
    },
    [isInWishlist]
  );

  return {
    wishlist,
    toggleWishlist: handleWishlistToggle,
    isInWishlist: checkIsWishlisted,
    wishlistCount: getWishlistCount(),
  };
};

export default useWishlist;

