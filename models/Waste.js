const mongoose = require("mongoose");

const collectorDetailsSchema = new mongoose.Schema(
  {
    collectorName: String,
    collectorEmail: String,
    collectorContact: Number,
    collectorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { _id: false }
); // This prevents Mongoose from creating the virtual `id` property

const wasteDetailsSchema = new mongoose.Schema({
  type: String,
  price: Number,
  weight: Number,
});

const wasteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER", // Ensure this matches the model name used in mongoose.model for the User schema
    required: true,
  },
  userfullname: String,
  useremail: {
    type: String,
    required: true,
  },
  contactno: Number,
  address: String,
  pincode: {
    type: String,
    required: true,
  },
  pickupdate: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  wasteDetails: [wasteDetailsSchema],
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    default: "Pending",
  },
  collectorDetails: collectorDetailsSchema,
});

const Waste = mongoose.model("WASTE", wasteSchema);

module.exports = Waste;
