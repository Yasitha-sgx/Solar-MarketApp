import { useEffect } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { format } from "date-fns";

import { useGetRequestQuotationByIdQuery } from "../../slices/requestApiSlice";
import RequestDetailsSkeleton from "../../components/request/RequestDetailsSkeleton ";
import RequestDetails from "../../components/request/RequestDetails";

const RequestViewPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useGetRequestQuotationByIdQuery(id);

  const handleGoBack = () => {
    navigate(-1);
  };

  // Only format the date if data is available
  const formattedDate = data
    ? format(new Date(data.createdAt), "dd.MM.yy hh.mm a")
    : "";

  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="bg-[#FFF8F1] h-[187px]"></div>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col w-full max-w-screen-lg gap-8 -mt-[160px] mb-[70px] p-8 sm:p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5 text-left">
              <button
                onClick={handleGoBack}
                className="text-[#EE723C] text-[36px]"
              >
                <IoIosArrowDropleft />
              </button>
              <h1 className="text-2xl font-semibold">#{id}</h1>
            </div>
            <div>
              {data && (
                <p className="text-[#545A5F] text-[12px]">
                  Posted on {formattedDate}
                </p>
              )}
            </div>
          </div>
          <div>
            <div className="border border-solid border-gray-300 p-6 rounded-[16px] bg-[#ffffff]">
              {isLoading && <RequestDetailsSkeleton />}
              {!isLoading && data ? (
                <RequestDetails userInfo={userInfo} data={data} />
              ) : (
                <div className="w-full max-w-screen-lg px-6">
                  No Result Found!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestViewPage;
