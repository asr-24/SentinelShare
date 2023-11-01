import {
  getSingleDocument,
  addNewEventDetails,
  eventDataForVHDashboard,
  getLastEventID,
  eventDataForVendorDashboard,
} from "./atlas/app.js";
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

function timestampInIST() {
  const timestamp = new Date();

  const ISTOffset = 5.5 * 60; // IST is UTC+5 hours and 30 minutes
  timestamp.setMinutes(timestamp.getMinutes() + ISTOffset);

  const ISTTimestamp = timestamp.toISOString();

  return ISTTimestamp;
}

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

async function authenticationForUser(user_id) {
  try {
    let user_data = await getSingleDocument(user_id);

    return user_data;
  } catch (error) {
    console.log("Error retrieving from IPFS");
    throw error;
  }
}

const use_case_1 = "/login";
const use_case_2 = "/createrequest";
const use_case_3_VH_dashboard = "/vhdashboard"; //UPDATE THIS
const use_case_3_VENDOR_dashboard = "/vendorChoice"; //UPDATE

app.post(use_case_1, async function (req, res) {
  //Function for Use Case 1: Authentication
  const timestamp = timestampInIST();
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

    let logData = JSON.stringify({
      user_id: userId,
      timestamp: timestamp,
      status: auth,
    });

    console.log(await addLogToETH(logData));
  } catch (error) {
    console.log(error);
  }
});

app.post(use_case_2, async function (req, res) {
  //Function for Use Case 2: Creation of New Event

  const timestamp = timestampInIST();

  let errorState;

  const user_id = req.body.user_id;

  let last_event_id = await getLastEventID();
  let event_id = (last_event_id + 1).toString();

  console.log(event_id);
  console.log(typeof event_id);

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
      console.log("error");
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

app.get("/VHpending", async (req, res) => {
  let last_event_id = await getLastEventID();
  let responseData = await eventDataForVHDashboard(last_event_id.toString());
  console.log(responseData);
  res.send(responseData);
});

app.post(use_case_3_VH_dashboard, async function (req, res) {
  console.log(req.body);
  res.send("Success");
});

app.post("/vendorPending", async (req, res) => {
  let vendor_id = req.body.vendorid;
  let responseData = await eventDataForVendorDashboard(vendor_id);
  console.log("Response Data", responseData);
  res.send(responseData);
});

app.post(use_case_3_VENDOR_dashboard, async function (req, res) {
  console.log(req.body);
  res.send("Success");
});

// Step 3 – ‘Assign to Venue Manager’/’Assign to ‘Decorator’ respectively
// Step 4 – Submit
// Step 5 – Vendor: Use Case 1
// Step 6 – Vendor sees the following on their dashboard:
// If Vendor.Type == ‘Decorator’: Event Date,
// Event Time,
// Event Type (formal/ casual/ party/ wedding),
// Theme Type (dark/ warm/ light/ pastels/ monochrome), Venue Type (small/ medium/ big/ large)
// Else If Vendor.Type == ‘Venue Manager’: Event Date,
// Event Time,
// Venue Type (small/ medium/ big/ large)
// Step 7 – Vendor adds the following information on their dashboard:
// If Vendor.Type == ‘Decorator’: ‘Approved’/ ‘Rejected’
// Else If Vendor.Type == ‘Venue Manager’:
// ‘Approved’ -> ‘Add Venue Address’/ ‘Rejected’
// Step 8 – Submit
// Step 9 – Vertical Head (Hospitality): Use Case 1
// Step 10 – (Step 2) + Vendor Response ‘Event Venue Address’ Step 11 – ‘Approve’
//  13
// Step 12 – Submit
// Step 13 – Client: Use Case 1
// Step 14 – Client sees contents from (Step 2) and Event Venue Address Step 15 – ‘Approve’

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
