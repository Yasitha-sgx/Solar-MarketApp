import Avatar from "react-avatar";
import { format } from "date-fns";
import { estimateReadingTime } from "../../utils/textReadingTime";

const BlogCards = ({ blogs }) => {
  // Find the first paragraph from the content
  const firstParagraph = blogs?.attributes?.content?.find(
    (item) => item.type === "paragraph" && item.children.length > 0
  )?.children[0]?.text;

  // Combine all paragraphs to calculate reading time
  const allText = blogs?.attributes?.content
    .filter((item) => item.type === "paragraph")
    .map((item) => item.children.map((child) => child.text).join(" "))
    .join(" ");

  const readingTime = estimateReadingTime(allText);

  // Format the published date using date-fns
  const formattedDate = format(
    new Date(blogs.attributes.publishedAt),
    "MMMM dd, yyyy"
  );

  return (
    <div className="flex flex-col gap-3 rounded-[8px] bg-white border-[1px] cursor-pointer shadow-lg">
      <img
        src={`${import.meta.env.VITE_STRAPI_URL}${
          blogs.attributes.image.data.attributes.formats.small.url
        }`}
        alt=""
        className="aspect-[4/3] h-full max-h-[253px] object-cover rounded-t-[8px]"
        loading="lazy"
      />
      <div className="flex flex-col gap-2 px-5 py-3">
        <div className="flex gap-2 text-[14px]">
          <p className="text-[#F9855C] uppercase">
            {blogs.attributes.category}
          </p>
          <p className="text-[#585A6D]">{readingTime}</p>
        </div>
        <h1 className="text-[#141920] text-[20px] font-semibold leading-7 line-clamp-2">
          {blogs.attributes.title}
        </h1>
        <p className="text-[#585A6D] text-[14px] line-clamp-3">
          {firstParagraph}
        </p>
        <div className="flex justify-between text-[#8A8A8A] text-[14px] items-center gap-3">
          <div className="flex items-center gap-2">
            <Avatar
              unstyled={true}
              name={blogs.attributes.author}
              className="text-[16px] text-[#E45416] font-[500] p-[5px] rounded-full bg-[#FFF8F1]"
            />
            <p>{blogs.attributes.author}</p>
          </div>
          <p>{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};
export default BlogCards;
