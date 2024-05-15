import AboutSection from "../components/home/AboutSection";
import BlogSection from "../components/home/BlogSection";
import HeroSection from "../components/home/HeroSection";
import PartnerSection from "../components/home/PartnerSection";
import ReviewSection from "../components/home/ReviewSection";
import StepsSection from "../components/home/StepsSection";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-[#FFF8F1]">
        <HeroSection />
      </div>
      <div>
        <AboutSection />
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-[url('/assets/step-bg.svg')] bg-center "></div>
        <div className="absolute inset-0 bg-[#11141A] bg-opacity-[98%]"></div>
        <StepsSection />
      </div>
      <div>
        <PartnerSection />
      </div>
      <div className="bg-[#FFF8F1]">
        <BlogSection />
      </div>
      <div>
        <ReviewSection />
      </div>
    </div>
  );
};
export default HomePage;
