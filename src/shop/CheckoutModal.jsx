import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CartContext } from './context/CartContext';
import { OrdersContext } from './context/orders-context';
import { formatPrice } from './utils/formatPrice';
import './CheckoutModal.css';

function CheckoutModal({ onClose, totals }) {
  const { cartItems, clearCart } = useContext(CartContext);
  const { addOrder } = useContext(OrdersContext);
  const navigate = useNavigate();

  const [placingOrder, setPlacingOrder] = useState(false);

  const handleConfirmPay = () => {
    if (placingOrder) return;
    setPlacingOrder(true);

    const order = {
      items: cartItems,
      total: totals.totalAmount,
    };

    // Simulate a brief payment-processing beat before confirming
    setTimeout(() => {
      addOrder(order);
      clearCart();
      toast.success('Order placed successfully!');
      onClose();
      navigate('/account/order-history');
    }, 900);
  };

  return (
    <div className="checkout-overlay" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="checkout-header">
          <h3 className="checkout-header-title">Confirm to Pay</h3>
          <button className="checkout-close-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        {/* Body */}
        <div className="checkout-body">
          {/* Product details */}
          <div className="checkout-product-list">
            {cartItems.map((item) => {
              const hasDiscount = !!item.discountPercentage;
              const discountedPrice = hasDiscount
                ? Math.round(item.price * (1 - item.discountPercentage / 100))
                : item.price;

              return (
                <div key={item.id} className="checkout-product-row">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="checkout-product-thumb"
                  />
                  <div className="checkout-product-info">
                    <p className="checkout-product-name">{item.title}</p>
                    {(item.color || item.size) && (
                      <p className="checkout-product-meta">
                        {item.color && <>Color: {item.color.toUpperCase()} </>}
                        {item.size && <>Size: {item.size}</>}
                      </p>
                    )}
                    <p className="checkout-product-meta">Qty: {item.quantity}</p>
                  </div>
                  <span className="checkout-product-price">
                    ${formatPrice(discountedPrice * item.quantity)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Total breakdown */}
          <div className="checkout-pay-total-card">
            <div className="checkout-pay-total-row">
              <span>Bag Total</span>
              <span>${formatPrice(totals.bagTotal)}</span>
            </div>
            {totals.prepaidDiscount > 0 && (
              <div className="checkout-pay-total-row checkout-free">
                <span>Prepaid Discount</span>
                <span>−${formatPrice(totals.prepaidDiscount)}</span>
              </div>
            )}
            <div className="checkout-pay-total-row">
              <span>Shipping</span>
              <span className={totals.shippingCharges === 0 ? 'checkout-free' : ''}>
                {totals.shippingCharges === 0 ? 'FREE' : `$${totals.shippingCharges}`}
              </span>
            </div>
            <div className="checkout-pay-total-divider" />
            <div className="checkout-pay-total-row checkout-pay-grand-total">
              <span>Total Amount</span>
              <span>${formatPrice(totals.totalAmount)}</span>
            </div>
          </div>

          <button
            className="checkout-pay-btn"
            onClick={handleConfirmPay}
            disabled={placingOrder}
          >
            {placingOrder ? 'Processing…' : `🔒 CONFIRM & PAY $${formatPrice(totals.totalAmount)}`}
          </button>
        </div>

        {/* Footer trust badges */}
        <div className="checkout-footer">
          <span>PCI DSS Certified</span>
          <span>·</span>
          <span>Secured Payments</span>
          <span>·</span>
          <span>Verified Merchant</span>
        </div>
      </div>
    </div>
  );
}

export default CheckoutModal;