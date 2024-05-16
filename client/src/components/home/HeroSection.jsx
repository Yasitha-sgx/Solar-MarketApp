import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";

import HeadingOne from "../HeadingOne";
import HeadingTwo from "../HeadingTwo";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col items-center justify-center gap-16 py-10 mx-auto md:py-32 md:flex-row md:gap-16 lg:gap-20 w-[80%]">
      <div className="text-center md:text-left ">
        <HeadingTwo text="Welcome to SolarMarket" />
        <HeadingOne
          text={
            <>
              Your Gateway to <br /> Solar Solution
            </>
          }
          fontBold={true}
        />
        <p className="text-[#545A5F] leading-[30px] mb-8">
          SolarMarket connects customers with top-tier <br />
          solar suppliers, ensuring a seamless
          <br /> experience from inquiry to installation.
        </p>
        <div className="flex items-center justify-center md:justify-start">
          {userInfo && userInfo.role !== "buyer" ? (
            <Link
              to="/request"
              className="flex items-center gap-[12px] btn-fill px-[32px] py-[12px] hover:text-[#ffffff]"
            >
              Brows Requests <IoIosArrowForward />
            </Link>
          ) : (
            <Link
              to="/request-quotation"
              className="flex items-center gap-[12px] btn-fill px-[32px] py-[12px] hover:text-[#ffffff]"
            >
              Request Quotation <IoIosArrowForward />
            </Link>
          )}
        </div>
      </div>
      <div className="">
        <img src="/assets/hero-image.svg" alt="hero-image" />
      </div>
    </div>
  );
};
export default HeroSection;
