import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from './Loader';
import './CategoryProducts.css';
import { WishlistContext } from './context/WishlistContext';

const SORT_OPTIONS = [
  'Price Low to High',
  'Price High to Low',
  'Rating High to Low',
  'Discount High to Low',
  'Title (A-Z)',
  'Title (Z-A)',
];

const PRODUCTS_PER_PAGE = 8;

function CategoryProducts() {
  const { categoryName } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const [sortOption, setSortOption] = useState('Sort by :');
  const [sortOpen, setSortOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

  useEffect(() => {
    fetchCategoryProducts();
  }, [categoryName]);

  const fetchCategoryProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://dummyjson.com/products/category/${categoryName}`
      );

      if (!response.ok) throw new Error('Category not found');

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

const searchedProducts = products.filter((product) => {
  const query = searchQuery.trim().toLowerCase();
  const titleMatch = product.title.toLowerCase().includes(query);
  const tagMatch = product.tags?.some((tag) =>
    tag.toLowerCase().includes(query)
  );
  return titleMatch || tagMatch;
});

    const filteredProducts = searchedProducts.filter((product) => {
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

  // Reset to page 1 whenever filters/search/sort/category change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, minPrice, maxPrice, sortOption, categoryName]);

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE) || 1;

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageClick = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (currentPage > 1) handlePageClick(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) handlePageClick(currentPage + 1);
  };

  if (loading) return <Loader />;

  if (error)
    return (
      <p style={{ padding: '40px', color: 'red' }}>
        Error: {error}
      </p>
    );

  return (
    <div className="category-products-page">
      <Link to="/shop" className="back-link">
        ← Back to Shop
      </Link>

      <h1>{categoryName.replace('-', ' ').toUpperCase()}</h1>

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
          <div className="products-toolbar">
            <button
              type="button"
              className="search-toggle-btn"
              onClick={() => setSearchOpen((prev) => !prev)}
            >
              <i className="ti ti-search"></i>
            </button>

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

          {searchOpen && (
            <div className="full-search-bar">
              <input
                type="text"
                autoFocus
                placeholder="Search Products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="button"
                className="full-search-close"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                }}
              >
                ✕
              </button>
            </div>
          )}

          {sortedProducts.length === 0 ? (
            <div className="no-products">
              <p>
                No products found
                {searchQuery && ` for "${searchQuery}"`}.
              </p>
            </div>
          ) : (
            <>
              <div className="products-grid">
                {paginatedProducts.map((product) => (
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

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    onClick={handleBack}
                    disabled={currentPage === 1}
                  >
                    ← Back
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                      onClick={() => handlePageClick(page)}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    className="pagination-btn"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryProducts;