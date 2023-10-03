const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');

// Specify your Sepolia test network's RPC URL
const sepoliaRpcUrl = 'YOUR_SEPOLIA_TEST_NETWORK_RPC_URL';

// Specify your Metamask mnemonic phrase
const mnemonic = 'YOUR_METAMASK_MNEMONIC';

// Specify the contract ABI and address
const contractABI = require('./build/contracts/AuthenticationLogging.json').abi;
const contractAddress = '0xc6bbd4B6077D43dc11ddc66c951ea2677D7B999e';

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
    
    // Initialize the contract instance
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Encode the data for the storeData function
    const encodedData = contract.methods.storeData(logData).encodeABI();

    // Get the default account from the HDWalletProvider
    const defaultAccount = web3.currentProvider.addresses[0];

    // Create a transaction object
    const transactionObject = {
      from: defaultAccount,
      to: contractAddress,
      data: encodedData,
    };

    // Sign and send the transaction
    const transaction = await web3.eth.sendTransaction(transactionObject);
    
    console.log('Transaction Hash:', transaction.transactionHash);
  } catch (error) {
    console.error('Error interacting with contract:', error);
  }
}

// Call the interaction function with logData
const user_id = '1001';
const timestamp = '2023-10-10';
const auth = 'success';

const logData = JSON.stringify({
  "user_id": user_id,
  "timestamp": timestamp,
  "status": auth
});

interactWithContract(logData);
