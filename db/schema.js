const mongoose = require("./connection.js")

const EventSchema = new mongoose.Schema({
  description: String,
  name: String,
  position: {
    lat: Number,
    lng: Number
  },
  time: String,
  // for the time attribute, consider using a Date object: http://mongoosejs.com/docs/schematypes.html
  participants: Array
  // for participants, you should list what it is an array of, for example:
  // participants: [String]
  // down the road, you may want a Participant entity, so this might change to:
  // participants: [ParticipantSchema]
})

const DaySchema = new mongoose.Schema({
  date: String,
  events: [EventSchema]
})
// If you were to use the Date object for EventSchema above, you may not even need a Day
// entity (as you could just query based on an Event's date attribute). However, if you
// did keep it, you would want to use Date objects for the data attribute.

const Event = mongoose.model("Event", EventSchema)
const Day = mongoose.model("Day", DaySchema)

module.exports = {
  Event,
  Day
}
