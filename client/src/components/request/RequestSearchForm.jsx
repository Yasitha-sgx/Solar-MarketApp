import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineFilterAlt } from "react-icons/md";

const RequestSearchForm = ({
  formData,
  setFormData,
  handleFormSubmit,
  handleClearClick,
}) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [locationFocused, setLocationFocused] = useState(false);

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    let updatedFormData = { ...formData };

    if (id === "name") {
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
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="btn-fill py-[8px] px-[24px] text-[14px] w-[160px] sm:w-[112px] md:w-[143px] sm:ms-4 md:ms-0"
          >
            Search
          </button>
          <div className="flex gap-3 sm:hidden">
            <button className="flex items-center gap-1 text-[#545A5F] text-[14px] bg-[#FEF7F0] px-[8px] py-[6px]">
              <MdOutlineFilterAlt /> <p className="text-[12px]">Filters</p>
            </button>
            <button type="button" className="text-[#E45416] text-[14px]">
              Clear
            </button>
          </div>
        </div>
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
          <option value="1 storey ">1 storey</option>
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
