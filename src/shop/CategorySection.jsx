import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCachedFetch } from '../hooks/useCachedFetch';
import './CategorySection.css';

function CategorySection() {
  const [sliderPosition, setSliderPosition] = useState(0);

const categoryImages = {
        'beauty': 'https://images.unsplash.com/photo-1631730486572-226d1f595b68?q=80&w=775&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

        'fragrances': 'https://images.unsplash.com/photo-1543422655-ac1c6ca993ed?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

        'furniture': 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZnVybml0dXJlfGVufDB8fDB8fHww',

        'groceries': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3JvY2VyaWVzfGVufDB8fDB8fHww',

        'home-decoration': 'https://images.unsplash.com/photo-1623244307563-f9ade3df13c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhvbWUtZGVjb3JhdGlvbnxlbnwwfHwwfHx8MA%3D%3D',

        'kitchen-accessories': 'https://images.unsplash.com/photo-1738484708927-c1f45df0b56e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGtpdGNoZW4tYWNjZXNzb3JpZXN8ZW58MHx8MHx8fDA%3D',

        'laptops': 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wc3xlbnwwfHwwfHx8MA%3D%3D',

        'mens-shirts': 'https://media.istockphoto.com/id/865823986/photo/mens-shirts-isolated-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=wUgnoFj5Cqybtmzrn1FbaGLvlU_7_cN6Uor4sZHAFpc=',

        'mens-shoes': 'https://images.unsplash.com/photo-1668069226492-508742b03147?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVuLXNob2VzfGVufDB8fDB8fHww',

        'mens-watches': 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D',

        'mobile-accessories': 'https://images.unsplash.com/photo-1565536421961-1f165e0c981e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vYmlsZSUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww',

        'motorcycle': 'https://images.unsplash.com/photo-1559289431-9f12ee08f8b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vdG9yY3ljbGV8ZW58MHx8MHx8fDA%3D',

        'skin-care': 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9',

        'smartphones': 'https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fHNtYXJ0cGhvbmVzfGVufDB8fDB8fHww',

        'sports-accessories': 'https://images.unsplash.com/photo-1776245110398-5313efc4a734?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fHNwb3J0cyUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww',

        'sunglasses': 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VuZ2xhc3Nlc3xlbnwwfHwwfHx8MA%3D%3D',

        'tablets': 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGFibGV0fGVufDB8fDB8fHww',

        'tops': 'https://images.unsplash.com/photo-1525550133628-43e58e551e6f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRvcHN8ZW58MHx8MHx8fDA%3D',

        'vehicle': 'https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHZlaGljbGV8ZW58MHx8MHx8fDA%3D',

        'womens-bags': 'https://images.unsplash.com/photo-1681747685985-a401c271156c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d29tZW5zLWJhZ3N8ZW58MHx8MHx8fDA%3D',

        'womens-dresses': 'https://images.unsplash.com/photo-1614098097306-c67b8020c04e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHdvbWVucy1kcmVzc3xlbnwwfHwwfHx8MA%3D%3D',

        'womens-jewellery': 'https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d29tZW4lMjBqZXdlbHJ5fGVufDB8fDB8fHww',

        'womens-shoes': 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29tZW4lMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D',

        'womens-watches': 'https://images.unsplash.com/photo-1549972574-8e3e1ed6a347?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29tZW4lMjB3YXRjaGVzfGVufDB8fDB8fHww',

    };

  const { data: categories, loading } = useCachedFetch(
    'categories-cache',
    'https://dummyjson.com/products/categories'
  );

  const visibleCategories = (categories || []).slice(
    sliderPosition,
    sliderPosition + 5
  );

  function handleNextSlide() {
    if (sliderPosition < (categories?.length || 0) - 5) {
      setSliderPosition((prev) => prev + 5);
    }
  }

  function handlePrevSlide() {
    if (sliderPosition > 0) {
      setSliderPosition((prev) => prev - 5);
    }
  }

  if (loading || !categories) {
    return (
      <p style={{ padding: '40px', textAlign: 'center' }}>
        Loading Categories...
      </p>
    );
  }

  return (
    <section className="category-section">
      <div className="community-header">
        <h2 className="section-title">Shop by Category</h2>

        <div className="community-arrows">
          <button
            className="slider-arrow"
            onClick={handlePrevSlide}
            disabled={sliderPosition === 0}
          >
            <i className="ti ti-chevron-left"></i>
          </button>

          <button
            className="slider-arrow"
            onClick={handleNextSlide}
            disabled={sliderPosition >= categories.length - 5}
          >
            <i className="ti ti-chevron-right"></i>
          </button>
        </div>
      </div>

      <div className="categories-grid">
        {visibleCategories.map((category) => (
          <Link
            key={category.slug}
            to={`/shop/category/${category.slug}`}
            className="category-card"
          >
            <div className="category-image">
              <img
                src={
                    categoryImages[category.slug] ||
                    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop'
                    }
                alt={category.name}
              />
            </div>

            <h3>{category.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;