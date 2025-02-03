const Opportunity = require("../models/opportunity");
const { STATUS, OPPORTUNITY_TYPE } = require("../utils/enum");

// Get all opportunities
const getOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find(
      {},
      "_id title status customerName opportunityType createdAt"
    ).sort({ createdAt: -1 });
    res.status(200).json(opportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new opportunity
const createOpportunity = async (req, res) => {
  const opportunity = new Opportunity(req.body);
  try {
    const savedOpportunity = await opportunity.save();
    res.status(201).json(savedOpportunity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get one opportunity
const getOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }
    res.status(200).json(opportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update one opportunity
const updateOpportunity = async (req, res) => {
  try {
    const updatedOpportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedOpportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }
    res.status(200).json(updatedOpportunity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getOpportunities,
  createOpportunity,
  getOpportunity,
  updateOpportunity,
};
