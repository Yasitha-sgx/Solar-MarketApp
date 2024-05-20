import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import toast from "react-hot-toast";

import RequestListCard from "../../components/request/RequestListCard";
import RequestSearchForm from "../../components/request/RequestSearchForm";
import { useGetAllRequestQuotationQuery } from "../../slices/requestApiSlice";
import RequestListCardSkeleton from "../../components/request/RequestListCardSkeleton";

const RequestPage = () => {
  const limit = 15;
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get("page")) || 1;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [formData, setFormData] = useState({
    quotation_Id: query.get("quotation_Id") || "",
    services: query.get("services") || "",
    roofType: query.get("roofType") || "",
    solarSystemSize: query.get("solarSystemSize") || "",
    numberOfStories: query.get("numberOfStories") || "",
    name: query.get("name") || "",
    buildingAddress: query.get("buildingAddress") || "",
  });
  const [submittedFormData, setSubmittedFormData] = useState(formData);
  const [localIsLoading, setLocalIsLoading] = useState(true);

  const { data, error, isLoading, refetch } = useGetAllRequestQuotationQuery({
    page: currentPage,
    limit,
    ...submittedFormData,
  });

  useEffect(() => {
    setLocalIsLoading(isLoading);
    if (error) {
      toast.error("Something went wrong! try again");
    }
  }, [isLoading, error]);

  useEffect(() => {
    refetch();
  }, [location, refetch]);

  const quotations = data?.quotations || [];
  const totalQuotations = data?.totalQuotations || 0;
  const totalPages = data?.totalPages || 1;
  const [visiblePages, setVisiblePages] = useState([]);
  const [openFilters, setOpenFilters] = useState(false);

  useEffect(() => {
    updateVisiblePages(currentPage, totalPages);

    window.scrollTo(0, 0);
  }, [currentPage, totalPages]);

  const updateVisiblePages = (page, total) => {
    let pages = [];
    let dotsInitial = "...";
    let dotsLeft = "... ";
    let dotsRight = " ...";

    if (typeof total === "number") {
      total = Array.from({ length: total }, (_, i) => i + 1); // Convert it to an array of page numbers
    }

    if (total.length <= 5) {
      pages = total; // Just use all the pages if there are 5 or fewer
    } else if (page >= 1 && page <= 2) {
      pages = [...total.slice(0, 3), dotsInitial, total[total.length - 1]];
    } else if (page === 3) {
      pages = [
        1,
        dotsLeft,
        ...total.slice(1, 4),
        dotsRight,
        total[total.length - 1],
      ];
    } else if (page > total.length - 2) {
      pages = [1, dotsLeft, ...total.slice(-3)];
    } else {
      pages = [
        1,
        dotsLeft,
        page - 1,
        page,
        page + 1,
        dotsRight,
        total[total.length - 1],
      ];
    }

    setVisiblePages(pages);
  };

  const buildQueryParams = (params) => {
    const queryParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        queryParams.append(key, params[key]);
      }
    });
    return queryParams;
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      navigate({
        pathname: "/request",
        search: `?${buildQueryParams({
          ...submittedFormData,
          page,
        }).toString()}`,
      });
      setLocalIsLoading(true);
      refetch().finally(() => setLocalIsLoading(false));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setSubmittedFormData({ ...formData });
    navigate({
      pathname: "/request",
      search: `?${buildQueryParams({
        ...formData,
        page: 1,
      }).toString()}`,
    });
    setOpenFilters(false);
    setLocalIsLoading(true);
    refetch().finally(() => setLocalIsLoading(false));
  };

  const handleClearClick = () => {
    setFormData({
      quotation_Id: "",
      services: "",
      roofType: "",
      solarSystemSize: "",
      numberOfStories: "",
      name: "",
      buildingAddress: "",
    });
    setSubmittedFormData(null);
    setCurrentPage(1);
    navigate({
      pathname: "/request",
      search: `?${buildQueryParams({
        page: 1,
      }).toString()}`,
    });
    setOpenFilters(false);
    setLocalIsLoading(true);
    refetch().finally(() => setLocalIsLoading(false));
  };

  return (
    <div className="min-h-screen">
      <div className="bg-[#FFF8F1] h-[300px] sm:h-[272px]"></div>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col w-full max-w-screen-lg -mt-[252px] sm:-mt-[230px] p-8">
          <div className="mb-8 text-left">
            <h1 className="mb-2 text-[32px] sm:text-[36px] font-semibold text-gray-800 sm:text-5xl">
              Quotation Requests
            </h1>
            <p className="sm:w-[55%] md:w-[40%] lg:w-[38%] sm:text-[16px] text-gray-600">
              Discover quotations that pique your interest and submit your
              offers.
            </p>
          </div>

          {/* Search Form */}
          <div className="p-6 bg-white border border-[#F0EDEC] rounded-lg shadow-md">
            <RequestSearchForm
              formData={formData}
              setFormData={setFormData}
              handleFormSubmit={handleFormSubmit}
              handleClearClick={handleClearClick}
              openFilters={openFilters}
              setOpenFilters={setOpenFilters}
            />
          </div>

          {/* Request List */}
          <div>
            <p className="text-right text-[#141920] text-[12px] mt-6 mb-3">
              {totalQuotations} Result{totalQuotations !== 1 && "s"}
            </p>

            {localIsLoading && (
              <div className="flex flex-col w-full max-w-screen-lg gap-5">
                {Array.from({ length: 15 }).map((_, index) => (
                  <RequestListCardSkeleton key={index} />
                ))}
              </div>
            )}

            {!localIsLoading && quotations.length > 0 ? (
              <div className="flex flex-col w-full max-w-screen-lg gap-5">
                {quotations.map((quotation) => (
                  <RequestListCard
                    key={quotation.quotation_Id}
                    data={quotation}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full max-w-screen-lg px-6">
                No Result Found!
              </div>
            )}

            {/* Pagination */}
            {quotations.length > 0 && (
              <div className="flex flex-col items-center gap-8 mt-8 mb-6 sm:flex-row sm:justify-between">
                <div className="text-[15px] flex items-center gap-2 flex-wrap justify-center">
                  <button
                    className="p-[8px]  min-w-[40px] h-[40px] rounded-sm shadow-md text-[#E45416] hover:bg-[#E45416] hover:text-[#ffffff]  flex items-center justify-center font[500] disabled:hover:bg-[#ffffff] disabled:hover:text-[#E45416]"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <MdKeyboardArrowLeft />
                  </button>
                  {visiblePages.map((page) => (
                    <button
                      key={page}
                      className={`p-[8px]  min-w-[40px] h-[40px] rounded-sm shadow-md ${
                        currentPage === page
                          ? "bg-[#E45416] text-[#ffffff]"
                          : "text-[#E45416] hover:bg-[#E45416] hover:text-[#ffffff]"
                      }  flex items-center justify-center font[500] disabled:hover:bg-[#ffffff] disabled:hover:text-[#E45416]`}
                      onClick={() => handlePageChange(page)}
                      disabled={page === "..."}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    className="p-[8px]  min-w-[40px] h-[40px] rounded-sm shadow-md text-[#E45416] hover:bg-[#E45416] hover:text-[#ffffff]  flex items-center justify-center font[500] disabled:hover:bg-[#ffffff] disabled:hover:text-[#E45416]"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <MdKeyboardArrowRight />
                  </button>
                </div>
                <p className="text-[#545A5F] text-[12px]">
                  Page {currentPage} of {totalPages}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestPage;
