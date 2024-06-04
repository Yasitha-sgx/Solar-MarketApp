import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { CgMenu, CgClose } from "react-icons/cg";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import Avatar from "react-avatar";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDWOpen, setIsDWOpen] = useState(false);

  const menuRef = useRef(null);
  const dWRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpen(window.innerWidth > 835);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const shouldCloseMenu =
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        window.innerWidth < 835;
      if (shouldCloseMenu) setIsMenuOpen(false);
    };

    if (isMenuOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const shouldCloseDW =
        dWRef.current &&
        !dWRef.current.contains(event.target) &&
        window.innerWidth > 835;
      if (shouldCloseDW) setIsDWOpen(false);
    };

    if (isDWOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDWOpen]);

  const handleMenuClick = () => {
    if (window.innerWidth < 835) setIsMenuOpen(false);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDWClick = () => setIsDWOpen(!isDWOpen);

  return (
    <header className="sticky top-0 z-20 shadow-md bg-[#ffffff] w-full">
      {/* Desktop Menu */}
      <nav className="items-center justify-between text-sm w-full max-w-screen-xl p-8 px-8 h-[50px] py-8 hidden md:flex mx-auto">
        <div className="flex items-center md:gap-12 lg:gap-20">
          <div>
            <NavLink to="/" onClick={handleMenuClick}>
              <img src="/assets/logo.svg" alt="logo" />
            </NavLink>
          </div>
          <div className="flex items-center md:gap-4 lg:gap-8">
            <NavLink to="/about" onClick={handleMenuClick}>
              About
            </NavLink>
            <NavLink to="/contact" onClick={handleMenuClick}>
              Contact
            </NavLink>
            <NavLink to="/blog" onClick={handleMenuClick}>
              Blog
            </NavLink>
            <NavLink to="/request" onClick={handleMenuClick}>
              Request
            </NavLink>
          </div>
        </div>

        <div>
          {userInfo ? (
            <div
              className="flex flex-col items-center gap-[20px] cursor-pointer"
              onClick={handleDWClick}
              ref={dWRef}
            >
              <div className="relative text-[14px] text-[#141920] font-[500] items-center gap-[20px] flex">
                <Avatar
                  unstyled={true}
                  name={`${userInfo.firstName} ${userInfo.lastName}`}
                  className="text-[16px] text-[#E45416] font-[500] p-[5px] rounded-full bg-[#FFF8F1]"
                />
                <div>
                  <div>{userInfo.firstName}</div>
                  <div>{userInfo.lastName}</div>
                </div>
                <div className="cursor-pointer">
                  {isDWOpen ? (
                    <IoMdArrowDropup className="text-[#E45416] text-[20px]" />
                  ) : (
                    <IoMdArrowDropdown className="hover:text-[#E45416] text-[20px]" />
                  )}
                </div>
              </div>
              {isDWOpen && (
                <div className="absolute top-[100%] mt-1 bg-white shadow-lg px-10 py-5 rounded-md">
                  <div className="text-[#585A6D] flex flex-col gap-[32px] text-center">
                    {userInfo.role === "buyer" && (
                      <>
                        <div className="block text-sm" onClick={handleDWClick}>
                          <NavLink to="/request-quotation">
                            Request Quotation
                          </NavLink>
                        </div>
                        <div className="block text-sm" onClick={handleDWClick}>
                          <NavLink to="/my-requests">My Requests</NavLink>
                        </div>
                      </>
                    )}
                    <button
                      className="block w-full px-4 py-2 text-sm text-center btn-fill"
                      onClick={logoutHandler}
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-[38px]">
              <NavLink to="/login" onClick={handleMenuClick}>
                Login
              </NavLink>
              <NavLink to="/register">
                <button
                  className="btn-fill py-[8px] px-[24px]"
                  onClick={handleMenuClick}
                >
                  Sign Up
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <nav className="flex items-center justify-between text-sm w-full max-w-screen-xl p-4 sm:p-8 h-[50px] mx-auto py-8 md:hidden">
        <div className="flex items-center gap-20">
          <div>
            <NavLink to="/" onClick={handleMenuClick}>
              <img src="/assets/logo.svg" alt="logo" />
            </NavLink>
          </div>
          {isMenuOpen && (
            <div
              className="absolute shadow-md bg-[#ffffff] min-h-[45vh] left-0 top-full w-full overflow-scroll"
              ref={menuRef}
            >
              <ul className="flex flex-col items-center gap-[32px] py-8">
                <li>
                  <NavLink to="/about" onClick={handleMenuClick}>
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" onClick={handleMenuClick}>
                    Contact
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/blog" onClick={handleMenuClick}>
                    Blog
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/request" onClick={handleMenuClick}>
                    Request
                  </NavLink>
                </li>
                {userInfo ? (
                  <li className="flex flex-col items-center gap-[20px]">
                    <div
                      className="text-[14px] text-[#141920] font-[500] items-center gap-[20px] flex"
                      onClick={handleDWClick}
                    >
                      <Avatar
                        unstyled={true}
                        name={`${userInfo.firstName} ${userInfo.lastName}`}
                        className="text-[16px] text-[#E45416] font-[500] p-[5px] rounded-full bg-[#FFF8F1]"
                      />
                      <div>
                        <div>{userInfo.firstName}</div>
                        <div>{userInfo.lastName}</div>
                      </div>
                      <div className="cursor-pointer">
                        {isDWOpen ? (
                          <IoMdArrowDropup className="hover:text-[#E45416] text-[20px]" />
                        ) : (
                          <IoMdArrowDropdown className="hover:text-[#E45416] text-[20px]" />
                        )}
                      </div>
                    </div>
                    {isDWOpen && (
                      <div className="text-center">
                        <div className="text-[#585A6D] flex flex-col gap-[32px]">
                          {userInfo.role === "buyer" && (
                            <>
                              <div
                                className="block text-sm"
                                onClick={handleDWClick}
                              >
                                <NavLink
                                  to="/request-quotation"
                                  onClick={handleMenuClick}
                                >
                                  Request Quotation
                                </NavLink>
                              </div>
                              <div
                                className="block text-sm"
                                onClick={handleDWClick}
                              >
                                <NavLink
                                  to="/my-requests"
                                  onClick={handleMenuClick}
                                >
                                  My Requests
                                </NavLink>
                              </div>
                            </>
                          )}
                          <button
                            className="block w-full px-4 py-2 text-sm text-center btn-fill"
                            onClick={logoutHandler}
                          >
                            Log Out
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ) : (
                  <li className="flex items-center gap-[38px]">
                    <NavLink to="/login" onClick={handleMenuClick}>
                      Login
                    </NavLink>
                    <NavLink to="/register">
                      <button
                        className="btn-fill py-[8px] px-[24px]"
                        onClick={handleMenuClick}
                      >
                        Sign Up
                      </button>
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
        <div className="items-center gap-[38px] text-[#585A6D] flex">
          {isMenuOpen ? (
            <CgClose
              className="text-3xl cursor-pointer text-[#E45416] hover:text-[#EE723C] md:hidden sm:flex"
              onClick={() => setIsMenuOpen(false)}
            />
          ) : (
            <CgMenu
              className="text-3xl cursor-pointer text-[#E45416] hover:text-[#EE723C] md:hidden sm:flex"
              onClick={() => setIsMenuOpen(true)}
            />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
