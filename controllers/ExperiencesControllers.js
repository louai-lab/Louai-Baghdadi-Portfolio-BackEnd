import Experiences from "../Models/ExperiencesModel.js";

export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experiences.find().sort({ createdAt: -1 });

    return res.status(200).json(experiences);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createExperience = async (req, res) => {
  const { certificate, title, description, startDate, endDate } = req.body;

  try {
    if (!certificate || !title || !description || !startDate || !endDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const formattedStartDate = startDate ? startDate.trim() : null;
    const formattedEndDate = endDate ? endDate.trim() : null;

    const newProject = await Experiences.create({
      certificate,
      title,
      description,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });
    return res.status(200).json(newProject);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
