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

app.post("/api/:date/new-event", (req, res) => {
  Day.count({ date: req.params.date })
    .then(c => {
      if (c > 0) {
        Day.findOne({ date: req.params.date }).then(day => {
          day.events.push(req.body)
          day.save(() => {
            res.status(200).json(day)
          })
        })
      } else {
        Day.create({ date: req.params.date }).then(day => {
          day.events.push(req.body)
          day.save(() => {
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

app.put("/api/:date/modify-event/:id", (req, res) => {
  Day.findOne({ date: req.params.date })
    .then(day => {
      let event = day.events.id(req.params.id)
      console.log(event)
      console.log(req.body)
      Object.assign(event, req.body)
      day.save().then(day => {
        res.status(200).json(event)
      })
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
      day.save().then(day => {
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
