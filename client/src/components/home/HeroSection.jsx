import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import HeadingOne from "../HeadingOne";
import HeadingTwo from "../HeadingTwo";

const HeroSection = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col items-center justify-center max-w-screen-lg gap-16 px-8 py-10 mx-auto md:py-32 md:flex-row md:gap-16 lg:gap-20">
      <div className="text-center md:w-1/2 md:text-left">
        <HeadingTwo text="Welcome to SolarMarket" />
        <div className="w-[70%] md:w-full mx-auto">
          <HeadingOne
            text={<>Your Gateway to Solar Solution</>}
            fontBold={true}
          />
        </div>
        <p className="text-gray-700 leading-[30px] mb-8 w-[80%] sm:w-[70%] mx-auto md:mx-0">
          SolarMarket connects customers with top-tier solar suppliers, ensuring
          a seamless experience from inquiry to installation.
        </p>
        <div className="flex items-center justify-center md:justify-start">
          {userInfo && userInfo.role !== "buyer" ? (
            <Link
              to="/request"
              className="flex items-center gap-3 px-8 py-3 btn-fill hover:text-white"
            >
              Browse Requests <IoIosArrowForward />
            </Link>
          ) : (
            <Link
              to="/request-quotation"
              className="flex items-center gap-3 px-8 py-3 btn-fill hover:text-white"
            >
              Request Quotation <IoIosArrowForward />
            </Link>
          )}
        </div>
      </div>
      <div className="md:w-1/2">
        <img
          src="/assets/hero-image.svg"
          alt="hero-image"
          className="mx-auto"
        />
      </div>
    </div>
  );
};

export default HeroSection;
