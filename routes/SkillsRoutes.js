import express from "express";
import {
  getSkills,
  createSkill,
  updateSkill,
} from "../controllers/SkillsControllers.js";
import { upload } from "../middleware/Multer.js";

const skillsRoutes = express.Router();

skillsRoutes.get("/", getSkills);
skillsRoutes.post("/", upload.single("icon"), createSkill);
skillsRoutes.patch("/:id", upload.single("icon"), updateSkill);

export default skillsRoutes;
