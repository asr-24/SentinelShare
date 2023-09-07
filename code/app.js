const Web3 = require('web3');
// const { initContract, verifyCredential } = require('./smart-contract');
const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});


require('dotenv').config();

const infuraUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`; // 'mainnet'
const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

web3.eth.getBlockNumber().then((blockNumber) => {
  console.log(`Latest block number: ${blockNumber}`);
}).catch((error) => {
  console.error(`Error: ${error}`);
});


async function addToIPFS(data) {
  try {
    console.log('Data to add:', JSON.stringify(data));
    const result = await ipfs.add(JSON.stringify(data));
    return result[0].path;
  } catch (error) {
    throw error;
  }
}

// Example: Add a JSON object to IPFS
const data = { user: 'example', password: 'examplePassword' };

addToIPFS(data)
  .then((cid) => {
    console.log('IPFS CID:', cid);
  })
  .catch((error) => {
    console.error('Error adding to IPFS:', error);
  });


// // Function to handle form submission
// async function handleLogin(event) {
//     event.preventDefault();
    
//     const userId = document.getElementById('userId').value;
//     const password = document.getElementById('password').value;
    
//     try {
//       // Call the smart contract to verify credentials
//       const isValid = await verifyCredential(userId, password);
      
//       if (isValid) {
//         console.log('Login successful!');
//         // Redirect to a dashboard or user's profile page
//       } else {
//         console.error('Invalid credentials');
//         // Display an error message to the user
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       // Handle unexpected errors
//     }
//   }
  
//   // Add a submit event listener to the login form
//   const loginForm = document.getElementById('loginForm');
//   loginForm.addEventListener('submit', handleLogin);