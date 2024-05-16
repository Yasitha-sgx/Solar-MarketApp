import { useState } from "react";
import RequestForm from "./RequestForm";

const RequestFormLayout = () => {
  const [tab, setTab] = useState(1);

  const handleNext = () => {
    if (tab === 1) {
      setTab(2);
    } else if (tab === 2) {
      setTab(3);
    } else {
      // doing thing
    }
  };

  return (
    <div>
      <div className="mb-10">
        {/* Tab Nav */}
        <div className="flex justify-between sm:w-[299px] border-[1px] rounded-[24px] text-[14px] text-[#545A5F] mx-auto sm:mx-0">
          <span
            className={`py-[8px] px-[24px] rounded-s-[24px] ${
              tab === 1 && "bg-[#47647C] text-[#ffffff] rounded-[24px]"
            }`}
          >
            Step 01
          </span>
          <span
            className={`py-[8px] px-[24px] ${
              tab === 2 && "bg-[#47647C] text-[#ffffff] rounded-[24px]"
            }`}
          >
            Step 02
          </span>
          <span
            className={`py-[8px] px-[24px] rounded-e-[24px] ${
              tab === 3 &&
              "bg-[#47647C] text-[#ffffff] rounded-e-[24px] rounded-[24px]"
            }`}
          >
            Step 03
          </span>
        </div>
      </div>

      {/* form */}
      <RequestForm tab={tab} handleNext={handleNext} />
    </div>
  );
};

export default RequestFormLayout;
