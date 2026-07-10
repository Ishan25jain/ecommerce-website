import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './context/CartContext';
import { toast } from 'react-toastify';
import './Cart.css';
import NavBar from './Navbar';

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
    <Link to="/shop" className="btn-back-to-shop">
      ← Back to Shop
    </Link>
    <h1>Shopping Cart</h1>

      <div className="cart-container">
        <div className="cart-items-section">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.thumbnail} alt={item.title} className="cart-item-image" />

              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p className="cart-item-brand">{item.brand}</p>
                <p className="cart-item-price">${item.price}</p>
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
              >
                Remove It
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cart;