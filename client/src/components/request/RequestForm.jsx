import { MdOutlineSolarPower } from "react-icons/md";
import { FaBatteryEmpty } from "react-icons/fa";
import { MdOutlineShower } from "react-icons/md";
import { TbChargingPile } from "react-icons/tb";

const StepOne = ({ handleNext }) => (
  <div>
    <div className="flex flex-col gap-1 mb-5">
      <label className="lbl-txt">
        What do you need quotations for?{" "}
        <span className="text-[#E45416]">*</span>
      </label>
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-3 bg-[#47647C] text-[#ffffff] rqt-frm-select">
          <MdOutlineSolarPower className="text-[22px]" />
          Solar Power System
        </div>
        <div className="flex items-center gap-3 bg-[#47647C] text-[#ffffff] rqt-frm-select">
          <FaBatteryEmpty className="text-[22px]" />
          Battery Storage
        </div>
        <div className="flex items-center gap-3 bg-[#ffffff] text-[#545A5F] rqt-frm-select">
          <MdOutlineShower className="text-[23px]" />
          Solar Hot Water
        </div>
        <div className="flex items-center gap-3 bg-[#ffffff] text-[#545A5F] rqt-frm-select">
          <TbChargingPile className="text-[23px]" /> EV-Charger
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-1 mb-5">
      <label className="lbl-txt">
        What is your Connection to the property?{" "}
        <span className="text-[#E45416]">*</span>
      </label>
      <div className="flex flex-wrap gap-2">
        <div className="bg-[#47647C] text-[#ffffff] rqt-frm-select">Owner</div>
        <div className="bg-[#ffffff] text-[#545A5F] rqt-frm-select">
          Renting
        </div>
        <div className="bg-[#ffffff] text-[#545A5F] rqt-frm-select">
          Building
        </div>
        <div className="bg-[#ffffff] text-[#545A5F] rqt-frm-select">
          Purchasing
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-1 mb-5">
      <label className="lbl-txt">
        Do you already have an existing system?{" "}
        <span className="text-[#E45416]">*</span>
      </label>
      <div className="flex flex-wrap gap-2">
        <div className="bg-[#47647C] text-[#ffffff] rqt-frm-select">Yes</div>
        <div className="bg-[#ffffff] text-[#545A5F] rqt-frm-select">No</div>
      </div>
    </div>

    <button
      type="button"
      className="btn-fill bg-[#E45416] px-[32px] py-[8px] mt-12"
      onClick={handleNext}
    >
      Next
    </button>
  </div>
);

const StepTwo = ({ handleNext }) => (
  <div>
    <div className="flex flex-col gap-1 mb-5">
      <label className="lbl-txt">
        Building roof type? <span className="text-[#E45416]">*</span>
      </label>
      <div className="flex flex-wrap gap-2">
        <div className="bg-[#47647C] text-[#ffffff] rqt-frm-select">Tile</div>
        <div className="bg-[#ffffff] text-[#545A5F] rqt-frm-select">Tin</div>
        <div className="bg-[#ffffff] text-[#545A5F] rqt-frm-select">
          Concrete
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-1 mb-5">
      <label className="lbl-txt">
        Number of storeys in the building?{" "}
        <span className="text-[#E45416]">*</span>
      </label>
      <div className="flex flex-wrap gap-2">
        <div className="bg-[#47647C] text-[#ffffff] rqt-frm-select">
          1 storey
        </div>
        <div className="bg-[#ffffff] text-[#545A5F] rqt-frm-select">
          2 storey
        </div>
        <div className="bg-[#ffffff] text-[#545A5F] rqt-frm-select">
          3+ storey
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-1 mb-5">
      <label className="lbl-txt">
        Solar system size? <span className="text-[#E45416]">*</span>
      </label>
      <div className="flex flex-wrap gap-2">
        <div className="bg-[#47647C] text-[#ffffff] rqt-frm-select">1.5 KW</div>
        <div className="bg-[#ffffff] text-[#545A5F] rqt-frm-select">2 KW</div>
        <div className="bg-[#ffffff] text-[#545A5F] rqt-frm-select">3 KW</div>
        <div className="bg-[#ffffff] text-[#545A5F] rqt-frm-select">4 KW</div>
        <div className="bg-[#ffffff] text-[#545A5F] rqt-frm-select">5 KW</div>
        <div className="bg-[#ffffff] text-[#545A5F] rqt-frm-select">5+ KW</div>
      </div>
    </div>

    <button
      type="button"
      className="btn-fill bg-[#E45416] px-[32px] py-[8px] mt-12"
      onClick={handleNext}
    >
      Next
    </button>
  </div>
);

const StepThree = ({ handleNext }) => (
  <div>
    <div className="mb-5 w-full md:w-[70%] lg:w-[60%]">
      <div className="flex flex-col gap-1">
        <label className="lbl-txt">Building Address</label>
        <input type="text" className="input" placeholder="Your Address" />
      </div>

      <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:gap-3">
        <div className="flex flex-col sm:w-[50%] lg:w-[50%] gap-1">
          <label className="lbl-txt">City</label>
          <input type="text" className="input" placeholder="City" />
        </div>
        <div className="flex flex-col sm:w-[50%] lg:w-[50%] gap-1">
          <label className="lbl-txt">District</label>
          <input type="text" className="input" placeholder="District" />
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-1">
      <label className="lbl-txt">Additional Notes</label>
      <textarea
        className="input w-full md:w-[70%] lg:w-[60%] h-20"
        placeholder="Note"
      />
    </div>
    <button
      type="submit"
      className="btn-fill bg-[#E45416] px-[32px] py-[8px] mt-12"
      onClick={handleNext}
    >
      Submit
    </button>
  </div>
);

const RequestForm = ({ tab, handleNext }) => {
  return (
    <div>
      <form action="">
        {/* Conditionally render steps based on 'tab' */}
        {tab === 1 && <StepOne handleNext={handleNext} />}
        {tab === 2 && <StepTwo handleNext={handleNext} />}
        {tab === 3 && <StepThree handleNext={handleNext} />}
      </form>
    </div>
  );
};

export default RequestForm;
