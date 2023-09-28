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
  const findQuery = { user_type: "vendor" };

  try {
    await client.connect();

    const database = client.db("sentinelShare");
    const collection = database.collection("authentication");

    // Query for a movie that has the title 'The Room'
    const query = { user_id : user_id };
    
    // Execute query
    const credential = await collection.findOne(query);
    // Print the document returned by findOne()
    console.log(credential);
    
    // const cursor = await collection.find({user_id : user_id});
    // console.log(cursor);
    // await cursor.forEach((credential) => {
    //   queryDataJSON.push({
    //     user_id: credential.user_id,
    //     user_email: credential.user_email,
    //     user_password: credential.user_password,
    //     user_type: credential.user_type,
    //   });
    // });

  } catch (err) {
    console.error(
      `Something went wrong trying to find the documents: ${err}\n`
    );
  }

}


async function invokeGetSingleDocument() {
  try {
    let queryJSON = await getSingleDocument("2001");;
    return queryJSON;
    // console.log("heeee");
    // console.log(queryDataJSON);
  } catch (error) {
    console.dir(error);
    // Handle errors here.
  }

}

// invokeGetSingleDocument();

module.exports = invokeGetSingleDocument;
module.exports = getDatabase;