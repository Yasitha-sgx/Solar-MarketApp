export const validateOfferForm = (formData, selectedFile) => {
  const errors = {};

  if (!formData.description.trim()) {
    errors.description = "This field is required*";
  }

  if (!formData.price.trim()) {
    errors.price = "Price is required!*";
  } else if (isNaN(formData.price) || formData.price <= 0) {
    errors.price = "Price must be a positive number.";
  }

  if (!selectedFile) {
    errors.material = "Material is required!*";
  } else if (!selectedFile.type === "application/pdf") {
    errors.material = "Only PDF files are allowed.";
  } else if (selectedFile.size > 5 * 1024 * 1024) {
    // 5 MB limit
    errors.material = "File size must be less than 5MB.";
  }

  return errors;
};
