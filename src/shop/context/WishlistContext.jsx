import { createContext } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useLocalStorage('wishlistItems', []);

  const isInWishlist = (productId) => wishlistItems.some(item => item.id === productId);

  const addToWishlist = (product) => {
    setWishlistItems(prev =>
      prev.some(item => item.id === product.id) ? prev : [...prev, product]
    );
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  const toggleWishlist = (product) => {
    isInWishlist(product.id)
      ? removeFromWishlist(product.id)
      : addToWishlist(product);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, isInWishlist, addToWishlist, removeFromWishlist, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
