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

const RequestListCard = () => {
  return (
    <div className="p-6 bg-white border border-[#F0EDEC] rounded-lg shadow-md cursor-pointer hover:bg-[#FFF8F1]">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <div>
            <Avatar
              unstyled={true}
              name="Yasitha Dilshan"
              className="text-[16px] text-[#E45416] font-[500] p-[5px] rounded-full bg-[#FFF8F1]"
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
              <h3 className="text-[16px] text-[#141920]">
                Gregari Harishchandra
              </h3>
              <p className="text-[12px] text-[#545A5F] flex items-center gap-1">
                <IoLocationOutline />
                Homagama, Colombo
              </p>
            </div>
            <div className="flex-wrap gap-2 hidden sm:flex w-[70%] md:w-[90%] lg:w-auto">
              <FeatureItem
                icon={<MdOutlineSolarPower />}
                text="Solar Power System"
              />
              <FeatureItem icon={<FaBatteryEmpty />} text="Battery Storage" />
              <FeatureItem icon={<TbBolt />} text="3 kW" />
              <FeatureItem icon={<MdRoofing />} text="Tile" />
              <FeatureItem icon={<MdCorporateFare />} text="1 Storey" />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between w-[40%] lg:w-auto text-right">
          <p className=" text-[16px] text-[#141920]">#820</p>
          <p className="text-[#545A5F] text-[12px] hidden sm:block ">
            Posted on 29.04.24 12.45 PM
          </p>
        </div>
      </div>
      <div className="mt-4 sm:hidden ms-1">
        <div className="flex flex-wrap gap-2 sm:hidden">
          <FeatureItem
            icon={<MdOutlineSolarPower />}
            text="Solar Power System"
          />
          <FeatureItem icon={<FaBatteryEmpty />} text="Battery Storage" />
          <FeatureItem icon={<TbBolt />} text="3 kW" />
          <FeatureItem icon={<MdRoofing />} text="Tile" />
          <FeatureItem icon={<MdCorporateFare />} text="1 Storey" />
        </div>
      </div>
      <p className="text-[#545A5F] text-[12px] sm:hidden mt-4">
        Posted on 29.04.24 12.45 PM
      </p>
    </div>
  );
};
export default RequestListCard;

const FeatureItem = ({ icon, text }) => (
  <div className="flex gap-2 items-center bg-[#F6F7FA] text-[#545A5F] text-[12px] px-[8px] py-[6px]">
    {icon}
    {text}
  </div>
);
