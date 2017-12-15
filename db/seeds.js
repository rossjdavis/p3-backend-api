const { Event, Day } = require("./schema.js")
const seedData = require("./seeds-data.json")

Day.remove({})
  .then(() => {
    Day.collection.insert(seedData).then(data => {
      console.log(data)
      process.exit()
    })
  })
  .catch(err => {
    console.log(err)
  })
