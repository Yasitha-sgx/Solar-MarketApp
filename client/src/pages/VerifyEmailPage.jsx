import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import HeadingOne from "../components/HeadingOne";

const VerifyEmailPage = () => {
  const { token } = useParams();

  const [verificationToken, setVerificationToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setVerificationToken(token);
  }, [token]);

  const handleVerifyEmail = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/users/verify-email", {
        token: verificationToken,
      });
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(`Problem: ${error.response.data.error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#FFF8F1]">
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 w-[80%] mx-auto">
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
