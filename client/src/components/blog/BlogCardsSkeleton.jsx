const BlogCardsSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 rounded-[8px] bg-white border-[1px] cursor-pointer shadow-lg animate-pulse">
      <div className="aspect-[4/3] h-full max-h-[253px] object-cover rounded-t-[8px] bg-gray-300"></div>
      <div className="flex flex-col gap-2 px-5 py-3">
        <div className="flex gap-2 text-[14px]">
          <div className="w-20 h-4 rounded bg-gray-300"></div>
          <div className="w-12 h-4 rounded bg-gray-300"></div>
        </div>
        <div className="h-[40px] w-full bg-gray-300 rounded animate-pulse"></div>
        <div className="h-[60px] w-full bg-gray-300 rounded animate-pulse"></div>
        <div className="flex justify-between text-[#8A8A8A] text-[14px] items-center gap-3">
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

export default BlogCardsSkeleton;
