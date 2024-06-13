import Avatar from "react-avatar";
import { format } from "date-fns";
import { estimateReadingTime } from "../../utils/textReadingTime";

const MainBlogCard = ({ blog }) => {
  // Find the first paragraph from the content
  const firstParagraph = blog?.attributes?.content?.find(
    (item) => item.type === "paragraph" && item.children.length > 0
  )?.children[0]?.text;

  // Combine all paragraphs to calculate reading time
  const allText = blog?.attributes?.content
    .filter((item) => item.type === "paragraph")
    .map((item) => item.children.map((child) => child.text).join(" "))
    .join(" ");

  const readingTime = estimateReadingTime(allText);

  // Format the published date using date-fns
  const formattedDate = format(
    new Date(blog.attributes.publishedAt),
    "MMMM dd, yyyy"
  );

  return (
    <div className="hidden sm:grid grid-cols-2 md:grid-cols-7 rounded-[8px] bg-white border-[1px] shadow-lg cursor-pointer">
      <div className="md:col-span-4">
        <img
          src={`${import.meta.env.VITE_STRAPI_URL}${
            blog.attributes.image.data.attributes.formats.small.url
          }`}
          alt={
            blog.attributes.image.data.attributes.alternativeText ||
            "Blog Image"
          }
          className="rounded-s-[8px] aspect-[5/3] h-full w-full max-h-[394px] object-cover"
          loading="lazy"
        />
      </div>
      <div className="md:col-span-3 flex flex-col justify-center gap-3 px-8 py-4 md:max-w-[440px] mx-auto">
        <div className="flex gap-2 text-[14px]">
          <p className="text-[#F9855C] uppercase">{blog.attributes.category}</p>
          <p className="text-[#8A8A8A]">{readingTime}</p>
        </div>
        <h1 className="text-[#141920] text-[24px] md:text-[26px] font-bold line-clamp-3">
          {blog.attributes.title}
        </h1>
        <p className="text-[14px] text-[#8A8A8A] line-clamp-4">
          {firstParagraph}
        </p>
        <div className="flex justify-between text-[#8A8A8A] text-[14px] items-center mt-6">
          <div className="flex items-center gap-2">
            <Avatar
              unstyled={true}
              name={blog.attributes.author}
              className="text-[16px] text-[#E45416] font-[500] p-[5px] rounded-full bg-[#FFF8F1]"
            />
            <p>{blog.attributes.author}</p>
          </div>
          <p>{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default MainBlogCard;
