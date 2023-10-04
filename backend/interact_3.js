import Web3 from 'web3';
import HDWalletProvider from 'truffle-hdwallet-provider';


  async function checkBalance() {
    const sepoliaRpcUrl = 'https://sepolia.etherscan.io';
    const mnemonic = 'drop spot bracket have piece canal domain ghost remind sword insect hero';

    const provider = new HDWalletProvider(mnemonic, sepoliaRpcUrl);
    const web3 = new Web3(provider);
    // console.log(web3);
    console.log("hiii");
    
    const address = "0xC978ec83ACd92D3244096aa24195dB4e60C34617";
    
    // Constructing a JSON-RPC request to get the balance
    const requestPayload = {
    jsonrpc: '2.0',
    method: 'eth_getBalance',
    params: [address, 'latest'], // 'latest' block parameter for current balance
    id: 1, // Request ID (can be any unique number)
  };
  
  // Send the request using the provider
  provider.sendAsync(requestPayload, (error, response) => {
    if (error) {
      console.error('Error:', error);
    } else {
      const balanceWei = response.result;
      console.log(`Balance of ${address}: ${web3.utils.fromWei(balanceWei, 'ether')} ETH`);
    }
  });
  
  // Optionally, you can close the provider when you're done with it
  provider.engine.stop();
}



// try {
//     await checkBalance(web3);

// } catch (error) {
//     console.error("Error:", error);
// }

checkBalance().then(function (value) {
       console.log(value);
});