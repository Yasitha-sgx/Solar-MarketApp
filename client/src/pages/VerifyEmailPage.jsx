import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import { useEmailVerificationMutation } from "../slices/userApiSlice";
import HeadingOne from "../components/HeadingOne";

const VerifyEmailPage = () => {
  const { token } = useParams();

  const [verificationToken, setVerificationToken] = useState("");
  const navigate = useNavigate();

  const [emailVerification, { isLoading }] = useEmailVerificationMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
    setVerificationToken(token);
  }, [navigate, userInfo, token]);

  const handleVerifyEmail = async () => {
    try {
      await emailVerification({
        token: verificationToken,
      }).unwrap();
      toast.success("Account verified!");
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.error || err.error);
    }
  };

  return (
    <div className="bg-[#FFF8F1]">
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 w-[80%] max-w-screen-lg mx-auto">
        <div className="mb-4 text-center">
          <HeadingOne text="Verify Email" />
          <p className="sm:w-[70%] mx-auto text-[#141920] text-[14px]">
            Thank you for signing up! To verify your account, please click the
            button below to verify your email address:
          </p>
        </div>
        <button
          className="px-[32px] py-[8px] btn-fill"
          onClick={handleVerifyEmail}
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
