
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  timestamps: { type: Boolean, default: true }, //to handle the created at and updated at cases.
});

module.exports = mongoose.model("Post", postSchema);