const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); // Enable JSON body parsing

// Connect to MongoDB
mongoose.connect("mongodb+srv://gal9846:LrXB9nNkwmDtzpur@cost-manager-cluster.iv3f6.mongodb.net/cost_manager?retryWrites=true&w=majority&appName=cost-manager-cluster")
  .then(() => console.log('MongoDB connected successfully to cost_manager'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import Routes
const costRoutes = require("./routes/costs");
const userRoutes = require("./routes/users");
const reportRoutes = require("./routes/report");
const aboutRoutes = require("./routes/about");

app.use("/api", costRoutes);
app.use("/api", userRoutes);
app.use("/api", reportRoutes);
app.use("/api", aboutRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to Cost Manager API");
});

// Start server
const PORT = process.env.PORT || 5000; // Use Render’s assigned port or fallback to 5000 for local development

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
