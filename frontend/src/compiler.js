const path = require("path");
const fs = require("fs");
const solc = require("solc");

let TravelManager = fs.readFileSync("./contracts/TravelManager.sol", "utf8");
let complierInput = {
  language: "Solidity",
  sources: {
    "TravelManager.sol": {
      content: TravelManager,
    },
  },
  settings: {
    optimizer: {
      enabled: true,
    },
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const variable = JSON.parse(solc.compile(JSON.stringify(complierInput)))
  .contracts["TravelManager.sol"]["TravelManager"];

console.log("Contract compiled successfully");

const bytecode = variable.evm.bytecode.object;
const abi = variable.abi;

module.exports = { bytecode, abi };
