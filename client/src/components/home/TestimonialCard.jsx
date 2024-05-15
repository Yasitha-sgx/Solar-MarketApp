const TestimonialCard = ({ reviewData }) => {
  return (
    <div className=" border-[1px] py-[20px] px-[24px] rounded-[8px] shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={reviewData.image}
            alt={`Reviewer ${reviewData.id}`}
            className="rounded-full object-cover w-[40px] h-[40px]"
          />
          <p className="text-[16px] font-semibold">{reviewData.name}</p>
        </div>
        <p className="text-[#545A5F] text-[12px]">1 month ago</p>
      </div>
      <p className="text-[#545A5F] text-[16px]">{reviewData.review}</p>
    </div>
  );
};
export default TestimonialCard;
