import User from "../Models/UserModel.js";
import fs from "fs";
import mongoose from "mongoose";

// export const getUser = async (req, res) => {
//   try {
//     const user = await User.find();
//     return res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// Controller for getting one user by ID
export const getUser = async (req, res) => {
  const id = "663a5e8e7be13859e8db683a";

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", msg: error });
  }
};

export const createUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    career,
    elevatorPitch,
    linkedinLink,
    instagramLink,
    facebookLink,
    whatsappLink,
    githubLink,
    startDate,
  } = req.body;
  //   console.log(req.body);

  const { profile, logo, cv } = req.files;

  try {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !career ||
      !elevatorPitch ||
      !githubLink ||
      !linkedinLink ||
      !facebookLink ||
      !instagramLink
    ) {
      if (profile) {
        const profilePath = `public/images/${profile[0].filename}`;
        fs.unlinkSync(profilePath);
      }
      if (logo) {
        const logoPath = `public/images/${logo[0].filename}`;
        fs.unlinkSync(logoPath);
      }
      if (cv) {
        const cvPath = `public/images/${cv[0].filename}`;
        fs.unlinkSync(cvPath);
      }
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!profile || !logo || !cv) {
      return res
        .status(400)
        .json({ error: "Profile image and logo image are required" });
    }

    const currentYear = new Date().getFullYear();
    const startYear = parseInt(startDate);

    const total = currentYear - startYear;

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      career,
      elevatorPitch,
      profile: profile[0].filename,
      logo: logo[0].filename,
      cv: cv[0].filename,
      githubLink,
      linkedinLink,
      instagramLink,
      facebookLink,
      whatsappLink,
      startDate: total,
    });
    // console.log(newUser)

    return res.status(200).json(newUser);
  } catch (error) {
    console.error("Error in createUser:", error);

    if (profile) {
      const profilePath = `public/images/${profile[0].filename}`;
      fs.unlinkSync(profilePath);
    }
    if (logo) {
      const logoPath = `public/images/${logo[0].filename}`;
      fs.unlinkSync(logoPath);
    }
    if (cv) {
      const cvPath = `public/images/${cv[0].filename}`;
      fs.unlinkSync(cvPath);
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};
