import express from "express";
import {
  getExperiences,
  createExperience,
} from "../controllers/ExperiencesControllers.js";

const experiencesRoutes = express.Router();

experiencesRoutes.get("/", getExperiences);
experiencesRoutes.post("/", createExperience);

export default experiencesRoutes;
