import { Web3 } from "web3";
import "dotenv/config";
import { readFile } from "fs/promises";

//Set Infura Sepolia network as the Provider
console.log("Connecting to Sepolia provider INFURA...");
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`
  )
);
console.log("Connection Successful!\n");

//Get latest build (information) of smart contract
console.log("Reading IPFS.json...");
const contractBuild = JSON.parse(
  await readFile(new URL("./build/contracts/IPFS.json", import.meta.url))
);
console.log("Contract read successful!\n");

//Generate instance of contract locally
console.log("Extracting contract ABI and address...");
const contract = new web3.eth.Contract(
  contractBuild.abi,
  contractBuild.networks[11155111].address
);
console.log("Extraction successful!");
console.log(`Contract address: ${contractBuild.networks[11155111].address}\n`);
