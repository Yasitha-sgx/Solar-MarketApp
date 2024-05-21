import Avatar from "react-avatar";
import { IoLocationOutline } from "react-icons/io5";
import {
  MdOutlineSolarPower,
  MdRoofing,
  MdOutlineShower,
  MdCorporateFare,
} from "react-icons/md";
import { FaBatteryEmpty } from "react-icons/fa";
import { TbChargingPile, TbBolt } from "react-icons/tb";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { BsDot } from "react-icons/bs";

const FeatureItem = ({ icon, text }) => (
  <div className="flex gap-2 items-center bg-[#F6F7FA] text-[#545A5F] text-[12px] px-[8px] py-[6px]">
    {icon}
    {text}
  </div>
);

const RequestListCard = ({ data, isUser }) => {
  const navigate = useNavigate();
  const formattedDate = format(new Date(data.createdAt), "dd.MM.yy hh.mm a");

  const handleNavigate = (id) => {
    navigate(`/request/${id}`);
  };

  const renderFeatureItems = () => (
    <>
      {data.services.includes("Solar Power System") && (
        <FeatureItem icon={<MdOutlineSolarPower />} text="Solar Power System" />
      )}
      {data.services.includes("Battery Storage") && (
        <FeatureItem icon={<FaBatteryEmpty />} text="Battery Storage" />
      )}
      {data.services.includes("Solar Hot Water") && (
        <FeatureItem icon={<MdOutlineShower />} text="Solar Hot Water" />
      )}
      {data.services.includes("EV Charger") && (
        <FeatureItem icon={<TbChargingPile />} text="EV Charger" />
      )}
      <FeatureItem icon={<TbBolt />} text={data.solarSystemSize} />
      <FeatureItem icon={<MdRoofing />} text={data.roofType} />
      <FeatureItem icon={<MdCorporateFare />} text={data.numberOfStories} />
    </>
  );

  return (
    <div
      onClick={() => handleNavigate(data.quotation_Id)}
      className="flex flex-col p-6 bg-white border border-[#F0EDEC] rounded-lg shadow-md cursor-pointer hover:bg-[#FFF8F1]"
    >
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-4">
          <Avatar
            unstyled={true}
            name={`${data.requester.requesterFirstName} ${data.requester.requesterLastName}`}
            className="text-[16px] text-[#E45416] font-[500] p-[5px] rounded-full bg-[#FFF8F1]"
          />
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1 md:flex-row sm:gap-3">
              <h3 className="text-[16px] text-[#141920]">
                {data.requester.requesterFirstName}{" "}
                {data.requester.requesterLastName}
              </h3>
              <p className="text-[12px] text-[#545A5F] flex items-center gap-1">
                <IoLocationOutline />
                {data.buildingAddress}
              </p>
            </div>
            <div className="flex-wrap hidden gap-2 md:flex">
              {renderFeatureItems()}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between w-[30%] md:w-[25%] text-right">
          <div className="text-[16px] text-[#141920]">
            {isUser ? (
              <div className="flex flex-wrap items-center justify-end">
                {data.offerCount > 0 && data.isOpen && (
                  <BsDot className="text-[40px] text-[#E45416] -mr-2" />
                )}
                {` ${data.offerCount}`} offers
              </div>
            ) : (
              <div>#{data.quotation_Id}</div>
            )}
          </div>
          <p className="text-[#545A5F] text-[12px] hidden md:block">
            Posted on {formattedDate}
          </p>
        </div>
      </div>
      <div className="mt-4 md:hidden ms-1">
        <div className="flex flex-wrap gap-2">{renderFeatureItems()}</div>
      </div>
      <p className="text-[#545A5F] text-[12px] md:hidden mt-4">
        Posted on {formattedDate}
      </p>
    </div>
  );
};

export default RequestListCard;
