import GetSingleDocument from "./atlas/app.js";
import { blockchainIPFSIntegration } from "./blockchain.js";
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

async function addAuthenticationLogToETH(user_id, timestamp, auth) {
  try {
    const logData = JSON.stringify({
      user_id: user_id,
      timestamp: timestamp,
      status: auth,
    });

    await blockchainIPFSIntegration(logData);

    // invoke the interact function here and pass this logData variable to the the addLog function
  } catch (error) {
    console.error("Error adding to IPFS:", error);
    throw error;
  }
}

async function authenticationForUser(user_id) {
  try {
    let user_data = await GetSingleDocument(user_id);

    return user_data;
  } catch (error) {
    console.log("Error retrieving from IPFS");
    throw error;
  }
}

app.post("/", async function (req, res) {
  const timestamp = new Date().toISOString();
  try {
    let data = await authenticationForUser(req.body.username);
    let userEmail = data.user_email;
    let userType = data.user_type;
    let userId = data.user_id;
    let auth = "";

    if (data.user_password === req.body.password) {
      console.log("Authentication successful");
      auth = true;
    } else {
      console.log("Authentication failed");
      auth = false;
    }

    var responseData = {
      userEmail,
      userType,
      userId,
      auth,
    };

    res.send(responseData);

    console.log(
      await addAuthenticationLogToETH(req.body.username, timestamp, auth)
    );
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
