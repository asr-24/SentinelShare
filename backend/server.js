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

async function addAuthenticationLogToETH(use_case, user_id, timestamp, auth) {
  
  let logData = ''; 

  if (use_case == 1) {

    logData = JSON.stringify({
      user_id: user_id,
      timestamp: timestamp,
      status: auth,
    });

    
  } else if (use_case == 2) {

    logData = JSON.stringify({
      user_id: user_id,
      timestamp: timestamp,
      event_date: event_date, 
      event_time: event_time, 
      event_type: event_type, 
      event_theme_type: event_theme_type, 
      event_venue_type: event_venue_type, 
      event_guest_added: event_guest_added, 
      event_guest_list_url: event_guest_list_url
    });

  }

  try {
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
const use_case_1 = "/";
const use_case_2 = "/createrequest"; //UPDATE THIS



app.post(use_case_1, async function (req, res) { //Function for Use Case 1: Authentication

  const timestamp = new Date().toISOString();
  try {
    let data = await authenticationForUser(req.body.username);
    let userEmail = data.user_email;
    let userType = data.user_type;
    let userId = data.user_id;
    let auth = "";

    if (data.user_password === req.body.password) {
      console.log("Authentication successful");
      console.log(data.user_password);
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
      await addAuthenticationLogToETH(1, req.body.username, timestamp, auth)
    );
  } catch (error) {
    console.log(error);
  }
});



app.post(use_case_2, async function (req, res) { //Function for Use Case 2: Creation of New Event

//   Use Case 2:
  // New Project from Client 
  // Step1 – UseCase1
  // Step 2 – ‘Request New Event’ Button
  // Step 3 – Client enters the following information:
        // Event Date,
        // Event Time,
        // Event Type (formal/ casual/ party/ wedding),
        // Theme Type (dark/ warm/ light/ pastels/ monochrome),
        // Venue Type (small/ medium/ big/ large),
        // Guest List (yes -> [Guest Name/ Guest Phone/ Guest Email]/ no)
  // Step 4 – Submit
  
  const timestamp = new Date().toISOString();

  //Add log of new event creation on blockchain

  try {
    // const user_id = add yaha user_id; 
    const event_date = req.body.event_date;
    const event_time = req.body.event_time; 
    const event_type = req.body.event_type;
    const event_theme_type = req.body.event_theme_type; 
    const event_venue_type = req.body.event_venue_type;
    const event_guest_added = req.body.event_guest_added;
    const event_guest_list_ipfs_cid = req.body.event_guest_list_ipfs_cid;


    var responseData = {
      userEmail,
      userType,
      userId,
      auth,
    };

    //After successful storage in database and then after successful
    //addition to IPFS, send a boolean true through res.send(true)
    //If fails in either step, send res.send(false)

    console.log(
      await addAuthenticationLogToETH(2,  
                                          event_date, 
                                          event_time, 
                                          event_type, 
                                          event_theme_type, 
                                          event_venue_type, 
                                          event_guest_added, 
                                          event_guest_list_url,
                                          timestamp)
    );
  } catch (error) {
    console.log(error);
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
