const express = require("express");
const Cost = require("../models/Cost");
const Report = require("../models/Report");

const router = express.Router();

/**
 * @route GET /api/report
 * @description Retrieves a monthly report for a user.
 * @param {number} req.query.id - The user ID for the report.
 * @param {number} req.query.year - The year of the report.
 * @param {number} req.query.month - The month of the report (1 = January, 2 = February, etc.).
 * @returns {Object} JSON response with the report details.
 * @throws {400} Missing required query parameters.
 * @throws {500} Internal Server Error.
 */

/*
  Computed Design Pattern:
  - If a report for the requested user, year, and month already exists, return it without regenerating.
  - If no report exists, generate a new one and store it.
  - This approach optimizes performance by avoiding unnecessary database operations.
*/

// GET: Retrieve a monthly report
router.get("/report", async (req, res) => {
  try {
    const { id, year, month } = req.query;

    if (!id || !year || !month) {
      return res.status(400).json({ error: "User ID, year, and month are required" });
    }

    // Check if a report already exists for the given user and date
    const existingReport = await Report.findOne({ userid: id, year, month });

    if (existingReport) {
      return res.status(200).json(existingReport);
    }

    // If no report exists, generate a new one
    console.log(`Creating new report for user ${id}, month ${month}, year ${year}`);
    const newReport = await generateReport(id, year, month);
    res.status(200).json(newReport);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Function to generate a new report.
 * @param {number} userid - The user ID.
 * @param {number} year - The year of the report.
 * @param {number} month - The month of the report.
 * @returns {Object} The newly generated report.
 */
const generateReport = async (userid, year, month) => {
  // Initialize costs with empty categories
  const groupedCosts = {
    food: [],
    health: [],
    housing: [],
    sport: [],
    education: []
  };

  // Retrieve all costs for the specified user and month
  const costs = await Cost.find({ userid })
    .where("date")
    .gte(new Date(year, month - 1, 1)) // First day of the month
    .lt(new Date(year, month, 1)); // First day of the next month

  // Group costs by category
  ["food", "health", "housing", "sport", "education"].forEach((category) => {
    groupedCosts[category] = costs
      .filter((cost) => cost.category === category)
      .map((cost) => ({
        sum: cost.sum,
        description: cost.description,
        day: new Date(cost.date).getDate(),
      }));
  });

  // Create and save the new report
  const newReport = new Report({
    userid,
    year,
    month,
    costs: groupedCosts
  });

  return await newReport.save();
};

module.exports = router;
