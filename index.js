const express = require("express")
const parser = require("body-parser")
const cors = require("cors")
const { Event, Day } = require("./db/schema.js")

const app = express()

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
  Day.create(req.params.date)
    .then(day => {
      res.json(day)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

app.post("/api/:date/events", (req, res) => {
  Day.findOne({ date: req.params.date })
    .then(day => {
      day.event.push(req.body.event)
      day.save(() => {
        res.status(200).json(day)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

app.get("/api/events", (req, res) => {
  let date = new Date()
  let fulldate = `${date.getMonth() +
    1}-${date.getDate()}-${date.getFullYear()}`

  Day.find({ date: fulldate })
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
