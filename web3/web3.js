const fs = require('fs');
const path = require('path');
const solc = require('solc');
const Web3 = require('web3');

// const HDWalletProvider = require('@truffle/hdwallet-provider');
// const mnemonic = ''
// const providerOrUrl = ''
// const provider = new HDWalletProvider({ mnemonic, providerOrUrl });
// const web3 = new Web3(provider);

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
 
const file = fs.readFileSync("EnergyTrading.sol").toString();
console.log('File Generated');

var input = {
	language: "Solidity",
	sources: {
	"EnergyTrading.sol": {
		content: file,
	},
	},
	
	settings: {
        outputSelection: {
            "*": {
                "*": ["*"],
            },
        },
	},
};
	
var output = JSON.parse(solc.compile(JSON.stringify(input)));

// var output = JSON.parse(solc.compile(JSON.stringify(input)));
// console.log("Result : ", output);
	
const ABI = output.contracts["EnergyTrading.sol"]["EnergyTrading"].abi;
console.log('ABI Successful');
const bytecode = output.contracts["EnergyTrading.sol"]["EnergyTrading"].evm.bytecode.object;
console.log('ByteCode Successful');

let mainAccount = ''; //Ganache Account

let ADDRESS = ''; //Contract Address

const contract = new web3.eth.Contract(ABI);

web3.eth.getAccounts().then((accounts) => {
    // console.log("Accounts:", accounts);
  
    mainAccount = accounts[0];
  
    console.log("Default Account:", mainAccount);
    contract
        .deploy({ data: bytecode })
        .send({ from: mainAccount, gas: 4700000 })
        .on("receipt", (receipt) => {
  
            console.log("Contract Address:", receipt.contractAddress);
            ADDRESS = receipt.contractAddress;
        })
});

// async function Add_User(id, area, typ, hash, balance, abi, contractAddress){
//     const contractInstance = new web3.eth.Contract(abi, contractAddress);
//     const res = await contractInstance.methods.addUser(id, area, typ, hash, balance).send({from: mainAccount, gasPrice: "0xFFFF", gasLimit: "0xFFFFF"});
//     return res
// }

// async function Add_Balance(id, balance, abi, contractAddress){
//     const contractInstance = new web3.eth.Contract(abi, contractAddress);
//     const res = await contractInstance.methods.addBalance(id, balance).send({from: mainAccount, gasPrice: "0xFFFF", gasLimit: "0xFFFFF"});
//     return res
// }

// async function View_Balance(id, abi, contractAddress){
//     const contractInstance = new web3.eth.Contract(abi, contractAddress);
//     const res = await contractInstance.methods.viewBalance(id).call();
//     console.log("The balance of the user is : "+ res);
//     return res
// }

// async function Add_Order(pid, cid, area, kwh, price, cbal, abi, contractAddress){
//     const contractInstance = new web3.eth.Contract(abi, contractAddress);
//     const res = await contractInstance.methods.addOrder(pid, cid, area, kwh, price, cbal).send({from: mainAccount, gasPrice: "0xFFFF", gasLimit: "0xFFFFF"});
//     return res
// }

// async function View_Corder(id, abi, contractAddress){
//     const contractInstance = new web3.eth.Contract(abi, contractAddress);
//     const res = await contractInstance.methods.viewCustOrder(id).send({from: mainAccount, gasPrice: "0xFFFF", gasLimit: "0xFFFFF"});
//     return res
// }

// async function View_Porder(id, abi, contractAddress){
//   const contractInstance = new web3.eth.Contract(abi, contractAddress);
//   const res = await contractInstance.methods.viewProsOrder(id).send({from: mainAccount, gasPrice: "0xFFFF", gasLimit: "0xFFFFF"});
//   return res
// }

// async function test(){
//     // const res1 = await Add_User("Hariom1509", "390018", "prosumer", "string123", "100", ABI, ADDRESS);
//     // const res2 = await Add_User("hariom", "390018", "consumer", "string1234", "150", ABI, ADDRESS);
//     // const res3 = await Add_Balance("Hariom1509", "159", ABI, ADDRESS);
//     // const res4 = await View_Balance("hariom", ABI, ADDRESS);
//     // const res5 = await View_Balance("Hariom1509", ABI, ADDRESS)
//     // console.log(res1);
//     // console.log(res2);
//     // console.log(res3);
//     // console.log(res4);
//     // console.log(res5);
    
//     // const res6 = await Add_Order("Hariom1509", "hariom", "390018", 8, 3, 100, ABI, ADDRESS);
//     // console.log(res6);

//     // const res7 = await View_Corder("hariom", ABI, ADDRESS);
//     // console.log(res7.events.FCalled.returnValues['_a'][0] === undefined);
//     // console.log("Consumer id:" + res7.events.FCalled.returnValues['_a'][0].length);
//     // console.log("Area: " + res7.events.FCalled.returnValues['_a'][0][1]);
//     // console.log("Kwh: " + res7.events.FCalled.returnValues['_a'][0][2]);
//     // console.log("Price: " + res7.events.FCalled.returnValues['_a'][0][3]);
//     // console.log("Time: " + res7.events.FCalled.returnValues['_a'][0][4]);

//     // const res8 = await View_Porder("hariom", ABI, ADDRESS);
//     // console.log(res7.events.FCalled.returnValues['_a'][0] === undefined);
//     // console.log("Prosumer id:" + res8.events.FCalled.returnValues['_a'][0][0]);
//     // console.log("Area: " + res8.events.FCalled.returnValues['_a'][0][1]);
//     // console.log("Kwh: " + res8.events.FCalled.returnValues['_a'][0][2]);
//     // console.log("Price: " + res8.events.FCalled.returnValues['_a'][0][3]);
//     // console.log("Time: " + res8.events.FCalled.returnValues['_a'][0][4]);    
// }

// test();