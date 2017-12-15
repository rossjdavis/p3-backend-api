const mongoose = require("./schema.js")
const seedData = require("./seeds-data.json")

const Event = mongoose.model("Event")

Event.remove({})
  .then(() => {
    Event.collection.insert(seedData).then(data => {
      console.log(data)
      process.exit()
    })
  })
  .catch(err => {
    console.log(err)
  })
