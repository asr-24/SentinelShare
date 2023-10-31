require("dotenv").config({ path: __dirname + "/.env" });

const { MongoClient } = require("mongodb");

const USER = process.env.user;
const PASSWORD = process.env.password;
const CLUSTER_URL = process.env.cluster_url;

console.log(USER);

let uri = `mongodb+srv://${USER}:${PASSWORD}@${CLUSTER_URL}?retryWrites=true&w=majority`; 

const client = new MongoClient(
  uri,
  { useUnifiedTopology: true },
  { UseNewUrlParser: true },
  { keepAlive: 1 }
);

async function eventDataForVendorDashboard (vendor_allocation) {
    try {
      const client = new MongoClient(uri);
      await client.connect();
      console.log("Client connected\n");
      const database = client.db("sentinelShare");
      console.log("Database connected\n");
      const collection = database.collection("eventAllocations");
  
      const query = { vendor_allocation: vendor_allocation };
  
      console.log(query);
  
      const cursor = await collection.findOne(query);
  
      if (cursor) {
        const queryDataJSON = {
          event_date: cursor.event_date,
          event_time: cursor.event_time,
          event_type: cursor.event_type,
          event_theme_type: cursor.event_theme_type,
          event_venue_type: cursor.event_venue_type,
          vendor_assignment: cursor.vendor_assignment
        };
  
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


  eventDataForVendorDashboard("3001");

