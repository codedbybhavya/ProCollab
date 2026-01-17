const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { applyToProject } = require("../controllers/applicationController");

router.post("/", protect, applyToProject);

module.exports = router;
