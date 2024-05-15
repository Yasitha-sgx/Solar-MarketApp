//Function for validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Function to validate username
export const isValidUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
  return usernameRegex.test(username);
};

// Function to validate password
export const isValidPassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Function to validate password
// export const isValidPassword=(password)=> {
//   // Password length should be at least 8 characters
//   if (password.length < 8) {
//     return false;
//   }

//   // Password should contain at least one uppercase letter
//   if (!/[A-Z]/.test(password)) {
//     return false;
//   }

//   // Password should contain at least one lowercase letter
//   if (!/[a-z]/.test(password)) {
//     return false;
//   }

//   // Password should contain at least one digit
//   if (!/\d/.test(password)) {
//     return false;
//   }

//   // Password should contain at least one special character
//   if (!/[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]/.test(password)) {
//     return false;
//   }

//   return true;
// }
