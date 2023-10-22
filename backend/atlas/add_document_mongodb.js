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

console.log("Attempting connection to Mongo Client");



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

        const doc = {
            event_date: event_date, 
            event_time: event_time, 
            event_type: event_type, 
            event_theme_type: event_theme_type, 
            event_venue_type: event_venue_type, 
            event_guest_added: event_guest_added, 
            event_guest_list_url: event_guest_list_url
        }

        const result = await collection.insertOne(doc);

        // Print the ID of the inserted document
        console.log(`A document was inserted with the _id: ${result.insertedId}`);

    } finally {
        // Close the MongoDB client connection
    await client.close();
    }
    
}



addNewEventDetails("string_event_date", 
                    "string_event_time", 
                    "formal/ casual/ party/ wedding_event_type", 
                    "dark/ warm/ light/ pastels/ monochrome_event_theme_type", 
                    "small/ medium/ big/ large_event_venue_type", 
                    "yes/ no_event_guest_added", 
                    "event_guest_list_url");
