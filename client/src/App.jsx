import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import RequestPage from "./pages/request/RequestPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "./layouts/MainLayout";
import AddRequestPage from "./pages/request/AddRequestPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyAlertPage from "./pages/VerifyAlertPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/request" element={<RequestPage />} />
          <Route path="/request-quotation" element={<AddRequestPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/verify-account"
            element={
              <VerifyAlertPage
                textOne="Verify Account"
                textTwo="Thank you for signing up with us! Check your email. Verification link sent to your email,
          please verify account using it."
              />
            }
          />
          <Route
            path="/reset-link"
            element={
              <VerifyAlertPage
                textOne="Reset Password"
                textTwo="Reset password link sent to your email, Check you email and safely reset your password"
              />
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify/:token" element={<VerifyEmailPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
        </Route>

        {/* <Route path="" element={<SecondLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
};
export default App;
