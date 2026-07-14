import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from './context/CartContext';
import { WishlistContext } from './context/WishlistContext';

function NavBar() {
  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    navigate(`/shop/search?q=${encodeURIComponent(query)}`);
    closeSearch();
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      <nav className="navbar">
        <ul className="nav-links">
          <li>New Arrivals</li>
          <li>Mens</li>
          <li>Womens</li>
          <li>Footwear</li>
          <li className="nav-sale">Sale</li>
        </ul>

        <Link to="/shop" className="nav-logo">
          <span className="logo-text">PEPE JEANS</span>
          <span className="logo-sub">LONDON</span>
        </Link>

        <div className="nav-icons">
          <i className="ti ti-search" onClick={() => setSearchOpen(!searchOpen)}></i>

          <Link to="/account/wishlist" className="cart-icon-link">
            <i className="ti ti-heart"></i>
            {wishlistItems.length > 0 && (
              <span className="cart-badge">{wishlistItems.length}</span>
            )}
          </Link>

          <button
            type="button"
            className="cart-icon-link nav-icon-btn"
            onClick={() => {
              const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
              navigate(loggedIn ? '/account' : '/login')
            }}
          >
            <i className="ti ti-user"></i>
          </button>

          <i className="ti ti-flag"></i>

          <Link to="/cart" className="cart-icon-link">
            <i className="ti ti-shopping-bag"></i>
            {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
          </Link>
        </div>
      </nav>

      {searchOpen && (
        <form className="nav-search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            autoFocus
            placeholder="Search here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="button" className="nav-search-close" onClick={closeSearch}>
            ✕
          </button>
        </form>
      )}
    </>
  );
}

export default NavBar;