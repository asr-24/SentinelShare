import Web3 from "web3";
import HDWalletProvider from "truffle-hdwallet-provider";

const testnet = "https://sepolia.infura.io/v3/c557efceb61a41e7b11d471996a3f416";
const walletAddress = "0xC978ec83ACd92D3244096aa24195dB4e60C34617";

const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
var balance = web3.eth.getBalance(walletAddress).then((bal) => {
  console.log(bal);
}); //Will give value in.
