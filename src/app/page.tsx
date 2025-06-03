import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import GradientSection from '@/components/GradientSection';
import ContractorMatchingSection from '@/components/AIJobSection';
import VerificationSection from '@/components/GritSection';
import LatestSection from '@/components/LatestSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <GradientSection />
      <ContractorMatchingSection />
      <VerificationSection />
      <LatestSection />
      <Footer />
    </div>
  );
}
