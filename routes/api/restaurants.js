const express = require('express');
const router = express.Router();
const {
    check,
    validationResult
} = require('express-validator');

//Bring in model
const Restaurant = require('../../models/Restaurants');

//@route GET api/restaurants/
//@desc Test route
//@access Public
router.get('/', (req, res) => {

    console.dir(req.body)
    res.send('Request received.');
})

//@route POST api/restaurants/
//@desc Test route
//@access Public
router.post('/', [
    check('blurhash').isString(),
    check('city').isString(),
    check('currency').isString(),
    check('delivery_price').isNumeric(),
    check('description').isString(),
    check('image').isString(),
    check('location').isArray(),
    check('name').isString(),
    check('online').isBoolean(),
    check('tags').isArray(),
], async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
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
            })
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

})

module.exports = router;