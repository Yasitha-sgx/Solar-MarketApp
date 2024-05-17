import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useForgotPasswordMutation } from "../slices/userApiSlice";
import HeadingOne from "../components/HeadingOne";
import { validateForgotPasswordForm } from "../utils/validations/authFormValidations";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    email: "",
  });

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    const validationErrors = validateForgotPasswordForm(email);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await forgotPassword({ email }).unwrap();
        toast.success(res.message);
        navigate("/reset-link");
      } catch (err) {
        toast.error(err?.data?.error || err.error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="bg-[#FFF8F1]">
      <div className="flex flex-col justify-center items-center w-[80%] mx-auto min-h-screen">
        <div className="text-center">
          <HeadingOne text="Forgot Password" />

          <p className=" mx-auto text-[#141920] text-[14px]">
            No worries, we'll send you reset instructions
          </p>
        </div>

        <form
          onSubmit={handleForgotPassword}
          className="mt-10 w-[95%] sm:w-[70%] md:w-[45%]"
        >
          <div className="relative flex flex-col gap-1 mb-12">
            <label className="lbl-txt">Email</label>
            <input
              type="text"
              className={`input ${errors.email && "!border-red-600"}`}
              placeholder="example@mail.com"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors("");
              }}
            />
            <p className="mt-1 text-red-600 text-[12px]">{errors.email}</p>
          </div>
          <button
            type="submit"
            className="btn-fill px-[24px] py-[8px] w-full text-[14px]"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Reset Password"}
          </button>
        </form>
        <p className="text-[16px] text-[#545A5F] mt-5">
          Back to{" "}
          <Link to="/login" className="text-[#E45416]">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
export default ForgotPassword;
