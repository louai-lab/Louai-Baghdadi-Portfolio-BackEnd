import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

const Skills = mongoose.model("Skills", skillsSchema);

export default Skills;
