const denimStyles = [
  { id: 1, label: 'EVERYDAY COMFORT STRETCH', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300', color: '#1a1a2e' },
  { id: 2, label: 'FLEX YOUR COMFORT', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=300', color: '#2c2c2c' },
  { id: 3, label: 'SUPER SOFT DENIMS', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300', color: '#0f4c5c' },
  { id: 4, label: 'DENIMS FOR ALL SEASON', image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=300', color: '#1a1a1a' },
]

function DenimEdit() {
  return (
    <section className="denim-section">
      <h2 className="section-title">Denim Edit</h2>
      <div className="denim-grid">
        {denimStyles.map((item) => (
          <div key={item.id} className="denim-card">
            <img src={item.image} alt={item.label} className="denim-img" />
            <div className="denim-label" style={{ backgroundColor: item.color }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default DenimEdit