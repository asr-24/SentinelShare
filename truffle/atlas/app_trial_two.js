require('dotenv').config({path: __dirname + '/.env'});

const { MongoClient } = require("mongodb");


const USER = process.env.user; 
const PASSWORD = process.env.password;
const CLUSTER_URL = process.env.cluster_url;


let uri = `mongodb+srv://${USER}:${PASSWORD}@${CLUSTER_URL}?retryWrites=true&w=majority`;

let queryDataJSON = [];

const client = new MongoClient(uri);

async function run() {

  const findQuery = { user_type: "vendor"};

   try {
    await client.connect();

    const database = client.db("sentinelShare");
    const collection = database.collection("authentication");
    // console.log("\n\n\n\n\nOUTPUT:\n\n");
    // const cursor = await collection.find(findQuery).sort({ name: 1 });
    const cursor = await collection.find().sort({ name: 1 });
    await cursor.forEach(credential => {
      // console.log(`${credential.user_email}`);
      queryDataJSON.push({user_id: credential.user_id, 
                          user_email: credential.user_email, 
                          user_password: credential.user_password, 
                          user_type: credential.user_type});
    });
    // add a linebreak
    // console.log();
   } catch (err) {
    console.error(`Something went wrong trying to find the documents: ${err}\n`);
   }

  //  console.log(queryDataJSON);
   await client.close();

   return queryDataJSON;

   
}


async function finalFunction() {
  try {
    let queryJSON = await run();
    return queryJSON;
    // console.log("heeee");
    // console.log(queryDataJSON);

  } catch (error) {
    console.dir(error);
    // Handle errors here.
  }
}

module.exports = finalFunction; 


