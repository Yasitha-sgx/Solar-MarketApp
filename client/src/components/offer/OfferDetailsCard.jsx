import { useState } from "react";
import Avatar from "react-avatar";
import { FaFilePdf } from "react-icons/fa";
import { Editor } from "@tinymce/tinymce-react";
import { format } from "date-fns";
import {
  useAcceptOfferMutation,
  useDeclineOfferMutation,
} from "../../slices/offerApiSlice";
import toast from "react-hot-toast";
import ConfirmationModal from "../ConfirmationModal";

const OfferDetailsCard = ({ data, refetch, quotation }) => {
  const formattedDate = format(new Date(data?.createdAt), "dd.MM.yy hh.mm a");

  const [acceptOffer, { isLoading: acceptLoading }] = useAcceptOfferMutation();
  const [declineOffer, { isLoading: declineLoading }] =
    useDeclineOfferMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);

  const handleAcceptOffer = async () => {
    try {
      await acceptOffer({ id: data.offer_Id, data: { quotation } }).unwrap();
      refetch();
      toast.success("Offer Accepted");
    } catch (error) {
      toast.error(error?.data?.error || error.error);
    }
  };

  const handleDeclineOffer = async () => {
    try {
      await declineOffer({ id: data.offer_Id, data: { quotation } }).unwrap();
      refetch();
      toast.success("Offer Declined");
    } catch (error) {
      toast.error(error?.data?.error || error.error);
    }
  };

  const handleOpenModal = (action) => {
    setModalAction(action);
    setIsModalOpen(true);
  };

  const handleConfirmAction = () => {
    if (modalAction === "accept") {
      handleAcceptOffer();
    } else if (modalAction === "decline") {
      handleDeclineOffer();
    }
    setIsModalOpen(false);
  };

  return (
    <div className="border border-solid border-gray-300 p-6 rounded-[16px] bg-[#ffffff] shadow-md mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="bg-[#FFF4EF] rounded-full w-[40px] h-[40px] flex items-center justify-center">
            <Avatar
              unstyled={true}
              name={`${data.offererFirstName} ${data.offererLastName}`}
              className="text-[16px] text-[#E45416] font-[500] p-[5px] rounded-full"
            />
          </div>
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
      <div className="mt-5">
        <label className="lbl-txt">Price (LKR)</label>
        <input
          type="number"
          className="w-full mt-1 input"
          id="price"
          value={data.price}
          disabled
        />
      </div>
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
      {data.status === "Pending" && (
        <div className="flex text-[14px] mt-8 gap-2">
          <button
            type="submit"
            className="btn-fill px-[32px] py-[8px]"
            onClick={() => handleOpenModal("accept")}
            disabled={acceptLoading}
          >
            {acceptLoading ? "Accepting..." : "Accept Offer"}
          </button>
          <button
            type="button"
            className="btn-outline px-[32px] py-[8px]"
            onClick={() => handleOpenModal("decline")}
            disabled={declineLoading}
          >
            {declineLoading ? "Loading..." : "Decline Offer"}
          </button>
        </div>
      )}
      {data.status === "Accepted" && (
        <p className="text-[14px] mt-8 text-green-600">Accepted</p>
      )}
      {data.status === "Decline" && (
        <p className="text-[14px] mt-8 text-red-600">Decline</p>
      )}
      {data.status === "Not Accepted" && (
        <p className="text-[14px] mt-8 text-[#E45416]">Not Accepted</p>
      )}
      <ConfirmationModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAction}
        message={`Are you sure you want to ${
          modalAction === "accept" ? "accept" : "decline"
        } this offer?`}
      />
    </div>
  );
};

export default OfferDetailsCard;
