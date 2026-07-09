const banners = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1400',
    tag: 'END OF SEASON',
    title: 'SALE',
    subtitle: 'SLIDES STARTING AT ₹899*',
    note: 'ADD. ₹150 OFF ON PREPAID',
  },
  // {
  //   id: 2,
  //   image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400',
  //   tag: 'END OF SEASON',
  //   title: 'SALE\nUP TO 60% OFF*',
  //   subtitle: 'ON WOMEN\'S WEAR',
  // },
]

function SaleBanner() {
  return (
    <section className="sale-banners">
      {banners.map((banner) => (
        <div
          key={banner.id}
          className="sale-banner"
          style={{ backgroundImage: `url(${banner.image})` }}
        >
          <div className="sale-banner-content">
            <p className="sale-tag">{banner.tag}</p>
            <h2 className="sale-title">
              {banner.title.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </h2>
            <p className="sale-subtitle">{banner.subtitle}</p>
            {banner.note && <p className="sale-note">{banner.note}</p>}
            <button className="sale-btn">SHOP NOW &gt;</button>
          </div>
        </div>
      ))}
    </section>
  )
}

export default SaleBanner