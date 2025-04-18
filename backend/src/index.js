// Dependecy Imports
import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

// Configs Imports
import { connectDB } from "./config/db.js";
import { setUpCloudinary } from "./config/cloudinary.js";

// Router endpoints
import authRouter from "./routes/auth.route.js";
import vendorRouter from "./routes/vendors.route.js";
import customerRouter from "./routes/customers.route.js";
import adminRouter from "./routes/admins.route.js";
import managerRouter from "./routes/managers.route.js";
import employeeRouter from "./routes/employees.route.js";
import warehouseRouter from "./routes/warehouses.route.js";
import vehicleRouter from "./routes/vehicles.route.js";

connectDB();
setUpCloudinary();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin:"*",
    credentials: true,
  }),
);
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.status(200).json({
    health: "ok",
    message: "Server is running fine",
  });
});

// Route endpoints
app.use("/api/auth", authRouter);
app.use("/api/vendor", vendorRouter);
app.use("/api/customer", customerRouter);
app.use("/api/admin", adminRouter);
app.use("/api/warehouse", warehouseRouter);
app.use("/api/manager", managerRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/vehicle", vehicleRouter);

// Error handler
app.use("*", (err, _req, res, next) => {
  console.log(err);

  res.status(500).json({
    error: err.message,
  });

  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
