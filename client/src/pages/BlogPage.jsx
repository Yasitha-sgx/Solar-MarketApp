import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllBlogsQuery } from "../slices/blogApiSlice";
import toast from "react-hot-toast";
import BlogCards from "../components/blog/BlogCards";
import MainBlogCard from "../components/blog/MainBlogCard";
import MainBlogCardSkeleton from "../components/blog/MainBlogCardSkeleton";
import BlogCardsSkeleton from "../components/blog/BlogCardsSkeleton";
import Pagination from "../components/Pagination";

const BlogPage = () => {
  // Constants and States
  const pageSize = 15;
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [localIsLoading, setLocalIsLoading] = useState(true);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  // Fetching blogs data
  const { data, isLoading, error, refetch } = useGetAllBlogsQuery({
    pageSize,
    page: currentPage,
  });

  // Side effects on isLoading and error
  useEffect(() => {
    setLocalIsLoading(isLoading);
    if (error) {
      toast.error("Something went wrong! Try again.");
    }
    window.scrollTo(0, 0);
  }, [isLoading, error]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Extracting data and pagination information
  const blogs = data?.data || [];
  const totalPages = Math.ceil(data?.meta?.pagination.total / pageSize) || 1;
  const [visiblePages, setVisiblePages] = useState([]);

  // Side effect to update visible pages
  useEffect(() => {
    updateVisiblePages(currentPage, totalPages);
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

  // Function to handle page change
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      window.scrollTo(0, 0);
      setCurrentPage(page);
      navigate({
        pathname: "/blog",
        search: `?page=${page}`,
      });
      setLocalIsLoading(true);
      refetch().finally(() => setLocalIsLoading(false));
    }
  };

  // Rendering JSX
  return (
    <div className="min-h-screen bg-[#FFF8F1]">
      <div className="max-w-screen-xl p-8 mx-auto">
        <div className="text-center sm:text-left">
          <h1 className="text-[36px] text-[#141920] font-medium mt-8">Blog</h1>
          <p className="text-[16px] text-[#545A5F] font-normal mt-2">
            Learn about solar from our partners
          </p>
        </div>
        <div className="mt-11">
          {initialPage === 1 && blogs.length > 0 && !localIsLoading && (
            <MainBlogCard blog={blogs[0]} />
          )}
          {initialPage === 1 && localIsLoading && <MainBlogCardSkeleton />}
        </div>
        <div
          className={`${
            initialPage === 1 ? "mt-6" : ""
          } grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6`}
        >
          {localIsLoading || !data
            ? Array.from({ length: 15 }).map((_, index) => (
                <div key={index}>
                  <BlogCardsSkeleton />
                </div>
              ))
            : isMobileScreen
            ? blogs.map((item) => <BlogCards key={item.id} blogs={item} />)
            : initialPage === 1
            ? blogs
                .slice(1)
                .map((item) => <BlogCards key={item.id} blogs={item} />)
            : blogs.map((item) => <BlogCards key={item.id} blogs={item} />)}
        </div>
        {/* Pagination */}
        {blogs.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            visiblePages={visiblePages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default BlogPage;
