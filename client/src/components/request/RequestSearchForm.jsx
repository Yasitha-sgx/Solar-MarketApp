import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";

const RequestSearchForm = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [locationFocused, setLocationFocused] = useState(false);

  return (
    <form>
      <div className="flex flex-col sm:flex-row w-full gap-4">
        <div className="relative flex-grow">
          {!searchFocused && (
            <IoMdSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#CEDBF0] text-[24px]" />
          )}
          <input
            type="text"
            className="input pl-10 w-full"
            placeholder={
              !searchFocused
                ? "          Client name or quotation id"
                : "Client name or quotation id"
            }
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
        <div className="relative flex-grow">
          {!locationFocused && (
            <IoLocationOutline className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#CEDBF0] text-[24px]" />
          )}
          <input
            type="text"
            className="input pl-10 w-full"
            placeholder={!locationFocused ? "          Location" : "Location"}
            onFocus={() => setLocationFocused(true)}
            onBlur={() => setLocationFocused(false)}
          />
        </div>
        <div>
          <button
            type="submit"
            className="btn-fill py-[8px] px-[24px] text-[14px] w-[143px]"
          >
            Search
          </button>
        </div>
      </div>
      <div className="mt-2 flex gap-3">
        <select
          id="countries"
          className="border border-[#CEDBF0] text-gray-900 text-sm rounded-lg focus:ring-[#EE723C] focus:border-[#EE723C] focus:outline-[#EE723C] focus:outline block p-2.5 "
        >
          <option selected>Service</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
        <select
          id="countries"
          className="border border-[#CEDBF0] text-gray-900 text-sm rounded-lg focus:ring-[#EE723C] focus:border-[#EE723C] focus:outline-[#EE723C] focus:outline block p-2.5 "
        >
          <option selected>Roof Type</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
        <select
          id="countries"
          className="border border-[#CEDBF0] text-gray-900 text-sm rounded-lg focus:ring-[#EE723C] focus:border-[#EE723C] focus:outline-[#EE723C] focus:outline block p-2.5 "
        >
          <option selected>Wattage</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
        <select
          id="countries"
          className="border border-[#CEDBF0] text-gray-900 text-sm rounded-lg focus:ring-[#EE723C] focus:border-[#EE723C] focus:outline-[#EE723C] focus:outline block p-2.5 "
        >
          <option selected>Storeys</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
        <button type="button" className="btn-bg-none">
          Clear
        </button>
      </div>
    </form>
  );
};
export default RequestSearchForm;
