require("dotenv").config({ path: __dirname + "/.env" });

const { MongoClient } = require("mongodb");

const USER = process.env.user;
const PASSWORD = process.env.password;
const CLUSTER_URL = process.env.cluster_url;

let uri = `mongodb+srv://${USER}:${PASSWORD}@${CLUSTER_URL}?retryWrites=true&w=majority`;

async function getSingleDocument(user_id) {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("Client connected\n");
    const database = client.db("sentinelShare");
    console.log("Database connected\n");
    const collection = database.collection("authentication");

    const query = { user_id: user_id };

    const cursor = await collection.findOne(query);

    if (cursor) {
      const queryDataJSON = {
        user_id: cursor.user_id,
        user_email: cursor.user_email,
        user_password: cursor.user_password,
        user_type: cursor.user_type,
      };

      console.log("Document found\n");
      console.log(queryDataJSON);
      console.log("\n");
      return queryDataJSON;
    } else {
      console.log("Document not found\n");
    }
  } catch (err) {
    console.error(
      `Something went wrong trying to find the documents: ${err}\n`
    );
  }
}

async function addNewEventDetails(logData) {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("Client connected\n");
    console.log("Client connected\n");
    const database = client.db("sentinelShare");
    console.log("Database connected\n");
    const collection = database.collection("eventDetails");
    logData = JSON.parse(logData);
    const record = {
      user_id: logData.user_id,
      timestamp: logData.timestamp,
      event_date: logData.event_date,
      event_time: logData.event_time,
      event_type: logData.event_type,
      event_theme_type: logData.event_theme_type,
      event_venue_type: logData.event_venue_type,
      event_guest_added: logData.event_guest_added,
      event_guest_list_url: logData.event_guest_list_url,
      event_id: logData.event_id,
    };
    const result = await collection.insertOne(record);
    console.log(`The record was inserted with the _id: ${result.insertedId}\n`);
  } catch (err) {
    console.error(`Something went wrong trying to push the document: ${err}\n`);
  }
}

async function getRandomVendorID() {
  try {
    const client = new MongoClient(uri);
    console.log("Attempting connection to Mongo Client\n");
    await client.connect();
    console.log("Client connected\n");
    const database = client.db("sentinelShare");
    console.log("Database connected\n");
    const collection = database.collection("vendors");

    const query = { vendor_type: "decorator" };

    const cursor = await collection.findOne(query);

    if (cursor) {
      const vendor_id_allotted = cursor.user_id;
      return vendor_id_allotted;
    }
  } catch (err) {
    console.error(
      `Something went wrong trying to find the documents: ${err}\n`
    );
  }
}

async function addVendorAllocationToEventAllocations(logData) {
  console.log("Adding vendor allocation to event allocation\n");
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("Client connected\n");
    const database = client.db("sentinelShare");
    console.log("Database connected\n");
    const collection = database.collection("eventAllocations");
    const record = {
      event_date: logData.event_date,
      event_time: logData.event_time,
      event_type: logData.event_type,
      event_theme_type: logData.event_theme_type,
      event_venue_type: logData.event_venue_type,
      vendor_assignment: logData.vendor_assignment,
    };

    const result = await collection.insertOne(record);

    console.log(`The record was inserted with the _id: ${result.insertedId}\n`);
    return true;
  } catch (err) {
    console.error(`Something went wrong trying to push the document: ${err}\n`);
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

    console.log("Updating details for Event ID: " + event_id + "\n");

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

      queryDataJSON["vendor_assignment"] = vendor_assignment;
      console.log("Vendor Assigned:" + vendor_assignment + "\n");

      console.log("Document found\n");

      const eventAllocationUpdated =
        await addVendorAllocationToEventAllocations(queryDataJSON);

      if (eventAllocationUpdated == true) {
        console.log("Event Allocation Updated on Atlas\n");
        return true;
      } else {
        return false;
      }
    } else {
      console.log("Document not found\n");
    }
  } catch (err) {
    console.error(
      `Something went wrong trying to find the documents: ${err}\n`
    );
  }
}

async function addVerticalHeadChoiceAllocation(event_id) {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("Client connected\n");
    const database = client.db("sentinelShare");
    console.log("Database connected\n");
    const collection = database.collection("eventDetails");

    const query = { event_id: event_id };

    console.log("Fetching data for Event ID: " + event_id + "\n");

    const cursor = await collection.findOne(query);

    if (cursor) {
      const queryDataJSON = {
        event_date: cursor.event_date,
        event_time: cursor.event_time,
        event_type: cursor.event_type,
        event_theme_type: cursor.event_theme_type,
        event_venue_type: cursor.event_venue_type,
      };
      queryDataJSON.event_id = event_id;
      console.log("Document found\n");

      return queryDataJSON;
    } else {
      console.log("Document not found\n");
    }
  } catch (err) {
    console.error(
      `Something went wrong trying to find the documents: ${err}\n`
    );
  }
}

async function eventDataForVendorDashboard(vendor_allocation) {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("Client connected\n");
    const database = client.db("sentinelShare");
    console.log("Database connected\n");
    const collection = database.collection("eventAllocations");

    const query = { vendor_assignment: vendor_allocation };

    const cursor = await collection.findOne(query);

    if (cursor) {
      const queryDataJSON = {
        event_date: cursor.event_date,
        event_time: cursor.event_time,
        event_type: cursor.event_type,
        event_theme_type: cursor.event_theme_type,
        event_venue_type: cursor.event_venue_type,
        vendor_assignment: cursor.vendor_assignment,
      };

      return queryDataJSON;
    } else {
      console.log("Document not found\n");
    }
  } catch (err) {
    console.error(
      `Something went wrong trying to find the documents: ${err}\n`
    );
  }
}

async function getLastEventID() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("Client connected\n");
    const database = client.db("sentinelShare");
    console.log("Database connected\n");
    const collection = database.collection("eventDetails");

    const query = { event_id: { $gte: "000" } };

    const cursor = await collection.find(query);

    let queryDataJSON = {};

    while (await cursor.hasNext()) {
      const entry = await cursor.next();
      queryDataJSON["event_id"] = entry.event_id;
    }
    return parseInt(queryDataJSON.event_id);
  } catch (err) {
    console.error(
      `Something went wrong trying to find the documents: ${err}\n`
    );
  }
}

module.exports = {
  getSingleDocument,
  addNewEventDetails,
  eventDataForVHDashboard,
  getLastEventID,
  eventDataForVendorDashboard,
  addVerticalHeadChoiceAllocation,
};
