import { useEffect, useState } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { format } from "date-fns";

import { useGetRequestQuotationByIdQuery } from "../../slices/requestApiSlice";
import { useGetOfferQuery } from "../../slices/offerApiSlice";
import RequestDetailsSkeleton from "../../components/request/RequestDetailsSkeleton ";
import RequestDetails from "../../components/request/RequestDetails";
import OfferForm from "../../components/offer/OfferForm";
import OfferEditForm from "../../components/offer/OfferEditForm";

const RequestViewPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id } = useParams();

  const [isOpenOfferForm, setIsOpenOfferForm] = useState(false);
  const [fetchOffer, setFetchOffer] = useState(false);

  const {
    data: requestData,
    isLoading,
    refetch,
  } = useGetRequestQuotationByIdQuery(id);

  const { data: offerData } = useGetOfferQuery(requestData?._id);

  const handleGoBack = () => {
    navigate(-1);
  };

  const openOfferForm = () => {
    if (!userInfo) {
      navigate("/login");
    } else if (userInfo && userInfo.role === "seller" && offerData) {
      setFetchOffer(true);
    } else if (userInfo && userInfo.role === "seller" && !offerData) {
      setIsOpenOfferForm(true);
    }
  };

  const formattedDate = requestData
    ? format(new Date(requestData.createdAt), "dd.MM.yy hh.mm a")
    : "";

  useEffect(() => {
    window.scrollTo(0, 0);
    refetch();
  }, [refetch]);

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
              {requestData && (
                <p className="text-[#545A5F] text-[12px]">
                  Posted on {formattedDate}
                </p>
              )}
            </div>
          </div>
          <div>
            <div className="border border-solid border-gray-300 p-6 rounded-[16px] bg-[#ffffff]">
              {isLoading && <RequestDetailsSkeleton />}
              {!isLoading && requestData && (
                <RequestDetails
                  userInfo={userInfo}
                  data={requestData}
                  openOfferForm={openOfferForm}
                  isOpenOfferForm={isOpenOfferForm}
                  fetchOffer={fetchOffer}
                />
              )}
              {!isLoading && !requestData && (
                <div className="w-full max-w-screen-lg px-6">
                  No Result Found!
                </div>
              )}
            </div>

            {isOpenOfferForm && (
              <>
                <OfferForm
                  quotation={requestData._id}
                  setIsOpenOfferForm={setIsOpenOfferForm}
                  fetchOffer={fetchOffer}
                />
              </>
            )}

            {fetchOffer && <OfferEditForm data={offerData} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestViewPage;
