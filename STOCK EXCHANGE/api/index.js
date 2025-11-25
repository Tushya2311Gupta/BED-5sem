const express = require("express");
const app = express();
const orderRoute = require("./routes/order")

app.use(express.json());
app.use("/api/vi/order", orderRoute);


app.listen(3000,()=>{
    console.log("sevrer started");
})

//$ curl -X POST http://localhost:3000/api/vi/order -H "Content-Type: application/json" -d '{"side":"BUY","type":"LIMIT","price":"1500","quantity":10,"user":"testuser"}'