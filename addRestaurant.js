const request = require('request');

const restaurantsObj = require('./restaurants.json');
const restaurantsArr = restaurantsObj.restaurants;

restaurantsArr.map(restaurant => {
  let options = {
    uri: 'http://localhost:5000/api/restaurants',
    method: 'POST',
    json: true,
    headers: {
      'content-type': 'application/json'
    },
    body: restaurant
  }

  request(options, (error, response, body) => {
    if (response.statusCode != 200) {
      console.log(response.statusCode);
      console.log(body);
    } else {
      console.log(`Added 1 document: `);
      console.log(body);
    }
  })
})