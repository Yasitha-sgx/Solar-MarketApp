/**Register form validation */
export const validateRegisterForm = (formData) => {
  const errors = {};

  if (!formData.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!formData.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!formData.email.trim()) {
    errors.email = "email is required";
  } else if (!isValidEmail(formData.email)) {
    errors.email = "Invalid email";
  }

  if (!formData.phone.trim()) {
    errors.phone = "Phone is required";
  } else if (formData.phone.length < 10 || formData.phone.length > 10) {
    errors.phone = "Phone length must be at 10 numbers";
  }

  if (!formData.password.trim()) {
    errors.password = "Password is required";
  } else if (!isValidPassword(formData.password)) {
    errors.password =
      "Invalid password. Password must be at least 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character.";
  }

  if (!formData.role.trim()) {
    errors.role = "role is required";
  }

  return errors;
};

/**Login form form validation */
export const validateLoginForm = (formData) => {
  const errors = {};

  if (!formData.email.trim()) {
    errors.email = "email is required";
  } else if (!isValidEmail(formData.email)) {
    errors.email = "Invalid email";
  }

  if (!formData.password.trim()) {
    errors.password = "Password is required";
  } else if (!isValidPassword(formData.password)) {
    errors.password = "Invalid Password";
  }

  return errors;
};

/**Forgot password form validation */
export const validateForgotPasswordForm = (email) => {
  const errors = {};

  if (!email.trim()) {
    errors.email = "email is required";
  } else if (!isValidEmail(email)) {
    errors.email = "Invalid email";
  }

  return errors;
};

/**Reset password form validation */
export const validateResetPasswordForm = (formData) => {
  const errors = {};

  if (!formData.password.trim()) {
    errors.password = "Password is required";
  } else if (!isValidPassword(formData.password)) {
    errors.password =
      "Invalid password. Password must be at least 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character.";
  } else if (formData.password !== formData.confirmPassword) {
    errors.password = "Password not match";
    errors.confirmPassword = "Password not match";
  }

  if (!formData.confirmPassword.trim()) {
    errors.confirmPassword = "Confirm password is required";
  }

  return errors;
};

//email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};
