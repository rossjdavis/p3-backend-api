const mongoose = require("./connection.js")

const EventSchema = new mongoose.Schema({
  description: String,
  name: String,
  lat: Number,
  lng: Number,
  time: Date
})

module.exports = mongoose
