import Projects from "../Models/ProjectsModel.js";
import fs from "fs";

export const getProjects = async (req, res) => {
  try {
    const projects = await Projects.find()
      .sort({ createdAt: -1 })
      .populate("languages", "name icon color")
      .lean()
      .exec();
    return res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createProject = async (req, res) => {
  const { title, description, link, languages } = req.body;

  try {
    if (!title || !description || !link || !languages) {
      const iconPath = `public/images/${req.file.filename}`;
      fs.unlinkSync(iconPath);
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Upload an image" });
    }

    const image = req.file.filename;

    const newProject = await Projects.create({
      title,
      image: image,
      description,
      link,
      languages,
    });
    return res.status(200).json(newProject);
  } catch (error) {
    const iconPath = `public/images/${req.file.filename}`;
    fs.unlinkSync(iconPath);
    return res.status(500).json({ error: "Internal server error" });
  }
};
