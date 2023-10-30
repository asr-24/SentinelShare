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

async function getRandomVendorID() {
                                    
    try {
        console.log("Attempting connection to Mongo Client");
        await client.connect();
        console.log("Client connected\n");
        const database = client.db("sentinelShare");
        console.log("Database connected\n");
        const collection = database.collection("vendors");

        const query = { vendor_type : "decorator" };

        console.log(query);

        const cursor = await collection.find(query).toArray(function(err, all_vendors) {
            if (err) throw err;
            console.log(all_vendors);
          });;
        
        console.log(cursor.vendor_email);

        if (cursor) {
        const queryDataJSON = {
            event_date: cursor.event_date,
            event_time: cursor.event_time,
            event_type: cursor.event_type,
            event_theme_type: cursor.event_theme_type,
            event_venue_type: cursor.event_venue_type
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


getRandomVendorID();