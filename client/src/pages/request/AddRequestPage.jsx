import { IoIosArrowDropleft } from "react-icons/io";
import { Link } from "react-router-dom";
import RequestFormLayout from "../../components/request/RequestFormLayout";

const AddRequestPage = () => {
  return (
    <div className="min-h-screen ">
      <div className="bg-[#FFF8F1] h-[187px]"></div>
      <div className="flex flex-col w-full ">
        <div className="flex flex-col mx-auto w-[90%] md:w-[90%] lg:w-[80%] gap-8 -mt-[210px] mb-[13vh]">
          <div className="flex items-center gap-5 mt-[72px] text-left">
            <Link to="/">
              <IoIosArrowDropleft className="text-[#EE723C] text-[36px]" />
            </Link>
            <h1 className="text-[24px] font-semibold">
              Request Free Quotation
            </h1>
          </div>
          <div className="px-4 sm:px-6 md:px-9">
            <div className="border-[1px] p-6 sm:rounded-se-[140px] rounded-[16px] bg-[#ffffff]">
              <RequestFormLayout />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddRequestPage;
