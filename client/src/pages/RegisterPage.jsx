import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import { useRegisterMutation } from "../slices/userApiSlice";
import HeadingOne from "../components/HeadingOne";
import { validateRegisterForm } from "../utils/validations/authFormValidations";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const inputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: type === "checkbox" ? (checked ? value : "") : value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateRegisterForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await register(formData).unwrap();
        toast.success(res.message);
        navigate("/verify-account");
      } catch (error) {
        toast.error(error?.data?.error || error.error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#FFF8F1] py-12">
      <div className="flex flex-col items-center w-[80%] max-w-screen-lg mx-auto">
        <HeadingOne text="Let’s Sign Up" />
        <form
          onSubmit={formSubmit}
          className="mt-10 w-[95%] sm:w-[70%] md:w-[45%]"
        >
          <div className="flex flex-col sm:flex-row gap-0 sm:gap-[8%] mb-3">
            <div className="flex flex-col sm:w-[46%] lg:w-[50%] mb-3 sm:mb-0 gap-1">
              <label className="lbl-txt">First Name</label>
              <input
                type="text"
                className={`input ${errors.firstName && "!border-red-600"}`}
                placeholder="First Name"
                id="firstName"
                value={formData.firstName}
                onChange={inputChange}
              />
              <p className="mt-1 text-red-600 text-[12px]">
                {errors.firstName}
              </p>
            </div>

            <div className="flex flex-col sm:w-[46%] lg:w-[50%] gap-1">
              <label className="lbl-txt">Last Name</label>
              <input
                type="text"
                className={`input ${errors.lastName && "!border-red-600"}`}
                placeholder="Last Name"
                id="lastName"
                value={formData.lastName}
                onChange={inputChange}
              />
              <p className="mt-1 text-red-600 text-[12px]">{errors.lastName}</p>
            </div>
          </div>

          <div className="flex flex-col gap-1 mb-3">
            <label className="lbl-txt">Email</label>
            <input
              type="text"
              className={`input ${errors.email && "!border-red-600"}`}
              placeholder="Email"
              id="email"
              value={formData.email}
              onChange={inputChange}
            />
            <p className="mt-1 text-red-600 text-[12px]">{errors.email}</p>
          </div>

          <div className="flex flex-col gap-1 mb-3">
            <label className="lbl-txt">Phone</label>
            <input
              type="number"
              className={`input ${errors.phone && "!border-red-600"}`}
              placeholder="Phone"
              id="phone"
              value={formData.phone}
              onChange={inputChange}
            />
            <p className="mt-1 text-red-600 text-[12px]">{errors.phone}</p>
          </div>

          <div className="mb-3">
            <div className="relative flex flex-col gap-1">
              <label className="lbl-txt">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className={`input ${errors.password && "!border-red-600"}`}
                placeholder="* * * * * *"
                id="password"
                value={formData.password}
                onChange={inputChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute inset-y-0 right-0 flex items-center pr-3 mt-6  ${
                  !showPassword && "text-[#E45416]"
                } text-[20px]`}
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
            <p className="mt-1 text-red-600 text-[12px]">{errors.password}</p>
          </div>

          <div className="flex flex-col gap-2 mb-12">
            <label className="lbl-txt">Account Type</label>
            <div className="flex gap-5">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 bg-white border-2 border-[#EE723C] rounded-sm appearance-none    checked:bg-[#E45416] checked:border-0"
                  id="role"
                  value="seller"
                  checked={formData.role === "seller"}
                  onChange={inputChange}
                />
                <label className="lbl-txt !text-[13px]">Seller</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 bg-white border-2 border-[#EE723C] rounded-sm appearance-none    checked:bg-[#E45416] checked:border-0"
                  id="role"
                  value="buyer"
                  checked={formData.role === "buyer"}
                  onChange={inputChange}
                />
                <label className="lbl-txt !text-[13px]">Buyer</label>
              </div>
            </div>
            <p className="mt-1 text-red-600 text-[12px]">{errors.role}</p>
          </div>

          <button
            type="submit"
            className="btn-fill px-[24px] py-[8px] w-full text-[14px]"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </form>
        <p className="text-[16px] text-[#545A5F] mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-[#E45416]">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
