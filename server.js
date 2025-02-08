
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const productRouter = require("./Routes/Product");
const brandRouter = require("./Routes/Brand");
const categoryRouter = require("./Routes/Category");

dotenv.config();

const server = express();

// ✅ Middleware
server.use(cors());
server.use(express.json());
server.use("/products", productRouter);
server.use('/categories', categoryRouter); // ✅ New Route
server.use('/brands', brandRouter); // ✅ New Route


// ✅ Debug Middleware
server.use((req, res, next) => {
  console.log(`🌐 Incoming Request: ${req.method} ${req.url}`);
  next();
});

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// ✅ Error Handling Middleware
server.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
