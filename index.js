const express = require("express")
const parser = require("body-parser")
const cors = require("cors")
const { Event, Day } = require("./db/schema.js")

const app = express()

app.set("port", process.env.PORT || 3001)
app.use(parser.json())
app.use(cors())
// As a next step, consider configuring CORS to only allow access from origins you expect

app.get("/api/:date", (req, res) => {
  Day.findOne({ date: req.params.date })
    .then(day => {
      res.json(day)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

app.post("/api/:date/new-event", (req, res) => {
  Day.findOne({ date: req.params.date })
    .then(day => {
      if (day) {
        day.events.push(req.body)
        return day.save(() => {
          res.status(200).json(day)
        })
      } else {
        return Day.create({ date: req.params.date })
          .then(day => {
            day.events.push(req.body)
            return day.save(() => {
              res.status(200).json(day)
            })
          })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})
// Instead of using `.count` to check for the presence of a certain day, just use `.findOne()`
// and check what is returned from it. If absent, it will be `undefined`.

app.put("/api/:date/modify-event/:id", (req, res) => {
  Day.findOne({ date: req.params.date })
    .then(day => {
      let event = day.events.id(req.params.id)
      // remove console.logs for testing from production code
      Object.assign(event, req.body)
      return day.save().then(day => {
        res.status(200).json(event)
      })
      // add return so that the catch below will catch both
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

app.delete("/api/:date/remove-event/:id", (req, res) => {
  Day.findOne({ date: req.params.date })
    .then(day => {
      console.log(day.events)
      day.events.pull({ _id: req.params.id })
      return day.save().then(day => {
        res.status(200).json(day)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

app.listen(app.get("port"), () => {
  console.log("Lisening on port " + app.get("port"))
})
