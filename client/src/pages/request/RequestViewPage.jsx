import { useEffect, useState } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { format } from "date-fns";

import { useGetRequestQuotationByIdQuery } from "../../slices/requestApiSlice";
import { useGetOfferMutation } from "../../slices/offerApiSlice";
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
  const [offerData, setOfferData] = useState(null);

  const { data: requestData, isLoading: isRequestLoading } =
    useGetRequestQuotationByIdQuery(id);

  const [getOffer, { isLoading: getOfferLoading }] = useGetOfferMutation();

  useEffect(() => {
    window.scrollTo(0, 0);
    getOfferData();
    if (offerData) {
      setFetchOffer(true);
    }
  }, [setFetchOffer]);

  const handleGoBack = () => navigate(-1);

  const getOfferData = async () => {
    const res = await getOffer({
      quotation: id,
    }).unwrap();
    setOfferData(res);
    setFetchOffer(true);
  };

  const openOfferForm = async () => {
    if (!userInfo) {
      navigate("/login");
    } else {
      getOfferData(id);
      if (!getOfferLoading && offerData) {
        setFetchOffer(true);
      } else if (!getOfferLoading && !offerData) {
        setIsOpenOfferForm(true);
      }
    }
  };

  const formattedDate = requestData
    ? format(new Date(requestData.createdAt), "dd.MM.yy hh.mm a")
    : "";

  return (
    <div className="min-h-screen">
      <div className="bg-[#FFF8F1] h-[187px]"></div>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col w-full max-w-screen-lg gap-8 -mt-[160px] mb-[70px] p-8">
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
            {requestData && (
              <p className="text-[#545A5F] text-[12px]">
                Posted on {formattedDate}
              </p>
            )}
          </div>
          <div className="border border-solid border-gray-300 p-6 rounded-[16px] bg-[#ffffff] shadow-md">
            {isRequestLoading && <RequestDetailsSkeleton />}
            {!isRequestLoading && requestData && (
              <RequestDetails
                userInfo={userInfo}
                data={requestData}
                openOfferForm={openOfferForm}
                isOpenOfferForm={isOpenOfferForm}
                fetchOffer={fetchOffer}
              />
            )}
            {!isRequestLoading && !requestData && (
              <div className="w-full max-w-screen-lg px-6">
                No Result Found!
              </div>
            )}
          </div>

          {isOpenOfferForm && !fetchOffer && (
            <OfferForm
              quotation={id}
              setIsOpenOfferForm={setIsOpenOfferForm}
              fetchOffer={fetchOffer}
              getOfferData={getOfferData}
              setFetchOffer={setFetchOffer}
            />
          )}

          {!isOpenOfferForm && fetchOffer && (
            <OfferEditForm
              data={offerData}
              quotation={id}
              setFetchOffer={setFetchOffer}
              getOfferData={getOfferData}
              setOfferData={setOfferData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestViewPage;
