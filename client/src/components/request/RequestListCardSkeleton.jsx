const RequestListCardSkeleton = () => {
  return (
    <div className="flex justify-center flex-col p-6 bg-white border border-[#F0EDEC] rounded-lg shadow-md cursor-pointer">
      <div className="flex justify-between w-full animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-700"></div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1 md:flex-row sm:gap-3">
              <div className="w-24 h-4 rounded bg-slate-700"></div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded bg-slate-700" />
                <div className="w-32 h-4 rounded bg-slate-700"></div>
              </div>
            </div>
            <div className="flex-wrap hidden gap-2 md:flex">
              <FeatureSkeleton />
              <FeatureSkeleton />
              <FeatureSkeleton />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between w-[30%] md:w-[25%] text-right">
          <div className="self-end w-12 h-4 rounded bg-slate-700"></div>
          <div className="self-end hidden w-24 h-4 rounded bg-slate-700 md:block"></div>
        </div>
      </div>
      <div className="mt-4 md:hidden ms-1">
        <div className="flex flex-wrap gap-2 md:hidden">
          <FeatureSkeleton />
          <FeatureSkeleton />
          <FeatureSkeleton />
        </div>
      </div>
      <div className="w-24 h-4 mt-4 rounded bg-slate-700 md:hidden"></div>
    </div>
  );
};

const FeatureSkeleton = () => (
  <div className="flex gap-2 items-center bg-[#F6F7FA] text-[#545A5F] text-[12px] px-[8px] py-[6px]">
    <div className="w-4 h-4 rounded-full bg-slate-700"></div>
    <div className="w-20 h-4 rounded bg-slate-700"></div>
  </div>
);

export default RequestListCardSkeleton;
