const { application } = require("express");
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
   companyName: {
      type: String,
      required: true,
   },
   jobTitle: {
      type: String,
      required: true,
   },
   applicationStatus: {
      type: String,
      enum: ["applied", "interviewing", "offer", "rejected"],
      required: true,
      default: "applied",
   },
   applicationDate: {
      type: Date,
      required: true,
      default: Date.now(),
   },
   followUpDate: {
      type: Date,
   },
   notes: {
      type: String,
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
   },
});

const applicationModel = mongoose.model("application", applicationSchema);
module.exports = applicationModel;
