const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { createProject } = require("../controllers/projectController");

router.post("/", protect, createProject);

module.exports = router;
