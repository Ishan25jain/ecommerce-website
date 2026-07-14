import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { CartProvider } from './shop/context/CartContext';
import { WishlistProvider } from './shop/context/WishlistContext';
import { OrdersProvider } from './shop/context/OrdersContext';
import { useLocalStorage } from './hooks/useLocalStorage';


import TodoPage from './TodoPage';
import WatchList from './watchList';
import Register from './Register';
import Login from './Login';
import Shop from './shop/Shop';
import ProductDetail from './shop/ProductDetail';
import Cart from './shop/Cart';
import CategoryProducts from './shop/CategoryProducts';
import SearchResults from './shop/SearchResults';
import Account from './Account';
import AccountOverview from './AccountOverview';
import PersonalDetails from './PersonalDetails';
import AddressBook from './AddressBook';
import OrderHistory from './OrderHistory';
import Wishlist from './shop/wishlist';

function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem('isLoggedIn') === 'true'
  );

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  return (
    <CartProvider>
      <WishlistProvider>
        <OrdersProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
          closeOnClick
          draggable
          pauseOnHover
        />
        <Routes>
            <Route path="/" element={<Navigate to="/shop" replace />} />
            <Route
              path="/todo"
              element={
                isLoggedIn ? (
                  <TodoPage theme={theme} toggleTheme={toggleTheme} setIsLoggedIn={setIsLoggedIn} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />  
          <Route
            path="/watches"
            element={
              isLoggedIn ? (
                <WatchList theme={theme} toggleTheme={toggleTheme} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/shop" element={<Shop />} />
          <Route path='/shop/wishlist' element={<Wishlist />} />
          <Route path="/shop/product/:id" element={<ProductDetail />} />
          <Route path="/shop/category/:categoryName" element={<CategoryProducts />} />
          <Route path="/shop/search" element={<SearchResults />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account setIsLoggedIn={setIsLoggedIn} />}>
          
            <Route index element={<AccountOverview />} />
            <Route path="personal-details" element={<PersonalDetails />} />
            <Route path="address-book" element={<AddressBook />} />
            <Route path="order-history" element={<OrderHistory />} />
            <Route path="wishlist" element={<Wishlist />} />
          </Route>
          <Route path="*" element={<h1 style={{ padding: '40px' }}>404 — Page not found</h1>} />
        </Routes>
        </OrdersProvider>
      </WishlistProvider>
    </CartProvider>
    
  );
}

export default App;