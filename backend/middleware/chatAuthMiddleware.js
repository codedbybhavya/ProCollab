const Chat = require("../models/Chat");

const checkChatAccess = async (req, res, next) => {
  try {
    const chatId = req.body.chatId || req.params.chatId;

    if (!chatId) {
      return res.status(400).json({ message: "Chat ID is required" });
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    // Check if logged-in user is part of chat
    const isParticipant = chat.users.some(
      (user) => user.toString() === req.user.id
    );

    if (!isParticipant) {
      return res.status(403).json({
        message: "You are not authorized to access this chat",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Chat authorization failed" });
  }
};

module.exports = { checkChatAccess };
