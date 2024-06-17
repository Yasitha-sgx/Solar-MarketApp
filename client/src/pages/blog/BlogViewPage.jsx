import { IoIosArrowDropleft } from "react-icons/io";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { useEffect } from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { FaRegHeart } from "react-icons/fa";

import { useGetBlogQuery } from "../../slices/blogApiSlice";

const BlogViewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const from = location.state?.from || "/blog";

  const { data } = useGetBlogQuery(id);

  const content = data?.content;

  const handleGoBack = () => navigate(from);

  let formattedDate;
  if (data?.publishedAt) {
    try {
      formattedDate = format(new Date(data.publishedAt), "MMMM dd, yyyy");
    } catch (error) {
      console.error("Invalid date format:", error);
    }
  }

  useEffect(() => {
    // window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF8F1]">
      <div className="max-w-screen-xl p-8 mx-auto">
        {data && (
          <div className="rounded-[8px] bg-white border-[1px] shadow-sm p-4 flex flex-col gap-6">
            <button
              onClick={handleGoBack}
              className="text-[#EE723C] text-[36px]"
            >
              <IoIosArrowDropleft />
            </button>
            <h1 className="text-[24px] sm:text-[40px] text-[#141920] font-semibold max-w-screen-md text-center mx-auto leading-[31.2px] sm:leading-[52px]">
              {data?.title}
            </h1>
            <div className="flex gap-4 text-center mx-auto text-[14px]">
              <p className="text-[#F9855C] uppercase cursor-pointer">
                {data?.category}
              </p>{" "}
              <p className="text-[#545A5F]">{formattedDate}</p>
            </div>
            <div className="md:px-8">
              {data?.image?.url && (
                <img
                  src={`${import.meta.env.VITE_STRAPI_URL}${data?.image.url}`}
                  alt={data?.title}
                  className="aspect-[5/3] max-h-[433px] w-full object-cover rounded-[8px]"
                />
              )}
            </div>
            <div className="flex flex-col justify-center max-w-screen-md mx-auto md:px-8 custom-content">
              <BlocksRenderer content={content} />
              <div>
                <div className="mt-10 text-[#545A5F] flex gap-3 items-center justify-between">
                  <div className="flex gap-3">
                    <div className="bg-[#FFF4EF] rounded-full w-[40px] h-[40px] flex items-center justify-center">
                      <FaRegHeart className="text-[20px] cursor-pointer" />
                    </div>
                    <p className="text-[16px] mt-2">1.4k</p>
                  </div>
                  ahas
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogViewPage;
