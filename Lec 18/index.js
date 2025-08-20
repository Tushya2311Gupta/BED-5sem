const express = require("express");
const mongoose = require("mongoose");
const app = express();
exports.app = app;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes before using them
let blogRoute = require("./routes/blogroutes");
let userRoute = require("./routes/userroutes");

app.use("/api/blogs", blogRoute);
app.use("/api/users", userRoute);

const Blogs = require("./model/blog");
const User = require("./model/user");

// Connect to MongoDB (update URI as needed)
mongoose.connect("mongodb://127.0.0.1:27017/lec18db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ Connected to MongoDB");
}).catch(err => {
    console.error("❌ MongoDB connection error:", err);
});

// Start server
const PORT = 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
