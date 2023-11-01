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

    const query = { vendor_type: "decorator" };

    let vendor_id_allotted = "0";

    const cursor = await collection
      .find(query)
      .toArray(function (err, all_vendors) {
        if (err) throw err;
        vendor_id_allotted = all_vendors[0].vendor_id.toString();
        console.log(vendor_id_allotted);
        return vendor_id_allotted;
      });
  } catch (err) {
    console.error(
      `Something went wrong trying to find the documents: ${err}\n`
    );
  }
}

getRandomVendorID();
