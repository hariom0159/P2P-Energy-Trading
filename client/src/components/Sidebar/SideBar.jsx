import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import {
  ManageAccounts,
  PlaylistRemove,
  PlaylistAdd,
  DensityMedium,
  KeyboardDoubleArrowLeft,
  History,
  Home,
  PowerSettingsNew,
  Insights,
} from "@mui/icons-material";
import { UserContext } from "../Context/UserState";
import { useContext } from "react";

const SideBar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { user, getUser } = context;

  const startBuy = () => {
    getUser();
    if (user.verified) {
      navigate("/buy");
    } else {
      alert("You are not verified yet to start trading :(");
    }
  };

  const startSell = () => {
    getUser();
    if (user.verified) {
      navigate("/sell");
    } else {
      alert("You are not verified yet to start trading :(");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="sidebar">
        <div className="py-2 mt-2 mb-5 head w-100">
          <div className="w-100 d-flex justify-content-start">
            <DensityMedium
              onClick={() => setShow(!show)}
              sx={{
                color: "black",
                cursor: "pointer",
                display: !show ? "block" : "none",
              }}
            />
          </div>
          <div className="w-100 d-flex justify-content-end">
            <KeyboardDoubleArrowLeft
              onClick={() => setShow(!show)}
              sx={{
                color: "black",
                cursor: "pointer",
                display: show ? "block" : "none",
              }}
            />
          </div>
        </div>
        <div className="d-flex flex-row comp w-100 py-2 mb-2">
          <Home
            color="black"
            cursor="pointer"
            onClick={() => navigate("/home")}
          />{" "}
          <button
            className="w-75 px-2"
            style={{ display: show ? "block" : "none" }}
            onClick={() => navigate("/home")}
          >
            Home
          </button>
        </div>
        <div className="d-flex flex-row comp w-100 py-2 mb-2">
          <ManageAccounts
            color="black"
            cursor="pointer"
            onClick={() => navigate("/profile")}
          />{" "}
          <button
            className="w-75 px-2"
            style={{ display: show ? "block" : "none" }}
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
        </div>
        <div className="d-flex flex-row comp w-100 py-2 mb-2">
          <PlaylistAdd color="black" cursor="pointer" onClick={startBuy} />{" "}
          <button
            className="w-75 px-2"
            style={{ display: show ? "block" : "none" }}
            onClick={startBuy}
          >
            Buy Units
          </button>
        </div>
        {user.type === "Prosumer" ? (
          <div className="d-flex flex-row comp w-100 py-2 mb-2">
            <PlaylistRemove
              color="black"
              cursor="pointer"
              onClick={startSell}
            />{" "}
            <button
              className="w-75 px-2"
              style={{ display: show ? "block" : "none" }}
              onClick={startSell}
            >
              Sell Units
            </button>
          </div>
        ) : (
          <div></div>
        )}
        <div className="d-flex flex-row comp w-100 py-2 mb-2">
          <History
            color="black"
            cursor="pointer"
            onClick={() => navigate("/history")}
          />{" "}
          <button
            className="w-75 px-2"
            style={{ display: show ? "block" : "none" }}
            onClick={() => navigate("/history")}
          >
            Transaction History
          </button>
        </div>
        {/* <div className="d-flex flex-row comp w-100 py-2 mb-2">
          <Insights
            color="black"
            cursor="pointer"
            onClick={() => navigate("/analysis")}
          />{" "}
          <button
            className="w-75 px-2"
            style={{ display: show ? "block" : "none" }}
            onClick={() => navigate("/analysis")}
          >
            Analytics & Predictions
          </button>
        </div> */}
        <div className="d-flex flex-row comp w-100 py-2 mb-2">
          <PowerSettingsNew
            color="black"
            cursor="pointer"
            onClick={() => navigate("/signin")}
          />{" "}
          <button
            className="w-75 px-2"
            style={{ display: show ? "block" : "none" }}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
