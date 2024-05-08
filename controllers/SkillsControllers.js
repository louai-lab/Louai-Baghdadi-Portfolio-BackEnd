import Skills from "../Models/SkillsModel.js";
import fs from "fs";

export const getSkills = async (req, res) => {
  try {
    const skills = await Skills.find();
    return res.status(200).json(skills);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createSkill = async (req, res) => {
  const { name, color } = req.body;

  try {
    if (!name || !color) {
      const iconPath = `public/images/${req.file.filename}`;
      fs.unlinkSync(iconPath);
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Upload an image" });
    }

    const image = req.file.filename;

    const newSkill = await Skills.create({
      name,
      color,
      icon: image,
    });

    return res.status(200).json(newSkill);
  } catch (error) {
    const iconPath = `public/images/${req.file.filename}`;
    fs.unlinkSync(iconPath);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateSkill = async (req, res) => {
  const id = req.params.id;

  const { name, color } = req.body;

  try {
    const existingSkill = await Skills.findById(id);

    if (!existingSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    if (name) existingSkill.name = name;
    if (color) existingSkill.color = color;

    const oldIcon = `public/images/${existingSkill.icon}`;

    if (req.file) {
      existingSkill.icon = req.file.filename;
      fs.unlinkSync(oldIcon, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ error: `error deleting the old image` });
        }
      });
    }

    const updatedSkill = await existingSkill.save();

    return res.status(200).json(updatedSkill);
  } catch (error) {
    const imagePath = `public/images/${icon}`;
    fs.unlinkSync(imagePath);
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error", msg: error });
  }
};
