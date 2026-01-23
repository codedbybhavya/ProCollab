const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { sendMessage, fetchMessages } = require("../controllers/messageController");
const { checkChatAccess } = require("../middleware/chatAuthMiddleware");

router.post("/", protect, checkChatAccess, sendMessage);
router.get("/:chatId", protect, checkChatAccess, fetchMessages);

module.exports = router;
