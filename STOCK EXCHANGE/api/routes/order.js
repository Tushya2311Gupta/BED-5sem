const router = require("express").Router();
const { postPlaceOrder } = require("../controllers/order");

router.post("/", postPlaceOrder);

module.exports = router;
