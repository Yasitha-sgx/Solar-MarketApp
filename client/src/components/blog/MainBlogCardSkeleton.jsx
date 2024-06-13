const MainBlogCardSkeleton = () => {
  return (
    <div className="hidden sm:grid grid-cols-2 md:grid-cols-7 rounded-[8px] bg-white border-[1px] shadow-lg cursor-pointer animate-pulse">
      <div className="md:col-span-4">
        <div className="rounded-s-[8px] aspect-[5/3] h-full w-full max-h-[394px] object-cover bg-gray-300"></div>
      </div>
      <div className="md:col-span-3 flex flex-col justify-center gap-3 px-8 py-4 md:max-w-[440px]">
        <div className="flex gap-2 text-[14px]">
          <div className="w-16 h-4 rounded bg-gray-300"></div>
          <div className="w-12 h-4 rounded bg-gray-300"></div>
        </div>
        <div className="h-[26px] w-full bg-gray-300 rounded animate-pulse"></div>
        <div className="h-[72px] w-full bg-gray-300 rounded animate-pulse"></div>
        <div className="flex justify-between text-[#8A8A8A] text-[14px] items-center mt-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <div className="w-20 h-4 rounded bg-gray-300"></div>
          </div>
          <div className="w-24 h-4 rounded bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default MainBlogCardSkeleton;
