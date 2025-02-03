const mongoose = require("mongoose");

// Define the schema for cost items
const costSchema = new mongoose.Schema({
  // Short description of the cost item
  description: { type: String, required: true },

  // Category of the expense
  category: { 
    type: String, 
    enum: ["food", "health", "housing", "sport", "education"], 
    required: true 
  },

  // User ID to associate the cost with a specific user
  userid: { type: String, required: true },

  // The amount spent
  sum: { type: Number, required: true },

  // Date of the expense, defaults to the current timestamp if not provided
  date: { type: Date, required: true},
});

// Export the Cost model based on the schema
module.exports = mongoose.model("Cost", costSchema);

