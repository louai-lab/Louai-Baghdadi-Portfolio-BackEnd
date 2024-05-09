import mongoose from "mongoose";

const experiencesSchema = new mongoose.Schema(
  {
    certificate: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

experiencesSchema.index({ createdAt: -1 });

const Experiences = mongoose.model("Experiences", experiencesSchema);

export default Experiences;
