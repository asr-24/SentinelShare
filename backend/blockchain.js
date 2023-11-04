import Web3 from "web3";
import HDWalletProvider from "@truffle/hdwallet-provider";
import { createHelia } from "helia";
import { json } from "@helia/json";
import "dotenv/config";

const sepoliaRpcUrl = process.env.sepoliaURL;
const mnemonic = process.env.mnemonic;

//Get contract information from Truffle
import contractJSON from "./build/contracts/AuthenticationLogging.json" assert { type: "json" };
const contractABI = contractJSON.abi;

const contractAddress = "0xc6bbd4B6077D43dc11ddc66c951ea2677D7B999e";

// Function to initialize web3
async function initializeWeb3() {
  const provider = new HDWalletProvider(mnemonic, sepoliaRpcUrl);
  const web3 = new Web3(provider);
  return web3;
}

//  Function to interact with the contract and store log data on blockchain
async function interactWithContract(logData) {
  try {
    const web3 = await initializeWeb3();

    //  Create a copy of the smart contract to access functions
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const encodedData = contract.methods.storeData(logData).encodeABI();

    //  Default account to use for transactions
    const defaultAccount = "0xC978ec83ACd92D3244096aa24195dB4e60C34617";

    //  Creating a transaction object
    const transactionObject = {
      from: defaultAccount,
      to: contractAddress,
      data: encodedData,
    };

    //  Function to check if wallet has
    //  enough balance to perform transaction
    //  and pay gas fees
    async function checkBalance() {
      try {
        const balance = await web3.eth.getBalance(
          "0xC978ec83ACd92D3244096aa24195dB4e60C34617"
        );
        console.log("Wallet Balance: " + balance + "\n");
      } catch (error) {
        console.error("Error:", error);
      }
    }

    checkBalance();

    try {
      const transaction = await web3.eth.sendTransaction(transactionObject);
      console.log(
        "Transaction sent successfully\nTransaction ID: " +
          transaction.transactionHash +
          "\n"
      );
      return transaction.transactionHash;
    } catch (error) {
      console.error("Error Sending Transaction:", error);
    }
  } catch (error) {
    console.error("Error interacting with contract:", error);
    return false;
  }
}

//  Function called by server.js when trying
//  to log data. First creates helia instance
//  and then stores data and gives back CID
export async function blockchainIPFSIntegration(logData) {
  const helia = await createHelia();
  const j = json(helia);

  const transactionHash = await interactWithContract(logData);

  const CID = await j.add({ transactionHash });
  console.log("Added transaction hash to Helia\nCID: " + CID + "\n");

  console.log("Fetching transaction hash through helia.js\n");
  console.log(await j.get(CID));

  if (transactionHash == false) {
    return false;
  }
  return true;
}
