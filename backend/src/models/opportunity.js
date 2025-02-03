const mongoose = require("mongoose");
const { STATUS, OPPORTUNITY_TYPE } = require("../utils/enum");

const opportunitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(STATUS),
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  opportunityType: {
    type: String,
    enum: Object.values(OPPORTUNITY_TYPE),
    required: true,
  },
  startDate: {
    type: Date,
    required: function () {
      return (
        this.opportunityType === OPPORTUNITY_TYPE.HANDOVER ||
        this.opportunityType === OPPORTUNITY_TYPE.COVER_REQUEST
      );
    },
  },
  endDate: {
    type: Date,
    required: function () {
      return this.opportunityType === OPPORTUNITY_TYPE.COVER_REQUEST;
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

opportunitySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Opportunity = mongoose.model("Opportunity", opportunitySchema);

module.exports = Opportunity;
