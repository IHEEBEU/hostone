const express = require("express");
const blogroutes = require('../db/routes/blogRoutes.js');
const userroutes = require('../db/routes/userRoutes');
const cors = require('cors');
const { connectDB } = require('../db/config.js'); // Import the connectDB function

const app = express();
app.use(express.json());
app.use(cors());

(async () => {
  try {
    await connectDB(); // Use the connectDB function to establish the connection
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
