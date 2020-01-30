const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB connected...');
    } catch (error) {
        console.error(`Database error: ${error.message}`);

        //Force exit with the code of Failure (1)
        process.exit(1);
    }
}

module.exports = connectDB;