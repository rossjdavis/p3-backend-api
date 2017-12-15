const express = require("express")
const parser = require("body-parser")
const cors = require("cors")
const mongoose = require("./db/schema.js")

const app = express()

app.set("port", process.envPORT || 3001)
app.use(parser.json())
app.use(cors())

app.listen(app.get("port"), () => {
  console.log("Lisening on port " + app.get("port"))
})
