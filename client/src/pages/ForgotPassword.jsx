import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import HeadingOne from "../components/HeadingOne";
import { validateForgotPasswordForm } from "../utils/validations/authFormValidations";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    email: "",
  });

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const errors = validateForgotPasswordForm(email);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post("/api/users/forgot-password", {
          email,
        });
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/");
        }
      } catch (error) {
        toast.error(`Problem: ${error.response.data.error}`);
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(errors);
      setIsLoading(false);
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
              className={`input ${errors.email && "border-red-600"}`}
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
