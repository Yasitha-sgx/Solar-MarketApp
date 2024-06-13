import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import RequestListCard from "../../components/request/RequestListCard";
import { useGetUserRequestQuotationQuery } from "../../slices/requestApiSlice";
import RequestListCardSkeleton from "../../components/request/RequestListCardSkeleton";
import { useSelector } from "react-redux";
import Pagination from "../../components/Pagination";

const MyRequestPage = () => {
  const limit = 15;
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get("page")) || 1;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [localIsLoading, setLocalIsLoading] = useState(true);

  const { userInfo } = useSelector((state) => state.auth);

  const { data, error, isLoading, refetch } = useGetUserRequestQuotationQuery({
    page: currentPage,
    limit,
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

  useEffect(() => {
    if (!userInfo) {
      navigate("/login", { state: { from: location } });
    } else if (userInfo.role !== "buyer") {
      navigate("/");
    } else {
      updateVisiblePages(currentPage, totalPages);
      window.scrollTo(0, 0);
    }
  }, [currentPage, totalPages, userInfo, navigate, location]);

  const updateVisiblePages = (page, total) => {
    let pages = [];
    let dotsInitial = "...";
    let dotsLeft = "... ";
    let dotsRight = " ...";

    if (typeof total === "number") {
      total = Array.from({ length: total }, (_, i) => i + 1);
    }

    if (total.length <= 5) {
      pages = total;
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
        pathname: "/my-requests",
        search: `?${buildQueryParams({
          page,
        }).toString()}`,
      });
      setLocalIsLoading(true);
      refetch().finally(() => setLocalIsLoading(false));
    }
  };

  return (
    <div className="min-h-screen">
      <div className="bg-[#FFF8F1] h-[300px] sm:h-[272px]"></div>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col w-full max-w-screen-lg -mt-[252px] sm:-mt-[230px] p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-8 text-left">
              <h1 className="mb-2 text-[32px] sm:text-[36px] font-semibold text-gray-800 sm:text-5xl">
                My Quotation Requests
              </h1>
              <p className="w-[85%] sm:w-[450px] sm:text-[16px] text-gray-600">
                All of your quotation request viewing and accepting offers can
                be done here
              </p>
            </div>
            <Link to="/request-quotation">
              <button className="btn-fill text-[14px] px-[24px] py-[8px]">
                Request Quotation
              </button>
            </Link>
          </div>

          {/* Request List */}
          <div>
            <p className="text-right text-[#141920] text-[12px] mb-3">
              {totalQuotations} Result{totalQuotations !== 1 && "s"}
            </p>

            {localIsLoading && (
              <div className="flex flex-col w-full gap-5">
                {Array.from({ length: 15 }).map((_, index) => (
                  <RequestListCardSkeleton key={index} />
                ))}
              </div>
            )}

            {quotations.length > 0 ? (
              <div className="flex flex-col w-full gap-5">
                {quotations.map((quotation) => (
                  <RequestListCard
                    key={quotation.quotation_Id}
                    data={quotation}
                    isUser={true}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full px-6">No Result Found!</div>
            )}

            {/* Pagination */}
            {quotations.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                visiblePages={visiblePages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRequestPage;
