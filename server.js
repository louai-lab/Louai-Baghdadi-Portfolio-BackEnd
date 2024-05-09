import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./config/Config.js";
import userRoutes from "./routes/UserRoutes.js";
import skillsRoutes from "./routes/SkillsRoutes.js";
import projectsRoutes from "./routes/ProjectsRoutes.js";
import experiencesRoutes from "./routes/ExperiencesRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 6666;

const app = express();

app.use(express.json());

const corsOption = {
  origin: process.env.FRONT_END_PATH,
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOption));

app.use(express.static("public"));
app.use("/images", express.static("images"));

app.use("/user", userRoutes);
app.use("/skills", skillsRoutes);
app.use("/projects", projectsRoutes);
app.use("/experiences", experiencesRoutes);

app.listen(PORT, () => {
  connect();
  console.log(`running on port: ${PORT}`);
  if (PORT === 6666) {
    console.log(
      "ERROR: issue reading port from process.env. Continue with caution! ..."
    );
  }
});
