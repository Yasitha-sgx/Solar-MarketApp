import { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { IoMdAddCircle } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { validateOfferForm } from "../../utils/validations/offerFormValidations";
import { useAddOfferMutation } from "../../slices/offerApiSlice";
import { FaRegTrashAlt } from "react-icons/fa";
import { RiEditLine } from "react-icons/ri";
import { format } from "date-fns";

const OfferEditForm = ({ data }) => {
  const formattedDate = format(new Date(data?.createdAt), "dd.MM.yy hh.mm a");
  const [formData, setFormData] = useState({
    description: "",
    price: "",
  });
  const [formErrors, setFormErrors] = useState({
    description: "",
    price: "",
    material: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        description: data?.description || "",
        price: data?.price || "",
      });
      setSelectedFile(data.material || null);
    }
  }, [data]);

  const [addOffer, { isLoading }] = useAddOfferMutation();
  const fileInputRef = useRef(null);

  const handleAddMaterialClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "material" && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
    setFormErrors({
      ...formErrors,
      [id]: "",
    });
  };

  const cleanHtmlContent = (htmlContent) => {
    const cleanedContent = htmlContent.replace(/<p><br><\/p>/g, "").trim();
    return cleanedContent;
  };

  const handleNoteChange = (content) => {
    const cleanedContent = cleanHtmlContent(content);
    setFormData((prevState) => ({
      ...prevState,
      description: cleanedContent,
    }));
    setFormErrors((prevState) => ({
      ...prevState,
      description: "",
    }));
  };

  const handleRemoveMaterial = () => {
    setSelectedFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateOfferForm(formData, selectedFile);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("description", formData.description);
        formDataToSend.append("price", formData.price);
        if (selectedFile) {
          formDataToSend.append("material", selectedFile);
        }
        await addOffer(formDataToSend).unwrap();
        setFormData({
          description: "",
          price: "",
        });
        setSelectedFile(null);
        toast.success("Offer added successfully");
      } catch (err) {
        toast.error(err?.data?.error || err.error);
      }
    } else {
      setFormErrors(validationErrors);
    }
  };

  const handleCancel = () => {
    setFormData({
      description: data?.description || "",
      price: data?.price || "",
    });
    setFormErrors({
      description: "",
      price: "",
      material: "",
    });
    setSelectedFile(data.material);
    setIsEditable(false);
  };

  return (
    <div className="border border-solid border-gray-300 p-6 rounded-[16px] bg-[#ffffff] mt-5">
      <div className="flex justify-between gap-3">
        <p className="text-[16px] text-[#141920] mb-4">Quotation Offer</p>
        <p className="text-[12px] text-[#545A5F]">Offered on {formattedDate}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={`${isEditable && "hidden"} mb-3`}>
          <Editor
            apiKey={import.meta.env.VITE_TINY_API}
            initialValue={data.description}
            init={{
              height: 200,
              menubar: false,
              toolbar: false,
              branding: false,
            }}
            className={`custom-card-editor`}
            disabled
          />
        </div>
        <div className={`${!isEditable && "hidden"} mb-3`}>
          <Editor
            apiKey={import.meta.env.VITE_TINY_API}
            initialValue={formData.description}
            init={{
              height: 200,
              menubar: false,
              branding: false,
              toolbar:
                "undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
            }}
            onEditorChange={handleNoteChange}
            value={formData.description}
            className={`custom-form-editor`}
          />
          <p className="mt-1 text-red-600 text-[12px]">
            {formErrors.description}
          </p>
        </div>
        <div className="mb-4">
          <label className="lbl-txt">Price (LKR)</label>
          <input
            type="number"
            className="w-full mt-1 input"
            id="price"
            value={formData.price}
            onChange={handleInputChange}
            disabled={!isEditable}
          />
          <p className="mt-1 text-red-600 text-[12px]">{formErrors.price}</p>
        </div>
        <div className="flex gap-2">
          {selectedFile && (
            <div className="relative flex">
              <div>
                <FaFilePdf className="mr-2 text-[#969FA1] text-[50px]" />
                <a
                  href={`${import.meta.env.VITE_SERVER_URL}/uploads/${
                    data.material
                  }`}
                  className="text-[10px] text-[#3F3E4A]"
                >
                  {data?.material || selectedFile?.name}
                </a>
              </div>
              {isEditable && (
                <IoClose
                  className="absolute top-0 -mt-2 -mr-2 text-red-600 cursor-pointer left-10"
                  onClick={handleRemoveMaterial}
                />
              )}
            </div>
          )}
          {isEditable && (
            <div
              className="flex items-center w-[85px] gap-2 cursor-pointer"
              onClick={handleAddMaterialClick}
            >
              <IoMdAddCircle className="text-[#E45416] text-[24px]" />
              <label className="text-[#E45416] text-[10px] leading-[10.77px] cursor-pointer">
                Add Material
              </label>
              <input
                type="file"
                ref={fileInputRef}
                accept="application/pdf"
                id="material"
                hidden
                onChange={handleInputChange}
              />
            </div>
          )}
        </div>
        <p className="mt-2 text-red-600 text-[12px]">{formErrors.material}</p>
        {isEditable ? (
          <div className="flex text-[14px] mt-8 gap-2">
            <button
              type="submit"
              className="btn-fill px-[32px] py-[8px]"
              disabled={isLoading}
            >
              {isLoading ? "Sending Offer..." : "Send Offer"}
            </button>
            <button
              onClick={handleCancel}
              type="button"
              className="btn-outline px-[32px] py-[8px]"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex gap-3 mt-8">
            <button type="submit" className="" disabled={isLoading}>
              <FaRegTrashAlt className="text-[16px] text-[#C54610]" />
            </button>
            <button
              onClick={() => setIsEditable(true)}
              type="button"
              className=""
            >
              <RiEditLine className="text-[18px] text-[#1C1B1F]" />
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default OfferEditForm;
