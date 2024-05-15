import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#141920] bottom-0 w-[100%]">
      <div className="flex flex-col md:flex-row items-center justify-between w-[92%] mx-auto py-10 md:py-14 gap-3">
        <div>
          <Link to="/">
            <img src="/assets/footer-logo.svg" alt="logo" />
          </Link>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between md:gap-[48px] gap-6">
          <div>
            <ul className="flex items-center text-[#CCCCCC] gap-[22px] text-xs">
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex items-center  gap-[22px] text-xl ">
              <li>
                <a href="#">
                  <FaInstagramSquare className="rounded-lg text-[#EE723C] hover:text-[#BA552A]" />
                </a>
              </li>
              <li>
                <a href="#">
                  <FaLinkedin className="rounded-lg text-[#EE723C] hover:text-[#BA552A]" />
                </a>
              </li>
              <li>
                <a href="#">
                  <FaFacebookSquare className="rounded-lg text-[#EE723C] hover:text-[#BA552A]" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="flex  mt-3 text-[#4B4D50] w-[92%] mx-auto" />
      <div className="flex flex-col md:flex-row items-center justify-between max-w-[92%] mx-auto pt-6 pb-14 text-[#CCCCCC] text-xs">
        <div>
          <p className="">
            &copy; {new Date().getFullYear()} SolarMarket. All rights reserved.
          </p>
        </div>
        <div>
          <a href="#">Terms and Conditions</a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
