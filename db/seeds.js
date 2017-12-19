const { Event, Day } = require("./schema.js")
const seedData = require("./seeds-data.json")

Day.remove({}).then(() => {
  seedData.forEach(data => {
    Day.create(data)
      .then(data => {
        console.log(data)
        process.exit()
      })
      .catch(err => {
        console.log(err)
      })
  })
})
