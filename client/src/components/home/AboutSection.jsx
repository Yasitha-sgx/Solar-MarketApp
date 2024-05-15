import HeadingOne from "../HeadingOne";
import HeadingTwo from "../HeadingTwo";

const AboutSection = () => {
  return (
    <div className="flex py-36 flex-col gap-16">
      {/* Text Section */}
      <div className="mx-auto text-center w-[80%]">
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
      <div className="grid grid-cols-1 justify-items-stretch sm:grid-cols-2 md:grid-cols-3 w-[80%] 2xl:w-[70%] mx-auto gap-6">
        {/* Grid Column 01 */}
        <div className="border-[1px] py-14 px-8 shadow-lg rounded-[8px]">
          <img src="/assets/storefront.svg" alt="store icon" className="mb-8" />
          <h4 className="text-[20px] font-bold mb-4">Transparency</h4>
          <p className="text-16px text-[#545A5F] leading-[24px]">
            Compare quotations from <br /> multiple suppliers to find the <br />
            best fit for your needs.
          </p>
        </div>

        {/* Grid Column 02 */}
        <div className="border-[1px] py-14 px-8 shadow-lg rounded-[8px] ">
          <img src="/assets/award_star.svg" alt="store icon" className="mb-8" />
          <h4 className="text-[20px] font-bold mb-4">Quality Assurance</h4>
          <p className="text-16px text-[#545A5F] leading-[24px]">
            We partner with trusted <br /> suppliers to deliver reliable, <br />
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
          <p className="text-16px text-[#545A5F] leading-[24px] hidden sm:block">
            Our user-friendly platform <br /> streamlines the process, making
            <br /> it effortless to find the perfect <br /> solar solution.
          </p>
          <p className="text-16px text-[#545A5F] leading-[24px] block sm:hidden">
            Our user-friendly platform <br /> streamlines the process, <br />{" "}
            making it effortless to find <br /> the perfect solar solution.
          </p>
        </div>
      </div>
    </div>
  );
};
export default AboutSection;
