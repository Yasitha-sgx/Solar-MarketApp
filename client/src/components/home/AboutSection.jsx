import HeadingOne from "../HeadingOne";
import HeadingTwo from "../HeadingTwo";

const AboutSection = () => {
  return (
    <div className="flex flex-col max-w-screen-xl gap-16 px-8 mx-auto py-36">
      {/* Text Section */}
      <div className="text-center">
        <HeadingTwo text="Why SolarMarket?" />
        <HeadingOne
          text={
            <>
              Empowering Your <br />
              Solar Journey
            </>
          }
        />
        <p className="hidden sm:block text-[#545A5F] text-[16px] leading-[30px] mb-8">
          At SolarMarket, we believe in democratizing access to solar energy
          <br />
          solutions. Here's why you should choose us:
        </p>
        <p className=" sm:hidden text-[#545A5F] text-[16px] leading-[30px] mb-8">
          At SolarMarket, we believe in democratizing access to solar energy
          solutions. Here's why you <br /> should choose us:
        </p>
      </div>

      {/* Box Section */}
      <div className="grid grid-cols-1 gap-6 justify-items-stretch sm:grid-cols-2 md:grid-cols-3">
        {/* Grid Column 01 */}
        <div className="border-[1px] py-14 px-8 shadow-lg rounded-[8px]">
          <img src="/assets/storefront.svg" alt="store icon" className="mb-8" />
          <h4 className="text-[20px] font-bold mb-4">Transparency</h4>
          <p className="text-16px text-[#545A5F] leading-[24px] w-60 sm:w-auto">
            Compare quotations from multiple suppliers to find the best fit for
            your needs.
          </p>
        </div>

        {/* Grid Column 02 */}
        <div className="border-[1px] py-14 px-8 shadow-lg rounded-[8px] ">
          <img src="/assets/award_star.svg" alt="store icon" className="mb-8" />
          <h4 className="text-[20px] font-bold mb-4">Quality Assurance</h4>
          <p className="text-16px text-[#545A5F] leading-[24px] w-60 sm:w-auto">
            We partner with trusted suppliers to deliver reliable,
            high-performance solar systems.
          </p>
        </div>

        {/* Grid Column 03 */}
        <div className="border-[1px] py-14 px-8 shadow-lg rounded-[8px] rounded-ee-[100px] sm:rounded-ee-[140px] md:rounded-ee-none md:rounded-se-[140px] sm:col-span-2 md:col-span-1 bg-[#FFF8F1]">
          <img
            src="/assets/acute.svg"
            alt="store icon"
            className="mb-8 md:mb-14"
          />
          <h4 className="text-[20px] font-bold mb-4">Transparency</h4>
          <p className="text-16px text-[#545A5F] leading-[24px] w-60 md:w-auto">
            Our user-friendly platform streamlines the process, making it
            effortless to find the perfect solar solution.
          </p>
        </div>
      </div>
    </div>
  );
};
export default AboutSection;
