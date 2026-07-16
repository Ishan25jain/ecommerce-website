import { Link } from 'react-router-dom'
import AnnouncementBar from './AnnouncementBar'
import HeroBanner from './HeroBanner'
import CuratedStyles from './CuratedStyles'
import CategorySection from './CategorySection'
import TrendingNow from './TrendingNow'
import Community from './Community'
import DenimEdit from './DenimEdit'
import SaleBanner from './SaleBanner'
import './Shop.css'


function Shop() {
  return (
    <div className="shop-page">
      <AnnouncementBar />
      <HeroBanner />
      <CuratedStyles />
      <CategorySection /> 
      <TrendingNow />
      <Community />
      <DenimEdit />
      <SaleBanner />
    </div>
  )
}

export default Shop
