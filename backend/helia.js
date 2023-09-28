import { createHelia } from "helia";
import { strings } from "@helia/strings";
import { json } from "@helia/json";
import path from "path";
import { fileURLToPath } from "url";
import getDatabase from "./atlas/app.js";
import invokeGetSingleDocument from "./atlas/app.js";

import 'dotenv/config'

const cid_value = process.env.authentication_cluster_ipfs; //for all authentication records (full table) 

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// console.log(__dirname);

//create Helia node
const helia = await createHelia();
const j = json(helia);

// async function addToIPFS() {
//   try {
//     let jsonData = await getDatabase();
//     const CID = await j.add(jsonData);

//     console.log("Got CID:", CID);
//     return CID;
//   } catch (error) {
//     console.error("Error adding to IPFS:", error);
//     throw error; 
//   }
// }


async function addAuthenticationLogToIPFS(user_id) {
  try {
    let jsonData = await invokeGetSingleDocument(user_id);
    const CID = await j.add(jsonData);
    return CID;

  } catch (error) {

    console.error("Error adding to IPFS:", error);
    throw error; 
  }
}

async function getFromIPFS(cid) {
  try {
     
    const json = await j.get(cid);
    return json;

  } catch (error) {

    console.error("Error getting from IPFS:", error);
    throw error;

  }
}




async function authenticationForUser (user_id) {
  try {
    addAuthenticationLogToIPFS(user_id).then (function (value) {
      getFromIPFS(value).then (function (user_data) {
        console.log(user_data.user_password);
      });

    });

  } catch (error) {

    console.log("Error retrieving from IPFS");
    throw error;
  }
}

//Implementation to store and recieve data
// addToIPFS().then(function (value) {
//   getFromIPFS(value);
//   console.log(value);
// });

await authenticationForUser("2001"); //replace this 2001 with variable name as retrieved from the frontend