const mongoose = require("./connection.js")

const EventSchema = new mongoose.Schema({
  description: String,
  name: String,
  position: {
    lat: Number,
    lng: Number
  },
  date: String,
  time: String,
  participants: Array
})

// const UserSchema = new Schema({
//   name: String,
//   events: [EventSchema]
// })

mongoose.model("Event", EventSchema)
// const User = mongoose.model("User", UserSchema)

module.exports = mongoose
