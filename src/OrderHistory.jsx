import { useState, useEffect } from 'react'

function OrderHistory() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('orders')) || []
      setOrders(Array.isArray(saved) ? saved : [])
    } catch {
      setOrders([])
    }
  }, [])

  return (
    <div className="oh-page">
      <h1 className="account-overview-title">Order History</h1>

      {orders.length === 0 ? (
        <p className="oh-empty">This list is empty</p>
      ) : (
        <ul className="oh-order-list">
          {orders.map((order, index) => (
            <li key={index} className="oh-order-card">
              <div className="oh-order-card-header">
                <span className="oh-order-id">Order #{order.id}</span>
                <span className="oh-order-status">{order.status}</span>
              </div>
              <p className="oh-order-date">{order.date}</p>
              <p className="oh-order-total">Total: ₹{order.total}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default OrderHistory