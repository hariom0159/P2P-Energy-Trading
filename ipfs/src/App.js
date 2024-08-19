import './App.css';
import {useState} from 'react';
import Web3 from "web3";
import axios from 'axios';

function App() {

  const [fileImg, setFileImg] = useState(null);
  const [hash, setHash] = useState('');
  console.log(process.env.REACT_APP_PINATA_API_KEY);

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
                  'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
                  'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
                }
              }
              ).then(function (response) {
                alert(response.data.IpfsHash);
                setHash(response.data.IpfsHash);
                console.log(hash);
            }).catch(function (error) {
                alert(error)
            });
    }
  }
  return (
    <div className="App">
      <h1>{hash}</h1>
      <form onSubmit={sendFileToIPFS}>
        <input type="file" onChange={(event) =>setFileImg(event.target.files[0])} required />
        <button type="submit" >Send</button>            
      </form>
    </div>
  );
}

export default App;
