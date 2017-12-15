const Schema = require("./connection.js")

const EventSchema = new Schema({
  description: String,
  name: String,
  position: {
    lat: Number,
    lng: Number
  }
  time: Date,
  participants: Array,
})

// const UserSchema = new Schema({
//   name: String,
//   events: [EventSchema]
// })

const Event = mongoose.model("Event", EventSchema)
// const User = mongoose.model("User", UserSchema)

module.exports = {
  Event
}
