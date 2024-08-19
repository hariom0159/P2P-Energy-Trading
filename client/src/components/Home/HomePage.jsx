import React, { useEffect } from "react";
import SideBar from "../Sidebar/SideBar";
import { CurrencyRupee, DoubleArrow } from "@mui/icons-material";
import "./HomePage.css";
import solar from "../../assets/solar.jpg";
import { UserContext } from "../Context/UserState";
import { useContext } from "react";

const HomePage = () => {
  const context = useContext(UserContext);
  const { user, getUser } = context;

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="w-100 h-100 d-flex justify-content-between flex-row">
        <SideBar />
        <div className="c1">
          <h1>Welcome to the Dashboard !</h1>
          <div className="w-100 p-3 m-2 bg-white mt-5 shadow">
            <h2>{user.name}</h2>
            <h4>{user.email}</h4>
          </div>
          <div className="w-100 p-3 m-2 bg-white d-flex justify-content-around flex-column mt-5 box shadow">
            <div className="mt-3 p-2">
              <span style={{fontWeight: `bold`}}>Web-app Features</span>
            </div>
            <div className="mt-3 p-2">
              <span>Document Verification</span>
            </div>
            <div className="mt-3 p-2">
              <span>Add funds</span>
            </div>
            <div className="mt-3 p-2">
              <span>Buy units</span>
            </div>
            <div className="mt-3 p-2">
              <span>Sell units</span>
            </div>
            <div className="mt-3 p-2">
              <span>Block Chain Based Transaction</span>
            </div>
            <div className="mt-3 p-2">
              <span>Reset Password</span>
            </div>
          </div>
        </div>
        <div className="c2">
          <img
            src={solar}
            style={{ width: `${100}%`, height: `${100}%` }}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
