import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Pagination = ({
  currentPage,
  totalPages,
  visiblePages,
  onPageChange,
}) => {
  return (
    <div className="flex flex-col items-center gap-8 mt-8 mb-6 sm:flex-row sm:justify-between">
      <div className="text-[15px] flex items-center gap-2 flex-wrap justify-center">
        <button
          className="p-[8px]  min-w-[40px] h-[40px] rounded-sm shadow-md text-[#E45416] hover:bg-[#E45416] hover:text-[#ffffff]  flex items-center justify-center font[500] disabled:hover:bg-[#ffffff] disabled:hover:text-[#E45416]"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <MdKeyboardArrowLeft />
        </button>
        {visiblePages.map((page) => (
          <button
            key={page}
            className={`p-[8px]  min-w-[40px] h-[40px] rounded-sm shadow-md ${
              currentPage === page
                ? "bg-[#E45416] text-[#ffffff]"
                : "text-[#E45416] hover:bg-[#E45416] hover:text-[#ffffff]"
            }  flex items-center justify-center font[500] disabled:hover:bg-[#ffffff] disabled:hover:text-[#E45416]`}
            onClick={() => onPageChange(page)}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
        <button
          className="p-[8px]  min-w-[40px] h-[40px] rounded-sm shadow-md text-[#E45416] hover:bg-[#E45416] hover:text-[#ffffff]  flex items-center justify-center font[500] disabled:hover:bg-[#ffffff] disabled:hover:text-[#E45416]"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
      <p className="text-[#545A5F] text-[12px]">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
};
export default Pagination;
