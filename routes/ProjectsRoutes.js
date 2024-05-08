import express from "express";
import {
  getProjects,
  createProject,
} from "../controllers/ProjectsControllers.js";
import { upload } from "../middleware/Multer.js";

const projectsRoutes = express.Router();

projectsRoutes.get("/", getProjects);
projectsRoutes.post("/", upload.single("image"), createProject);

export default projectsRoutes;
