const express = require("express");
const Cost = require("../models/Cost");
const router = express.Router();

/**
 * @route POST /api/add
 * @description Adds a new cost item.
 * @param {string} req.body.description - Description of the cost item.
 * @param {string} req.body.category - Category of the cost (food, health, housing, sport, education).
 * @param {string} req.body.userid - User ID associated with the cost.
 * @param {string} req.body.sum - The amount spent.
 * @param {string} [req.body.date] - Optional date of the expense (defaults to current date).
 * @returns {Object} JSON response with the newly created cost item.
 * @throws {400} Missing required fields.
 * @throws {500} Internal Server Error.
 */

// Route to add a new cost item
router.post("/add", async (req, res) => {
    try {
        // Extract required fields from request body
        const { description, category, userid, sum, date } = req.body;

        // Convert to match the schema definition 
        const sumNum = Number(sum);
        const dateDate = date ? new Date(date) : new Date();

        // Validate required fields (date is optional)
        if (!description || !category || !userid || !sum) {
            return res.status(400).json({ error: "All fields except date are required" });
        }

        // Create a new cost entry with either the provided date or the current timestamp
        const newCost = new Cost({
            description,
            category,
            userid,
            sum: sumNum,
            date: dateDate
        });

        // Save the new cost item to the database
        await newCost.save();

        // Return the newly created cost item as a JSON response
        res.status(201).json(newCost);
    } catch (error) {
        // Handle server errors
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Export the router for use in server.js
module.exports = router;

