import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import BestsellersCarousel from '@/components/home/BestsellersCarousel';
import NewArrivals from '@/components/home/NewArrivals';
import Newsletter from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedCategories />
        <BestsellersCarousel />
        <NewArrivals />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}