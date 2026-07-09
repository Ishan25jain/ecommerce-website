import { Link } from 'react-router-dom'  // ← Add this
import AnnouncementBar from './AnnouncementBar'
import NavBar from './Navbar'
import HeroBanner from './HeroBanner'
import CuratedStyles from './CuratedStyles'
import CategorySection from './CategorySection'
import TrendingNow from './TrendingNow'
import Community from './Community'
import DenimEdit from './DenimEdit'
import SaleBanner from './SaleBanner'
import Footer from './Footer'
import './Shop.css'


function Shop() {
  return (
    <div className="shop-page">
      <AnnouncementBar />
      <NavBar />
      <HeroBanner />
      <CuratedStyles />
      <CategorySection /> 
      <TrendingNow />
      <Community />
      <DenimEdit />
      <SaleBanner />
      <Footer />
    </div>
  )
}

export default Shop