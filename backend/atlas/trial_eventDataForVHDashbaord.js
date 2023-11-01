require("dotenv").config({ path: __dirname + "/.env" });

const { MongoClient } = require("mongodb");

const USER = process.env.user;
const PASSWORD = process.env.password;
const CLUSTER_URL = process.env.cluster_url;

let uri = `mongodb+srv://${USER}:${PASSWORD}@${CLUSTER_URL}?retryWrites=true&w=majority`;


async function getRandomVendorID() {
    console.log("inside getRandomVendorID");
    try {
      console.log("Random Vendor ID Function");
      const client = new MongoClient(uri);
      console.log("Attempting connection to Mongo Client");
      await client.connect();
      console.log("Client connected\n");
      const database = client.db("sentinelShare");
      console.log("Database connected\n");
      const collection = database.collection("vendors");
  
      const query = { vendor_type: "decorator" };

      console.log(query);
  
      let vendor_id_allotted = "0";
  
      console.log("Test");
    
      const cursor = await collection.findOne(query);

      if (cursor) {
        const vendor_id_allotted = cursor.user_id;
        console.log(vendor_id_allotted);
    } }   catch (err) {
      console.error(
        `Something went wrong trying to find the documents: ${err}\n`
      );
    }
  }


async function eventDataForVHDashboard(event_id) {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("Client connected\n");
    const database = client.db("sentinelShare");
    console.log("Database connected\n");
    const collection = database.collection("eventDetails");

    const query = { event_id: event_id };

    // console.log(query);

    const cursor = await collection.findOne(query);

    if (cursor) {
      const queryDataJSON = {
        event_date: cursor.event_date,
        event_time: cursor.event_time,
        event_type: cursor.event_type,
        event_theme_type: cursor.event_theme_type,
        event_venue_type: cursor.event_venue_type,
      };

      const vendor_assignment = await getRandomVendorID();

      console.log(vendor_assignment);

      queryDataJSON["vendor_assignment"] = vendor_assignment;
      console.log("Vendor Assigned:", vendor_assignment);

      console.log("Document found\n");

      const eventAllocationUpdated =
        await addVendorAllocationToEventAllocations(queryDataJSON);

      if (eventAllocationUpdated == true) {
        console.log("Event Allocation Updated on Atlas");
        return queryDataJSON;
      } else {
        return queryDataJSON;
      }
    } else {
      console.log("Document not found");
    }
  } catch (err) {
    console.error(
      `Something went wrong trying to find the documents: ${err}\n`
    );
  }
}


eventDataForVHDashboard("12");
