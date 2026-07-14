import { useLocalStorage } from '../../hooks/useLocalStorage';
import { OrdersContext } from './orders-context';

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useLocalStorage('orders', []);

  const addOrder = (orderData) => {
    const newOrder = {
      id: 'ORD' + Date.now(),
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