const fs = require('fs');
const path = require('path');
const solc = require('solc');
const Web3 = require('web3');

const ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "id",
						"type": "bytes32"
					},
					{
						"internalType": "string",
						"name": "area",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "kwh",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "time",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct EnergyTrading.MyStruct[]",
				"name": "_a",
				"type": "tuple[]"
			}
		],
		"name": "FCalled",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"name": "addBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "pid",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "cid",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "area",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "kwh",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "cbal",
				"type": "uint256"
			}
		],
		"name": "addOrder",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "area",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "typ",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"name": "addUser",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allOrders",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "pid",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "cid",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "area",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "kwh",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "cbal",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allUsers",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "area",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "typ",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"name": "subBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			}
		],
		"name": "viewBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			}
		],
		"name": "viewCustOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			}
		],
		"name": "viewHash",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			}
		],
		"name": "viewProsOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

// IF USING ganache-cli
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

// IF USING ropsten deployed testnetwork
// const HDWalletProvider = require('@truffle/hdwallet-provider');
// const mnemonic = ''
// const providerOrUrl = ''

// const provider = new HDWalletProvider({ mnemonic, providerOrUrl });
// const web3 = new Web3(provider);

// COPY PASTE HERE
const mainAccount = process.env.mainAccount;
const ADDRESS = process.env.ADDRESS;

console.log(mainAccount);
console.log(ADDRESS);

exports.addAllUsers = async(req, res) => {
    const contractInstance = new web3.eth.Contract(ABI, ADDRESS);

    console.log(req.body.id, req.body.area, req.body.typ, req.body.hash, req.body.balance);

    await contractInstance.methods
        .addUser(req.body.id, req.body.area, req.body.typ, req.body.hash, req.body.balance)
        .send(
            {from: mainAccount, gasPrice: "0xFFFF", gasLimit: "0xFFFFF"}
        ).then( flag => {
            if(flag){
                console.log("User Added Successfully!");
                return res.status(200).json({ document: "User Added Successfully!" })
            } else {
                console.log("User already exists!");
                return res.status(400).json({ document: "User already exists." });
            }
        }).catch((err) => {
            console.log(err);
        });
}

exports.addAllBalance = async(req, res) => {
    const contractInstance = new web3.eth.Contract(ABI, ADDRESS);

    console.log(req.body.id, req.body.balance);
    await contractInstance.methods
        .addBalance(req.body.id, req.body.balance)
        .send(
            {from: mainAccount, gasPrice: "0xFFFF", gasLimit: "0xFFFFF"}
        ).then( () => {
            console.log("Balance Added Successfully");
            return res.status(200).json({ document: "Balance Added Successfully!" })
        }).catch((err) => {
            console.log(err);
        });
}

exports.subAllBalance = async(req, res) => {
    const contractInstance = new web3.eth.Contract(ABI, ADDRESS);

    console.log(req.body.id, req.body.balance);
    await contractInstance.methods
        .subBalance(req.body.id, req.body.balance)
        .send(
            {from: mainAccount, gasPrice: "0xFFFF", gasLimit: "0xFFFFF"}
        ).then( () => {
            console.log("Balance Added Successfully");
            return res.status(200).json({ document: "Balance Added Successfully!" })
        }).catch((err) => {
            console.log(err);
        });
}

exports.viewAllBalance = async(req, res) => {
    const contractInstance = new web3.eth.Contract(ABI, ADDRESS);

    console.log(req.body.id);
    await contractInstance.methods
        .viewBalance(req.body.id)
        .call()
        .then( bal => {
				console.log("Balance retrieved successfully: " + bal);
                return res.status(200).json({document: bal});
        }).catch((err) => {
            console.log(err);
        });
}

exports.addAllOrders = async(req, res) => {
    const contractInstance = new web3.eth.Contract(ABI, ADDRESS);

    console.log(req.body.pid, req.body.cid, req.body.area, req.body.kwh, req.body.price, req.body.cbal);
    await contractInstance.methods
        .addOrder(req.body.pid, req.body.cid, req.body.area, req.body.kwh, req.body.price, req.body.cbal)
        .send(
            {from: mainAccount, gasPrice: "0xFFFF", gasLimit: "0xFFFFF"}
        ).then(flag => {
            if(flag<0){
                console.log("Insufficient Consumer balance to proceed");
                return res.status(400).json({document: "Insufficient Consumer balance to proceed"});
            } else {
                console.log("Order completed successfully!");
                return res.status(200).json({document: "Order Successful"});
            }
        }).catch((err) => {
            console.log(err);
        });
}

exports.viewPOrder = async(req, res) => {
    const contractInstance = new web3.eth.Contract(ABI, ADDRESS);

    console.log(req.body.pid);
    await contractInstance.methods
        .viewProsOrder(req.body.pid)
        .send(
            {from: mainAccount, gasPrice: "0xFFFF", gasLimit: "0xFFFFF"}
        ).then(result => {
            if(result.events.FCalled.returnValues['_a'][0] === undefined){
                console.log("No Prosumer transactions yet");
                return res.status(400).json({document: "No Prosumer transactions yet"});
            } else {
                console.log("Transactions successfully retrieved");
                return res.status(200).json({document: result.events.FCalled.returnValues['_a']});
            }
        }).catch((err) => {
            console.log(err);
        });
}

exports.viewCOrder = async(req, res) => {
    const contractInstance = new web3.eth.Contract(ABI, ADDRESS);

    console.log(req.body.cid);
    await contractInstance.methods
        .viewCustOrder(req.body.cid)
        .send(
            {from: mainAccount, gasPrice: "0xFFFF", gasLimit: "0xFFFFF"}
        ).then(result => {
            if(result.events.FCalled.returnValues['_a'][0] === undefined){
                console.log("No Consumer transactions yet");
                return res.status(400).json({document: "No Consumer transactions yet"});
            } else {
                console.log("Transactions successfully retrieved");
                return res.status(200).json({document: result.events.FCalled.returnValues['_a']});
            }
        }).catch((err) => {
            console.log(err);
        });
}

exports.viewHash = async(req, res) => {
    const contractInstance = new web3.eth.Contract(ABI, ADDRESS);

    console.log(req.body.id + " Inside View Hash Function!");
    await contractInstance.methods
      .viewHash(req.body.id)
      .call()
      .then(hash => {
        if(hash === "user404"){
          console.log("User doesnt exist on blockchain!");
          return res.status(400).json({document: "User not on blockchain!"})
        } else {
          console.log("Hash Retrieved!");
          return res.status(200).json({document: hash});
        }
      }).catch((err) => {
        console.log(err);
      });
}