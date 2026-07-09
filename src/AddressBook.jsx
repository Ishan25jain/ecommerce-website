import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { State, City } from 'country-state-city'

const EMPTY_ADDRESS = {
  addressTitle: '',
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  pincode: '',
  address1: '',
  address2: '',
  state: '',      // state name, e.g. "Rajasthan"
  stateCode: '',  // iso code, e.g. "RJ" — used to look up cities
  city: '',
  isDefault: false
}

// One line each — pulls every Indian state, and cities are looked up
// on demand for whichever state is selected.
const INDIAN_STATES = State.getStatesOfCountry('IN')

function AddressModal({ type, initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState(initialData)
  const isDelivery = type === 'delivery'

  // Cities for whichever state is currently selected
  const cities = formData.stateCode
    ? City.getCitiesOfState('IN', formData.stateCode)
    : []

  function handleChange(e) {
    const { name, value, type: inputType, checked } = e.target
    setFormData({
      ...formData,
      [name]: inputType === 'checkbox' ? checked : value
    })
  }

  function handleStateChange(e) {
    const isoCode = e.target.value
    const selected = INDIAN_STATES.find((s) => s.isoCode === isoCode)
    setFormData({
      ...formData,
      state: selected ? selected.name : '',
      stateCode: isoCode,
      city: '' // reset city whenever state changes
    })
  }

  function handleSave() {
    if (!formData.addressTitle || !formData.firstName || !formData.lastName || !formData.email) {
      toast.error('Please fill all required fields')
      return
    }
    if (!/^\d{10}$/.test(formData.mobile)) {
      toast.error('Please enter a valid 10-digit mobile number')
      return
    }
    if (!/^\d{6}$/.test(formData.pincode)) {
      toast.error('Please enter a valid 6-digit pincode')
      return
    }
    if (!formData.address1 || !formData.state || !formData.city) {
      toast.error('Please fill all required fields')
      return
    }
    onSave(formData)
  }

  return (
    <div className="ab-modal-overlay" onClick={onCancel}>
      <div className="ab-modal" onClick={(e) => e.stopPropagation()}>
        <button className="ab-modal-close" onClick={onCancel} aria-label="Close">×</button>

        <h2 className="ab-modal-title">
          {isDelivery ? 'Add New Delivery Address' : 'Add New Billing Address'}
        </h2>

        <div className="pd-field">
          <label htmlFor="addressTitle">Address Title *</label>
          <input
            id="addressTitle"
            name="addressTitle"
            type="text"
            placeholder="Home / Office"
            value={formData.addressTitle}
            onChange={handleChange}
          />
        </div>

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
          <label htmlFor="mobile">Mobile Number *</label>
          <div className="pd-mobile-box">
            <span>+91</span>
            <input
              id="mobile"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="Enter 10-digit mobile number"
              value={formData.mobile}
              onChange={(e) => {
                const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10)
                setFormData({ ...formData, mobile: digitsOnly })
              }}
            />
          </div>
        </div>

        <div className="pd-field">
          <label htmlFor="pincode">Pincode *</label>
          <input
            id="pincode"
            type="tel"
            inputMode="numeric"
            maxLength={6}
            value={formData.pincode}
            onChange={(e) => {
              const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 6)
              setFormData({ ...formData, pincode: digitsOnly })
            }}
          />
        </div>

        <div className="pd-field">
          <label htmlFor="address1">Address 1 *</label>
          <input
            id="address1"
            name="address1"
            type="text"
            value={formData.address1}
            onChange={handleChange}
          />
        </div>

        <div className="pd-field">
          <label htmlFor="address2">Address 2</label>
          <input
            id="address2"
            name="address2"
            type="text"
            value={formData.address2}
            onChange={handleChange}
          />
        </div>

        <div className="pd-field">
          <label htmlFor="state">State *</label>
          <select
            id="state"
            name="state"
            value={formData.stateCode}
            onChange={handleStateChange}
          >
            <option value="">State</option>
            {INDIAN_STATES.map((s) => (
              <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
            ))}
          </select>
        </div>

        <div className="pd-field">
          <label htmlFor="city">City *</label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!formData.stateCode}
          >
            <option value="">
              {formData.stateCode ? 'Select City' : 'Select State first'}
            </option>
            {cities.map((c) => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="pd-checkbox">
          <input
            id="isDefault"
            name="isDefault"
            type="checkbox"
            checked={formData.isDefault}
            onChange={handleChange}
          />
          <label htmlFor="isDefault">
            Set as default {isDelivery ? 'delivery' : 'billing'} address
          </label>
        </div>

        <div className="pd-actions">
          <button className="pd-btn-save" onClick={handleSave}>SAVE CHANGES</button>
          <button className="pd-btn-cancel" onClick={onCancel}>CANCEL</button>
        </div>
      </div>
    </div>
  )
}

function AddressSection({ type, addresses, onAdd, onDelete }) {
  return (
    <div className="ab-section">
      {addresses.length === 0 ? (
        <p className="ab-empty">No saved addresses</p>
      ) : (
        <ul className="ab-address-list">
          {addresses.map((addr, index) => (
            <li key={index} className="ab-address-card">
              <div className="ab-address-card-header">
                <span className="ab-address-title">{addr.addressTitle}</span>
                {addr.isDefault && <span className="ab-default-badge">Default</span>}
              </div>
              <p className="ab-address-name">{addr.firstName} {addr.lastName}</p>
              <p className="ab-address-line">{addr.address1}{addr.address2 ? `, ${addr.address2}` : ''}</p>
              <p className="ab-address-line">{addr.city}, {addr.state} - {addr.pincode}</p>
              <p className="ab-address-line">+91 {addr.mobile}</p>
              <button
                className="ab-address-remove"
                onClick={() => onDelete(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <button className="ab-add-link" onClick={onAdd}>
        + Add New {type === 'delivery' ? 'Delivery' : 'Billing'} Address
      </button>
    </div>
  )
}

function AddressBook() {
  const [deliveryAddresses, setDeliveryAddresses] = useState([])
  const [billingAddresses, setBillingAddresses] = useState([])
  const [activeModal, setActiveModal] = useState(null) // null | 'delivery' | 'billing'
  const [prefill, setPrefill] = useState(EMPTY_ADDRESS)

  useEffect(() => {
    try {
      const savedDelivery = JSON.parse(localStorage.getItem('deliveryAddresses')) || []
      setDeliveryAddresses(Array.isArray(savedDelivery) ? savedDelivery : [])
    } catch {
      setDeliveryAddresses([])
    }

    try {
      const savedBilling = JSON.parse(localStorage.getItem('billingAddresses')) || []
      setBillingAddresses(Array.isArray(savedBilling) ? savedBilling : [])
    } catch {
      setBillingAddresses([])
    }
  }, [])

  function openModal(type) {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setPrefill({
        ...EMPTY_ADDRESS,
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        mobile: user?.mobile || ''
      })
    } catch {
      setPrefill(EMPTY_ADDRESS)
    }
    setActiveModal(type)
  }

  function closeModal() {
    setActiveModal(null)
  }

  function handleSaveAddress(data) {
    if (activeModal === 'delivery') {
      const updated = [...deliveryAddresses, data]
      setDeliveryAddresses(updated)
      localStorage.setItem('deliveryAddresses', JSON.stringify(updated))
    } else {
      const updated = [...billingAddresses, data]
      setBillingAddresses(updated)
      localStorage.setItem('billingAddresses', JSON.stringify(updated))
    }
    toast.success('Address saved successfully')
    setActiveModal(null)
  }

  function handleDeleteDelivery(index) {
    const updated = deliveryAddresses.filter((_, i) => i !== index)
    setDeliveryAddresses(updated)
    localStorage.setItem('deliveryAddresses', JSON.stringify(updated))
  }

  function handleDeleteBilling(index) {
    const updated = billingAddresses.filter((_, i) => i !== index)
    setBillingAddresses(updated)
    localStorage.setItem('billingAddresses', JSON.stringify(updated))
  }

  return (
    <div className="ab-page">
      <h1 className="account-overview-title">Address Book</h1>

      <AddressSection
        type="delivery"
        addresses={deliveryAddresses}
        onAdd={() => openModal('delivery')}
        onDelete={handleDeleteDelivery}
      />

      <AddressSection
        type="billing"
        addresses={billingAddresses}
        onAdd={() => openModal('billing')}
        onDelete={handleDeleteBilling}
      />

      {activeModal && (
        <AddressModal
          type={activeModal}
          initialData={prefill}
          onSave={handleSaveAddress}
          onCancel={closeModal}
        />
      )}
    </div>
  )
}

export default AddressBook