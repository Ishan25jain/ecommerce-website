import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function AccountOverview() {
  const [user, setUser] = useState({})
  const [hasDetails, setHasDetails] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('currentUser'))
      if (saved) {
        setUser(saved)
        setHasDetails(true)
      }
    } catch {
      // ignore malformed data
    }
  }, [])

  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(' ') || user.name || ''

  return (
    <>
      <h1 className="account-overview-title">Account Overview</h1>
      <section className="account-section">
        <h2 className="account-section-title">Personal Details</h2>
        {hasDetails ? (
          <p className="account-details-text">
            {fullName}, {user.email}
          </p>
        ) : (
          <p className="account-details-text">No personal details on file yet.</p>
        )}
        <div className="account-links">
          <Link to="/account/personal-details">
            {hasDetails ? 'View Personal Details' : 'Edit Personal Details'}
          </Link>
          <Link to="/account/personal-details">Change Your Password</Link>
        </div>
      </section>
    </>
  )
}

export default AccountOverview