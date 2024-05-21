import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { IoMdAddCircle } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { validateOfferForm } from "../../utils/validations/offerFormValidations";
import { useAddOfferMutation } from "../../slices/offerApiSlice";

const OfferForm = ({ quotation, setIsOpenOfferForm }) => {
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

  const [offer, { isLoading }] = useAddOfferMutation();

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

  const handleEditorChange = (content) => {
    const cleanedValue = cleanHtmlContent(content);
    setFormData((prevState) => ({
      ...prevState,
      description: cleanedValue,
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

        console.log(
          "Sending form data:",
          Object.fromEntries(formDataToSend.entries())
        ); // Log form data before sending

        const response = await offer(formDataToSend).unwrap();

        console.log("Response received:", response);

        setFormData({
          description: "",
          price: "",
        });
        setSelectedFile(null);
        setIsOpenOfferForm(false);
        toast.success("Offer added successfully");
      } catch (err) {
        console.error("Error submitting offer:", err); // Log detailed error
        toast.error(
          err?.data?.error || err.error || "An unknown error occurred"
        );
      }
    } else {
      setFormErrors(validationErrors);
    }
  };

  return (
    <div>
      <p className="text-[16px] text-[#141920] mb-4">Quotation Offer</p>
      <form onSubmit={handleSubmit}>
        <Editor
          apiKey={import.meta.env.VITE_TINY_API}
          value={formData.description}
          init={{
            height: 200,
            menubar: false,
            branding: false,
            force_br_newlines: false,
            force_p_newlines: false,
            forced_root_block: "",
            plugins: [
              "autolink lists link image charmap preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help",
            setup: (editor) => {
              editor.on("init", () => {
                editor.setContent(formData.description);
              });
              editor.on("Change", () => {
                handleEditorChange(editor.getContent());
              });
            },
          }}
          onEditorChange={handleEditorChange}
        />
        <p className="mt-1 text-red-600 text-[12px]">
          {formErrors.description}
        </p>
        <div className="mb-3">
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
            type="button"
            className="btn-outline px-[32px] py-[8px]"
            onClick={() => setIsOpenOfferForm(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default OfferForm;
