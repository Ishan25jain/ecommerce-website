import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  function handleRegister() {
    if (!name || !email || !password) {
      setError('All fields are required.')
      return
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || []

    // Check if user already exists
    const alreadyExists = existingUsers.find((u) => u.email === email)
    if (alreadyExists) {
      setError('User already registered. Please login.')
      return
    }

    // Save user to localStorage
    const updateUsers = [...existingUsers, { name, email, password}]
    localStorage.setItem('users', JSON.stringify((updateUsers)))

    // Redirect to login
    navigate('/login')
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-form">
        <h1 className="auth-title">Create account</h1>
        <p className="auth-subtitle">Let's get started with your 30 days trial</p>

        <div className="auth-fields">
          <input
            type="text"
            className="auth-input"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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

        <button className="auth-btn" onClick={handleRegister}>
          Create account
        </button>

        <p className="auth-login-link">
          Already have an account? <Link to="/login">Login</Link>
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

export default Register