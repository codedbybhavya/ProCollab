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

// @desc    Get applications for projects owned by logged-in user
// @route   GET /api/applications/my-projects
// @access  Private (Owner)
const getApplicationsForOwner = async (req, res) => {
    try {
        const applications = await Application.find({
            ownerId: req.user.id,
        })
            .populate("projectId", "title category")
            .populate("applicantId", "name email skills");

        res.status(200).json({
            success: true,
            applications,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch applications",
        });
    }
};

// @desc    Update application status (accept/reject)
// @route   PATCH /api/applications/:id/status
// @access  Private (Owner)
const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!["accepted", "rejected"].includes(status)) {
            return res.status(400).json({
                message: "Invalid status value",
            });
        }

        const application = await Application.findById(applicationId);

        if (!application) {
            return res.status(404).json({
                message: "Application not found",
            });
        }

        // 🔐 Ensure only owner can update
        if (application.ownerId.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Not authorized to update this application",
            });
        }

        application.status = status;
        await application.save();

        res.status(200).json({
            success: true,
            application,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update application status",
        });
    }
};

module.exports = { applyToProject, getApplicationsForOwner, updateApplicationStatus };