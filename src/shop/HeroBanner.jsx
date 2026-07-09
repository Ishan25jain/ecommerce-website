import { useState, useEffect } from 'react'

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1400',
    tag: 'END OF SEASON',
    title: 'SALE\nUP TO 50% OFF*',
    subtitle: 'ON T-SHIRTS',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=1400',
    tag: 'NEW ARRIVALS',
    title: 'DENIM\nCOLLECTION',
    subtitle: 'SHOP THE LATEST',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400',
    tag: 'LIMITED TIME',
    title: 'RUSH\nSALE',
    subtitle: 'SHIRTS AT ₹999*',
  },
]

function HeroBanner() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="hero-banner">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide ${index === current ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="hero-overlay">
            <p className="hero-tag">{slide.tag}</p>
            <h1 className="hero-title">
              {slide.title.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </h1>
            <p className="hero-subtitle">{slide.subtitle}</p>
            <button className="hero-btn">SHOP NOW &gt;</button>
          </div>
        </div>
      ))}

      <div className="hero-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`hero-dot ${index === current ? 'active' : ''}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroBanner