import Avatar from "react-avatar";
import { FaFilePdf } from "react-icons/fa";
import { Editor } from "@tinymce/tinymce-react";
import { format } from "date-fns";

const OfferDetailsCard = ({ data }) => {
  const formattedDate = format(new Date(data?.createdAt), "dd.MM.yy hh.mm a");

  return (
    <div className="border border-solid border-gray-300 p-6 rounded-[16px] bg-[#ffffff] shadow-md mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Avatar
            unstyled={true}
            name={`${data.offererFirstName} ${data.offererLastName}`}
            className="text-[16px] text-[#E45416] font-[500] p-[5px] rounded-full bg-[#FFF8F1]"
          />
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
              <h3 className="text-[16px]">{`${data.offererFirstName} ${data.offererLastName}`}</h3>
            </div>
          </div>
        </div>
        <p className="text-[12px] text-[#545A5F]">Offered on {formattedDate}</p>
      </div>
      <Editor
        apiKey={import.meta.env.VITE_TINY_API}
        initialValue={data.description}
        init={{
          height: 200,
          menubar: false,
          toolbar: false,
          branding: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
        }}
        disabled
      />
      <div className="mt-5 px-7 py-5 bg-[#F9F9F9] rounded-lg flex flex-col gap-2">
        <FaFilePdf className="mr-2 text-[#969FA1] text-[50px]" />
        <a
          className="text-[10px] text-[#3F3E4A] underline"
          href={`${import.meta.env.VITE_SERVER_URL}/uploads/${data.material}`}
          download
        >
          {data.material}
        </a>
      </div>
      <div className="flex text-[14px] mt-8 gap-2">
        <button type="submit" className="btn-fill px-[32px] py-[8px]">
          Accept Offer
        </button>
        <button type="button" className="btn-outline px-[32px] py-[8px]">
          Decline Offer
        </button>
      </div>
    </div>
  );
};

export default OfferDetailsCard;
