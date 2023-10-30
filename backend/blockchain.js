import Web3 from "web3";
import HDWalletProvider from "@truffle/hdwallet-provider";
import { createHelia } from "helia";
import { json } from "@helia/json";

const sepoliaRpcUrl =
  "https://sepolia.infura.io/v3/c557efceb61a41e7b11d471996a3f416";

const mnemonic =
  "drop spot bracket have piece canal domain ghost remind sword insect hero";

import contractJSON from "./build/contracts/AuthenticationLogging.json" assert { type: "json" };
const contractABI = contractJSON.abi;

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
    // console.log(contractABI);
    // console.log(contractAddress);

    // Encoding the data for the storeData function
    const encodedData = contract.methods.storeData(logData).encodeABI();
    // Getting the default account from the HDWalletProvider

    // console.log(web3.currentProvider.addresses);
    // const defaultAccount = web3.currentProvider.addresses[0];

    const defaultAccount = "0xC978ec83ACd92D3244096aa24195dB4e60C34617";

    // Creating a transaction object
    const transactionObject = {
      from: defaultAccount,
      to: contractAddress,
      data: encodedData,
    };

    async function checkBalance() {
      try {
        const balance = await web3.eth.getBalance(
          "0xC978ec83ACd92D3244096aa24195dB4e60C34617"
        );
        // console.log("Balance:", balance);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    checkBalance();

    try {
      const transaction = await web3.eth.sendTransaction(transactionObject);
      // console.log(transaction.transactionHash);
      return transaction.transactionHash;
    } catch (error) {
      console.error("Error Sending Transaction:", error);
    }
  } catch (error) {
    console.error("Error interacting with contract:", error);
    return false;
  }
}

export async function blockchainIPFSIntegration(logData) {
  const helia = await createHelia();
  const j = json(helia);

  // console.log(logData);
  const transactionHash = await interactWithContract(logData);

  // Store CID on Helia
  const CID = await j.add({ transactionHash });
  console.log("Added transaction hash to Helia, CID: ", CID);

  if (transactionHash == false) {
    return false;
  }
  return true;
}

// async function checkBalance() {
//   try {
//     const web3 = await initializeWeb3();

//     const balance = await web3.eth.getBalance(
//       "0xC978ec83ACd92D3244096aa24195dB4e60C34617"
//     );
//     console.log("Balance:", balance);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// checkBalance();

// const user_id = "1001";
// const timestamp = "2023-10-10";
// const auth = "success";
// 	const logData = JSON.stringify({
//   timestamp: timestamp,
//   status: auth,
// });

// interactWithContract(logData);
