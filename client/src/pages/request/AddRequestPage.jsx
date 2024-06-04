import { IoIosArrowDropleft } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import RequestFormLayout from "../../components/request/RequestFormLayout";

const AddRequestPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (!userInfo) {
      navigate("/login", { state: { from: location } });
    } else if (userInfo.role !== "buyer") {
      navigate("/");
    } else {
      window.scrollTo(0, 0);
    }
  }, [userInfo, navigate, location]);

  return (
    <div className="min-h-screen">
      <div className="bg-[#FFF8F1]  h-[187px]"></div>
      <div className="flex flex-col items-center w-full ">
        <div className="flex flex-col w-full max-w-screen-lg gap-8 -mt-[160px] mb-[70px] p-8 sm:p-8">
          <div className="flex items-center gap-5 text-left">
            <Link
              to={{ pathname: from }}
              className="text-[#EE723C] text-[36px]"
            >
              <IoIosArrowDropleft />
            </Link>
            <h1 className="text-2xl font-semibold">Request Free Quotation</h1>
          </div>
          <div className="px-6 sm:px-9">
            <div className="border border-solid border-gray-300 p-6 sm:rounded-se-[140px] rounded-[16px] bg-[#ffffff]">
              <RequestFormLayout />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRequestPage;
