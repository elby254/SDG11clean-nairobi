import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import requestRoutes from "./routes/requests.js";
import reportRoutes from "./routes/reports.js";
import { createServer } from "http";
import { Server } from "socket.io";

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);


// CORS CONFIGURATION (IMPORTANT)
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN,
  methods: ["GET", "POST", "PATCH"],
  credentials: true,
}));

// Middleware to parse JSON
app.use(express.json());


// ROUTES
app.use("/api/requests", requestRoutes);
app.use("/api/reports", reportRoutes);

// Simple API test route
app.get("/", (req, res) => res.send("API is running..."));


// CONNECT TO MONGODB
connectDB();


// SOCKET.IO INITIALIZATION
const io = new Server(httpServer, {
  cors: {
    origin: process.env.ALLOWED_ORIGIN,
    methods: ["GET", "POST", "PATCH"],
  },
});

// Handle new client connections
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


// REAL-TIME EVENTS FOR POST & PATCH OPERATIONS

// POST: Create Garbage Request
app.post("/api/requests", async (req, res) => {
  try {
    const Request = (await import("./models/GarbageRequest.js")).default;
    const newRequest = await Request.create(req.body);

    // Emit real-time event
    io.emit("newRequest", newRequest);

    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH: Update Garbage Request Status
app.patch("/api/requests/:id/status", async (req, res) => {
  try {
    const Request = (await import("./models/GarbageRequest.js")).default;
    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    // Emit real-time update
    io.emit("statusUpdated", updatedRequest);

    res.json(updatedRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Create Illegal Dump Report
app.post("/api/reports", async (req, res) => {
  try {
    const Report = (await import("./models/IllegalDumpReport.js")).default;
    const newReport = await Report.create(req.body);

    // Emit real-time event
    io.emit("newReport", newReport);

    res.status(201).json(newReport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH: Update Illegal Dump Report Status
app.patch("/api/reports/:id/status", async (req, res) => {
  try {
    const Report = (await import("./models/IllegalDumpReport.js")).default;
    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    // Emit real-time update
    io.emit("statusUpdated", updatedReport);

    res.json(updatedReport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// START SERVER
const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
