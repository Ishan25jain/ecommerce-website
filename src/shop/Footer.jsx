function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <p>SHOP THE LATEST JEANS FOR MEN & WOMEN ONLINE AT PEPE JEANS INDIA.</p>
        <p className="footer-readmore">Read More...</p>
      </div>

      <div className="footer-social-row">
        <span>Follow us on</span>
        <div className="footer-social-icons">
          <i className="ti ti-brand-instagram"></i>
          <i className="ti ti-brand-facebook"></i>
          <i className="ti ti-brand-twitter"></i>
        </div>
      </div>

      <div className="newsletter-box">
        <h3>Pepe Jeans Newsletter</h3>
        <p>Have you signed up for our newsletter yet? Be the first to hear about exclusive offers, new drops, and much more. Subscribe now!</p>

        <div className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email address"
            className="newsletter-input"
          />
          <button className="newsletter-btn">SUBSCRIBE</button>
        </div>

        <label className="newsletter-checkbox">
          <input type="checkbox" />
          <span>I have read the Privacy Policy and agree to receive newsletters, offers and personalised communications from Pepe Jeans.</span>
        </label>
      </div>

      <div className="footer-links">
        <div className="footer-col">
          <h4>Help</h4>
          <ul>
            <li>Contact Us</li>
            <li>Deliveries and Returns</li>
            <li>Exchange</li>
            <li>My Account</li>
            <li>Check Order</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>Newsletter</li>
            <li>Custom Studio</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Special Moments</li>
            <li>Store Locator</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Policies</h4>
          <ul>
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Pepe Jeans</p>
      </div>
    </footer>
  )
}

export default Footer