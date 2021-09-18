const path = require("path");
const fs = require("fs");
const solc = require("solc");

// const lotteryPath = path.resolve(__dirname, "contracts", "TravelManager.sol");
// const source = fs.readFileSync(lotteryPath, "utf8");

// module.exports = solc.compile(source, 1).contracts[":TravelManager"];

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

// const { interface, bytecode } = JSON.parse(
//   solc.compile(JSON.stringify(complierInput))
// );

const variable = JSON.parse(solc.compile(JSON.stringify(complierInput)))
  .contracts["TravelManager.sol"]["TravelManager"];

console.log("Contract compiled successfully");

const bytecode = variable.evm.bytecode.object;
const interface = variable.abi;

// console.log(bytecode);
// // console.log(JSON.parse(interface));
// console.log(interface);
// console.log(variable.abi);
// console.log(variable.evm);
// console.log(Object.keys(variable.metadata));
// console.log(variable.storageLayout);
// console.log(variable.userdoc);

module.exports = { bytecode, interface };

// console.log("Contract Compiled", compiledContract);

//   for (let contractName in compiledContract.contracts["voter.sol"]) {
//     console.log(
//       contractName,
//       compiledContract.contracts["voter.sol"][contractName].abi
//     );
//     let abi = compiledContract.contracts["voter.sol"][contractName].abi;
//     fs.writeFileSync(
//       `./contracts/bin/${contractName}_abi.json`,
//       JSON.stringify(abi)
//     );
//     return compiledContract.contracts["voter.sol"][contractName];
//   }
