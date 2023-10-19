import Web3 from "web3";
import HDWalletProvider from "truffle-hdwallet-provider";
import { createHelia } from "helia";
import { json } from "@helia/json";

const sepoliaRpcUrl =
  "https://sepolia.infura.io/v3/c557efceb61a41e7b11d471996a3f416";

const mnemonic =
  "drop spot bracket have piece canal domain ghost remind sword insect hero";

import contractJSON from "./build/contracts/AuthenticationLogging.json" assert { type: "json" };
const contractABI = contractJSON.abi;
console.log(contractABI);

const contractAddress = "0xc6bbd4B6077D43dc11ddc66c951ea2677D7B999e";

// Function to initialize web3
async function initializeWeb3() {
  const provider = new HDWalletProvider(mnemonic, sepoliaRpcUrl);
  const web3 = new Web3(provider);
  return web3;
}

// Function to interact with the contract
async function interactWithContract(logData) {
  try {
    const web3 = await initializeWeb3();

    // Initializing the contract instance
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Encoding the data for the storeData function
    const encodedData = contract.methods.storeData(logData).encodeABI();

    // Getting the default account from the HDWalletProvider
    const defaultAccount = web3.currentProvider.addresses[0];
    // web3.eth.getAccounts().then(console.log);
    console.log(defaultAccount); //is correct

    // Creating a transaction object
    const transactionObject = {
      from: defaultAccount,
      to: contractAddress,
      data: encodedData,
    };

    async function checkBalance() {
      console.log("i am here -");
      try {
        const balance = await web3.eth.getBalance(
          "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
        );
        console.log("Balance:", balance);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    checkBalance();

    console.log(transactionObject);
    // Sign and send the transaction
    try {
      console.log("at least i came here");
      const transaction = await web3.eth.sendTransaction(transactionObject);
      console.log("here here");
      console.log("Transaction Sent:", transaction);
      console.log("Transaction Hash:", transaction.transactionHash);
      return transaction.transactionHash; 
    } catch (error) {
      console.error("Error Sending Transaction:", error);
    }

    // console.log("wow");
    // console.log(transaction);

    
  } catch (error) {
    console.error("Error interacting with contract:", error);
  }
}

export async function blockchainIPFSIntegration(logData) {
  const helia = await createHelia();
  const j = json(helia);
  
  const transactionHash = await interactWithContract(logData);

  console.log("Transaction sent. Transaction Hash:", transactionHash);

  // Store CID on Helia
  const CID = await j.add({ transactionHash });
  console.log("CID:", CID);
}


const user_id = "1001";
const timestamp = "2023-10-10";
const auth = "success";

const logData = JSON.stringify({
  user_id: user_id,
  timestamp: timestamp,
  status: auth,
});

// blockchainIPFSIntegration(logData);

// module.exports = blockchainIPFSIntegration;