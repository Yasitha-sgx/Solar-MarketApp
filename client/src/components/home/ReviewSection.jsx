import { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import HeadingOne from "../HeadingOne";
import HeadingTwo from "../HeadingTwo";
import TestimonialCard from "./TestimonialCard";
import { reviewData } from "../../constants/review";

const ReviewSection = () => {
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex + 3;
      return newIndex >= reviewData.length ? 0 : newIndex;
    });
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex - 3;
      return newIndex < 0 ? reviewData.length - 3 : newIndex;
    });
  };

  return (
    <div className="py-36 flex flex-col-reverse md:flex-row items-center justify-center w-[80%] mx-auto sm:gap-5 gap-16">
      {/* Testimonials */}
      <div className="flex gap-5 md:w-2/4">
        <div className="flex flex-col items-center gap-4 sm:items-start">
          <IoIosArrowUp
            className="cursor-pointer sm:hidden hover:text-[#E45416]"
            onClick={prevSlide}
          />
          {reviewData.slice(startIndex, startIndex + 3).map((item) => (
            <TestimonialCard key={item.id} reviewData={item} />
          ))}
          <IoIosArrowDown
            className="cursor-pointer sm:hidden hover:text-[#E45416]"
            onClick={nextSlide}
          />
        </div>
        <div className="flex-col justify-between hidden sm:flex">
          <IoIosArrowUp
            className="cursor-pointer hover:text-[#E45416]"
            onClick={prevSlide}
          />
          <IoIosArrowDown
            className="cursor-pointer hover:text-[#E45416]"
            onClick={nextSlide}
          />
        </div>
      </div>

      {/* Text */}
      <div className="text-center md:w-2/4 md:text-left">
        <HeadingTwo text="Customer Reviews" />
        <HeadingOne
          text={
            <>
              See What Our <br /> Customers Are Saying
            </>
          }
        />
        <p className="text-[#545A5F] text-[16px]">
          Join the ranks of satisfied SolarMarket customers who have embraced
          solar energy and transformed their lives. Read their testimonials
          below
        </p>
      </div>
    </div>
  );
};
export default ReviewSection;
