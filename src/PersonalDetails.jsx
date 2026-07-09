import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  gender: '',
  mobile: '',
  email: '',
  password: '',
  birthday: '',
  anniversary: '',
  agreedTerms: false
}

function PersonalDetails() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [showPassword, setShowPassword] = useState(false)
  const [showCurrentPw, setShowCurrentPw] = useState(false)
  const [showNewPw, setShowNewPw] = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('user'))
      if (saved) {
        setFormData({ ...EMPTY_FORM, ...saved })
      }
    } catch {
      // ignore malformed data
    }
  }, [])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  function handleSave() {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error('First Name, Last Name and Email cannot be empty')
      return
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      toast.error('Please enter a valid 10-digit mobile number')
      return
    }

    if (!formData.agreedTerms) {
      toast.error('Please accept the Privacy Policy and Terms and Conditions')
      return
    }
    localStorage.setItem('user', JSON.stringify(formData))
    toast.success('Personal details updated successfully')
    navigate('/account')
  }

  function handleCancel() {
    navigate('/account')
  }

  return (
    <div className="pd-page">
      <h1 className="pd-title">Personal Details</h1>
      <p className="pd-note">
        Your personal details are safe, we will never share your information.
      </p>

      <div className="pd-field">
        <label htmlFor="firstName">First Name *</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>

      <div className="pd-field">
        <label htmlFor="lastName">Last Name *</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>

      <div className="pd-field">
        <label htmlFor="gender">Gender *</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="pd-field">
        <label htmlFor="mobile">Mobile Number *</label>
        <div className="pd-mobile-box">
          <span>+91</span>
          <input
            id="mobile"
            type="tel"
            inputMode='numeric'
            maxLength={10}
            placeholder='Enter 10-digit mobile number'
            value={formData.mobile}
            onChange={(e) => {
              const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10)
              setFormData({ ...formData, mobile: digitsOnly })
            }}
          />
        </div>
        <p className="pd-hint">
          Please contact our <a href="#">customer care</a> team to update or change your phone number.
        </p>
      </div>

      <div className="pd-field">
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="pd-field">
        <label htmlFor="password">Password *</label>
        <div className="pd-password-box">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
          />
          <span onClick={() => setShowPassword(!showPassword)}>👁</span>
        </div>
      </div>

      <div className="pd-row">
        <div className="pd-field">
          <label htmlFor="birthday">Birthday</label>
          <input
            id="birthday"
            name="birthday"
            type="date"
            value={formData.birthday}
            onChange={handleChange}
          />
        </div>

        <div className="pd-field">
          <label htmlFor="anniversary">Anniversary</label>
          <input
            id="anniversary"
            name="anniversary"
            type="date"
            value={formData.anniversary}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="pd-checkbox">
        <input
          id="agreedTerms"
          name="agreedTerms"
          type="checkbox"
          checked={formData.agreedTerms}
          onChange={handleChange}
        />
        <label htmlFor="agreedTerms">
            <p className="pd-hint">
          I have read and accept the <a href="#">Privacy Policy</a> and <a href="#">Terms and Conditions</a>*
        </p>
          
        </label>
      </div>

      <div className="pd-actions">
        <button className="pd-btn-save" onClick={handleSave}>SAVE CHANGES</button>
        <button className="pd-btn-cancel" onClick={handleCancel}>CANCEL</button>
      </div>

<hr className="pd-divider" />

<div
  className="pd-accordion-header"
  onClick={() => setShowChangePassword(!showChangePassword)}
>
  <h2 className="pd-subtitle">Change Password</h2>
  <span className="pd-accordion-icon">
    {showChangePassword ? '−' : '+'}
  </span>
</div>

{showChangePassword && (
  <div className="pd-accordion-body">
    <div className="pd-field">
      <label htmlFor="currentPassword">Current Password *</label>
      <div className="pd-password-box">
        <input
          id="currentPassword"
          type={showCurrentPw ? 'text' : 'password'}
        />
        <span onClick={() => setShowCurrentPw(!showCurrentPw)}>👁</span>
      </div>
    </div>

    <div className="pd-field">
      <label htmlFor="newPassword">New Password *</label>
      <div className="pd-password-box">
        <input
          id="newPassword"
          type={showNewPw ? 'text' : 'password'}
        />
        <span onClick={() => setShowNewPw(!showNewPw)}>👁</span>
      </div>
    </div>

    <div className="pd-field">
      <label htmlFor="confirmPassword">Confirm New Password *</label>
      <div className="pd-password-box">
        <input
          id="confirmPassword"
          type={showConfirmPw ? 'text' : 'password'}
        />
        <span onClick={() => setShowConfirmPw(!showConfirmPw)}>👁</span>
      </div>
    </div>

    <div className="pd-actions">
      <button className="pd-btn-cancel" onClick={() => setShowChangePassword(false)}>
        CANCEL
      </button>
      <button className="pd-btn-save">CHANGE PASSWORD</button>
    </div>
  </div>
)}
    </div>
  )
}

export default PersonalDetails