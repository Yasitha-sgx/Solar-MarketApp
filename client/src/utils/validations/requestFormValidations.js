export const validateRequestForm = (formData) => {
  const errors = {};

  if (!formData.buildingAddress.trim()) {
    errors.buildingAddress = "Building address is required";
  }

  if (!formData.city.trim()) {
    errors.city = "City is required";
  }

  if (!formData.district.trim()) {
    errors.district = "District is required";
  }

  if (!formData.additionalNotes.trim()) {
    errors.additionalNotes = "Additional note is required";
  }

  return errors;
};
