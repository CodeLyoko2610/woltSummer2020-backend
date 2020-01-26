const express = require('express');
const router = express.Router();

//@route POST api/restaurants/
//@desc Test route
//@access Public
router.post('/', (req, res) => {
    console.log(req.body)
    res.send('Restaurants route.');
})

module.exports = router;