import React, { useEffect, useState } from "react";
import SideBar from "../Sidebar/SideBar";
import "./HistoryPage.css";
import Web3 from "web3";
import { UserContext } from "../Context/UserState";
import { useContext } from "react";
import axios from "axios";

const HistoryPage = () => {
  const context = useContext(UserContext);
  const { user, getUser } = context;
  const [conData, setConData] = useState([]);
  const [proData, setProData] = useState([]);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "buy") {
      getProOrder();
    } else if (event.target.value === "sell") {
      getConOrder();
    }
  };

  let flag = false;

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

  const getProOrder = async () => {
    console.log(user.email);
    const res = await fetch("http://localhost:5000/api/getprorder/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      body: JSON.stringify({
        pid: user.email,
      }),
    });

    const json = await res.json();

    if (json.status === 200) {
      setProData(json.document);
      console.log(proData);
      console.log(proData.length);
      console.log("Prosumer Selling Data Retrieved!!");
    } else {
      console.log(json.message);
    }
  };

  const getConOrder = async () => {
    console.log(user.email);
    const res = await fetch("http://localhost:5000/api/getconorder/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      body: JSON.stringify({
        cid: user.email,
      }),
    });

    const json = await res.json();

    if (json.status === 200) {
      console.log("Consumer Data Retrieved!!");
    } else {
      console.log(json.message);
    }

    setConData(json.document);
    console.log(conData);
    console.log(conData.length);
  };

  const utctodate = async (ts) => {
    return new Date(ts * 1000);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="w-100 h-100 d-flex justify-content-between align-item-center">
        <SideBar />
        <div className="main">
          <select onChange={handleOptionSelect} className="options">
            <option value="">Select an option</option>
            <option value="buy">Selling History</option>
            <option value="sell">Buying History</option>
          </select>
          <div className="Table">
            {selectedOption === "buy" && (
              <table className="table">
                <thead>
                  <tr className="bg-success text-white">
                    <th scope="col">Consumer ID</th>
                    <th scope="col">Area</th>
                    <th scope="col">Kwh</th>
                    <th scope="col">Price</th>
                    <th scope="col">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {proData &&
                    proData.map((item, index) => (
                      <tr key={index}>
                        <td>{item[0].slice(0, 9)}</td>
                        <td>{item[1]}</td>
                        <td>{item[2]}</td>
                        <td>{item[3]}</td>
                        <td>{item[4]}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}

            {selectedOption === "sell" && (
              <table className="table">
                <thead>
                  <tr className="bg-danger text-white">
                    <th scope="col">Consumer ID</th>
                    <th scope="col">Area</th>
                    <th scope="col">Kwh</th>
                    <th scope="col">Price</th>
                    <th scope="col">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {conData &&
                    conData.map((item, index) => (
                      <tr key={index}>
                        <td>{item[0].slice(0, 9)}</td>
                        <td>{item[1]}</td>
                        <td>{item[2]}</td>
                        <td>{item[3]}</td>
                        <td>{item[4]}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryPage;
