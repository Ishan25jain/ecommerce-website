
const ORDERS_KEY = "orders";

export function getOrders() {
  try {
    const data = localStorage.getItem(ORDERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Error reading orders from localStorage:", err);
    return [];
  }
}

export function saveOrder(order) {
  const orders = getOrders();

  const newOrder = {
    id: "ORD" + Date.now(),
    date: new Date().toISOString(),
    status: "Confirmed",
    ...order, // expects: items, total
  };

  const updated = [newOrder, ...orders];

  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Error saving order to localStorage:", err);
  }

  return newOrder;
}

export function deleteOrder(orderId) {
  const orders = getOrders();
  const updated = orders.filter((order) => order.id !== orderId);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  return updated;
}

export function clearAllOrders() {
  localStorage.removeItem(ORDERS_KEY);
}