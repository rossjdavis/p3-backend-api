const mongoose = require("mongoose")

mongoose.Promise = Promise
// to fix deprecation warning

if (process.env.NODE_ENV == "production") {
  mongoose.connect(process.env.MLAB_URL)
} else {
  mongoose.connect("mongodb://localhost/p3-api")
}

module.exports = mongoose
