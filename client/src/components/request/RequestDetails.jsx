import Avatar from "react-avatar";
import { FaBatteryEmpty } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import {
  MdOutlineSolarPower,
  MdRoofing,
  MdOutlineShower,
  MdCorporateFare,
} from "react-icons/md";
import { TbChargingPile, TbBolt } from "react-icons/tb";

const FeatureItem = ({ icon, text }) => (
  <div className="flex gap-2 items-center bg-[#F6F7FA] text-[#545A5F] text-[12px] px-[8px] py-[6px]">
    {icon}
    {text}
  </div>
);

const RequestDetails = ({
  data,
  userInfo,
  openOfferForm,
  isOpenOfferForm,
  fetchOffer,
}) => {
  return (
    <div className=" text-[#141920] mb-10">
      <div className="flex items-center gap-4">
        <div className="bg-[#FFF4EF] rounded-full w-[40px] h-[40px] flex items-center justify-center">
          <Avatar
            unstyled={true}
            name={`${data.requester.requesterFirstName} ${data.requester.requesterLastName}`}
            className="text-[16px] text-[#E45416] font-[500] p-[5px] rounded-full"
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
            <h3 className="text-[16px]">
              {data.requester.requesterFirstName}{" "}
              {data.requester.requesterLastName}
            </h3>
            <p className="text-[12px] text-[#545A5F] flex items-center gap-1">
              <IoLocationOutline />
              {data.buildingAddress}
            </p>
          </div>
        </div>
      </div>
      <div className="sm:px-[58px] text-[14px]">
        <div className="mt-4 sm:mt-2">
          <p>Additional Notes:</p>
          <div className="border-[3px] border-[#F0EDEC] p-3 pb-6 rounded-md mt-1">
            <p className="text-[#545A5F] text-[12px]">{data.additionalNotes}</p>
          </div>
        </div>
        <div className="flex flex-col mt-4 md:justify-between md:flex-row">
          <div className="md:w-[50%] lg:w-[60%]">
            <p>Need quotations for:</p>
            <div className="flex flex-wrap gap-2">
              {data.services.includes("Solar Power System") && (
                <FeatureItem
                  icon={<MdOutlineSolarPower />}
                  text="Solar Power System"
                />
              )}
              {data.services.includes("Battery Storage") && (
                <FeatureItem icon={<FaBatteryEmpty />} text="Battery Storage" />
              )}
              {data.services.includes("Solar Hot Water") && (
                <FeatureItem
                  icon={<MdOutlineShower />}
                  text="Solar Hot Water"
                />
              )}
              {data.services.includes("EV Charger") && (
                <FeatureItem icon={<TbChargingPile />} text="EV Charger" />
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
            <div>
              <p>Connection to property:</p>
              <div className="flex flex-wrap gap-2">
                <FeatureItem text={data.propertyConnection} />
              </div>
            </div>
            <div>
              <p>Existing System:</p>
              <div className="flex flex-wrap gap-2">
                <FeatureItem text={`${data.existingSystem ? "Yes" : "No"}`} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          <div>
            <p>Roof type:</p>
            <div className="flex flex-wrap gap-2">
              <FeatureItem icon={<MdRoofing />} text={data.roofType} />
            </div>
          </div>
          <div>
            <p>Storeys in the building:</p>
            <div className="flex flex-wrap gap-2">
              <FeatureItem
                icon={<MdCorporateFare />}
                text={data.numberOfStories}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <p>System size:</p>
              <div className="flex flex-wrap gap-2">
                <FeatureItem icon={<TbBolt />} text={data.solarSystemSize} />
              </div>
            </div>
          </div>
        </div>

        {userInfo?.role !== "buyer" && !isOpenOfferForm && !fetchOffer && (
          <button
            onClick={openOfferForm}
            className="btn-fill bg-[#E45416] px-[32px] py-[8px] mt-10"
          >
            Offer Quotation
          </button>
        )}
      </div>
    </div>
  );
};

export default RequestDetails;
