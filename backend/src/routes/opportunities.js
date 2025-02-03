const express = require("express");
const router = express.Router();
const {
  getOpportunities,
  createOpportunity,
  getOpportunity,
  updateOpportunity,
} = require("../controllers/opportunities-controllers");

// Define routes
router.get("/", getOpportunities);
router.post("/", createOpportunity);
router.get("/:id", getOpportunity);
router.put("/:id", updateOpportunity);

module.exports = router;
