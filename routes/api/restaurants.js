const express = require('express');
const router = express.Router();
const {
  check,
  param,
  validationResult
} = require('express-validator');

//Bring in model
const Restaurant = require('../../models/Restaurants');

//Bring in functions
const functions = require('../../functions/funcs.js');

//@route GET api/restaurants/
//@desc Test route
//@access Public
router.get('/', (req, res) => {
  console.dir(req.body);
  res.send('Request received.');
});

//@route POST api/restaurants/
//@desc Test route
//@access Public
router.post(
  '/',
  [
    check('blurhash').isString(),
    check('city').isString(),
    check('currency').isString(),
    check('delivery_price').isNumeric(),
    check('description').isString(),
    check('image').isString(),
    check('location').isArray(),
    check('name').isString(),
    check('online').isBoolean(),
    check('tags').isArray()
  ],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    let {
      blurhash,
      city,
      currency,
      delivery_price,
      description,
      image,
      location,
      name,
      online,
      tags
    } = req.body;

    try {
      let newRestaurant = await Restaurant.findOne({
        blurhash
      });

      if (newRestaurant) {
        return res.status(400).json({
          errors: [{
            msg: 'Restaurant already exists.'
          }]
        });
      }

      newRestaurant = new Restaurant({
        blurhash,
        city,
        currency,
        delivery_price,
        description,
        image,
        location,
        name,
        online,
        tags
      });

      await newRestaurant.save();

      res.send(newRestaurant);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error.');
    }
  }
);

//@route POST api/restaurants/search/q={}&lat={}&lon={}
//@desc Query route
//@access Public
router.post(
  '/search/q=:q&lon=:lon&lat=:lat',
  [
    param('q')
    .not()
    .isEmpty(),
    param('q', 'Please input more characters').isLength({
      min: 1
    }),
    param('lat').isNumeric(),
    param('lon').isNumeric()
  ],
  async (req, res) => {
    try {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }

      let {
        q,
        lon,
        lat
      } = req.params;

      let rawResults = [];

      //-------------------------------------PARTIAL MATCH SEARCH-------------------------------------
      //Search using $regex
      let results = await Restaurant.find({
        $or: [{
            name: {
              $regex: `${q}`,
              $options: 'i'
            }
          },
          {
            description: {
              $regex: `${q}`,
              $options: 'i'
            }
          },
          {
            tags: {
              $regex: `${q}`,
              $options: 'i'
            }
          },
        ]
      })

      //--------------------------------------FULL MATCH SEARCH-----------------------------------
      //Search using $text operator
      // let extraResults = await Restaurant.find({
      //   $text: {
      //     $search: q,
      //     $language: "en",
      //     $caseSensitive: false,
      //     $diacriticSensitive: false
      //   }
      // });

      //--------------------------------------ADDING RESULTS FROM 2 QUERY METHOD-----------------------------------
      // //Adding results from 2 query method
      //let checkArr1 = functions.checkArrHasValues(results);
      // if (checkArr1) {
      //   while (extraResults.length > 0) {
      //     for (let i = 0; i < results.length; i++) {
      //       if (extraResults[0].blurhash !== results[i].blurhash) {
      //         results.push(extraResults[0]);
      //         extraResults.shift();
      //         break;
      //       }
      //     }
      //   }
      // } else {
      //   results = results.concat(extraResults);
      // }

      //Put the search results in array rawResults
      if (results.length === 0) {
        return res.status(400).json({
          errors: [{
            msg: 'Sorry. No restaurant found.'
          }]
        }); //No result
      } else if (results.length === 1) {
        rawResults.push(
          functions.calcDistance(
            lon,
            lat,
            results[0].location[0],
            results[0].location[1],
            results[0]
          )
        ); //Only 1 result, array with 1 object received
      } else if (results.length > 1) {
        results.forEach(result => {
          rawResults.push(
            functions.calcDistance(
              lon,
              lat,
              result.location[0],
              result.location[1],
              result
            )
          ); //Many results, array of many objs received
        });
      } else {
        console.log('This is strange.');
        return res.send(results); //Just for fun
      }

      //Sort the raw results
      let sorted = functions.sortResults(rawResults);

      res.json({
        sorted
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error.');
    }
  }
);

module.exports = router;