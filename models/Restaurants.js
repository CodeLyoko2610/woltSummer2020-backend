const mongoose = require('mongoose');

const RestaurantSchema = mongoose.Schema({
    blurhash: String,
    city: String,
    currency: String,
    delivery_price: Number,
    description: String,
    image: String,
    location: [Number, Number],
    name: String,
    online: Boolean,
    tags: [String]

})

module.exports = Restaurant = mongoose.model('restaurant', RestaurantSchema);