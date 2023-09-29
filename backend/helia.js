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
//React port is 3000, Helia.js port is 5000
const port = 5000;

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

async function authenticationForUser(user_id) {
  try {
    addAuthenticationLogToIPFS(user_id).then(function (value) {
      getFromIPFS(value).then(function (user_data) {
        console.log(user_data.user_password);
      });
    });
  } catch (error) {
    console.log("Error retrieving from IPFS");
    throw error;
  }
}

// POST route for frontend to send login credentials to
app.post("/", async function (req, res) {
  //req.body.username contains the username
  //req.body.password contains the password
  let x = authenticationForUser(req.body.username).then(
    function (value) {
      console.log(req.body.password);
      console.log(x); //After promise is resolved, x should
      //be the same as req.body.password for successful authentication
    },
    function (error) {
      console.log(error);
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//Implementation to store and recieve data
// addToIPFS().then(function (value) {
//   getFromIPFS(value);
//   console.log(value);
// });

// await authenticationForUser("2001"); //replace this 2001 with variable name as retrieved from the frontend
