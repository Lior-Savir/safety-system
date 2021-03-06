const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

//בדיקות תקופתיות לציוד וחומרים
const equipmentAndMaterialsPeriodicInspectionsSchema = new mongoose.Schema({
  equipmentType: { type: String },
  manufacturer: { type: String },
  testingFrequency: { type: String },
  testDate: { type: Date },
  nextTestDate: { type: Date },
  documentUpload: { type: String },
  gdod: { type: String },
  createdAt: { type: Date },
  deletedAt: { type: Date },
});

const equipmentAndMaterialsPeriodicInspections = mongoose.model(
  "equipmentAndMaterialsPeriodicInspections",
  equipmentAndMaterialsPeriodicInspectionsSchema
);

module.exports = equipmentAndMaterialsPeriodicInspections;
