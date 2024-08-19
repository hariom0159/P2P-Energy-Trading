import React, { useState, useEffect } from "react";
import SideBar from "../Sidebar/SideBar";
import "./SellUnits.css";
import { Sell, CurrencyRupee, Remove } from "@mui/icons-material";
import { UserContext } from "../Context/UserState";
import { useContext } from "react";

const SellUnits = () => {
  const [success, setSuccess] = useState(false);
  const [mess, setMess] = useState("");
  const [err, setErr] = useState(false);
  const [price, setPrice] = useState(8);
  const [amount, setAmount] = useState(0);
  const [unit, setUnit] = useState(0);
  const host = "http://localhost:5000";
  const context = useContext(UserContext);
  const { user, getUser } = context;

  useEffect(() => {
    getUser();
  }, []);
  const updateUnits = async () => {
    const response = await fetch(`${host}/api/unit/updateunits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        price,
        unitsToUpdate: unit,
      }),
    });
    const data = await response.json();
    if (data.success) setSuccess(true);
    else setErr(true);
    setMess(data.message);
  };

  return (
    <>
      <div className="w-100 h-100 d-flex justify-content-between flex-row">
        <SideBar />
        <div className="container-fluid d-flex justify-content-around align-items-center">
          {user.type === "Prosumer" ? (
            <div className="conten">
              <div className="sec2">
                <Sell sx={{ fontSize: `${4.5}rem`, color: "red" }} />
                <h3 className="ttl">Sell units</h3>
              </div>
              <div className="sec">
                <div className="w-100 my-1 py-1 d-flex justify-content-between flex-column">
                  <h6 className="ttl">Unit price (between 5 and 8 rupees)</h6>
                  <input
                    type="range"
                    id="points"
                    name="points"
                    min="5"
                    max="8"
                    className="w-100"
                    onChange={(e) => {
                      let val = e.target.value;
                      setPrice(parseInt(val));
                      setAmount(val * unit);
                      setErr(false);
                      setSuccess(false);
                      setMess("");
                    }}
                  />
                </div>
                <div className="w-100 my-1 py-1 d-flex justify-content-between">
                  <span className="ttl">Price</span>
                  <span className="ttc">
                    <CurrencyRupee sx={{ fontSize: `${1}rem` }} />
                    {price}
                  </span>
                </div>
              </div>
              <div className="sec3">
                <h6 className="ttl">Select number of units to sell</h6>
                <input
                  className="ttl text-warning"
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  style={{
                    background: "white",
                    border: `${1}px solid silver`,
                    borderRadius: `${5}px`,
                    textAlign: "center",
                  }}
                  onChange={(e) => {
                    let val = parseInt(e.target.value);
                    setUnit(val);
                    setAmount(val * price);
                    setErr(false);
                    setSuccess(false);
                    setMess("");
                  }}
                  required
                ></input>
              </div>
              <div className="sec">
                <div className="w-100 my-1 py-1 d-flex justify-content-between">
                  <span className="ttl">Total amount</span>
                  <span className="ttc">
                    <CurrencyRupee sx={{ fontSize: `${1}rem` }} />
                    {amount}
                  </span>
                </div>
              </div>
              <div className="sec5">
                <button
                  className="bg-danger text-white px-3 py-2 mt-2 mb-3 b1"
                  onClick={updateUnits}
                >
                  <Remove /> Sell units
                </button>
              </div>
              {success ? (
                <div
                  className="p-1 mt-1 text-success text-center"
                  style={{ fontFamily: "Times New Roman" }}
                >
                  {mess}
                </div>
              ) : (
                ""
              )}
              {err ? (
                <div>
                  <div
                    className="mt-1 text-warning text-break text-center"
                    style={{ fontFamily: "Times New Roman" }}
                  >
                    {mess}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className="conten">
              <div className="sec2">
                <Sell sx={{ fontSize: `${4.5}rem`, color: "red" }} />
                <h3 className="ttl">Selling not available for Consumers</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SellUnits;
