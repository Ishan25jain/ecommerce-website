import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function AccountOverview() {
  const [user, setUser] = useState({
    firstName: 'Ishan',
    lastName: 'Jain',
    email: 'ishanjain@gmail.com'
  })

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('user'))
      if (saved && saved.firstName) {
        setUser(saved)
      }
    } catch {
      // ignore malformed data
    }
  }, [])

  return (
    <>
      <h1 className="account-overview-title">Account Overview</h1>
      <section className="account-section">
        <h2 className="account-section-title">Personal Details</h2>
        <p className="account-details-text">
          {user.firstName} {user.lastName} , {user.email}
        </p>
        <div className="account-links">
          <Link to="/account/personal-details">View Personal Details</Link>
          <Link to="/account/personal-details">Change Your Password</Link>
        </div>
      </section>
    </>
  )
}

export default AccountOverview