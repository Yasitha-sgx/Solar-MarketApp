import { MdOutlineSolarPower } from "react-icons/md";
import { FaBatteryEmpty } from "react-icons/fa";
import { MdOutlineShower } from "react-icons/md";
import { TbChargingPile } from "react-icons/tb";
import { useState } from "react";

const RequestForm = ({
  tab,
  handleNext,
  formData,
  setFormData,
  handleQuotationSubmit,
  formErrors,
  isLoading,
  setFormErrors,
}) => {
  const [isSolarPowerSystem, setIsSolarPowerSystem] = useState(true);
  const [isBatteryStorage, setIsBatteryStorage] = useState(false);
  const [isSolarHotWater, setIsSolarHotWater] = useState(false);
  const [isEvCharger, setIsEVCharger] = useState(false);
  const [property, setProperty] = useState(1);
  const [existingSystem, setExistingSystem] = useState(1);
  const [roofType, setRoofType] = useState(1);
  const [storeys, setStoreys] = useState(1);
  const [wattage, setWattage] = useState(1);
  const [error, setError] = useState(false);

  const setStepOneData = () => {
    const propertyConnectionOptions = [
      "Owner",
      "Renting",
      "Building",
      "Purchasing",
    ];
    const propertyConnectionValue = propertyConnectionOptions[property - 1];

    const updatedFormData = {
      ...formData,
      propertyConnection: propertyConnectionValue,
      existingSystem: existingSystem === 1,
      services: [
        isSolarPowerSystem && "Solar Power System",
        isBatteryStorage && "Battery Storage",
        isSolarHotWater && "Solar Hot Water",
        isEvCharger && "EV Charger",
      ].filter(Boolean),
    };

    setFormData(updatedFormData);

    if (updatedFormData.services.length === 0) {
      setError(true);
    } else {
      handleNext();
    }
  };

  const setStepTwoData = () => {
    const roofTypeOptions = ["Tile", "Tin", "Concrete"];
    const roofTypeValue = roofTypeOptions[roofType - 1];

    const storeysOptions = ["1 storey", "2 storey", "3+ storey"];
    const storeysValue = storeysOptions[storeys - 1];

    const wattageOptions = ["1.5 KW", "2 KW", "3 KW", "4 KW", "5 KW", "5+ KW"];
    const wattageValue = wattageOptions[wattage - 1];

    const updatedFormData = {
      ...formData,
      roofType: roofTypeValue,
      numberOfStories: storeysValue,
      solarSystemSize: wattageValue,
    };

    setFormData(updatedFormData);

    handleNext();
  };

  const propertySelector = (id) => {
    setProperty(id);
  };

  const existingSystemSelector = (id) => {
    setExistingSystem(id);
  };

  const roofTypeSelector = (id) => {
    setRoofType(id);
  };

  const storeysSelector = (id) => {
    setStoreys(id);
  };

  const wattageSelector = (id) => {
    setWattage(id);
  };

  const onInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
    setFormErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
  };

  return (
    <div>
      <form onSubmit={handleQuotationSubmit}>
        {/* Step 01 */}
        <div style={{ display: tab === 1 ? "block" : "none" }}>
          <div>
            <div className="flex flex-col gap-1 mb-5">
              <label className="lbl-txt">
                What do you need quotations for?{""}
                <span className="text-[#E45416]">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className={`flex items-center gap-3  ${
                    isSolarPowerSystem
                      ? "bg-[#47647C] text-[#ffffff]"
                      : "bg-[#ffffff] text-[#545A5F]"
                  } rqt-frm-select`}
                  onClick={() => {
                    setIsSolarPowerSystem(!isSolarPowerSystem);
                    setError(false);
                  }}
                >
                  <MdOutlineSolarPower className="text-[22px]" />
                  Solar Power System
                </button>
                <button
                  type="button"
                  className={`flex items-center gap-3 ${
                    isBatteryStorage
                      ? "bg-[#47647C] text-[#ffffff]"
                      : "bg-[#ffffff] text-[#545A5F]"
                  } rqt-frm-select`}
                  onClick={() => {
                    setIsBatteryStorage(!isBatteryStorage);
                    setError(false);
                  }}
                >
                  <FaBatteryEmpty className="text-[22px]" />
                  Battery Storage
                </button>
                <button
                  type="button"
                  className={`flex items-center gap-3 ${
                    isSolarHotWater
                      ? "bg-[#47647C] text-[#ffffff]"
                      : "bg-[#ffffff] text-[#545A5F]"
                  } rqt-frm-select`}
                  onClick={() => {
                    setIsSolarHotWater(!isSolarHotWater);
                    setError(false);
                  }}
                >
                  <MdOutlineShower className="text-[23px]" />
                  Solar Hot Water
                </button>
                <button
                  type="button"
                  className={`flex items-center gap-3 ${
                    isEvCharger
                      ? "bg-[#47647C] text-[#ffffff]"
                      : "bg-[#ffffff] text-[#545A5F]"
                  } rqt-frm-select`}
                  onClick={() => {
                    setIsEVCharger(!isEvCharger);
                    setError(false);
                  }}
                >
                  <TbChargingPile className="text-[23px]" /> EV-Charger
                </button>
                {error && (
                  <p className="mt-1 text-red-600 text-[12px]">
                    Missed a required field
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1 mb-5">
              <label className="lbl-txt">
                What is your Connection to the property?{""}
                <span className="text-[#E45416]">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className={`flex items-center gap-3  ${
                    property === 1
                      ? "bg-[#47647C] text-[#ffffff]"
                      : "bg-[#ffffff] text-[#545A5F]"
                  } rqt-frm-select`}
                  onClick={() => propertySelector(1)}
                >
                  Owner
                </button>
                <button
                  type="button"
                  className={`flex items-center gap-3  ${
                    property === 2
                      ? "bg-[#47647C] text-[#ffffff]"
                      : "bg-[#ffffff] text-[#545A5F]"
                  } rqt-frm-select`}
                  onClick={() => propertySelector(2)}
                >
                  Renting
                </button>
                <button
                  type="button"
                  className={`flex items-center gap-3  ${
                    property === 3
                      ? "bg-[#47647C] text-[#ffffff]"
                      : "bg-[#ffffff] text-[#545A5F]"
                  } rqt-frm-select`}
                  onClick={() => propertySelector(3)}
                >
                  Building
                </button>
                <button
                  type="button"
                  className={`flex items-center gap-3  ${
                    property === 4
                      ? "bg-[#47647C] text-[#ffffff]"
                      : "bg-[#ffffff] text-[#545A5F]"
                  } rqt-frm-select`}
                  onClick={() => propertySelector(4)}
                >
                  Purchasing
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1 mb-5">
              <label className="lbl-txt">
                Do you already have a existing system?{""}
                <span className="text-[#E45416]">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className={`flex items-center gap-3  ${
                    existingSystem === 1
                      ? "bg-[#47647C] text-[#ffffff]"
                      : "bg-[#ffffff] text-[#545A5F]"
                  } rqt-frm-select`}
                  onClick={() => existingSystemSelector(1)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`flex items-center gap-3  ${
                    existingSystem === 2
                      ? "bg-[#47647C] text-[#ffffff]"
                      : "bg-[#ffffff] text-[#545A5F]"
                  } rqt-frm-select`}
                  onClick={() => existingSystemSelector(2)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn-fill bg-[#E45416] px-[32px] py-[8px] mt-12"
            onClick={setStepOneData}
          >
            Next
          </button>
        </div>

        {/* Step 02 */}
        <div style={{ display: tab === 2 ? "block" : "none" }}>
          <div className="flex flex-col gap-1 mb-5">
            <label className="lbl-txt">
              Building roof type?{""}
              <span className="text-[#E45416]">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={`flex items-center gap-3  ${
                  roofType === 1
                    ? "bg-[#47647C] text-[#ffffff]"
                    : "bg-[#ffffff] text-[#545A5F]"
                } rqt-frm-select`}
                onClick={() => roofTypeSelector(1)}
              >
                Tile
              </button>
              <button
                type="button"
                className={`flex items-center gap-3  ${
                  roofType === 2
                    ? "bg-[#47647C] text-[#ffffff]"
                    : "bg-[#ffffff] text-[#545A5F]"
                } rqt-frm-select`}
                onClick={() => roofTypeSelector(2)}
              >
                Tin
              </button>
              <button
                type="button"
                className={`flex items-center gap-3  ${
                  roofType === 3
                    ? "bg-[#47647C] text-[#ffffff]"
                    : "bg-[#ffffff] text-[#545A5F]"
                } rqt-frm-select`}
                onClick={() => roofTypeSelector(3)}
              >
                Concrete
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1 mb-5">
            <label className="lbl-txt">
              Number of storeys in the building?{""}
              <span className="text-[#E45416]">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={`flex items-center gap-3  ${
                  storeys === 1
                    ? "bg-[#47647C] text-[#ffffff]"
                    : "bg-[#ffffff] text-[#545A5F]"
                } rqt-frm-select`}
                onClick={() => storeysSelector(1)}
              >
                1 storey
              </button>
              <button
                type="button"
                className={`flex items-center gap-3  ${
                  storeys === 2
                    ? "bg-[#47647C] text-[#ffffff]"
                    : "bg-[#ffffff] text-[#545A5F]"
                } rqt-frm-select`}
                onClick={() => storeysSelector(2)}
              >
                2 storey
              </button>
              <button
                type="button"
                className={`flex items-center gap-3  ${
                  storeys === 3
                    ? "bg-[#47647C] text-[#ffffff]"
                    : "bg-[#ffffff] text-[#545A5F]"
                } rqt-frm-select`}
                onClick={() => storeysSelector(3)}
              >
                3+ storey
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1 mb-5">
            <label className="lbl-txt">
              Solar system size?{""}
              <span className="text-[#E45416]">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={`flex items-center gap-3  ${
                  wattage === 1
                    ? "bg-[#47647C] text-[#ffffff]"
                    : "bg-[#ffffff] text-[#545A5F]"
                } rqt-frm-select`}
                onClick={() => wattageSelector(1)}
              >
                1.5 KW
              </button>
              <button
                type="button"
                className={`flex items-center gap-3  ${
                  wattage === 2
                    ? "bg-[#47647C] text-[#ffffff]"
                    : "bg-[#ffffff] text-[#545A5F]"
                } rqt-frm-select`}
                onClick={() => wattageSelector(2)}
              >
                2 KW
              </button>
              <button
                type="button"
                className={`flex items-center gap-3  ${
                  wattage === 3
                    ? "bg-[#47647C] text-[#ffffff]"
                    : "bg-[#ffffff] text-[#545A5F]"
                } rqt-frm-select`}
                onClick={() => wattageSelector(3)}
              >
                3 KW
              </button>
              <button
                type="button"
                className={`flex items-center gap-3  ${
                  wattage === 4
                    ? "bg-[#47647C] text-[#ffffff]"
                    : "bg-[#ffffff] text-[#545A5F]"
                } rqt-frm-select`}
                onClick={() => wattageSelector(4)}
              >
                4 KW
              </button>
              <button
                type="button"
                className={`flex items-center gap-3  ${
                  wattage === 5
                    ? "bg-[#47647C] text-[#ffffff]"
                    : "bg-[#ffffff] text-[#545A5F]"
                } rqt-frm-select`}
                onClick={() => wattageSelector(5)}
              >
                5 KW
              </button>
              <button
                type="button"
                className={`flex items-center gap-3  ${
                  wattage === 6
                    ? "bg-[#47647C] text-[#ffffff]"
                    : "bg-[#ffffff] text-[#545A5F]"
                } rqt-frm-select`}
                onClick={() => wattageSelector(6)}
              >
                5+ KW
              </button>
            </div>
          </div>
          <button
            type="button"
            className="btn-fill bg-[#E45416] px-[32px] py-[8px] mt-12"
            onClick={setStepTwoData}
          >
            Next
          </button>
        </div>

        {/* Step 03 */}
        <div style={{ display: tab === 3 ? "block" : "none" }}>
          <div className="mb-5 w-full sm:w-[95%] md:w-[500px] lg:w-[550px]">
            <div className="flex flex-col gap-1">
              <label className="lbl-txt">Building Address</label>
              <input
                type="text"
                className={`input ${
                  formErrors.buildingAddress && "!border-red-600"
                }`}
                placeholder="Your Address"
                id="buildingAddress"
                value={formData.buildingAddress}
                onChange={onInputChange}
              />
              <p className="mt-1 text-red-600 text-[12px]">
                {formErrors.buildingAddress}
              </p>
            </div>

            <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:gap-6">
              <div className="flex flex-col sm:w-[50%] gap-1">
                <label className="lbl-txt">City</label>
                <input
                  type="text"
                  className={`input ${formErrors.city && "!border-red-600"}`}
                  placeholder="City"
                  id="city"
                  value={formData.city}
                  onChange={onInputChange}
                />
                <p className="mt-1 text-red-600 text-[12px]">
                  {formErrors.city}
                </p>
              </div>
              <div className="flex flex-col sm:w-[50%] gap-1">
                <label className="lbl-txt">District</label>
                <input
                  type="text"
                  className={`input ${
                    formErrors.district && "!border-red-600"
                  }`}
                  placeholder="District"
                  id="district"
                  value={formData.district}
                  onChange={onInputChange}
                />
                <p className="mt-1 text-red-600 text-[12px]">
                  {formErrors.district}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="lbl-txt">Additional Notes</label>
            <textarea
              className={`input w-full sm:w-[95%] md:w-[500px] lg:w-[550px] h-20 ${
                formErrors.additionalNotes && "!border-red-600"
              }`}
              placeholder="Note"
              id="additionalNotes"
              value={formData.additionalNotes}
              onChange={onInputChange}
            />
            <p className="mt-1 text-red-600 text-[12px]">
              {formErrors.additionalNotes}
            </p>
          </div>
          <button
            type="submit"
            className="btn-fill bg-[#E45416] px-[32px] py-[8px] mt-12"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default RequestForm;
