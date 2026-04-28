import mongoose, { Schema, models, model } from "mongoose";

const FeedbackSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      default: "",
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  },
);

const Feedback = models.Feedback || model("Feedback", FeedbackSchema);

export default Feedback;
