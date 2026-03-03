const express = require("express");
const router = express.Router();
const { createOrder, getUserOrders, getAllOrders, updateOrderStatus } = require("../controllers/orderController");


router.post("/create", createOrder);
router.get("/all", getAllOrders);   // 👈 MOVE THIS ABOVE
router.put("/status/:id", updateOrderStatus);
router.get("/:userId", getUserOrders);

module.exports = router;