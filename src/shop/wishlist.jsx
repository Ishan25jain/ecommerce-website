import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from './context/WishlistContext';
import { CartContext } from './context/CartContext';
import { toast } from 'react-toastify';
import './wishlist.css';

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const [quantities, setQuantities] = useState({});

  const getQty = (id) => quantities[id] || 1;

  const changeQty = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, getQty(id) + delta)
    }));
  };

  const handleRemove = (productId, productName) => {
    removeFromWishlist(productId);
    toast.success(`${productName} removed from wishlist!`);
  };

  const handleAddToBag = (item) => {
    const qty = getQty(item.id);
    addToCart(item, qty);
    toast.success(`${item.title} added to bag!`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wl-empty">
        <h2>Your Wishlist is Empty</h2>
        <p>Tap the heart on any product to save it here</p>
        <Link to="/shop" className="btn-back-to-shop">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="wl-page">
      <Link to="/shop" className="back-link">
        ← Back to Shop
      </Link>
      <h1 className="account-overview-title">Wishlist</h1>

      <ul className="wl-list">
        {wishlistItems.map((item) => {
          const hasDiscount = !!item.discountPercentage;
          const discountedPrice = hasDiscount
            ? (item.price * (1 - item.discountPercentage / 100)).toFixed(0)
            : item.price;

          return (
            <li key={item.id} className="wl-item">
              <div className="wl-item-media">
                <Link to={`/shop/product/${item.id}`} className="wl-item-image">
                  <img src={item.thumbnail} alt={item.title} />
                </Link>
                <button
                  className="wl-remove-btn"
                  onClick={() => handleRemove(item.id, item.title)}
                  aria-label="Remove from wishlist"
                >
                  🗑
                </button>
              </div>

              <div className="wl-item-info">
                <Link to={`/shop/product/${item.id}`} className="wl-item-title">
                  {item.title}
                </Link>

                <div className="wl-price-row">
                  {hasDiscount && (
                    <span className="wl-original-price">${item.price}</span>
                  )}
                  <span className="wl-current-price">${discountedPrice}</span>
                  {hasDiscount && (
                    <span className="wl-discount-badge">
                      -{Math.round(item.discountPercentage)}%
                    </span>
                  )}
                </div>

                {item.color && (
                  <p className="wl-meta">color: {item.color.toUpperCase()}</p>
                )}
                {item.size && <p className="wl-meta">size: {item.size}</p>}
              </div>

              <div className="wl-item-actions">
                <div className="wl-qty">
                  <button onClick={() => changeQty(item.id, -1)} aria-label="Decrease quantity">−</button>
                  <span>{getQty(item.id)}</span>
                  <button onClick={() => changeQty(item.id, 1)} aria-label="Increase quantity">+</button>
                </div>

                <button
                  className="wl-add-to-bag"
                  onClick={() => handleAddToBag(item)}
                >
                  ADD TO BAG
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Wishlist;