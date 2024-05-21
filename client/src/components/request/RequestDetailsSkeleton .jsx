const FeatureSkeleton = () => (
  <div className="flex gap-2 items-center bg-[#F6F7FA] text-[#545A5F] text-[12px] px-[8px] py-[6px]">
    <div className="w-4 h-4 rounded-full bg-slate-700"></div>
    <div className="w-20 h-4 rounded bg-slate-700"></div>
  </div>
);

const RequestDetailsSkeleton = () => {
  return (
    <div className="mb-10">
      <div className="text-[#141920]">
        <div className="flex items-center gap-4 animate-pulse">
          <div className="w-16 h-16 rounded-full bg-slate-700"></div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
              <div className="w-24 h-4 rounded bg-slate-700"></div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-md bg-slate-700"></div>
                <div className="w-32 h-4 rounded bg-slate-700"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:px-[58px] text-[14px]">
          <div className="mt-4 sm:mt-2">
            <div className="h-4 rounded w-36 bg-slate-700"></div>
            <div className="border-[3px] border-[#F0EDEC] p-3 pb-6 rounded-md mt-1">
              <div className="w-full h-4 rounded bg-slate-700"></div>
              <div className="w-full h-4 mt-2 rounded bg-slate-700"></div>
              <div className="w-full h-4 mt-2 rounded bg-slate-700"></div>
            </div>
          </div>
          <div className="flex flex-col mt-4 md:justify-between md:flex-row">
            <div className="md:w-[50%] lg:w-[60%]">
              <div className="h-4 rounded w-36 bg-slate-700"></div>
              <div className="flex flex-wrap gap-2 mt-2">
                <FeatureSkeleton />
                <FeatureSkeleton />
                <FeatureSkeleton />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
              <div>
                <div className="h-4 rounded w-36 bg-slate-700"></div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <FeatureSkeleton />
                </div>
              </div>
              <div>
                <div className="h-4 rounded w-36 bg-slate-700"></div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <FeatureSkeleton />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <div>
              <div className="w-24 h-4 rounded bg-slate-700"></div>
              <div className="flex flex-wrap gap-2 mt-2">
                <FeatureSkeleton />
              </div>
            </div>
            <div>
              <div className="h-4 rounded w-36 bg-slate-700"></div>
              <div className="flex flex-wrap gap-2 mt-2">
                <FeatureSkeleton />
              </div>
            </div>
            <div className="flex gap-4">
              <div>
                <div className="w-24 h-4 rounded bg-slate-700"></div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <FeatureSkeleton />
                </div>
              </div>
            </div>
          </div>

          <div className="h-8 mt-10 rounded w-36 bg-slate-700"></div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsSkeleton;
