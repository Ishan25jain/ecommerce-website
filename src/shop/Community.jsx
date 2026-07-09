const communityPosts = [
  { id: 1, handle: '@pepejeansindia', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300' },
  { id: 2, handle: '@pepejeansindia', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300' },
  { id: 3, handle: '@pepejeansindia', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300' },
  { id: 4, handle: '@pepejeansindia', image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=300' },
  { id: 5, handle: '@pepejeansindia', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=300' },
]

function Community() {
  return (
    <section className="community-section">
      <div className="community-header">
        <h2 className="section-title">Styled by Our Community</h2>
        <div className="community-arrows">
          <i className="ti ti-chevron-left"></i>
          <i className="ti ti-chevron-right"></i>
        </div>
      </div>

      <div className="community-grid">
        {communityPosts.map((post) => (
          <div key={post.id} className="community-card">
            <img src={post.image} alt={post.handle} className="community-img" />
            <div className="community-footer">
              <span className="community-handle">{post.handle}</span>
              <button className="community-shop-btn">Shop</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Community