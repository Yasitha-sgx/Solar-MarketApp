import RequestListCard from "../../components/request/RequestListCard";
import RequestSearchForm from "../../components/request/RequestSearchForm";

const RequestPage = () => {
  return (
    <div className="min-h-screen ">
      <div className="bg-[#FFF8F1] h-[300px] sm:h-[272px]"></div>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col w-full max-w-screen-lg -mt-[252px] sm:-mt-[230px] p-4">
          <div className="mb-8 text-left">
            <h1 className="mb-2 text-[32px] sm:text-[36px] font-semibold text-gray-800 sm:text-5xl">
              Quotation Requests
            </h1>
            <p className="sm:w-[55%] md:w-[40%] lg:w-[38%]  sm:text-[16px] text-gray-600">
              Discover quotations that pique your interest and submit your
              offers.
            </p>
          </div>

          {/* Search Form */}
          <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-md">
            <RequestSearchForm />
          </div>

          {/* Request List */}

          <div>
            <p className="text-right text-[#141920] text-[12px] mt-6 mb-3">
              820 Result
            </p>

            <div className="flex flex-col gap-5">
              <RequestListCard />
              <RequestListCard />
              <RequestListCard />
              <RequestListCard />
              <RequestListCard />
              <RequestListCard />
              <RequestListCard />
              <RequestListCard />
              <RequestListCard />
              <RequestListCard />
              <RequestListCard />
              <RequestListCard />
              <RequestListCard />
              <RequestListCard />
              <RequestListCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestPage;
