// routes/payment.js
const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/razorpay", async (req, res) => {
  const { amount, checkoutId } = req.body;

  try {
    const options = {
      amount: amount, // amount in paisa
      currency: "INR",
      receipt: `receipt_order_${checkoutId}`,
    };

    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Razorpay order creation error", err);
    res.status(500).json({ message: "Razorpay order failed" });
  }
});

module.exports = router;
