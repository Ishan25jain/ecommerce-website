import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login({ setIsLoggedIn }) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  function handleLogin() {
    if (!email || !password) {
      setError('Please enter email and password.')
      return
    }

    const users = JSON.parse(localStorage.getItem('users')) || []

    const matchedUser = users.find(
        (u) => u.email === email && u.password === password
    )

    // if (!savedUser) {
    //   setError('No account found. Please register first.')
    //   return
    // }

    if (matchedUser) {
      // Correct — mark as logged in
      localStorage.setItem('isLoggedIn', 'true')
      setIsLoggedIn(true)
      navigate('/shop')
    } else {
      setError('Incorrect email or password.')
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-form">
        <h1 className="auth-title">Login in to your account <br /> to Your Style Destination</h1>
        <p className="auth-subtitle">Login to your account</p>

        <div className="auth-fields">
          <input
            type="email"
            className="auth-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="auth-password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              className="auth-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="auth-eye" onClick={() => setShowPassword(!showPassword)}>
              <i className={showPassword ? 'ti ti-eye' : 'ti ti-eye-off'}></i>
            </span>
          </div>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button className="auth-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="auth-login-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

        <div className="auth-socials">
          <button className="social-btn" 
          onClick={() => window.open("https://www.google.com", "_blank")}
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="22" />
          </button>
          <button className="social-btn social-btn--active"
          onClick={() => window.open("https://www.apple.com", "_blank")}
          >
            <i className="ti ti-brand-apple" style={{ fontSize: '22px' }}></i>
          </button>
          <button className="social-btn"
          onClick={() => window.open("https://www.linkedin.com", "_blank")}
          >
            <img src="https://www.svgrepo.com/show/448234/linkedin.svg" alt="LinkedIn" width="22" />
          </button>

          <button className="social-btn" 
          onClick={() => window.open("https://www.instagram.com", "_blank")}
          >
            <img src="https://www.svgrepo.com/show/452229/instagram-1.svg" alt="Instagram" width="22" />

          </button>
        </div>

      </div>
      <div className="auth-image"></div>
    </div>
  )
}

export default Login