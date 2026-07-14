import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './context/CartContext';
import { toast } from 'react-toastify';
import './Cart.css';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const handleRemove = (productId, name) => {
    removeFromCart(productId);
    toast.success(`${name} removed from cart!`);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  // Calculate totals
  const calculateTotals = () => {
    let bagTotal = 0;
    let totalDiscount = 0;

    cartItems.forEach((item) => {
      const hasDiscount = !!item.discountPercentage;
      const originalPrice = item.price * item.quantity;
      const discountedPrice = hasDiscount
        ? Math.round(item.price * (1 - item.discountPercentage / 100)) * item.quantity
        : originalPrice;

      bagTotal += discountedPrice;
      totalDiscount += originalPrice - discountedPrice;
    });

    const shippingCharges = bagTotal > 500 ? 0 : 100; // Free shipping above 500
    const prepaidDiscount = 20; // Fixed prepaid discount
    const totalAmount = bagTotal - totalDiscount - prepaidDiscount + shippingCharges;

    return {
      bagTotal,
      totalDiscount,
      shippingCharges,
      prepaidDiscount,
      totalAmount,
    };
  };

  const totals = calculateTotals();

  const handleProceedCheckout = () => {
    setShowCheckoutModal(true);
    toast.info('Opening checkout...');
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
        {/* LEFT SECTION: CART ITEMS */}
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

        {/* RIGHT SECTION: ORDER SUMMARY */}
        <div className="order-summary-section">
          <div className="order-summary-card">
            <h2 className="order-summary-title">Order Summary</h2>

            {/* Summary Items */}
            <div className="summary-item">
              <span className="summary-label">Bag Total</span>
              <span className="summary-value">₹{totals.bagTotal}</span>
            </div>

            {totals.totalDiscount > 0 && (
              <div className="summary-item discount">
                <span className="summary-label">Discount on MRP</span>
                <span className="summary-value">−₹{totals.totalDiscount}</span>
              </div>
            )}

            {totals.prepaidDiscount > 0 && (
              <div className="summary-item discount">
                <span className="summary-label">Prepaid Discount</span>
                <span className="summary-value">−₹{totals.prepaidDiscount}</span>
              </div>
            )}

            <div className="summary-item">
              <span className="summary-label">Shipping Charges</span>
              <span className={`summary-value ${totals.shippingCharges === 0 ? 'free' : ''}`}>
                {totals.shippingCharges === 0 ? 'FREE' : `₹${totals.shippingCharges}`}
              </span>
            </div>

            {/* Divider */}
            <div className="summary-divider"></div>

            {/* Total */}
            <div className="summary-item total">
              <span className="summary-label">Total Amount</span>
              <span className="summary-value-total">₹{totals.totalAmount}</span>
            </div>

            {/* Info Message */}
            <p className="summary-info">FREE Shipping Available</p>

            {/* Proceed Button */}
            <button 
              className="btn-proceed-checkout"
              onClick={handleProceedCheckout}
            >
              🔒 PROCEED TO SECURE CHECKOUT
            </button>

            <Link to="/shop" className="btn-continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;