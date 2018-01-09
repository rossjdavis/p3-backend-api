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

// Wouldn't calling process.exit() where you are currently only allow one instance to
// be created?

// Instead, you can pass an entire array to `create` (if you want validation) or you could
// just bulk insert using `Day.collection.insert` (if you want speed but no validation):

Day.remove({})
  .then(() => {
    return Day.create(seedData)
      .then((data) => {
        console.log(data)
      })
  })
  .then(() => {
    process.exit()
  })
  .catch((err) => {
    console.log(err)
  })

// by returning the Promise returned from `Day.create`, the `.then()` will resolve to that Promise which
// we can then chain another `.then()` onto to wait for it to finish creation before `process.exit()`. It
// also allows us to put a single `.catch()` at the end that will catch any errors throughout.
