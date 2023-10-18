import Web3 from "web3";
import HDWalletProvider from "truffle-hdwallet-provider";
import contractABI from "./build/contracts/AuthenticationLogging.json" assert { type: "json" };
const { abi } = contractABI; // Extract the abi from the JSON object
const contractAddress = "0xc6bbd4B6077D43dc11ddc66c951ea2677D7B999e";
import { createHelia } from "helia";
import { json } from "@helia/json";

// Configure your Helia instance
const configureHelia = async () => {
  const helia = await createHelia();
  return json(helia);
};

const web3 = new Web3(
  new HDWalletProvider(
    "drop spot bracket have piece canal domain ghost remind sword insect hero",
    "https://sepolia.infura.io/v3/c557efceb61a41e7b11d471996a3f416",
    30000
  )
);

const contract = new web3.eth.Contract(abi, contractAddress);

const addLog = async (logData) => {
  try {
    // Convert the data to a JSON string
    const dataString = JSON.stringify(logData);

    console.log(dataString);

    console.log("1 - ");

    let accounts; // Declare accounts variable

    const { ethereum } = window;

    try {
      accounts = await ethereum.request({ method: "eth_accounts" }); // Retrieve Ethereum accounts
      console.log("Ethereum Accounts:", accounts);
    } catch (error) {
      console.error("Error getting Ethereum accounts:", error);
    }

    console.log("2 - ");
    const gas = await contract.methods.storeData(dataString).estimateGas();
    console.log("3 - ");
    const tx = await contract.methods.storeData(dataString).send({
      from: accounts[0], // Use the first Ethereum account
      gas: gas,
    });

    console.log("Transaction Hash:", tx.transactionHash);

    return tx.transactionHash;
  } catch (error) {
    console.error("Error sending transaction:", error);
    throw error;
  }
};

(async () => {
  const j = await configureHelia();

  const transactionHash = await addLog({
    user_id: "1001",
    timestamp: "2023-10-03",
    status: "success",
  });
  console.log("Transaction sent. Transaction Hash:", transactionHash);

  // Store CID on Helia
  const CID = await j.add({ transactionHash });
  console.log("CID:", CID);
})();
