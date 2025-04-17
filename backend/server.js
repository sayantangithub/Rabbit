const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/user.route.js");
const productRoutes = require("./routes/product.route.js");
const cartRoutes = require("./routes/cart.route.js");
const checkoutRoutes = require("./routes/checkout.route.js");
const orderRoutes = require("./routes/order.route.js");
const uploadRoutes = require("./routes/upload.route.js");
const subscribeRoutes = require("./routes/subscribe.route.js");
const adminRoutes = require("./routes/admin.route.js");
const productAdminRoutes = require("./routes/productAdmin.route.js");
const adminOrderRoutes = require("./routes/adminOrder.route.js");
const paymentRoutes = require("./routes/payment.route.js");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

//Connect to the mongodb database
connectDB();

app.get("/", (req, res) => {
  res.send("WELCOME TO RABBIT APP");
});

//API routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscribeRoutes);

//Admin
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

//payment
app.use("/api/payment", paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
