const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { createProject, getProjects, getProjectById } = require("../controllers/projectController");

router.get("/", getProjects);
router.post("/", protect, createProject);
router.get("/:id", getProjectById);

module.exports = router;
