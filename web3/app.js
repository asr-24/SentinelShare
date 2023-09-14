import { Web3 } from "web3";
import "dotenv/config";
import { readFile } from "fs/promises";
import { createHelia } from 'helia'
import { strings } from '@helia/strings'
import { CID } from 'multiformats/cid'
import { json } from '@helia/json'
import { dagCbor } from '@helia/dag-cbor'


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

async function getDataFromIPFS(cid) {
  const helia = await createHelia()
  // const str = strings(helia)
  // console.log("idk")
  // const data = await str.get(cid)
  // const helia = await createHelia()
  // const j = json(helia)
  // const data = await j.get(cid)

  const d = dagCbor(helia)
  const retrievedObject = await d.get(cid)
  const data = await d.get(retrievedObject.link);
  return data;
}

function getDatabaseCID() {
  // Call the getHash method of the contract and log the value.
  contract.methods
    .getHash()
    .call()
    .then((value) => {
      console.log(`AuthDB CID: ${value}`);
      console.log("Fetch successful!\n");
      console.log(typeof value);
      // Retrieve the data from IPFS using Helia.
      getDataFromIPFS(value).then((data) => {
        // // Process the data as needed.
        console.log("Data retrieved from IPFS:", data);
        // Parse the data as a JSON object.
        const jsonData = JSON.parse(data);

        // Process the JSON data as needed.
        console.log("Data retrieved from IPFS:", jsonData);
      });
    })
    .catch((error) => console.error(error));
}

console.log("Fetching CID of AuthDB...");
getDatabaseCID();

