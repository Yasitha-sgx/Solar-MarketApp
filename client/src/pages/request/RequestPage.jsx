import RequestSearchForm from "../../components/request/RequestSearchForm";

const RequestPage = () => {
  return (
    <div className="min-h-screen ">
      <div className="bg-red-400 h-[272px]"></div>
      <div className="flex flex-col w-full ">
        <div className="flex flex-col mx-auto w-[90%] md:w-[90%] lg:w-[80%] gap-8 -mt-[33vh] mb-[13vh]">
          <div className=" gap-5 mt-[50px] text-left">
            <h1 className="text-[32px] sm:text-[36px] font-[500] mb-2 text-[#141920]">
              Quotation Requests
            </h1>
            <p className="text-[16px] text-[#545A5F] w-full sm:w-[60%] md:w-[50%] lg:w-[45%] xl:w-[40%] 2xl:w-[30%]">
              Discover quotations that pique your interest and submit your
              offers.
            </p>
          </div>
          <div>
            <div className="border-[1px] p-6 rounded-[16px] bg-[#ffffff]">
              <RequestSearchForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RequestPage;
