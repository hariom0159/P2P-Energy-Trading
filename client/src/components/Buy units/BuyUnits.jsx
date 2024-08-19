import React, { useEffect } from "react";
import SideBar from "../Sidebar/SideBar";
import Web3 from "web3";
import axios from "axios";
import "./BuyUnits.css";
import { ShoppingCart, CurrencyRupee, Add } from "@mui/icons-material";
import { useState } from "react";
import { UserContext } from "../Context/UserState";
import { useContext } from "react";

const BuyUnits = () => {
  const [success, setSuccess] = useState(false);
  const [mess, setMess] = useState("");
  const [err, setErr] = useState(false);
  const [seller, setSeller] = useState("seller name");
  const [price, setPrice] = useState(0);
  const [email, setEmail] = useState("");
  const [maxUnits, setMaxUnits] = useState("0");
  const [amount, setAmount] = useState(0);
  const [unit, setUnit] = useState(0);
  const [id, setId] = useState("Initial id");
  const [units, setUnits] = useState([]);
  const context = useContext(UserContext);
  const { user, getUser } = context;

  const [bal, setBalance] = useState(0);
  const [balFlag, setBalFlag] = useState(false);

  let flag = false;

  // IF USING ropsten deployed testnetwork
// const HDWalletProvider = require('@truffle/hdwallet-provider');
// const mnemonic = ''
// const providerOrUrl = ''

// const provider = new HDWalletProvider({ mnemonic, providerOrUrl });
// const web3 = new Web3(provider);

  // IF USING ganache-cli
  const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

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

    console.log(seller);
    console.log(email);
    console.log(user.email);

    const addBalance = async(val) => {

      console.log(val);

      try{
        const res = await fetch(
          "http://localhost:5000/api/postuserbalance/",
          {
            method: 'POST',
            headers : {
              "Content-Type": "application/json",
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            body: JSON.stringify({
              id: email,
              balance: val,
            }),
          }
        )

        const json = await res.json();

        if(json.status === 200){
          console.log('Balance Added!');
        } else {
          console.log(json.message);
        }
      } catch(err) {
        console.log(err);
      }

    }

    const subBalance = async(val) => {

      console.log(val);

      try{
        const res = await fetch(
          "http://localhost:5000/api/postusersubbalance/",
          {
            method: 'POST',
            headers : {
              "Content-Type": "application/json",
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            body: JSON.stringify({
              id: user.email,
              balance: val,
            }),
          }
        )

        const json = await res.json();

        if(json.status === 200){
          console.log('Balance Subtracted!');
        } else {
          console.log(json.message);
        }
      } catch(err) {
        console.log(err);
      }

    }

    const subUnits = async () => {
      const host = "http://localhost:5000";
      const response = await fetch(`${host}/api/unit/updateunits`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          price,
          unitsToUpdate: -1 * unit,
          _id: id,
        }),
      });

      const data = await response.json();
      setMess(data.message);

    }

  const updateUnits = async () => {
        console.log(user.email);
        const res = await fetch(
          "http://localhost:5000/api/getuserbal/",
          {
            method: 'POST',
            headers : {
              "Content-Type": "application/json",
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            body: JSON.stringify({
              id: user.email,
            }),
          });

        const json = await res.json();

        console.log(json.document);

        setBalance(json.document);

        if(json.status === 200){
          console.log('Balance Retrieved!');
          setBalFlag(true);
        } else {
          console.log(json.message);
        }

      console.log("Current Bal: "+ json.document);

      if(json.document < unit*price){
        setMess('Low Balance! Cannot Perform Action');
      }
    
    if (flag === true && json.document >= (unit*price)) {
      console.log("Inside Blockchain Post IF")
      setSuccess(true);
      axios({
        method: "post",
        url: "http://localhost:5000/api/postuserorder",
        headers: {},
        data: {
          pid: email,
          cid: user.email,
          area: user.area,
          kwh: unit,
          price: price,
          cbal: json.document,
        },
      })
        .then((res) => {
          console.log(res.status);
          console.log(res);
            let val = unit*price; 
            console.log(val);
            console.log("Balance Done!")
            subBalance(val);
            addBalance(val);
        })
        .then(() => {
          subUnits();
          alert("Order Successfull");
          //window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else setErr(true);
  };

  const FetchUnits = async () => {
    const host = "http://localhost:5000";
    const response = await fetch(`${host}/api/unit/fetchunits`, {
      method: "GET",
    });
    const data = await response.json();
    setUnits(data);
    console.log(data);
  };
  // const Update = (e) => {

  // };
  useEffect(() => {
    FetchUnits();
    getUser();
  }, []);
  return (
    <>
      <div className="w-100 h-100 d-flex justify-content-between flex-row">
        <SideBar />
        <div className="container-fluid d-flex justify-content-around align-items-center">
          <div className="conten">
            <div className="sec2">
              <ShoppingCart sx={{ fontSize: `${4.5}rem`, color: "green" }} />
              <h3 className="ttl">Buy units</h3>
            </div>
            <div className="sec">
              <div className="w-100 my-1 py-1 d-flex justify-content-between">
                <select
                  className="form-select classic"
                  id="validationDefault03"
                  onChange={(e) => {
                    const val = e.target.value;
                    const details = val.split(",");
                    console.log("Units Details "+val);
                    setId(details[0]);
                    setSeller(details[1]);
                    setPrice(parseInt(details[2]));
                    setMaxUnits(details[3]);
                    setEmail(details[4]);
                    setErr(false);
                    setSuccess(false);
                    setMess("");
                  }}
                  required
                >
                  <option value="Area" selected disabled>
                    seller, unit price, total units
                  </option>
                  {units.map((unit) =>
                    user.id !== unit.userID ? (
                      <option
                        value={[
                          unit.userID,
                          unit.userName,
                          unit.price,
                          unit.units,
                          unit.userEmail,
                        ]}
                        key={unit._id}
                      >
                        {unit.userID.substring(0, 12)}, {unit.price},{unit.units}
                      </option>
                    ) : null
                  )}
                </select>
              </div>
              <div className="w-100 my-1 py-1 d-flex justify-content-between">
                <span className="ttl">Seller</span>
                <span className="ttc">{seller}</span>
              </div>
              <div className="w-100 my-1 py-1 d-flex justify-content-between">
                <span className="ttl">Units</span>
                <span className="ttc">{maxUnits}</span>
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
              <h6 className="ttl">Select number of units to buy</h6>
              <input
                className="ttl text-warning"
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                max={maxUnits}
                style={{
                  background: "white",
                  border: `${1}px solid silver`,
                  borderRadius: `${5}px`,
                  textAlign: "center",
                }}
                onChange={(e) => {
                  let val = parseInt(e.target.value);
                  if (val > parseInt(maxUnits)) {
                    alert(
                      `You can buy at max ${maxUnits} units, so ${maxUnits} will be considered..!`
                    );
                    val = parseInt(maxUnits);
                  }
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
                className="bg-success text-white px-3 py-2 mt-2 mb-3 b1"
                onClick={updateUnits}
              >
                <Add /> Buy units
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
        </div>
      </div>
    </>
  );
};

export default BuyUnits;
