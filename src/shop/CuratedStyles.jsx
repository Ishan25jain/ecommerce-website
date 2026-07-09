const categories = [
  { id: 1, label: 'CLASSIC POLOS', image: 'https://images.unsplash.com/photo-1781040493590-2c73dd49f8b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGNsYXNzaWMlMjBwb2xvc3xlbnwwfHwwfHx8MA%3D%3D' },
  { id: 2, label: 'STRIPED SHIRTS', image: 'https://images.unsplash.com/photo-1618786177957-29d9b6b26d8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RyaXBlcyUyMHNoaXJ0c3xlbnwwfHwwfHx8MA%3D%3D' },
  { id: 3, label: 'GRAPHIC TEES', image: 'https://images.unsplash.com/photo-1527718641255-324f8e2d0421?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVlc3xlbnwwfHwwfHx8MA%3D%3D' },
  { id: 4, label: 'ALL ABOUT DENIMS', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRlbmltc3xlbnwwfHwwfHx8MA%3D%3D' },
  { id: 5, label: 'RESORT-COLLAR SHIRTS', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sb3IlMjBzaGlydHN8ZW58MHx8MHx8fDA%3D' },
]

function CuratedStyles() {
  return (
    <section className="curated-section">
      <h2 className="section-title">Curated Styles</h2>
      <div className="curated-grid">
        {categories.map((cat) => (
          <div key={cat.id} className="curated-card">
            <img src={cat.image} alt={cat.label} className="curated-img" />
            <div className="curated-overlay">
              <p className="curated-label">{cat.label}</p>
              <p className="curated-shop">SHOP NOW &gt;</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CuratedStyles