const { MongoClient } = require("mongodb");

let cachedDb = null;
let mongoClient = null;

const connectDB = async () => {
  if (cachedDb && mongoClient && mongoClient.isConnected()) {
    console.info("Using cached db connection");
    return cachedDb;
  }

  mongoClient = new MongoClient('mongodb+srv://mongo:iheb1234@cluster0.fowqa3m.mongodb.net/', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    connectTimeoutMS: 90000,
    poolSize: 10
  });

  try {
    await mongoClient.connect();

    if (!mongoClient.isConnected()) {
      throw new Error("Unable to connect to MongoDB");
    }

    cachedDb = mongoClient.db("test"); // Replace with your actual database name
    console.info("Connected to MongoDB");
    return cachedDb;
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    throw error;
  }
};

const closeDBConnection = async () => {
  try {
    if (mongoClient) {
      await mongoClient.close();
      cachedDb = null;
      console.log("MongoDB connection closed");
      return true;
    } else {
      console.log("No active MongoDB connection to close");
      return false;
    }
  } catch (error) {
    console.log("Error closing MongoDB connection: ", error);
    return false;
  }
};

module.exports = {
  connectDB,
  closeDBConnection
};
