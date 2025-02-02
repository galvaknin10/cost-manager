const express = require("express");

const router = express.Router();

// Hardcoded team members data
const teamMembers = [
  { first_name: "Gal", last_name: "Vaknin" },
  { first_name: "Harel", last_name: "Attia" }
];

// GET: Retrieve the team members (developers)
router.get("/about", (req, res) => {
  res.json(teamMembers);
});

module.exports = router;
