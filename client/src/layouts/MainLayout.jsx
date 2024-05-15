import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Toaster position="top-right" reverseOrder={false} />
      {<Outlet />}
      <Footer />
    </div>
  );
};
export default MainLayout;
