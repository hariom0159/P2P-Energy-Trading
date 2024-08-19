import React from "react";
import "./App.css";
import HomePage from "./components/Home/HomePage";
import AdminLogin from "./components/Admin Login/AdminLogin";
import SignIn from "./components/Login/SignIn";
import SignUp from "./components/Register/SignUp";
import ForgotPassword from "./components/Forgot Password/ForgotPassword";
import ResetPassword from "./components/Reset Password/ResetPassword";
import ErrorPage from "./components/Error Page/ErrorPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./components/Profile/ProfilePage";
import SellUnits from "./components/Sell units/SellUnits";
import BuyUnits from "./components/Buy units/BuyUnits";
import HistoryPage from "./components/History/HistoryPage";
import AnalyticsPrediction from "./components/Analysis/AnalyticsPrediction";
import Funds from "./components/Profile/Funds/Funds";
import ModuleDetail from "./components/Profile/PV Details/ModuleDetail";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forget" element={<ForgotPassword />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/sell" element={<SellUnits />} />
          <Route path="/buy" element={<BuyUnits />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/analysis" element={<AnalyticsPrediction />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/details" element={<ModuleDetail />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
