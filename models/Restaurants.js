const mongoose = require('mongoose');

//For performance in production state
let options = {
    autoIndex: false
};

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

}, options)

//Indexes for query
let indexes = {
    name: "text",
    description: "text",
    tags: "text"
}
RestaurantSchema.index(indexes);

module.exports = Restaurant = mongoose.model('restaurant', RestaurantSchema);