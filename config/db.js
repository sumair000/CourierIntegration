const mongoose = require('mongoose');
require('dotenv').config()


const connectDB = async ()=>{

    try {
        console.log("MONGO_URI from env:", process.env.MONGO_URI);

        await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongoDb is connected successfuly `);
        
    } catch (err) {
        console.error(err);
        process.exit(1);
        
    }
}


module.exports = connectDB