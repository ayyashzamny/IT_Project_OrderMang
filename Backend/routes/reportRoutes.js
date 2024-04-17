const express = require("express");
const generateReport = require("../models/generateReport");

const router = express.Router();

router.get("/getReport", async (req, res) => {
  try {
    const reportData = await generateReport();
    res.status(200).json(reportData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
