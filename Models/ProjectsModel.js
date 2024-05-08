import mongoose from "mongoose";

const projectsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    languages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skills" }],
  },
  {
    timestamps: true,
  }
);

projectsSchema.index({ createdAt: -1 });

const Projects = mongoose.model("Projects", projectsSchema);

export default Projects;
