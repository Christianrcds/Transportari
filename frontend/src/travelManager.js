import web3 from "./web3";
import { abi } from "./compiler";

console.log(process.env.REACT_APP_CONTRACT_ADDRESS);

const address = process.env.REACT_APP_CONTRACT_ADDRESS;

export default new web3.eth.Contract(abi, address);
