import { useState } from 'react'

function formatDate(isoString) {
  try {
    return new Date(isoString).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  } catch {
    return isoString
  }
}

function OrderItemRow({ item }) {
  const hasDiscount = !!item.discountPercentage
  const unitPrice = hasDiscount
    ? Math.round(item.price * (1 - item.discountPercentage / 100))
    : item.price

  return (
    <div className="oh-item-row">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="oh-item-thumb"
      />
      <div className="oh-item-info">
        <p className="oh-item-name">{item.title}</p>
        {(item.color || item.size) && (
          <p className="oh-item-meta">
            {item.color && <>Color: {item.color.toUpperCase()} </>}
            {item.size && <>Size: {item.size}</>}
          </p>
        )}
        <p className="oh-item-meta">Qty: {item.quantity}</p>
      </div>
      <span className="oh-item-price">${unitPrice * item.quantity}</span>
    </div>
  )
}

function OrderCard({ order }) {
  const hasAddress = order.address && (order.address.address1 || order.address.city)

  return (
    <li className="oh-order-card">
      <div className="oh-order-card-header">
        <span className="oh-order-id">Order #{order.id}</span>
        <span className="oh-order-status">{order.status}</span>
      </div>
      <p className="oh-order-date">{formatDate(order.date)}</p>

      {Array.isArray(order.items) && order.items.length > 0 && (
        <div className="oh-item-list">
          {order.items.map((item) => (
            <OrderItemRow key={item.id} item={item} />
          ))}
        </div>
      )}

      <div className="oh-order-divider" />

      <div className="oh-order-details">
        {order.mobile && (
          <div className="oh-detail-row">
            <span className="oh-detail-label">Contact</span>
            <span className="oh-detail-value">+91 {order.mobile}</span>
          </div>
        )}

        {hasAddress && (
          <div className="oh-detail-row">
            <span className="oh-detail-label">Delivery Address</span>
            <span className="oh-detail-value">
              {order.address.fullName && <>{order.address.fullName}, </>}
              {order.address.address1}
              {order.address.address2 ? `, ${order.address.address2}` : ''}
              {order.address.city ? `, ${order.address.city}` : ''}
              {order.address.state ? `, ${order.address.state}` : ''}
              {order.address.pincode ? ` - ${order.address.pincode}` : ''}
            </span>
          </div>
        )}
      </div>

      <p className="oh-order-total">Total: ${order.total}</p>
    </li>
  )
}

function OrderHistory() {
  const [orders] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('orders')) || []
      return Array.isArray(saved) ? saved : []
    } catch {
      return []
    }
  })

  return (
    <div className="oh-page">
      <h1 className="account-overview-title">Order History</h1>

      {orders.length === 0 ? (
        <p className="oh-empty">This list is empty</p>
      ) : (
        <ul className="oh-order-list">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default OrderHistory