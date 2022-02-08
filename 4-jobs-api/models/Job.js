const { Schema, Types, model } = require("mongoose");

const jobSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide position"],
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = model("Job", jobSchema);
