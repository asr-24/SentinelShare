import { createHelia } from "helia";
import { strings } from "@helia/strings";
import { json } from "@helia/json";
import path from "path";
import { fileURLToPath } from "url";
import getDatabase from "./atlas/app.js";
import invokeGetSingleDocument from "./atlas/app.js";
import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
//React port is 3000, Helia.js port is 3003
const port = 3003;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

async function addAuthenticationLogToETH (user_id, timestamp, auth)  {
  try {
    let logData = {
      "user_id" : user_id,
      "timestamp": timestamp,
      "status": auth
    }; 
    
    return logData;

    // invoke the interact function here and pass this logData variable to the the addLog function

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


async function authenticationForUser(user_id) {
  try {

    let user_data = await invokeGetSingleDocument(user_id);
    console.log(user_data.user_password);
    
    return user_data.user_password; // Return the user_password value
  } catch (error) {
    console.log("Error retrieving from IPFS");
    throw error;
  }
}

app.post("/", async function (req, res) {
  const timestamp = new Date().toISOString(); 
  res.send("here");

  try {
    console.log(req.body.username);
    console.log(typeof req.body.username);

    let x = await authenticationForUser(req.body.username);
    console.log("1 - ");
    console.log(x);
    console.log("2 - ");
    console.log(req.body.password);

    let auth = '';

    if (x === req.body.password) {
      console.log("You're in!");
      auth = "success";
    } else {
      console.log("Authentication failed!");
      auth = "failure";
    }

    console.log(await addAuthenticationLogToETH(req.body.username, timestamp, auth));

  } catch (error) {
    console.log(error);
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});




// // Implementation to store and recieve data
// addToIPFS().then(function (value) {
//   getFromIPFS(value);
//   console.log(value);
// });

// await authenticationForUser("2001"); //replace this 2001 with variable name as retrieved from the frontend
