import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import toast from "react-hot-toast";

export const useTokenExpirationCheck = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (userInfo) {
        const expirationTime = userInfo.exp * 1000;

        if (Date.now() >= expirationTime) {
          dispatch(logout());
          toast.error("Session expired. Please log in again.");
        }
      }
    };

    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch, userInfo]);
};
