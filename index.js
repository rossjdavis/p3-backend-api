const express = require("express")
const parser = require("body-parser")
const cors = require("cors")
const { Event, Day } = require("./db/schema.js")

const app = express()

function dayExists(dateToFind) {
  if (Day.find({date: dateToFind}).count() == 0) {
    return false
} else {
  return true
}}

app.set("port", process.envPORT || 3001)
app.use(parser.json())
app.use(cors())

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

app.post("/api/:date", (req, res) => {
  console.log(req.params.date)
  if (dayExists(req.params.date)) {
    Day.findOne({ date: req.params.date })
      .then(day => {
        day.events.push(req.body)
        day.save(() => {
          res.status(200).json(day)
        })
      })
      .catch(err => {
        res.status(500).json({ error: err })
      })
  } else {
    Day.create({ date: req.params.date })
      .then(day => {
        day.events.push(req.body)
        day.save(() => {
          res.status(200).json(day)
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ error: err })
      })
  }
})

app.get("/api/events/all", (req, res) => {
  Event.find({})
    .then(events => {
      res.json(events)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

app.get("/api/events/:id", (req, res) => {
  Event.findOne({ _id: req.params.id })
    .then(event => {
      res.json(event)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

app.put("/api/events/:id", (req, res) => {
  Event.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true
  })
    .then(event => {
      res.status(200).json(event)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

app.delete("/api/events/:id", (req, res) => {
  Event.findOneAndRemove({ _id: req.params.id })
    .then(event => {
      res.status(200).json(event)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

app.listen(app.get("port"), () => {
  console.log("Lisening on port " + app.get("port"))
})
