const express = require('express');
//Import modules
const connectDB = require('./config/db');

//Innitiate express
const app = express();
//Connect to db
connectDB();

//Initialize middleware BodyParser to read body object
app.use(express.json({
  extended: false
}));

//Check route
app.get('/', (req, res) => {
  res.send('API is running. ');
});

//Routes
app.use('/api/restaurants', require('./routes/api/restaurants'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is up and running on port ${PORT}.`)
);