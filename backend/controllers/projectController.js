const Project = require("../models/Project");

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      requiredSkills,
      category,
      teamSize,
    } = req.body;

    if (!title || !description || !category || !teamSize) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const project = await Project.create({
      title,
      description,
      requiredSkills,
      category,
      teamSize,
      ownerId: req.user.id, // from auth middleware
    });

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Project creation failed",
    });
  }
};

module.exports = { createProject };
