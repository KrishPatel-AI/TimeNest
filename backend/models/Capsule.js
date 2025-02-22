const mongoose = require("mongoose");

const CapsuleSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String },
  mediaUrl: { type: String },
  unlockDate: { type: Date, required: true },
  isPublic: { type: Boolean, default: false },
});

module.exports = mongoose.model("Capsule", CapsuleSchema);
