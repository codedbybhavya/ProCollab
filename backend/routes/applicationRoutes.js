const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { applyToProject, getApplicationsForOwner, updateApplicationStatus } = require("../controllers/applicationController");

// Applicant
router.post("/", protect, applyToProject);

// Owner
router.get("/my-projects", protect, getApplicationsForOwner);
router.patch("/:id/status", protect, updateApplicationStatus);

module.exports = router;
