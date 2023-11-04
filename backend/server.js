import {
  getSingleDocument,
  addNewEventDetails,
  eventDataForVHDashboard,
  getLastEventID,
  eventDataForVendorDashboard,
  addVerticalHeadChoiceAllocation,
} from "./atlas/app.js";
import { blockchainIPFSIntegration } from "./blockchain.js";
import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
const port = 3003;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get time of log in IST
function timestampInIST() {
  const timestamp = new Date();

  const ISTOffset = 5.5 * 60; // IST is UTC+5 hours and 30 minutes
  timestamp.setMinutes(timestamp.getMinutes() + ISTOffset);

  const ISTTimestamp = timestamp.toISOString();

  return ISTTimestamp;
}

//  Add log to Ethereum Testnet Sepolia and then store
//  transaction hash in IPFS
async function addLogToETH(logData) {
  try {
    let returnedValue = await blockchainIPFSIntegration(logData);
    if (returnedValue == false) {
      return false;
    }
    return returnedValue;
  } catch (error) {
    console.error("Error adding to IPFS:", error);
    throw error;
  }
}

//  Authenticate user through MongoDB
async function authenticationForUser(user_id) {
  try {
    console.log("Fetching user credentials");
    let user_data = await getSingleDocument(user_id);

    return user_data;
  } catch (error) {
    console.log("Error retrieving from IPFS");
    throw error;
  }
}

//  Use case 1: /login
//  Use case 2: /createrequest
//  Use case 3  (Fetch pending requests for Vertical Head):   /vhpendingrequests
//              (Vertical Head assigns vendor/decorator):     /vhdashboard
//              (Fetch pending requests for Vendor):          /vendorpendingrequests
//              (Vendor approves/rejects the request):        /vendordashboard

//  User authentication
app.post("/login", async function (req, res) {
  console.log("Received request for login\n");
  const timestamp = timestampInIST();
  try {
    let data = await authenticationForUser(req.body.username);
    let userEmail = data.user_email;
    let userType = data.user_type;
    let userId = data.user_id;
    let auth = "";

    if (data.user_password === req.body.password) {
      console.log("Authentication successful\n");
      auth = true;
    } else {
      console.log("Authentication failed\n");
      auth = false;
    }

    var responseData = {
      userEmail,
      userType,
      userId,
      auth,
    };

    res.send(responseData);

    let logData = JSON.stringify({
      user_id: userId,
      timestamp: timestamp,
      status: auth,
    });

    await addLogToETH(logData);
  } catch (error) {
    console.log(error);
  }
});

//  Client creates a request
app.post("/createrequest", async function (req, res) {
  const timestamp = timestampInIST();

  let errorState;

  const user_id = req.body.user_id;

  let last_event_id = await getLastEventID();
  let event_id = (last_event_id + 1).toString();

  let logData;
  logData = JSON.stringify({
    user_id: user_id,
    timestamp: timestamp,
    event_date: req.body.event_date,
    event_time: req.body.event_time,
    event_type: req.body.event_type,
    event_theme_type: req.body.event_theme_type,
    event_venue_type: req.body.event_venue_type,
    event_guest_added: req.body.event_guest_added,
    event_guest_list_url: req.body.event_guest_list_url,
    event_id: event_id,
  });

  try {
    let responseData_Atlas = await addNewEventDetails(logData);
    let responseData_ETH = await addLogToETH(logData);

    if (responseData_ETH == false) {
      console.log("Something went wrong");
    }
    let responseData = responseData_Atlas && responseData_ETH;

    if (responseData_ETH == false) {
      errorState = false;
      res.send(errorState);
    } else {
      res.send(responseData);
    }
  } catch (error) {
    console.log(error);
  }
});

//  Vertical Head fetches pending requests
app.get("/vhpendingrequests", async (req, res) => {
  let last_event_id = await getLastEventID();
  let responseData = await addVerticalHeadChoiceAllocation(
    last_event_id.toString()
  );
  res.send(responseData);
});

//  Vertical Head assigns vendor/decorator to request
app.post("/vhdashboard", async function (req, res) {
  let responseData = await eventDataForVHDashboard(req.body.event_id);
  if (responseData === true) {
    res.send(true);
  } else {
    res.send(false);
  }
});

//  Vendor fetches pending requests
app.post("/vendorpendingrequests", async (req, res) => {
  let vendor_id = req.body.vendorid;
  let responseData = await eventDataForVendorDashboard(vendor_id);
  // console.log("Response Data", responseData);
  res.send(responseData);
});

//  Vertical Head approves/rejects the request
app.post("/vendordashboard", async function (req, res) {
  console.log(req.body);
  res.send("Success");
});

//  Start express server
app.listen(port, () => {
  console.log(`App listening on port ${port}\n`);
});
