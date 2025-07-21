const express = require('express')
const app = express()

app.get('/', (req, res) => {
  // res.send('Hello World')
  // res.send("<h1>Hello World</h1><p>Welcome to my Express server!</p>")
  // res.sendFile(__dirname + '/index.html')
  // res.json({
  //   name: "Tushya Gupta",
  //   age: 20,
  //   message: 'Hello World', 
  //   description: 'Welcome to my Express server!' 
  // })
  // res.end("hi")
})
//1. query
app.get('/watch', (req, res) => {
  let videoId=req.query.v;
  let nID=req.query.n;
  res.send('id got it'+" "+videoId+" "+nID)
})
//2. params
app.get('/watch/:v/video/:n', (req, res) => {
  console.log(req.params.v)
  console.log(req.params.n)
  res.send("Got it !!!!")
})
app.listen(3000,function () {
  console.log('Server is running on port http://localhost:3000')
})
