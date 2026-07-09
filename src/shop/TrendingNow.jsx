import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loader from './Loader'



function ProductCard({ product }) {
  return (
    <Link to={`/shop/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="product-card">
        <div className="product-img-wrapper">
          <img src={product.thumbnail} alt={product.title} className="product-img" />
          <button className="quick-view-btn">Quick View</button>
          <i className="ti ti-heart product-wishlist"></i>
        </div>

        <div className="product-info">
          <p className="product-name">{product.title}</p>
          <p className="product-category">{product.category}</p>
          <div className="product-pricing">
            <span className="product-sale-price">${product.price}</span>
            <span className="product-discount">({product.discountPercentage}% off)</span>
          </div>
          <div className="product-rating">
            ⭐ {product.rating} rating
          </div>
        </div>
      </div>
    </Link>
  )
}

function TrendingNow() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=15')
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Failed to fetch products')
        }
      })
      .then((data) => {
        setProducts(data.products) // DummyJSON wraps the array inside a "products" key
        setLoading(false)
      })
      .catch((err) => {
        console.error('Fetch error:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

    if (loading) return <Loader />
    if (error) return <p style={{ padding: '40px', color: 'red' }}>Error: {error}</p>

  return (
    <section className="trending-section">
      <h2 className="section-title">Trending Now</h2>
      <div className="trending-products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default TrendingNow