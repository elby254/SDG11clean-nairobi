import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import requestRoutes from "./routes/requests.js";
import reportRoutes from "./routes/reports.js";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();
const httpServer = createServer(app);

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN
}));

const io = new Server(httpServer, {
  cors: {
    origin: process.env.ALLOWED_ORIGIN,
    methods: ["GET", "POST", "PATCH"]
  }
});

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/requests", requestRoutes);
app.use("/api/reports", reportRoutes);

// Connect to MongoDB
connectDB();

// Test route
app.get("/", (req, res) => res.send("API is running..."));

// Socket.io connection
io.on("connection", socket => {
  console.log("New client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
});

// POST and PATCH handlers integrated with Socket.io

// POST Garbage Request
app.post("/api/requests", async (req, res) => {
  try {
    const requestModel = (await import("./models/GarbageRequest.js")).default;
    const request = await requestModel.create(req.body);
    io.emit("newRequest", request); // real-time update
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH Garbage Request Status
app.patch("/api/requests/:id/status", async (req, res) => {
  try {
    const requestModel = (await import("./models/GarbageRequest.js")).default;
    const updated = await requestModel.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    io.emit("statusUpdated", updated); // emit status update
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST Illegal Dump Report
app.post("/api/reports", async (req, res) => {
  try {
    const reportModel = (await import("./models/IllegalDumpReport.js")).default;
    const report = await reportModel.create(req.body);
    io.emit("newReport", report); // real-time update
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH Illegal Dump Report Status
app.patch("/api/reports/:id/status", async (req, res) => {
  try {
    const reportModel = (await import("./models/IllegalDumpReport.js")).default;
    const updated = await reportModel.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    io.emit("statusUpdated", updated); // emit status update
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
