const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/p3-backend-api", { useMongoClient: true })

module.exports = mongoose
