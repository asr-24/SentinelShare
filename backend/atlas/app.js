require("dotenv").config({ path: __dirname + "/.env" });

const { MongoClient } = require("mongodb");

const USER = process.env.user;
const PASSWORD = process.env.password;
const CLUSTER_URL = process.env.cluster_url;

let uri = `mongodb+srv://${USER}:${PASSWORD}@${CLUSTER_URL}?retryWrites=true&w=majority`;

const client = new MongoClient(
  uri,
  { useUnifiedTopology: true },
  { UseNewUrlParser: true },
  { keepAlive: 1 }
);

client.connect();
console.log("Client connected\n");

async function getSingleDocument(user_id) {
  try {
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
      return queryDataJSON;
    } else {
      console.log("Document not found");
    }
  } catch (err) {
    console.error(
      `Something went wrong trying to find the documents: ${err}\n`
    );
  }
}

async function addNewEventDetails(event_date, 
                                  event_time, 
                                  event_type, 
                                  event_theme_type, 
                                  event_venue_type, 
                                  event_guest_added, 
                                  event_guest_list_url
                                  ) {
  try {
    await client.connect();
    console.log("Client connected\n");
    const database = client.db("sentinelShare");
    console.log("Database connected\n");
    const collection = database.collection("eventDetails");

    const record = {
      event_date: event_date, 
      event_time: event_time, 
      event_type: event_type, 
      event_theme_type: event_theme_type, 
      event_venue_type: event_venue_type, 
      event_guest_added: event_guest_added, 
      event_guest_list_url: event_guest_list_url
      };

    const result = await collection.insertOne(record);

    console.log(`The record was inserted with the _id: ${result.insertedId}`);

  } catch (err) {
    console.error(
      `Something went wrong trying to push the document: ${err}\n`
    );
  }
}


async function eventDataForVHDashboard(event_id) {
  try {
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
            event_venue_type: cursor.event_venue_type
        };

        console.log("Document found\n");
  
        await client.close();

        return queryDataJSON;

        } else {
        console.log("Document not found");
        }
    } catch (err) {
        console.error(
        `Something went wrong trying to find the documents: ${err}\n`
        );
    } 
}

module.exports = getSingleDocument, addNewEventDetails, eventDataForVHDashboard;

// (async () => {
//   console.log(await eventDataForVHDashboard("001"));
// })();

