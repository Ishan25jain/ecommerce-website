import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './context/CartContext';
import { toast } from 'react-toastify';
import './Cart.css';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const handleRemove = (productId, name) => {
    removeFromCart(productId);
    toast.success(`${name} removed from cart!`);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  if (!cartItems.length) {
    return (
      <div className="cart-empty">
        <h2>Your Cart is Empty</h2>
        <p>Add items to your cart to get started</p>
        <Link to="/shop" className="btn-back-to-shop">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">Shopping Bag</h1>

      <div className="cart-container">
        <div className="cart-items-section">
          <div className="cart-items-header">
            <span>{cartItems.length} item{cartItems.length > 1 ? 's' : ''}</span>
            <span className="cart-header-qty">Quantity</span>
            <span className="cart-header-offer">Offer(s)</span>
          </div>

          {cartItems.map((item) => {
            const hasDiscount = !!item.discountPercentage;
            const discountedPrice = hasDiscount
              ? Math.round(item.price * (1 - item.discountPercentage / 100))
              : item.price;

            return (
              <div key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.title} className="cart-item-image" />

                <div className="cart-item-details">
                  <h3>{item.title}</h3>

                  <div className="cart-item-price-row">
                    {hasDiscount && (
                      <span className="cart-item-original-price">₹{item.price}</span>
                    )}
                    <span className="cart-item-price">₹{discountedPrice}</span>
                    {hasDiscount && (
                      <span className="cart-item-discount-badge">
                        {Math.round(item.discountPercentage)}% off
                      </span>
                    )}
                  </div>

                  {(item.color || item.size) && (
                    <p className="cart-item-meta">
                      {item.color && <>color: {item.color.toUpperCase()} </>}
                      {item.size && <>size: {item.size}</>}
                    </p>
                  )}
                </div>

                <div className="cart-item-quantity">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="qty-btn"
                  >
                    −
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>

                <button
                  className="cart-item-remove"
                  onClick={() => handleRemove(item.id, item.title)}
                  aria-label="Remove item"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Cart;