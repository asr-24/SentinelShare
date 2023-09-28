import { createHelia } from "helia";
import { strings } from "@helia/strings";
import { json } from "@helia/json";
import path from "path";
import { fileURLToPath } from "url";
import getDatabase from "./atlas/app.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// console.log(__dirname);

//create Helia node
const helia = await createHelia();
const j = json(helia);

async function addToIPFS() {
  let jsonData = await getDatabase();
  const CID = await j.add(jsonData);

  console.log("Got CID!");
  return CID;
}

async function getFromIPFS(cid) {
  const json = await j.get(cid);

  console.log(json);
}

//Implementation to store and recieve data
addToIPFS().then(function (value) {
  getFromIPFS(value);
});
