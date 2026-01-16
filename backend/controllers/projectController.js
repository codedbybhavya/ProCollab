const Project = require("../models/Project");
const mongoose = require("mongoose");

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



// @desc    Get all projects with filters
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  
  try {
    const {
      search,
      category,
      skills,
      page = 1,
      limit = 6,
    } = req.query;

    const query = {};

    // 🔍 Search by title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // 🏷️ Filter by category
    if (category) {
      query.category = { $regex: `^${category}$`, $options: "i" };
    }

    // 🛠️ Filter by skills
    if (skills) {
      const skillsArray = skills.split(",").map(skill => skill.trim());
      query.requiredSkills = { $in: skillsArray };
    }

    const skip = (page - 1) * limit;

    const projects = await Project.find(query)
      .populate("ownerId", "name email skills")
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Project.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};

module.exports = { createProject, getProjects };