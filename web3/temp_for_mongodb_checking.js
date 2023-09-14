import { MongoClient } from 'mongodb';

// Connection URI for MongoDB (replace with your MongoDB URI)
const uri = 'mongodb://localhost:27017';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
  try {
    // Connect to MongoDB
    await client.connect();

    // Create a new database
    const db = client.db('mydatabase');

    // Create a new collection within the database
    const collection = db.collection('mycollection');

    console.log('Database and collection created successfully.');

  } finally {
    // Close the MongoDB connection when done
    await client.close();
  }
}

main().catch(console.error);
