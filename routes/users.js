const express = require("express");
const User = require("../models/User");

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
    // Find the user based on the provided ID
    const user = await User.findOne({ id: req.params.id });

    // If the user does not exist, return a 404 response
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    /* 
      Perform aggregation to calculate the total cost of the user:
      - `$match`: Filters documents to find the user by `id`.
      - `$lookup`: Joins the `costs` collection with `users`, matching `userid` with `id`.
      - `$unwind`: Ensures that even if a user has no costs, the result does not break.
      - `$group`: Groups by `id` and calculates the sum of `costs.sum` for that user.
    */
    const totalCost = await User.aggregate([
      { $match: { id: user.id } },  // Find the user
      { 
        $lookup: {
          from: "costs",             // Join with "costs" collection
          localField: "id",          // User ID field in "users"
          foreignField: "userid",    // Matching field in "costs"
          as: "costs"                // Resulting array field
        } 
      },
      { $unwind: { path: "$costs", preserveNullAndEmptyArrays: true } }, // Handle users with no costs
      { $group: { _id: "$id", total: { $sum: "$costs.sum" } } } // Sum all costs for the user
    ]);

    // Return user details along with the total cost sum (default to 0 if no costs exist)
    res.json({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      total: totalCost.length ? totalCost[0].total : 0
    });
  } catch (error) {
    // Handle any unexpected server errors
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Export the router for use in server.js
module.exports = router;

