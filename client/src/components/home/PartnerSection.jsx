import HeadingTwo from "../HeadingTwo";
import HeadingOne from "../HeadingOne";
import BrandCarousel from "./BrandCarousel";

import { partnersData } from "../../constants/partners";

const PartnerSection = () => {
  return (
    <div className="flex flex-col max-w-screen-xl gap-16 px-8 py-32 mx-auto">
      {/* Text Section */}
      <div className="max-w-screen-lg mx-auto text-center ">
        <HeadingTwo text="Our Trusted Partners" />
        <HeadingOne text="Powering Change Together" />
        <p className=" text-[#545A5F] text-[16px] leading-[30px] mb-8 w-[95%] mx-auto">
          At SolarMarket, we're proud to collaborate with industry-leading solar
          suppliers who share our commitment to excellence and sustainability.
          Our trusted partners ensure that every solar system installed through
          our platform meets the highest standards of quality and reliability.
        </p>
      </div>

      {/* Brand Slider */}
      <div className="mx-auto sm:mx-0">
        <BrandCarousel partnersData={partnersData} />
      </div>
    </div>
  );
};
export default PartnerSection;
