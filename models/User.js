const mongoose = require("mongoose");

// Define the schema for storing user information
const userSchema = new mongoose.Schema({
  // Unique user ID 
  id: { type: String, required: true, unique: true },

  // User's first name 
  first_name: { type: String, required: true },

  // User's last name 
  last_name: { type: String, required: true },

  // User's birth date
  birthday: { type: Date, required: true },

  // Marital status of the user
  marital_status: { type: String, required: true }
});

// Export the User model based on the schema
module.exports = mongoose.model("User", userSchema);

