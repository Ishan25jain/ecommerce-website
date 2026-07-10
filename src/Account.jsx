import { useState, useEffect } from 'react'
import { Outlet, NavLink, Link } from 'react-router-dom'
import NavBar from './shop/Navbar'
import './Account.css'

function Account() {
  const [userName, setUserName]= useState('')

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('currentUser'))
      if (saved && saved.name) {
        setUserName(saved.name.split(' ')[0])
      }
    } catch {}
  }, [])
  return (
    <>
      <NavBar />
      <div className="account-page">
        <div className="account-breadcrumb">
          <Link to="/shop">Home</Link>  / <Link to="/account">My Account</Link>
        </div>

        <div className="account-welcome">
          Welcome {userName || 'back'}!
        </div>

        <div className="account-layout">
          <aside className="account-sidebar">
            <ul className="account-nav">
              <li>
                <NavLink
                  to="/account"
                  end
                  className={({ isActive }) =>
                    `account-nav-item ${isActive ? 'account-nav-item--active' : ''}`
                  }
                >
                  <span className="account-nav-icon">👤</span>
                  My Account
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/account/personal-details"
                  className={({ isActive }) =>
                    `account-nav-item ${isActive ? 'account-nav-item--active' : ''}`
                  }
                >
                  <span className="account-nav-icon">🪪</span>
                  Personal Details
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/account/address-book"
                  className={({ isActive }) =>
                    `account-nav-item ${isActive ? 'account-nav-item--active' : ''}`
                  }
                >
                  <span className="account-nav-icon">📖</span>
                  Address Book
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/account/order-history"
                  className={({ isActive }) =>
                    `account-nav-item ${isActive ? 'account-nav-item--active' : ''}`
                  }
                >
                  <span className="account-nav-icon">📋</span>
                  Order History
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/account/wishlist"
                  className={({ isActive }) =>
                    `account-nav-item ${isActive ? 'account-nav-item--active' : ''}`
                  }
                >
                  <span className="account-nav-icon">🖤</span>
                  Wishlist
                </NavLink>
              </li>
            </ul>

            <hr className="account-divider-line" />

            <button className="account-signout">Sign Out</button>
          </aside>

          <main className="account-main">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

export default Account