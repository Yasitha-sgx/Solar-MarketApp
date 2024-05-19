import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineFilterAlt } from "react-icons/md";

const RequestSearchForm = ({
  formData,
  setFormData,
  handleFormSubmit,
  handleClearClick,
  openFilters,
  setOpenFilters,
}) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [locationFocused, setLocationFocused] = useState(false);

  const handleFormChange = (e) => {
    const { id, value, type, checked } = e.target;
    let updatedFormData = { ...formData };

    if (type === "checkbox") {
      if (
        id === "services" ||
        id === "roofType" ||
        id === "solarSystemSize" ||
        id === "numberOfStories"
      ) {
        updatedFormData[id] = checked ? value : ""; // Handle the checkbox value
      }
    } else if (id === "name") {
      if (/^\d+$/.test(value)) {
        updatedFormData.quotation_Id = value;
        delete updatedFormData.name;
      } else {
        updatedFormData.name = value;
        delete updatedFormData.quotation_Id;
      }
    } else {
      updatedFormData[id] = value;
    }

    setFormData(updatedFormData);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="flex flex-col w-full md:gap-4 sm:flex-row">
        <div className="relative flex-grow">
          {!searchFocused && !formData.name && !formData.quotation_Id ? (
            <IoMdSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#CEDBF0] text-[24px]" />
          ) : null}
          <input
            type="text"
            className="w-full pl-10 input"
            placeholder={
              !searchFocused
                ? "          Client name or quotation id"
                : "Client name or quotation id"
            }
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            id="name"
            value={formData.name}
            onChange={handleFormChange}
          />
        </div>
        <div className="relative flex-grow mb-4 sm:mb-0">
          {!locationFocused && !formData.buildingAddress ? (
            <IoLocationOutline className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#CEDBF0] text-[24px]" />
          ) : null}
          <input
            type="text"
            className="w-full pl-10 input "
            placeholder={!locationFocused ? "          Location" : "Location"}
            onFocus={() => setLocationFocused(true)}
            onBlur={() => setLocationFocused(false)}
            id="buildingAddress"
            value={formData.buildingAddress}
            onChange={handleFormChange}
          />
        </div>
        <div className="flex items-center justify-between mb-4 sm:mb-0">
          <button
            type="submit"
            className="btn-fill py-[8px] px-[24px] text-[14px] w-[160px] sm:w-[112px] md:w-[143px] sm:ms-4 md:ms-0"
          >
            Search
          </button>
          <div className="flex gap-3 sm:hidden">
            <button
              type="button"
              className={`flex items-center justify-center gap-1  text-[14px] px-[8px] py-[6px] rounded-md ${
                openFilters
                  ? "text-[#ffffff] bg-[#E45416]"
                  : "text-[#545A5F] bg-[#FEF7F0]"
              }`}
              onClick={() => setOpenFilters(!openFilters)}
            >
              <MdOutlineFilterAlt /> <p className="text-[12px]">Filters</p>
            </button>
            <button
              type="button"
              className="text-[#E45416] text-[14px]"
              onClick={handleClearClick}
            >
              Clear
            </button>
          </div>
        </div>
        {/* Mobile filters */}
        {openFilters && (
          <div className="flex flex-col gap-3 sm:hidden">
            <div className="flex flex-col gap-2">
              <p
                type="submit"
                className="text-[14px] w-[160px]  text-[#141920]"
              >
                Service
              </p>
              <div className="flex flex-wrap gap-5">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-white border-2 border-[#EE723C] rounded-sm appearance-none    checked:bg-[#E45416] checked:border-0"
                    id="services"
                    value="Solar Power System"
                    checked={formData.services === "Solar Power System"}
                    onChange={handleFormChange}
                  />
                  <label className="lbl-txt !text-[13px]">
                    Solar Power System
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-white border-2 border-[#EE723C] rounded-sm appearance-none    checked:bg-[#E45416] checked:border-0"
                    id="services"
                    value="Battery Storage"
                    checked={formData.services === "Battery Storage"}
                    onChange={handleFormChange}
                  />
                  <label className="lbl-txt !text-[13px]">
                    Battery Storage
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-white border-2 border-[#EE723C] rounded-sm appearance-none    checked:bg-[#E45416] checked:border-0"
                    id="services"
                    value="Solar Hot Water"
                    checked={formData.services === "Solar Hot Water"}
                    onChange={handleFormChange}
                  />
                  <label className="lbl-txt !text-[13px]">
                    Solar Hot Water
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-white border-2 border-[#EE723C] rounded-sm appearance-none    checked:bg-[#E45416] checked:border-0"
                    id="services"
                    value="EV Charger"
                    checked={formData.services === "EV Charger"}
                    onChange={handleFormChange}
                  />
                  <label className="lbl-txt !text-[13px]">EV Charger</label>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p
                type="submit"
                className="text-[14px] w-[160px]  text-[#141920]"
              >
                Roof Types
              </p>
              <div className="flex flex-wrap gap-5">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-white border-2 border-[#EE723C] rounded-sm appearance-none    checked:bg-[#E45416] checked:border-0"
                    id="roofType"
                    value="Tile"
                    checked={formData.roofType === "Tile"}
                    onChange={handleFormChange}
                  />
                  <label className="lbl-txt !text-[13px]">Tile</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-white border-2 border-[#EE723C] rounded-sm appearance-none    checked:bg-[#E45416] checked:border-0"
                    id="roofType"
                    value="Tin"
                    checked={formData.roofType === "Tin"}
                    onChange={handleFormChange}
                  />
                  <label className="lbl-txt !text-[13px]">Tin</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-white border-2 border-[#EE723C] rounded-sm appearance-none    checked:bg-[#E45416] checked:border-0"
                    id="roofType"
                    value="Concrete"
                    checked={formData.roofType === "Concrete"}
                    onChange={handleFormChange}
                  />
                  <label className="lbl-txt !text-[13px]">Concrete</label>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p
                type="submit"
                className="text-[14px] w-[160px]  text-[#141920]"
              >
                Wattage
              </p>
              <div className="flex flex-wrap gap-5">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-white border-2 border-[#EE723C] rounded-sm appearance-none    checked:bg-[#E45416] checked:border-0"
                    id="solarSystemSize"
                    value="1.5 KW"
                    checked={formData.solarSystemSize === "1.5 KW"}
                    onChange={handleFormChange}
                  />
                  <label className="lbl-txt !text-[13px]">1.5 KW</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-white border-2 border-[#EE723C] rounded-sm appearance-none    checked:bg-[#E45416] checked:border-0"
                    id="solarSystemSize"
                    value="2 KW"
                    checked={formData.solarSystemSize === "2 KW"}
                    onChange={handleFormChange}
                  />
                  <label className="lbl-txt !text-[13px]">2 KW</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-white border-2 border-[#EE723C] rounded-sm appearance-none    checked:bg-[#E45416] checked:border-0"
                    id="solarSystemSize"
                    value="3 KW"
                    checked={formData.solarSystemSize === "3 KW"}
                    onChange={handleFormChange}
                  />
                  <label className="lbl-txt !text-[13px]">3 KW</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-white border-2 border-[#EE723C] rounded-sm appearance-none    checked:bg-[#E45416] checked:border-0"
                    id="solarSystemSize"
                    value="4 KW"
                    checked={formData.solarSystemSize === "4 KW"}
                    onChange={handleFormChange}
                  />
                  <label className="lbl-txt !text-[13px]">4 KW</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-white border-2 border-[#EE723C] rounded-sm appearance-none    checked:bg-[#E45416] checked:border-0"
                    id="solarSystemSize"
                    value="5 KW"
                    checked={formData.solarSystemSize === "5 KW"}
                    onChange={handleFormChange}
                  />
                  <label className="lbl-txt !text-[13px]">5 KW</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-white border-2 border-[#EE723C] rounded-sm appearance-none    checked:bg-[#E45416] checked:border-0"
                    id="solarSystemSize"
                    value="5+ KW"
                    checked={formData.solarSystemSize === "5+ KW"}
                    onChange={handleFormChange}
                  />
                  <label className="lbl-txt !text-[13px]">5+ KW</label>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p
                type="submit"
                className="text-[14px] w-[160px]  text-[#141920]"
              >
                Storeys
              </p>
              <div className="flex flex-wrap gap-5">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-white border-2 border-[#EE723C] rounded-sm appearance-none    checked:bg-[#E45416] checked:border-0"
                    id="numberOfStories"
                    value="1 storey"
                    checked={formData.numberOfStories === "1 storey"}
                    onChange={handleFormChange}
                  />
                  <label className="lbl-txt !text-[13px]">1 storey</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-white border-2 border-[#EE723C] rounded-sm appearance-none    checked:bg-[#E45416] checked:border-0"
                    id="numberOfStories"
                    value="2 storey"
                    checked={formData.numberOfStories === "2 storey"}
                    onChange={handleFormChange}
                  />
                  <label className="lbl-txt !text-[13px]">2 storey</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-white border-2 border-[#EE723C] rounded-sm appearance-none    checked:bg-[#E45416] checked:border-0"
                    id="numberOfStories"
                    value="3+ storey"
                    checked={formData.numberOfStories === "3+ storey"}
                    onChange={handleFormChange}
                  />
                  <label className="lbl-txt !text-[13px]">3+ storey</label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex-wrap hidden gap-3 mt-2 sm:flex">
        <select
          id="services"
          value={formData.services}
          onChange={handleFormChange}
          className="border border-gray-300 text-[#545A5F] text-[12px] text-sm rounded-lg focus:ring-[#EE723C] focus:border-[#EE723C] w-[115px] md:w-[120px] focus:outline-[#EE723C] block w- p-2 "
        >
          <option value="">Service</option>
          <option value="Solar Power System">Solar Power System</option>
          <option value="Battery Storage">Battery Storage</option>
          <option value="Solar Hot Water">Solar Hot Water</option>
          <option value="EV Charger">EV Charger</option>
        </select>
        <select
          id="roofType"
          value={formData.roofType}
          onChange={handleFormChange}
          className="border border-gray-300 text-[#545A5F] text-[12px] text-sm rounded-lg focus:ring-[#EE723C] focus:border-[#EE723C] w-[115px] md:w-[120px] focus:outline-[#EE723C] block w- p-2 "
        >
          <option value="">Roof Types</option>
          <option value="Tile">Tile</option>
          <option value="Tin">Tin</option>
          <option value="Concrete">Concrete</option>
        </select>
        <select
          id="solarSystemSize"
          value={formData.solarSystemSize}
          onChange={handleFormChange}
          className="border border-gray-300 text-[#545A5F] text-[12px] text-sm rounded-lg focus:ring-[#EE723C] focus:border-[#EE723C] w-[115px] md:w-[120px] focus:outline-[#EE723C] block w- p-2 "
        >
          <option value="">Wattage</option>
          <option value="1.5 KW">1.5 KW</option>
          <option value="2 KW">2 KW</option>
          <option value="3 KW">3 KW</option>
          <option value="4 KW">4 KW</option>
          <option value="5 KW">5 KW</option>
          <option value="5+ KW">5+ KW</option>
        </select>
        <select
          id="numberOfStories"
          value={formData.numberOfStories}
          onChange={handleFormChange}
          className="border border-gray-300 text-[#545A5F] text-[12px] text-sm rounded-lg focus:ring-[#EE723C] focus:border-[#EE723C] w-[115px] md:w-[120px] focus:outline-[#EE723C] block w- p-2 "
        >
          <option value="">Storeys</option>
          <option value="1 storey">1 storey</option>
          <option value="2 storey">2 storey</option>
          <option value="3+ storey">3+ storey</option>
        </select>
        <button
          type="button"
          className="text-[#E45416] text-[14px]"
          onClick={handleClearClick}
        >
          Clear
        </button>
      </div>
    </form>
  );
};
export default RequestSearchForm;
