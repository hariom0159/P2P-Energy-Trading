import React, { useEffect } from "react";
import SideBar from "../../Sidebar/SideBar";
import "./Funds.css";
import {
  AccountBalance,
  CurrencyRupee,
  Add,
  SettingsBackupRestore,
  Opacity,
} from "@mui/icons-material";
import { UserContext } from "../../Context/UserState";
import { useContext } from "react";
import { useState } from "react";
import Web3 from "web3";

const Funds = () => {
  const context = useContext(UserContext);
  const { user, getUser } = context;
  const [val, setVal] = useState(0);
  const [bal, setBalance] = useState("");

  console.log(user.email);

  // IF USING ropsten deployed testnetwork
  // const HDWalletProvider = require('@truffle/hdwallet-provider');
  // const mnemonic = ''
  // const providerOrUrl = ''

  // const provider = new HDWalletProvider({ mnemonic, providerOrUrl });
  // const web3 = new Web3(provider);

  // IF USING ganache-cli
  const web3 = new Web3(
    new Web3.providers.HttpProvider("http://127.0.0.1:7545")
  );

  let flag = false;

  web3.eth.net
    .isListening()
    .then((s) => {
      console.log("Blockchain connection active");
      flag = true;
    })
    .catch((e) => {
      flag = false;
      console.log("Blockchain not connected");
    });

  const addBalance = async (event) => {
    event.preventDefault();

    console.log(val);

    try {
      const res = await fetch("http://localhost:5000/api/postuserbalance/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
        body: JSON.stringify({
          id: user.email,
          balance: val,
        }),
      });

      const json = await res.json();

      if (json.status === 200) {
        console.log("Balance Added!");
      } else {
        console.log(json.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getBalance = async () => {
    console.log(user.email);
    try {
      const res = await fetch("http://localhost:5000/api/getuserbal/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
        body: JSON.stringify({
          id: user.email,
        }),
      });

      const json = await res.json();

      console.log(json.document);
      const b = "" + json.document;
      setBalance(b);

      if (json.status === 200) {
        console.log("Balance Retrieved!");
      } else {
        console.log(json.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
    //getBalance();
  }, []);

  return (
    <>
      <div className="w-100 h-100 d-flex justify-content-between flex-row">
        <SideBar />
        <div className="container-fluid d-flex justify-content-around align-items-center">
          <div className="conten">
            <div className="sec2">
              <AccountBalance
                sx={{ fontSize: `${5.5}rem`, color: "blueviolet" }}
              />
              <h3 className="ttl">Funds</h3>
            </div>
            <div className="sec3">
              <h6 className="ttl">
                Available margin <CurrencyRupee />
              </h6>
              <h4 className="ttl text-danger">{bal}</h4>
            </div>
            <div className="sec4">
              <form onSubmit={addBalance}>
                <input
                  type="number"
                  onChange={(event) => setVal(event.target.value)}
                  required
                />
                <button className="bg-success text-white px-3 py-2 mt-2 mb-3 b1">
                  Add funds
                </button>
              </form>
              <button
                onClick={getBalance}
                className="bg-info text-white px-3 py-2 mt-2 mb-3 b2"
              >
                Show funds
              </button>
            </div>
            {/* <div className="sec2">
              <div className="w-100 my-1 py-1 d-flex justify-content-between">
                <span className="ttl">Available margin</span>
                <span className="ttc"><CurrencyRupee sx={{fontSize: `${1}rem`}} />1234</span>
              </div> 
              <div className="w-100 my-1 py-1 d-flex justify-content-between">
                <span className="ttl">Used margin</span>
                <span className="ttc"><CurrencyRupee sx={{fontSize: `${1}rem`}} />0</span>
              </div> 
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
