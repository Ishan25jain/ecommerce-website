import { useState } from 'react';
import { Link } from 'react-router-dom';

const watches = [
  { id: 1, name: 'Tissot PRX Powermatic 80', price: 83500 },
  { id: 2, name: 'Casio G-Shock', price: 57995 },
  { id: 3, name: 'Zeppelin', price: 50000 },
  { id: 4, name: 'Seiko Presage Classic', price: 90000 },
  { id: 5, name: 'SevenFriday', price: 110000 },
  { id: 6, name: 'Titan Stellar Analog Green', price: 15000 },
];

function WatchList({ theme, toggleTheme }) {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState(null);

  const filtered = watches.filter((w) =>
    w.name.toLowerCase().includes(query.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="container">
      <button className="theme-toggle" onClick={toggleTheme}>
        <i className={theme === 'light' ? 'ti ti-moon' : 'ti ti-sun'}></i>
      </button>

      <div className="title">Watch List</div>

      <Link to="/" className="nav-link">← Back to Todo List</Link>

      <div className="search-wrapper">
        <i className="ti ti-search search-icon"></i>
        <input
          type="text"
          value={query}
          placeholder="search Watches"
          className="input search-input"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="sort-group">
        <button
          className={`filter-btn ${sortBy === 'price' ? 'active' : ''}`}
          onClick={() => setSortBy('price')}
        >
          Sort by price
        </button>
        <button
          className={`filter-btn ${sortBy === 'name' ? 'active' : ''}`}
          onClick={() => setSortBy('name')}
        >
          Sort by name
        </button>
      </div>

      <ul className="watch-list">
        {sorted.length === 0 ? (
          <p className="empty-state">
            <i className="ti ti-search-off"></i> No watches match your search
          </p>
        ) : (
          sorted.map((watch) => (
            <li key={watch.id} className="watch-item">
              <div className="watch-info">
                <i className="ti ti-clock watch-icon"></i>
                <span className="watch-name">{watch.name}</span>
              </div>
              <span className="watch-price">₹{watch.price.toLocaleString()}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}



export default WatchList;
