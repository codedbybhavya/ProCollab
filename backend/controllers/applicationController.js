const Application = require("../models/Application");
const Project = require("../models/Project");

// @desc    Apply to a project
// @route   POST /api/applications
// @access  Private
const applyToProject = async (req, res) => {
  try {
    const { projectId, message } = req.body;

    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // ❌ Owner cannot apply to own project
    if (project.ownerId.toString() === req.user.id) {
      return res.status(400).json({
        message: "You cannot apply to your own project",
      });
    }

    // ❌ Prevent duplicate applications
    const alreadyApplied = await Application.findOne({
      projectId,
      applicantId: req.user.id,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "You have already applied to this project",
      });
    }

    const application = await Application.create({
      projectId,
      applicantId: req.user.id,
      ownerId: project.ownerId,
      message,
    });

    res.status(201).json({
      success: true,
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to apply to project",
    });
  }
};

module.exports = { applyToProject };
