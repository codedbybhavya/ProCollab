const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { createProject, getProjects } = require("../controllers/projectController");

router.get("/", getProjects);
router.post("/", protect, createProject);

module.exports = router;
