const express = require("express");
const Cost = require("../models/Cost");
const Report = require("../models/Report");

const router = express.Router();

/**
 * @route GET /api/report
 * @description Retrieves a monthly report for a user, using a computed design pattern.
 * @param {number} req.query.id - The user ID for the report.
 * @param {number} req.query.year - The year of the report.
 * @param {number} req.query.month - The month of the report (1 = January, 2 = February, etc.).
 * @returns {Object} JSON response with the report details, categorized costs, and updated timestamp.
 * @throws {400} Missing required query parameters.
 * @throws {500} Internal Server Error.
 */

/* 
  Computed Design Pattern:
  - If a report for the requested user, year, and month already exists, return it without regenerating.
  - If new cost items were added after the last report update, update the existing report.
  - If no report exists, generate a new one and store it.
*/

// GET: Retrieve a monthly report (with computed pattern)
router.get("/report", async (req, res) => {
  try {
    const { id, year, month } = req.query;

    if (!id || !year || !month) {
      return res.status(400).json({ error: "User ID, year, and month are required" });
    }

    // Check if a report already exists for the given user and date
    let existingReport = await Report.findOne({ userid: id, year, month });

    if (existingReport) {
      /* 
        If the report exists, check if new cost items were added after the last update.
        This ensures that we only update the report when necessary, reducing database operations.
      */
      const latestCost = await Cost.findOne({ userid: id })
        .where("date")
        .gte(new Date(year, month - 1, 1)) // First day of the requested month
        .lt(new Date(year, month, 1)) // First day of the next month
        .sort({ date: -1 }); // Get the most recent cost item

      if (latestCost && latestCost.date > existingReport.updatedAt) {
        /* 
          If a new cost was added after the report was last updated, update the existing report.
          This prevents regenerating reports unnecessarily while keeping them accurate.
        */
        console.log(`Updating report for user ${id}, month ${month}, year ${year}`);
        existingReport = await generateReport(id, year, month, true);
      }

      return res.status(200).json(existingReport);
    }

    /* 
      If no report exists for the given user and month, generate a new report.
      This ensures the first request for a specific period creates a report.
    */
    console.log(`Creating new report for user ${id}, month ${month}, year ${year}`);
    const newReport = await generateReport(id, year, month, false);
    res.status(200).json(newReport);

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* 
  Function to generate or update a report:
  - If updateExisting is true, update the existing report with new cost items.
  - Otherwise, create a new report.
*/
const generateReport = async (userid, year, month, updateExisting) => {
    // Initialize costs with empty arrays (Best practice)
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

  /* 
    Group costs by category to match the required report format.
    Each category contains an array of expenses with sum, description, and day.
  */
  ["food", "health", "housing", "sport", "education"].forEach((category) => {
    groupedCosts[category] = costs
      .filter((cost) => cost.category === category)
      .map((cost) => ({
        sum: cost.sum,
        description: cost.description,
        day: new Date(cost.date).getDate(),
      }));
  });

  if (updateExisting) {
    /* 
      If updating an existing report, modify the document in the database instead of creating a new one.
    */
    return await Report.findOneAndUpdate(
      { userid, year, month },
      { costs: groupedCosts, updatedAt: new Date() },
      { new: true }
    );
  } else {
    /* 
      If creating a new report, save it to the database for future reuse.
      The `updatedAt` field is initialized to track when the report was last modified.
    */
    const newReport = new Report({ userid, year, month, costs, updatedAt: new Date() });
    return await newReport.save();
  }
};

module.exports = router;

