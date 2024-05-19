import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import HeadingOne from "../components/HeadingOne";
import { validateLoginForm } from "../utils/validations/authFormValidations";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }

    window.scrollTo(0, 0);
  }, [navigate, userInfo]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
    setErrors({
      ...errors,
      [id]: "",
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await login(formData).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.error || err.error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex justify-center items-center bg-[#FFF8F1] min-h-screen">
      <div className="flex flex-col items-center w-[80%] max-w-screen-lg mx-auto">
        <HeadingOne text="Sign In" />
        <form
          onSubmit={handleSubmit}
          className="mt-10 w-[95%] sm:w-[70%] md:w-[45%]"
        >
          <EmailField
            label="Email"
            type="text"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <PasswordField
            label="Password"
            id="password"
            placeholder="* * * * * *"
            value={formData.password}
            showPassword={showPassword}
            onChange={handleChange}
            onTogglePassword={handleTogglePassword}
            error={errors.password}
          />
          <ForgotPasswordLink />
          <SubmitButton text="Sign In" isLoading={isLoading} />
        </form>
        <p className="text-[16px] text-[#545A5F] mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#E45416]">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

const EmailField = ({
  label,
  type,
  id,
  placeholder,
  value,
  onChange,
  error,
}) => (
  <div className="flex flex-col gap-1 mb-3">
    <label className="lbl-txt">{label}</label>
    <input
      type={type}
      className={`input ${error && "!border-red-600"}`}
      placeholder={placeholder}
      id={id}
      value={value}
      onChange={onChange}
    />
    <p className="mt-1 text-red-600 text-[12px]">{error}</p>
  </div>
);

const PasswordField = ({
  label,
  id,
  placeholder,
  value,
  showPassword,
  onChange,
  onTogglePassword,
  error,
}) => (
  <div className="mb-5">
    <div className="relative flex flex-col gap-1">
      <label className="lbl-txt">{label}</label>
      <input
        type={showPassword ? "text" : "password"}
        className={`input ${error && "!border-red-600"}`}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        onClick={onTogglePassword}
        className={`absolute inset-y-0 right-0 flex items-center pr-3 mt-6  ${
          !showPassword && "text-[#E45416]"
        } text-[20px]`}
      >
        {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
      </button>
    </div>
    <p className="mt-1 text-red-600 text-[12px]">{error}</p>
  </div>
);

const ForgotPasswordLink = () => (
  <div className="mb-12">
    <Link to="/forgot-password" className="text-[#E45416] text-[16px]">
      Forgot Password
    </Link>
  </div>
);

const SubmitButton = ({ text, isLoading }) => (
  <button
    type="submit"
    className="btn-fill px-[24px] py-[8px] w-full text-[14px]"
    disabled={isLoading}
  >
    {isLoading ? "Signing In..." : text}
  </button>
);

export default LoginPage;
