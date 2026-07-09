import { useState, useEffect, useContext } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Loader from './Loader';
import './CategoryProducts.css'; // reusing the same grid/filter/sort styles
import { WishlistContext } from './context/WishlistContext';

const SORT_OPTIONS = [
  'Price Low to High',
  'Price High to Low',
  'Rating High to Low',
  'Discount High to Low',
  'Title (A-Z)',
  'Title (Z-A)',
];

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [sortOption, setSortOption] = useState('Sort by :');
  const [sortOpen, setSortOpen] = useState(false);

  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

  useEffect(() => {
    fetchSearchResults();
  }, [query]);

  const fetchSearchResults = async () => {
    if (query.trim() === '') {
      setProducts([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error('Something went wrong with the search');
      }

      const data = await response.json();
      setProducts(data.products);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setMinPrice('');
    setMaxPrice('');
  };

  const filteredProducts = products.filter((product) => {
    const min = minPrice === '' ? 0 : Number(minPrice);
    const max = maxPrice === '' ? Infinity : Number(maxPrice);

    return product.price >= min && product.price <= max;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'Price Low to High':
        return a.price - b.price;

      case 'Price High to Low':
        return b.price - a.price;

      case 'Rating High to Low':
        return b.rating - a.rating;

      case 'Discount High to Low':
        return b.discountPercentage - a.discountPercentage;

      case 'Title (A-Z)':
        return a.title.localeCompare(b.title);

      case 'Title (Z-A)':
        return b.title.localeCompare(a.title);

      default:
        return 0;
    }
  });

  if (loading) return <Loader />;

  if (error) {
    return (
      <p style={{ padding: '40px', color: 'red' }}>
        Error: {error}
      </p>
    );
  }

  return (
    <div className="category-products-page">
      <Link to="/shop" className="back-link">
        ← Back to Shop
      </Link>

      <h1>Search results for "{query}"</h1>

      <p className="product-count">
        {sortedProducts.length} products found
      </p>

      <div className="category-layout">
        <aside className="price-filter-sidebar">
          <h3>Filter by Price</h3>

          <label>
            Min Price
            <input
              type="number"
              min="0"
              placeholder="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </label>

          <label>
            Max Price
            <input
              type="number"
              min="0"
              placeholder="Any"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </label>

          {(minPrice !== '' || maxPrice !== '') && (
            <button
              className="clear-filter-btn"
              onClick={handleClearFilters}
            >
              Clear Filter
            </button>
          )}
        </aside>

        <div className="products-column">
          <div className="products-toolbar products-toolbar-end">
            <div className="sort-dropdown">
              <button
                className="sort-btn"
                onClick={() => setSortOpen((prev) => !prev)}
              >
                {sortOption}
                <span className="sort-arrow"> ▾</span>
              </button>

              {sortOpen && (
                <ul className="sort-menu">
                  {SORT_OPTIONS.map((option) => (
                    <li
                      key={option}
                      className={sortOption === option ? 'active' : ''}
                      onClick={() => {
                        setSortOption(option);
                        setSortOpen(false);
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {sortedProducts.length === 0 ? (
            <div className="no-products">
              <p>No products found for "{query}".</p>
            </div>
          ) : (
            <div className="products-grid">
              {sortedProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/shop/product/${product.id}`}
                  className="product-card"
                >
                  <div className="product-image">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                    />

                    <button
                      className="product-like-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(product);
                      }}
                    >
                      <i
                        className={
                          isInWishlist(product.id)
                            ? 'ti ti-heart-filled'
                            : 'ti ti-heart'
                        }
                      ></i>
                    </button>
                  </div>

                  <h3>{product.title}</h3>

                  <div className="product-footer">
                    <span className="product-price">
                      ${product.price}
                    </span>

                    <span className="product-rating">
                      ⭐ {product.rating}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;