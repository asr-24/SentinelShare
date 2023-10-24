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

async function eventDataForVHDashboard(event_id) {
                                    
    try {
        console.log("Attempting connection to Mongo Client");
        await client.connect();
        console.log("Client connected\n");
        const database = client.db("sentinelShare");
        console.log("Database connected\n");
        const collection = database.collection("eventDetails");

        const query = { event_id: event_id };

        // console.log(query);

        const cursor = await collection.findOne(query);
        
        // Event Date,
        // Event Time,
        // Event Type (formal/ casual/ party/ wedding),
        // Theme Type (dark/ warm/ light/ pastels/ monochrome), 
        // Venue Type (small/ medium/ big/ large)


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


eventDataForVHDashboard("001")

