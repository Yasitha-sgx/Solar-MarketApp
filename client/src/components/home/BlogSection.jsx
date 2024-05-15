import { IoIosArrowForward } from "react-icons/io";

import HeadingOne from "../HeadingOne";
import HeadingTwo from "../HeadingTwo";

const BlogSection = () => {
  return (
    <div className="mx-auto py-36 flex flex-col justify-center lg:flex-row w-[80%] gap-16 lg:gap-8 flex-2">
      {/* Text Section */}
      <div className="text-center sm:text-left justify-center flex-col">
        <HeadingTwo text="Blog" isColorChange={true} />
        <HeadingOne
          text={
            <>
              Stay Informed, <br /> Go Solar
            </>
          }
        />
        <p className="hidden lg:block text-[#545A5F] text-[20px] leading-[30px] mb-12">
          Explore the latest trends, tips, <br /> and insights about solar
          energy on our <br /> blog. Our articles cover everything <br /> you
          need to know to make informed <br /> decisions about solar power.
        </p>
        <p className="lg:hidden text-[#545A5F] text-[16px] sm:text-[20px] leading-[30px] mb-12">
          Explore the latest trends, tips, and insights about solar energy on
          our blog. Our articles cover everything you need to know to make
          informed decisions about solar power.
        </p>

        <div className="flex items-center justify-center sm:justify-start">
          <button className="flex items-center gap-[12px] btn-outline py-[12px] px-[32px] text-[16px]">
            Read More <IoIosArrowForward />
          </button>
        </div>
      </div>

      {/* Card Section */}
      <div className="grid grid-rows-1 sm:grid-cols-2 justify-items-stretch gap-6 flex-1 mx-auto w-[90%] sm:w-full">
        <div className="bg-[#ffffff] border-[1px] shadow-md rounded-[8px]">
          <img
            src="/assets/blog-img-01.svg"
            alt=""
            className="rounded-t-[8px] object-cover w-full h-[250px]"
          />
          <div className="ms-8 mt-4">
            <h4 className="text-[20px] font-semibold mb-4">
              Learn about solar power
            </h4>
            <p className="text-[#545A5F] leading-[25px] mb-8 w-[95%]">
              Solar power, the clean, abundant energy source of tomorrow, is
              here today. By capturing sunlight and converting it into
              electricity...
            </p>
          </div>
        </div>

        <div className="bg-[#ffffff] border-[1px] shadow-md rounded-[8px] rounded-ee-[64px] sm:rounded-ee-none sm:rounded-se-[64px]">
          <img
            src="/assets/blog-img-02.svg"
            alt=""
            className="rounded-t-[8px] object-cover w-full h-[250px] sm:rounded-se-[64px]"
          />
          <div className="ms-8 mt-4">
            <h4 className="text-[20px] font-semibold mb-4">
              Learn about solar power
            </h4>
            <p className="text-[#545A5F] leading-[25px] mb-8 w-[95%]">
              Solar power, the clean, abundant energy source of tomorrow, is
              here today. By capturing sunlight and converting it into
              electricity...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogSection;
