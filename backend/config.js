const mongoose = require("mongoose");

const mongoConfig = async () => {
    try {
        const result = await mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connected: ", result.connection.host)
    } catch (error) {
        console.log(error)
    }
}

module.exports = mongoConfig;