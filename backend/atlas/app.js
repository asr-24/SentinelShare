require("dotenv").config({ path: __dirname + "/.env" });

const { MongoClient } = require("mongodb");

const USER = process.env.user;
const PASSWORD = process.env.password;
const CLUSTER_URL = process.env.cluster_url;

let uri = `mongodb+srv://${USER}:${PASSWORD}@${CLUSTER_URL}?retryWrites=true&w=majority`;

let queryDataJSON = [];

const client = new MongoClient(uri, { useUnifiedTopology: true });

async function run() {
  const findQuery = { user_type: "vendor" };

  try {
    await client.connect();

    const database = client.db("sentinelShare");
    const collection = database.collection("authentication");
    // console.log("\n\n\n\n\nOUTPUT:\n\n");
    // const cursor = await collection.find(findQuery).sort({ name: 1 });
    const cursor = await collection.find().sort({ name: 1 });
    await cursor.forEach((credential) => {
      // console.log(`${credential.user_email}`);
      queryDataJSON.push({
        user_id: credential.user_id,
        user_email: credential.user_email,
        user_password: credential.user_password,
        user_type: credential.user_type,
      });
    });
    // add a linebreak
    // console.log();
  } catch (err) {
    console.error(
      `Something went wrong trying to find the documents: ${err}\n`
    );
  }

  //  console.log(queryDataJSON);
  await client.close();

  return queryDataJSON;
}

async function getDatabase() {
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



async function getSingleDocument (user_id) {
  try {
    await client.connect();

    const database = client.db("sentinelShare");
    const collection = database.collection("authentication");

    // Query for a movie that has the title 'The Room'
    const query = { user_id : user_id };
    
    // Execute query
    // const credential = await collection.findOne(query);
    
  
    const cursor = await collection.findOne(query);

    if (cursor) {
      // Convert the MongoDB document to a JSON-like object
      const queryDataJSON = {
        user_id: cursor.user_id,
        user_email: cursor.user_email,
        user_password: cursor.user_password,
        user_type: cursor.user_type,
      };
    
      // queryDataJSON = JSON.stringify(jsonDocument, null, 2)
      // console.log(queryDataJSON);
      // console.log("inside here...");

      await client.close(); //required to terminate program do not miss

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


async function invokeGetSingleDocument(user_id) {
  try {
    let queryJSON = await getSingleDocument(user_id);
    return queryJSON;
    // console.log("heeee");
    
  } catch (error) {
    console.dir(error);
    // Handle errors here.
  }

}

// invokeGetSingleDocument("2001");

module.exports = invokeGetSingleDocument;
// module.exports = getDatabase;