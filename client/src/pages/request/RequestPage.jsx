import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import RequestListCard from "../../components/request/RequestListCard";
import RequestSearchForm from "../../components/request/RequestSearchForm";
import { useGetAllRequestQuotationQuery } from "../../slices/requestApiSlice";
import RequestListCardSkeleton from "../../components/request/RequestListCardSkeleton";
import Pagination from "../../components/Pagination";

const RequestPage = () => {
  // Constants and State
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

  // Fetching data from API
  const { data, error, isLoading, refetch } = useGetAllRequestQuotationQuery({
    page: currentPage,
    limit,
    ...submittedFormData,
  });

  // Side effect for isLoading and error
  useEffect(() => {
    setLocalIsLoading(isLoading);
    if (error) {
      toast.error("Something went wrong! Please try again.");
    }
  }, [isLoading, error]);

  // Refetch data when location changes
  useEffect(() => {
    refetch();
  }, [location, refetch]);

  // Extracting data and pagination information
  const quotations = data?.quotations || [];
  const totalQuotations = data?.totalQuotations || 0;
  const totalPages = data?.totalPages || 1;
  const [visiblePages, setVisiblePages] = useState([]);

  // Side effect to update visible pages
  useEffect(() => {
    updateVisiblePages(currentPage, totalPages);
    window.scrollTo(0, 0); // Scroll to top when page changes
  }, [currentPage, totalPages]);

  // Function to update visible pages array
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

  // Function to build query parameters
  const buildQueryParams = (params) => {
    const queryParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        queryParams.append(key, params[key]);
      }
    });
    return queryParams.toString();
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      navigate({
        pathname: "/request",
        search: `?${buildQueryParams({
          ...submittedFormData,
          page,
        })}`,
      });
      setLocalIsLoading(true);
      refetch().finally(() => setLocalIsLoading(false));
    }
  };

  // Handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setSubmittedFormData({ ...formData });
    navigate({
      pathname: "/request",
      search: `?${buildQueryParams({
        ...formData,
        page: 1,
      })}`,
    });
    setLocalIsLoading(true);
    refetch().finally(() => setLocalIsLoading(false));
  };

  // Handle clear filters
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
      })}`,
    });
    setLocalIsLoading(true);
    refetch().finally(() => setLocalIsLoading(false));
  };

  // JSX Rendering
  return (
    <div className="min-h-screen bg-[#FFF8F1]">
      <div className="max-w-screen-lg mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-gray-800">
            Quotation Requests
          </h1>
          <p className="text-gray-600">
            Discover quotations that pique your interest and submit your offers.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <RequestSearchForm
            formData={formData}
            setFormData={setFormData}
            handleFormSubmit={handleFormSubmit}
            handleClearClick={handleClearClick}
          />
        </div>

        {/* Request List */}
        <div className="space-y-5">
          <p className="text-right text-gray-700 text-sm">
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

export default RequestPage;
