import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import { useResetPasswordMutation } from "../slices/userApiSlice";
import HeadingOne from "../components/HeadingOne";
import { validateResetPasswordForm } from "../utils/validations/authFormValidations";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [verificationToken, setVerificationToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
    setVerificationToken(token);
  }, [navigate, userInfo, token]);

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    setErrors({ ...errors, [id]: "" });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const validationErrors = validateResetPasswordForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await resetPassword({
          token: verificationToken,
          password: formData.password,
        }).unwrap();
        toast.success(res.message);
        navigate("/login");
      } catch (err) {
        toast.error(err?.data?.error || err.error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="bg-[#FFF8F1]">
      <div className="flex flex-col justify-center items-center w-[80%] max-w-screen-lg mx-auto min-h-screen">
        <div className="text-center">
          <HeadingOne text="Reset Password" />
        </div>

        <form
          onSubmit={handleResetPassword}
          className="mt-10 w-[95%] sm:w-[70%] md:w-[45%]"
        >
          <div className="mb-3 ">
            <div className="relative flex flex-col gap-1">
              <label className="lbl-txt">New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className={`input ${errors.password && "!border-red-600"}`}
                placeholder="* * * * * *"
                id="password"
                value={formData.password}
                onChange={handlePasswordChange}
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
          <div className="mb-12 ">
            <div className="relative flex flex-col gap-1">
              <label className="lbl-txt">Confirm Password</label>
              <input
                type={showPasswordTwo ? "text" : "password"}
                className={`input ${
                  errors.confirmPassword && "!border-red-600"
                }`}
                placeholder="* * * * * *"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                onClick={() => setShowPasswordTwo(!showPasswordTwo)}
                className={`absolute inset-y-0 right-0 flex items-center pr-3 mt-6  ${
                  !showPasswordTwo && "text-[#E45416]"
                } text-[20px]`}
              >
                {showPasswordTwo ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
            <p className="mt-1 text-red-600 text-[12px]">
              {errors.confirmPassword}
            </p>
          </div>
          <button
            type="submit"
            className="btn-fill px-[24px] py-[8px] w-full text-[14px]"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
