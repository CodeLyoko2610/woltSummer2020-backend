const express = require('express');

const app = express();

//Routes
app.get('/', (req, res) => {
  res.send('API is running. ');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is up and running on port ${PORT}.`)
);
