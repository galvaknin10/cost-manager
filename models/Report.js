const mongoose = require("mongoose");

// Define the schema for storing monthly expense reports
const reportSchema = new mongoose.Schema({
  // User ID associated with the report
  userid: { type: String, required: true },

  // Year of the report 
  year: { type: String, required: true },

  // Month of the report 
  month: { type: String, required: true },

  // Object storing categorized costs (grouped by "food", "health", etc.)
  costs: { type: Object, required: true },
});

// Export the Report model based on the schema
module.exports = mongoose.model("Report", reportSchema);


