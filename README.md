# Wolt's Summer 2020 Internships - Engineering Pre-assignment

## Option 2) Backend task - search

## Overview

The author uses JavaScript, Node.JS, Express.JS, MongoDB, Mongoose and a few basic dependencies to carry out the assignment.

The author provides 2 querying method: Full match search and Partial match search. The Partial match search method is in use by default. The Full match search is left in comment below the other method at ./routes/api/restaurants.js



## Getting the project up and running

0. Prerequisite
- Install Node.js and npm at https://nodejs.org/en/download/

1. Install dependencies
```
npm install
```
2. Start the server
```
npm run server
```

3. Querying
Example query:
    http://localhost:6000/api/restaurants/search/q=sushi&lon=24.93147&lat=60.17045
    METHOD: POST

4. Extra
I also add routes for Testing database connection and Add new restaurants 
- Testing db connection: 
    http://localhost:6000/api/restaurants/
    METHOD: GET

- Add new restaurants:
    http://localhost:6000/api/restaurants
    METHOD: POST
    Headers: {"Content-Type": "application/json"}
```
    Body: {
        "city": "Helsinki",
        "currency": "EUR",
        "delivery_price": 390,
        "description": "Japanilaista ramenia parhaimmillaan",
        "image": "https://prod-wolt-venue-images-cdn.wolt.com/5d108aa82e757db3f4946ca9/d88ebd36611a5e56bfc6a60264fe3f81",
        "location": [
            24.941786527633663,
            60.169934599421396
        ],
        "name": "Momotoko Citycenter",
        "online": false,
        "tags": [
            "ramen",
            "risotto"
        ],
        "blurhash": "j2DUFG8jbu8AXuLIT5Tt0B01R2;;",
        }
```

Happy querying !


## Questions?
Please reach me at: dangchuongpham1999@gmail.com
I am more than happy to answer your questions.
