const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
require("dotenv").config();
// Getting the output of our compiled Solidity Contract
const { interface, bytecode } = require("./compile");

// TODO
const provider = new HDWalletProvider(
  process.env.PASSWORD,
  process.env.RINKEBYURL
);

const web3 = new Web3(provider);

const deploy = async () => {
  // getting accounts from our Metamask wallet
  const accounts = await web3.eth.getAccounts();

  // deploying our contract
  const result = await new web3.eth.Contract(interface)
    .deploy({ data: bytecode })
    .send({ gas: "6000000", from: accounts[0] });

  console.log(JSON.stringify(interface));

  console.log("Contract deployed to", result.options.address);
};
deploy();
