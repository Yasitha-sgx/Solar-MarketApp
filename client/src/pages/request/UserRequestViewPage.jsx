import { useEffect } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { format, isValid } from "date-fns";

import { useGetUserRequestQuotationByIdQuery } from "../../slices/requestApiSlice";
import RequestDetails from "../../components/request/RequestDetails";
import OfferDetailsCard from "../../components/offer/OfferDetailsCard";
import RequestDetailsSkeleton from "../../components/request/RequestDetailsSkeleton ";

const UserRequestViewPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetUserRequestQuotationByIdQuery(id);

  const handleGoBack = () => {
    navigate(-1);
  };

  const formattedDate =
    data && isValid(new Date(data.createdAt))
      ? format(new Date(data.createdAt), "dd.MM.yy hh.mm a")
      : "";

  useEffect(() => {
    window.scrollTo(0, 0);
    refetch();
  }, [refetch]);

  const renderRequestDetails = () => {
    if (isLoading) {
      return <RequestDetailsSkeleton />;
    }
    if (!data) {
      return (
        <div className="w-full max-w-screen-lg px-6">No Result Found!</div>
      );
    }
    return <RequestDetails userInfo={userInfo} data={data} />;
  };

  const renderOfferDetails = () => {
    if (!data || !data.offers?.length) {
      return null;
    }
    return data.offers
      .filter((offer) => Object.keys(offer).length > 0)
      .map((offer) => <OfferDetailsCard key={offer?.offer_Id} data={offer} />);
  };

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
              {renderRequestDetails()}
            </div>
            {renderOfferDetails()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRequestViewPage;
