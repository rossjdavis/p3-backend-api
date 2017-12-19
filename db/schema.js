const mongoose = require("./connection.js")

const EventSchema = new mongoose.Schema({
  description: String,
  name: String,
  position: {
    lat: Number,
    lng: Number
  },
  time: String,
  participants: Array
})

const DaySchema = new mongoose.Schema({
  date: String,
  events: [EventSchema]
})

const Event = mongoose.model("Event", EventSchema)
const Day = mongoose.model("Day", DaySchema)

module.exports = {
  Event,
  Day
}
