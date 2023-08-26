const express = require("express");
const { MongoClient } = require("mongodb");
const blogroutes = require('../db/routes/blogRoutes.js');
const userroutes = require('../db/routes/userRoutes');
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors())

const uri = 'mongodb+srv://mongo:iheb1234@cluster0.fowqa3m.mongodb.net/test';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 90000,
});

(async () => {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();

app.use('/', blogroutes);
app.use('/', userroutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
