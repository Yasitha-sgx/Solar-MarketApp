import HeadingTwo from "../HeadingTwo";

const StepsSection = () => {
  return (
    <div className="relative flex flex-col md:flex-row justify-center items-start text-[#ffffff] py-32 gap-16 md:gap-32 w-[80%] mx-auto">
      <div className="">
        <HeadingTwo text="How it works?" isColorChange={true} />
        <h1 className="hidden sm:block text-[48px] leading-[72px]">
          Simple Steps to <br /> Solar Success
        </h1>
        <h1 className="sm:hidden text-[48px] leading-[72px]">
          Simple Steps to Solar Success
        </h1>
        <p>
          Experience hassle-free solar <br /> procurement with SolarMarket.
        </p>
      </div>
      <div>
        <ul className="flex flex-col gap-5">
          <li className="flex items-start gap-4">
            <h1 className="flex text-[110px] -mt-[46px] text-[#E45416] font-bold font-calibri">
              1
            </h1>
            <div className="">
              <h4 className="text-[20px]">Post Your Requirements</h4>
              <p className="hidden sm:block  text-[16px] text-[#929292]">
                Share details about your solar project, including size, <br />
                location, and preferences.
              </p>

              <p className="block sm:hidden text-[16px] text-[#929292]">
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
              <p className="hidden sm:block text-[16px]  text-[#929292]">
                Sit back as our trusted solar suppliers evaluate your <br />
                requirements and submit competitive quotations.
              </p>
              <p className="block sm:hidden text-[16px] text-[#929292]">
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
              <p className="hidden sm:block text-[16px] text-[#929292]">
                Review the quotations and choose the one that best suits <br />
                your budget and specifications.
              </p>
              <p className="block sm:hidden text-[16px] text-[#929292]">
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
              <p className="hidden sm:block text-[16px] text-[#929292]">
                Once you've made your selection, relax as the chosen <br />
                supplier handles the installation.
              </p>
              <p className="block sm:hidden text-[16px] text-[#929292]">
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
