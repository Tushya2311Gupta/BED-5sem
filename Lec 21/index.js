//Authentication and authorization
//create a server and connect database
const express = require("express")
const app = express()
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
