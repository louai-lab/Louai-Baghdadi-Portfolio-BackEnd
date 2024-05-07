import express from "express";
import { getUser, createUser } from "../controllers/UserControllers.js";
import { upload } from "../middleware/Multer.js";

const userRoutes = express.Router();

userRoutes.get("/", getUser);
userRoutes.post(
  "/",
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "cv", maxCount: 1 },
  ]),
  createUser
);

export default userRoutes;
