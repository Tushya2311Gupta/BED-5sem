const express=require("express");
const router = express.Router() //small --> app

router.post("/users", async (req, res) => {
    //add user
    let { email, username, password } = req.body;

    let newUser = new User({
        email: email,
        username: username,
        password: password,
    });

    await newUser.save();
    res.json({
        success: true,
        data: newUser,
        message: "User added successfully",
    });
});

router.get("/users", async (req, res) => {
    let allUsers = await User.find();
    res.json({
        success: true,
        data: allUsers,
    });
});

router.get("/users/:id", async (req, res) => {
    // Get single user by ID
    let { id } = req.params;
    let user = await User.findById(id).populate("blogs"); // ✅ fetch blog objects
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({
        success: true,
        data: user,
    });
});

router.delete("/users/:id", async (req, res) => {
    let { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({
        success: true,
        message: "User deleted successfully",
    });
});

module.exports=router;