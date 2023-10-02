const IPFS = artifacts.require("IPFS");
const ethers = require('ethers');
const fs = require('fs');

module.exports = function (deployer) {
  deployer.deploy(IPFS);
};



// // Connecting to the Ethereum testnet using Metamask or a provider of your choice
// const provider = new ethers.providers.JsonRpcProvider('0xC978ec83ACd92D3244096aa24195dB4e60C34617');

// // Load your Metamask wallet using a private key or mnemonic
// const wallet = new ethers.Wallet('PRIVATE_KEY', provider);

// // Compile the Solidity contract (you might need to adjust the path)
// const contractData = fs.readFileSync('backend/contracts/AuthenticationLogging.sol', 'utf-8');


// const contractAbi = ['...']; // Replace with the ABI of contract
// const contractBytecode = '0x...'; // Replace with the compiled bytecode of contract

// // Deploy the contract
// async function deployContract() {
//     const factory = new ethers.ContractFactory(contractAbi, contractBytecode, wallet);
//     const contract = await factory.deploy();
//     await contract.deployed();
//     return contract;
// }

// // Read the JSON data from the file (you can use IPFS here)
// const jsonData = fs.readFileSync('backend/helia.js', 'utf-8');

// async function main() {
//     const contract = await deployContract();

//     // Store the JSON data in the contract
//     await contract.storeData(jsonData);

//     console.log('Contract address:', contract.address);
//     console.log('JSON Data stored:', jsonData);


// }

// main();
