import { useState } from 'react'
import './Footer.css'

const FOOTER_COLUMNS = [
  {
    title: 'Help',
    links: ['Contact Us', 'Deliveries and Returns', 'Exchange', 'My Account', 'Check Order', 'FAQs'],
  },
  {
    title: 'Quick Links',
    links: ['Newsletter', 'Custom Studio'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Special Moments', 'Store Locator'],
  },
  {
    title: 'Policies',
    links: ['Terms of Use', 'Privacy Policy', 'Cookie Policy'],
  },
]

function Footer() {
  const [seoExpanded, setSeoExpanded] = useState(false)
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email || !agreed) return
    setSubscribed(true)
    setEmail('')
    setAgreed(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="site-footer">

      {/* SEO text block with Read More / Read Less */}
      <div className="site-footer-seo">
        <div className={`seo-text ${seoExpanded ? 'seo-expanded' : ''}`}>
          <h3>All About ReactVault</h3>
          <p>
            ReactVault is a modern online store built for people who want a clean,
            fast, no-fuss shopping experience. From everyday essentials to seasonal
            picks, every product on ReactVault is organised so you can search, filter,
            and sort your way to exactly what you're looking for.
          </p>
          <p>
            Our checkout is built to be simple: add to cart, review your order, and
            pay in just a few steps. Wishlist your favourites for later, track your
            order history, and manage your account details anytime from your profile.
          </p>
        </div>
        <button
          type="button"
          className="seo-readmore-btn"
          onClick={() => setSeoExpanded((prev) => !prev)}
        >
          {seoExpanded ? 'Read Less...' : 'Read More...'}
        </button>
      </div>

      {/* Tagline */}
      <h2 className="site-footer-tagline">
        Shop the Latest Trends for Men &amp; Women Online at ReactVault.
      </h2>

      {/* Social row */}
      <div className="site-footer-social">
        <div className="social-follow">
          <i className="ti ti-mood-smile social-smiley"></i>
          <span>Follow us on</span>
          <div className="social-icons">
            <a href="#" aria-label="Instagram"><i className="ti ti-brand-instagram"></i></a>
            <a href="#" aria-label="Facebook"><i className="ti ti-brand-facebook-filled"></i></a>
            <a href="#" aria-label="YouTube"><i className="ti ti-brand-youtube-filled"></i></a>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="site-footer-newsletter">
        <div className="newsletter-header">
          <h3>ReactVault Newsletter</h3>
          <div className="newsletter-region">
            <span className="newsletter-region-label">India</span>
            <button type="button" className="newsletter-region-change">Change</button>
          </div>
        </div>
        <p>
          Have you signed up for our newsletter yet? Be the first to hear about
          exclusive offers, new drops, and much more. Subscribe now!
        </p>

        <label className="newsletter-label" htmlFor="footer-newsletter-email">
          Please enter your email address:
        </label>

        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <input
            id="footer-newsletter-email"
            type="email"
            placeholder="store@reactvault.in"
            className="newsletter-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="newsletter-btn">SUBSCRIBE</button>
        </form>

        <label className="newsletter-checkbox">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>
            I have read the Privacy Policy and agree to receive <strong>newsletters, offers</strong> and
            personalised communications from ReactVault.
          </span>
        </label>

        {subscribed && <p className="newsletter-success">You're subscribed! 🎉</p>}
      </div>

      {/* Accordion link columns + bottom bar merged into one row */}
      <div className="site-footer-links">
        {FOOTER_COLUMNS.map((column) => (
          <details className="footer-col" open key={column.title}>
            <summary>
              {column.title}
              <i className="ti ti-chevron-down accordion-arrow"></i>
            </summary>
            <ul>
              {column.links.map((link) => (
                <li key={link}>{link}</li>
              ))}
            </ul>
          </details>
        ))}

        <p className="site-footer-copyright">© {new Date().getFullYear()} ReactVault</p>
      </div>

      {/* Scroll to top */}
      <button
        type="button"
        className="scroll-to-top-btn"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <i className="ti ti-arrow-up"></i>
      </button>
    </footer>
  )
}

export default Footer