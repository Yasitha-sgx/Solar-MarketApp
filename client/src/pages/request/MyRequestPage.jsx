import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import RequestListCard from "../../components/request/RequestListCard";
import { useGetUserRequestQuotationQuery } from "../../slices/requestApiSlice";
import RequestListCardSkeleton from "../../components/request/RequestListCardSkeleton";
import Pagination from "../../components/Pagination";
import { useSelector } from "react-redux";

const MyRequestPage = () => {
  const limit = 15; // Number of items per page
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get("page")) || 1; // Initial page number from URL query parameter

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [localIsLoading, setLocalIsLoading] = useState(true); // Loading state for local component
  const { userInfo } = useSelector((state) => state.auth); // Redux selector for user information

  // Fetching data using API query
  const { data, error, isLoading, refetch } = useGetUserRequestQuotationQuery({
    page: currentPage,
    limit,
  });

  // Effect for handling loading state and error messages
  useEffect(() => {
    setLocalIsLoading(isLoading);
    if (error) {
      toast.error("Something went wrong! Please try again.");
    }
  }, [isLoading, error]);

  // Effect for refetching data when location changes
  useEffect(() => {
    refetch();
  }, [location, refetch]);

  // Redirect based on user authentication and role
  useEffect(() => {
    if (!userInfo) {
      navigate("/login", { state: { from: location } });
    } else if (userInfo.role !== "buyer") {
      navigate("/");
    } else {
      updateVisiblePages(currentPage, data?.totalPages || 1); // Update visible pages for pagination
      window.scrollTo(0, 0); // Scroll to top on page change
    }
  }, [currentPage, data?.totalPages, userInfo, navigate, location]);

  // Function to update visible pages array for pagination
  const updateVisiblePages = (page, total) => {
    let pages = [];
    const dotsInitial = "...";
    const dotsLeft = "... ";
    const dotsRight = " ...";

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

  // Function to build query parameters for pagination and filtering
  const buildQueryParams = (params) => {
    const queryParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        queryParams.append(key, params[key]);
      }
    });
    return queryParams.toString();
  };

  // Handle page change for pagination
  const handlePageChange = (page) => {
    if (page > 0 && page <= data?.totalPages) {
      setCurrentPage(page);
      navigate({
        pathname: "/my-requests",
        search: `?${buildQueryParams({
          page,
        })}`,
      });
      setLocalIsLoading(true); // Set loading state while fetching data
      refetch().finally(() => setLocalIsLoading(false)); // Fetch data and handle loading state
    }
  };

  // Default values for quotations, totalQuotations, totalPages, and visiblePages
  const quotations = data?.quotations || [];
  const totalQuotations = data?.totalQuotations || 0;
  const totalPages = data?.totalPages || 1;
  const [visiblePages, setVisiblePages] = useState([]);

  // JSX Rendering
  return (
    <div className="min-h-screen bg-[#FFF8F1]">
      <div className="max-w-screen-lg mx-auto py-8 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="mb-8">
            <h1 className="text-4xl font-semibold text-gray-800">
              My Quotation Requests
            </h1>
            <p className="w-[85%] sm:w-[450px] text-gray-600">
              All of your quotation request viewing and accepting offers can be
              done here
            </p>
          </div>
          <Link to="/request-quotation">
            <button className="btn-fill text-sm px-6 py-2">
              Request Quotation
            </button>
          </Link>
        </div>

        {/* Request List */}
        <div>
          <p className="text-right text-gray-700 text-sm mb-3">
            {totalQuotations} Result{totalQuotations !== 1 ? "s" : ""}
          </p>

          {/* Loading Skeleton or No Results */}
          {localIsLoading ? (
            <div className="space-y-5">
              {Array.from({ length: limit }).map((_, index) => (
                <RequestListCardSkeleton key={index} />
              ))}
            </div>
          ) : quotations.length > 0 ? (
            <div className="space-y-5">
              {quotations.map((quotation) => (
                <RequestListCard
                  key={quotation.quotation_Id}
                  data={quotation}
                  isUser={true}
                />
              ))}
            </div>
          ) : (
            <div className="w-full px-6">No Results Found!</div>
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
  );
};

export default MyRequestPage;
