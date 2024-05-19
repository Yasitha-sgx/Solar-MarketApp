import { IoIosArrowForward } from "react-icons/io";

import HeadingOne from "../HeadingOne";
import HeadingTwo from "../HeadingTwo";

const BlogSection = () => {
  return (
    <div className="flex flex-col justify-center max-w-screen-xl gap-16 px-8 mx-auto py-36 md:flex-row md:gap-6 flex-2">
      {/* Text Section */}
      <div className="flex-col justify-center text-center md:w-1/3 sm:text-left">
        <HeadingTwo text="Blog" isColorChange={true} />
        <HeadingOne text={<>Stay Informed, Go Solar</>} />
        <p className=" text-[#545A5F] text-[20px] leading-[30px] mb-12">
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
      <div className="grid flex-1 grid-rows-1 gap-6 px-8 mx-auto md:w-2/3 sm:grid-cols-2 justify-items-stretch">
        <div className="bg-[#ffffff] border-[1px] shadow-md rounded-[8px]">
          <img
            src="/assets/blog-img-01.svg"
            alt=""
            className="rounded-t-[8px] object-cover w-full h-[250px]"
          />
          <div className="mt-4 ms-8">
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

        <div>
          <div className="bg-[#ffffff] border-[1px] shadow-md rounded-[8px] rounded-ee-[64px] sm:rounded-ee-none sm:rounded-se-[64px]">
            <img
              src="/assets/blog-img-02.svg"
              alt=""
              className="rounded-t-[8px] object-cover w-full h-[250px] sm:rounded-se-[64px]"
            />
            <div className="mt-4 ms-8">
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
    </div>
  );
};
export default BlogSection;
