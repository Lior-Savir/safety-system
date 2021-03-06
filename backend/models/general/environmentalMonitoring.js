const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

//ניטורים סביבתיים
const environmentalMonitoringSchema = new mongoose.Schema({
  harmfulCauses: { type: String },
  locationInUnit: { type: String },
  lastMonitoringDate: { type: Date },
  nextMonitoringDate: { type: Date },
  executionStatus: { type: String },
  surveyDate: { type: Date },
  documentUpload: { type: String },
  gdod: { type: String },
  createdAt: { type: Date },
  deletedAt: { type: Date },
});

const environmentalMonitoring = mongoose.model(
  "environmentalMonitoring",
  environmentalMonitoringSchema
);

module.exports = environmentalMonitoring;
