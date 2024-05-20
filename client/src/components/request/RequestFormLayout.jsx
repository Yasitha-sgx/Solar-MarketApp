import { useState } from "react";
import toast from "react-hot-toast";
import RequestForm from "./RequestForm";
import { useNavigate } from "react-router-dom";

import { validateRequestForm } from "../../utils/validations/requestFormValidations";
import { useRequestQuotationMutation } from "../../slices/requestApiSlice";

const RequestFormLayout = () => {
  const [tab, setTab] = useState(1);
  const [formData, setFormData] = useState({
    services: "",
    propertyConnection: "",
    existingSystem: false,
    roofType: "",
    numberOfStories: "",
    solarSystemSize: "",
    buildingAddress: "",
    city: "",
    district: "",
    additionalNotes: "",
  });

  const [formErrors, setFormErrors] = useState({
    buildingAddress: "",
    city: "",
    district: "",
    additionalNotes: "",
  });

  const navigate = useNavigate();

  const [createRequest, { isLoading }] = useRequestQuotationMutation();

  const handleNext = () => {
    if (tab === 1) {
      setTab(2);
    } else if (tab === 2) {
      setTab(3);
    }
  };

  const handleQuotationSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateRequestForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        await createRequest(formData).unwrap();
        toast.success("Quotation successfully created!");
        navigate("/request");
      } catch (err) {
        toast.error(err?.data?.error || err.error);
      }
    } else {
      setFormErrors(validationErrors);
    }
  };

  return (
    <div>
      <div className="mb-10">
        {/* Tab Navigation */}
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

      {/* Render RequestForm component */}
      <RequestForm
        tab={tab}
        handleNext={handleNext}
        formData={formData}
        setFormData={setFormData}
        handleQuotationSubmit={handleQuotationSubmit}
        formErrors={formErrors}
        isLoading={isLoading}
        setFormErrors={setFormErrors}
      />
    </div>
  );
};

export default RequestFormLayout;
