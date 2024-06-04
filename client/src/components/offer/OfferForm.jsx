import { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { IoMdAddCircle } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { validateOfferForm } from "../../utils/validations/offerFormValidations";
import { useAddOfferMutation } from "../../slices/offerApiSlice";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const OfferForm = ({ quotation, setIsOpenOfferForm, getOfferData }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    description: "",
    price: "",
  });
  const [formErrors, setFormErrors] = useState({
    description: "",
    price: "",
    material: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const [selectedFile, setSelectedFile] = useState(null);

  const [addOffer, { isLoading }] = useAddOfferMutation();

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login", { state: { from: location } });
    }
  }, [userInfo, navigate, location]);

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

  const handleEditorChange = (content) => {
    setFormData((prevState) => ({
      ...prevState,
      description: content,
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
        formDataToSend.append("quotation", quotation);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("price", formData.price);
        if (selectedFile) {
          formDataToSend.append("material", selectedFile);
        }
        await addOffer(formDataToSend).unwrap();
        getOfferData(quotation);
        setFormData({
          description: "",
          price: "",
        });
        setSelectedFile(null);
        setIsOpenOfferForm(false);
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
      description: "",
      price: "",
    });
    setFormErrors({
      description: "",
      price: "",
      material: "",
    });
    setSelectedFile(null);
    setIsOpenOfferForm(false);
  };

  return (
    <div className="border border-solid border-gray-300 p-6 rounded-[16px] bg-[#ffffff] shadow-md">
      <p className="text-[16px] text-[#141920] mb-4">Quotation Offer</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <Editor
            apiKey={import.meta.env.VITE_TINY_API}
            init={{
              height: 200,
              menubar: false,
              branding: false,
              plugins:
                "advlist autolink lists link charmap print preview anchor searchreplace visualblocks code fullscreen wordcount insertdatetime media table paste code help",
              toolbar:
                "undo redo | blocks | bold italic underline forecolor | align | checklist numlist bullist indent outdent | removeformat | help",
            }}
            value={formData.description}
            onEditorChange={handleEditorChange}
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
          />
          <p className="mt-1 text-red-600 text-[12px]">{formErrors.price}</p>
        </div>
        <div className="flex gap-2">
          {selectedFile && (
            <div className="relative flex">
              <div>
                <FaFilePdf className="mr-2 text-[#969FA1] text-[50px]" />
                <span className="text-[10px] text-[#3F3E4A]">
                  {selectedFile.name}
                </span>
              </div>
              <IoClose
                className="absolute top-0 -mt-2 -mr-2 text-red-600 cursor-pointer left-10"
                onClick={handleRemoveMaterial}
              />
            </div>
          )}
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
        </div>
        <p className="mt-2 text-red-600 text-[12px]">{formErrors.material}</p>
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
      </form>
    </div>
  );
};

export default OfferForm;
