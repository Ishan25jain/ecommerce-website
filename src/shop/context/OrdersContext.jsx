import { useLocalStorage } from '../../hooks/useLocalStorage';
import { OrdersContext } from './orders-context';

const ORDER_SEQ_KEY = 'orderIdSeq';

// Generates short, human-friendly, sequential order numbers like ORD-000001,
// ORD-000002, etc. The counter is kept in its own localStorage key (separate
// from the orders list) so numbers keep incrementing even if older orders
// are deleted later.
function getNextOrderId() {
  let seq = 1;
  try {
    const stored = parseInt(localStorage.getItem(ORDER_SEQ_KEY), 10);
    seq = Number.isFinite(stored) ? stored + 1 : 1;
  } catch (err) {
    console.error('Error reading order sequence from localStorage:', err);
  }

  try {
    localStorage.setItem(ORDER_SEQ_KEY, String(seq));
  } catch (err) {
    console.error('Error saving order sequence to localStorage:', err);
  }

  return 'ORD-' + String(seq).padStart(6, '0');
}

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useLocalStorage('orders', []);

  const addOrder = (orderData) => {
    const newOrder = {
      id: getNextOrderId(),
      date: new Date().toISOString(),
      status: 'Confirmed',
      ...orderData, // expects: items, total, mobile, address
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const deleteOrder = (orderId) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  const clearAllOrders = () => setOrders([]);

  return (
    <OrdersContext.Provider value={{ orders, addOrder, deleteOrder, clearAllOrders }}>
      {children}
    </OrdersContext.Provider>
  );
}