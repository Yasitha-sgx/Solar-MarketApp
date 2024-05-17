import { useSelector } from "react-redux";

import HeadingOne from "../components/HeadingOne";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerifyAlertPage = ({ textOne, textTwo }) => {
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <div className="bg-[#FFF8F1]">
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 w-[80%] max-w-screen-lg mx-auto">
        <div className="mb-4 text-center">
          <HeadingOne text={textOne} />
          <p className="sm:w-[70%] mx-auto text-[#141920] text-[14px]">
            {textTwo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyAlertPage;
