require('dotenv').config({path: __dirname + '/.env'});

const { MongoClient } = require("mongodb");


const USER = process.env.user; 
const PASSWORD = process.env.password;
const CLUSTER_URL = process.env.cluster_url;


let uri = `mongodb+srv://${USER}:${PASSWORD}@${CLUSTER_URL}?retryWrites=true&w=majority`;



const client = new MongoClient(uri);

async function run() {

  const findQuery = { user_type: "vendor"};

   try {
    await client.connect();

    const database = client.db("sentinelShare");
    const collection = database.collection("authentication");
    console.log("\n\n\n\n\nOUTPUT:\n\n");
    const cursor = await collection.find(findQuery).sort({ name: 1 });
    await cursor.forEach(credential => {
      console.log(`${credential.user_email}`);
    });
    // add a linebreak
    console.log();
   } catch (err) {
    console.error(`Something went wrong trying to find the documents: ${err}\n`);
   }

   await client.close();
}
run().catch(console.dir);
