import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineFilterAlt } from "react-icons/md";

const RequestSearchForm = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [locationFocused, setLocationFocused] = useState(false);

  return (
    <form>
      <div className="flex flex-col w-full sm:gap-4 sm:flex-row">
        <div className="relative flex-grow">
          {!searchFocused && (
            <IoMdSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#CEDBF0] text-[24px]" />
          )}
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
          />
        </div>
        <div className="relative flex-grow mb-4 sm:mb-0">
          {!locationFocused && (
            <IoLocationOutline className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#CEDBF0] text-[24px]" />
          )}
          <input
            type="text"
            className="w-full pl-10 input "
            placeholder={!locationFocused ? "          Location" : "Location"}
            onFocus={() => setLocationFocused(true)}
            onBlur={() => setLocationFocused(false)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="btn-fill py-[8px] px-[24px] text-[14px] w-[160px] sm:w-[112px] md:w-[143px]"
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
          id="countries"
          className="border border-[#CEDBF0] text-[#545A5F] text-[14px] text-sm rounded-lg focus:ring-[#EE723C] focus:border-[#EE723C] focus:outline-[#EE723C] focus:outline block p-2.5 "
        >
          <option selected>Service</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
        <select
          id="countries"
          className="border border-[#CEDBF0] text-[#545A5F] text-[14px] text-sm rounded-lg focus:ring-[#EE723C] focus:border-[#EE723C] focus:outline-[#EE723C] focus:outline block p-2.5 "
        >
          <option selected>Roof Type</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
        <select
          id="countries"
          className="border border-[#CEDBF0] text-[#545A5F] text-[14px] text-sm rounded-lg focus:ring-[#EE723C] focus:border-[#EE723C] focus:outline-[#EE723C] focus:outline block p-2.5 "
        >
          <option selected>Wattage</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
        <select
          id="countries"
          className="border border-[#CEDBF0] text-[#545A5F] text-[14px] text-sm rounded-lg focus:ring-[#EE723C] focus:border-[#EE723C] focus:outline-[#EE723C] focus:outline block p-2.5 "
        >
          <option selected>Storeys</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
        <button type="button" className="text-[#E45416] text-[14px]">
          Clear
        </button>
      </div>
    </form>
  );
};
export default RequestSearchForm;
