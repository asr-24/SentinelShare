require("dotenv").config({ path: __dirname + "/.env" });

const { MongoClient } = require("mongodb");

const USER = process.env.user;
const PASSWORD = process.env.password;
const CLUSTER_URL = process.env.cluster_url;


async function getLastEventID() {
    try {
        let uri = `mongodb+srv://${USER}:${PASSWORD}@${CLUSTER_URL}?retryWrites=true&w=majority`;

        const client = new MongoClient(
        uri,
        { useUnifiedTopology: true },
        { UseNewUrlParser: true },
        { keepAlive: 1 }
        );

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
            queryDataJSON['event_id'] = entry.event_id;
          }
        
        return parseInt(queryDataJSON.event_id);
        
        } catch (err) {
        console.error(
            `Something went wrong trying to find the documents: ${err}\n`
        );
        }
  }



console.log(await getLastEventID());