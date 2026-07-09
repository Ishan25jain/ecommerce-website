import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from './context/CartContext'
import { WishlistContext } from './context/WishlistContext'
import { toast } from 'react-toastify'
import Loader from './Loader'


function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useContext(CartContext)
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Product not found')
        }
      })
      .then((data) => {
        setProduct(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

    if (loading) return <Loader />
    if (error) return <p style={{ padding: '40px', color: 'red' }}>Error: {error}</p>

  return (
    <div className="product-detail-page">
      <Link to="/shop" className="back-link">← Back to Shop</Link>

      <div className="product-detail-content">
        <div className="product-detail-image">
          <img src={product.thumbnail} alt={product.title} />
        </div>

        <div className="product-detail-info">
          <p className="product-detail-brand">{product.brand}</p>
          <h1>{product.title}</h1>
          <p className="product-detail-category">{product.category}</p>

          <div className="product-detail-rating-row">
            {/* <span className="product-detail-rating">⭐ {product.rating}</span> */}
            {/* <span className={`product-detail-stock ${product.stock < 20 ? 'low' : ''}`}>
              {product.availabilityStatus} ({product.stock} left)
            </span> */}
          </div>

          <p className="product-detail-description">{product.description}</p>

          <div className="product-detail-pricing">
            <span className="product-detail-price">${product.price}</span>
            <span className="product-detail-discount">
              ({product.discountPercentage}% off)
            </span>
          </div>

          <div className="product-detail-actions">
            <button
              className="add-to-cart-btn"
              onClick={() => {
                addToCart(product);
                toast.success(`${product.title} added to cart!`);
              }}
            >
              Add to Cart
            </button>
            <button
              className="wishlist-btn"
              onClick={() => {
                toggleWishlist(product);
                toast.success(
                  isInWishlist(product.id)
                    ? `${product.title} removed from wishlist`
                    : `${product.title} added to wishlist`
                );
              }}
            >
              <i className={isInWishlist(product.id) ? 'ti ti-heart-filled' : 'ti ti-heart'}></i>
            </button>
          </div>

          <div className="product-detail-tags">
            {product.tags.map((tag) => (
              <span key={tag} className="product-tag">{tag}</span>
            ))}
          </div>

          <div className="product-detail-meta">
            <p>📦 {product.shippingInformation}</p>
            <p>🛡️ {product.warrantyInformation}</p>
            <p>↩️ {product.returnPolicy}</p>
            <p>Minimum order: {product.minimumOrderQuantity} units</p>
          </div>
        </div>
      </div>

      <div className="product-detail-reviews">
        <h2>Reviews ({product.reviews.length})</h2>
        <div className="reviews-list">
          {product.reviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-header">
                <span className="review-name">{review.reviewerName}</span>
                <span className="review-rating">⭐ {review.rating}</span>
              </div>
              <p className="review-comment">{review.comment}</p>
              <p className="review-date">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail