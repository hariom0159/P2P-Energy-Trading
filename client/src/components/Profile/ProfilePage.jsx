import { AccountCircle } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";
import "./ProfilePage.css";
import { UserContext } from "../Context/UserState";
import { useContext } from "react";
import {useState} from 'react';
import Web3 from "web3";
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { user, getUser } = context;

  const [fileImg, setFileImg] = useState(null);
  const [hash, setHash] = useState('');

  // IF USING ropsten deployed testnetwork
  // const HDWalletProvider = require('@truffle/hdwallet-provider');
  // const mnemonic = ''
  // const providerOrUrl = ''

  // const provider = new HDWalletProvider({ mnemonic, providerOrUrl });
  // const web3 = new Web3(provider);

  // IF USING ganache-cli
  const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
  
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

  const sendFileToIPFS = async (event) => {
    event.preventDefault();
    if (fileImg) {
      console.log(fileImg);
            const formData = new FormData();
            formData.append('file', fileImg);
            const  url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

            axios.post(url, 
              formData,
              {
                headers: {
                  'Content-Type': `multipart/form-data; boundary= ${formData._boundary}`,
                  'pinata_api_key': "",
                  'pinata_secret_api_key': "",
                }
              }
              ).then(function (response) {
                alert(response.data.IpfsHash);
                setHash(response.data.IpfsHash);
                console.log(hash);
                axios({
                  method: "POST",
                  url: "http://localhost:5000/api/postuserdata/",
                  headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                  },
                  data:{
                    id: user.email,
                    area: user.area,
                    typ: user.type,
                    hash: response.data.IpfsHash,
                    balance: 0, 
                  },
                }).then((res) => {
                  console.log(res.status);
                  alert("User Data added successfully! Wait for Verification!");
                  window.location.reload();
                }).catch((err)=>{
                  console.log(err);
                });
            }).catch(function (error) {
                alert(error)
            });
    }
  }

  //postuserdata
  //omctflubcfdblzzobe@bbitf.com
  //id, area, typ, hash, bal
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="w-100 h-100 d-flex justify-content-between flex-row">
        <SideBar />
        <div className="container-fluid d-flex justify-content-around align-items-center">
          <div className="contenP">
            <div className="cnt">
              <div className="sec">
                <AccountCircle
                  sx={{ fontSize: `${6.5}rem`, color: "goldenrod" }}
                />
                <h3 className="ttl">{user.name}</h3>
                <div className="w-100 my-1 py-2 d-flex justify-content-between">
                  <span className="ttl">E-mail</span>
                  <span className="ttc">{user.email}</span>
                </div>
                <div className="w-100 my-1 py-2 d-flex justify-content-between">
                  <span className="ttl">Phone</span>
                  <span className="ttc">+91 {user.mobileNumber}</span>
                </div>
                <div className="w-100 my-1 py-2 d-flex justify-content-between">
                  <span className="ttl">Type</span>
                  <span className="ttc">{user.type}</span>
                </div>
                <div className="w-100 my-1 py-2 d-flex justify-content-between">
                  <span className="ttl">Area</span>
                  <span className="ttc">{user.area}</span>
                </div>
              </div>
            </div>
            <div className="cnt">
              <div className="sec">
                <div className="w-100 my-1 py-3 d-flex justify-content-between">
                  <span className="ttl">Password & Security</span>
                  <button className="ttc" onClick={() => navigate("/forget")}>
                    Change
                  </button>
                </div>
              </div>
              <div className="sec">
                <div className="w-100 my-1 py-3 d-flex justify-content-between">
                  <span className="ttl">Generation Details</span>
                  <button className="ttc" onClick={() => navigate("/details")}>
                    Get details
                  </button>
                </div>
              </div>
              <div className="sec">
                <div className="w-100 my-1 py-3 d-flex justify-content-between">
                  <span className="ttl">Funds</span>
                  <button
                    className="ttc"
                    onClick={() => {
                      getUser();
                      if (user.verified) navigate("/funds");
                      else
                        alert("You are not verified yet to start trading :(");
                    }}
                  >
                    Check
                  </button>
                </div>
              </div>
              <div className="sec">
                <div className="w-100 my-1 py-3 d-flex justify-content-end flex-row-reverse">
                  <span className="ttl">Verify document to activate Funds</span>
                  <form onSubmit={sendFileToIPFS}>
                    <input type="file" onChange={(event) =>setFileImg(event.target.files[0])} required />
                    <button type="submit" >Upload File</button>            
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
