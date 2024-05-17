import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RequestListCard from "../../components/request/RequestListCard";
import RequestSearchForm from "../../components/request/RequestSearchForm";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useGetAllRequestQuotationQuery } from "../../slices/requestApiSlice";
import RequestListCardSkeleton from "../../components/request/RequestListCardSkeleton";

const RequestPage = () => {
  const limit = 15;
  const searchFormRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get("page")) || 1;

  const [currentPage, setCurrentPage] = useState(initialPage);

  const { data, error, isLoading } = useGetAllRequestQuotationQuery({
    page: currentPage,
    limit,
  });

  const quotations = data?.quotations || [];
  const totalQuotations = data?.totalQuotations || 0;
  const totalPages = data?.totalPages || 1;

  const [visiblePages, setVisiblePages] = useState([]);

  useEffect(() => {
    updateVisiblePages(currentPage, totalPages);
  }, [currentPage, totalPages]);

  const updateVisiblePages = (page, total) => {
    const pages = [];
    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else if (page <= 2) {
      pages.push(1, 2, 3, "...", total);
    } else if (page > total - 2) {
      pages.push(1, "...", total - 2, total - 1, total);
    } else {
      pages.push(1, "...", page - 1, page, page + 1, "...", total);
    }
    setVisiblePages(pages);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      navigate(`/request?page=${page}`);
      searchFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen" ref={searchFormRef}>
      <div className="bg-[#FFF8F1] h-[300px] sm:h-[272px]"></div>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col w-full max-w-screen-lg -mt-[252px] sm:-mt-[230px] p-4 sm:p-8">
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
            <RequestSearchForm />
          </div>

          {/* Request List */}
          <div>
            <p className="text-right text-[#141920] text-[12px] mt-6 mb-3">
              {totalQuotations} Result{totalQuotations !== 1 && "s"}
            </p>

            {isLoading && (
              <div className="flex flex-col w-full max-w-screen-lg gap-5">
                {Array.from({ length: 15 }).map((_, index) => (
                  <RequestListCardSkeleton key={index} />
                ))}
              </div>
            )}
            {error && <p>Error fetching data: {error.message}</p>}

            {!isLoading && (
              <div className="flex flex-col w-full max-w-screen-lg gap-5">
                {quotations.map((quotation) => (
                  <RequestListCard
                    key={quotation.quotation_Id}
                    data={quotation}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex flex-col items-center gap-8 mt-6 mb-6 sm:flex-row sm:justify-between">
              <div className="text-[16px] flex items-center gap-2">
                <button
                  className="p-[8px] rounded-sm shadow-md text-[#E45416] hover:bg-[#E45416] hover:text-[#ffffff] min-w-[40px]  h-[40px] flex items-center justify-center font[500] disabled:hover:bg-[#ffffff] disabled:hover:text-[#E45416]"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <MdKeyboardArrowLeft />
                </button>
                {visiblePages.map((page, index) => (
                  <button
                    key={index}
                    className={`p-[8px] rounded-sm shadow-md ${
                      page === currentPage
                        ? "bg-[#E45416] text-[#ffffff]"
                        : "text-[#E45416] hover:bg-[#E45416] hover:text-[#ffffff]"
                    } min-w-[40px] h-[40px] flex items-center justify-center font[500] disabled:hover:bg-[#ffffff] disabled:hover:text-[#E45416]`}
                    onClick={() => handlePageChange(page)}
                    disabled={page === "..."}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="p-[8px] rounded-sm shadow-md text-[#E45416] hover:bg-[#E45416] hover:text-[#ffffff] min-w-[40px] h-[40px] flex items-center justify-center font[500] disabled:hover:bg-[#ffffff] disabled:hover:text-[#E45416]"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <MdKeyboardArrowRight />
                </button>
              </div>
              <p className="text-[#545A5F] text-[12px] ">
                Page {currentPage} of {totalPages}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestPage;
