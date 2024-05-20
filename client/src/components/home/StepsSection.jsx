import HeadingTwo from "../HeadingTwo";

const StepsSection = () => {
  return (
    <div className="relative flex flex-col md:flex-row justify-center items-start text-[#ffffff] py-32 gap-16 md:gap-32 max-w-screen-xl mx-auto p-8">
      <div className="md:w-1/2">
        <div className="text-center sm:text-left">
          <HeadingTwo text="How it works?" isColorChange={true} />
        </div>
        <h1 className="text-[48px] leading-[72px]  text-center sm:text-left sm:w-[380px]">
          Simple Steps to Solar Success
        </h1>
        <p className="text-[20px] text-[#929292]  text-center sm:w-[350px] md:w-[350px] mx-auto sm:text-left sm:mx-0">
          Experience hassle-free solar procurement with SolarMarket.
        </p>
      </div>
      <div className="md:w-1/2">
        <ul className="flex flex-col w-5/6 gap-5 sm:w-4/5 md:w-auto">
          <li className="flex items-start gap-4">
            <h1 className="flex text-[110px] -mt-[46px] text-[#E45416] font-bold font-calibri">
              1
            </h1>
            <div className="">
              <h4 className="text-[20px]">Post Your Requirements</h4>

              <p className=" text-[16px] text-[#929292]">
                Share details about your solar project, including size,
                location, and preferences.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <h1 className="flex text-[110px] -mt-[46px] text-[#E45416] font-bold font-calibri ">
              2
            </h1>
            <div className="">
              <h4 className=" text-[16px]">Receive Quotations</h4>
              <p className="text-[16px]  text-[#929292]">
                Sit back as our trusted solar suppliers evaluate your
                requirements and submit competitive quotations.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <h1 className="flex text-[110px] -mt-[46px] text-[#E45416] font-bold font-calibri ">
              3
            </h1>
            <div className="">
              <h4 className="text-[20px]">Compare & Select</h4>
              <p className="text-[16px] text-[#929292]">
                Review the quotations and choose the one that best suits your
                budget and specifications.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <h1 className="flex text-[110px] -mt-[46px] text-[#E45416] font-bold font-calibri ">
              4
            </h1>
            <div className="">
              <h4 className="text-[20px]">Installation</h4>
              <p className="text-[16px] text-[#929292]">
                Once you've made your selection, relax as the chosen supplier
                handles the installation.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default StepsSection;
