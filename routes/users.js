const express = require("express");
const User = require("../models/User");
const Cost = require("../models/Cost");
const router = express.Router();

/**
 * @route GET /api/users/:id
 * @description Retrieves user details along with their total cost sum.
 * @param {string} req.params.id - The user ID to search for.
 * @returns {Object} JSON response with user details and total cost.
 * @throws {404} User not found.
 * @throws {500} Internal Server Error.
 */

// Route to get user details by ID
router.get("/users/:id", async (req, res) => {
  try {

    const userId = req.params.id;
    
    // Find the user based on the provided ID
    const user = await User.findOne({ id: userId });

    // If the user does not exist, return a 404 response
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Retrieve all costs associated with this user
    const costs = await Cost.find({ userid: userId });

    // Calculate the total cost using `reduce()`
    const totalSpent = costs.reduce((sum, cost) => sum + cost.sum, 0);

    // Return user details along with the total cost sum
    res.json({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      total: totalSpent
    });
  } catch (error) {
    // Handle any unexpected server errors
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Export the router for use in server.js
module.exports = router;

