const Message = require("../models/Message");
const Chat = require("../models/Chat");

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res.status(400).json({ message: "Content and chatId are required" });
  }

  const newMessage = {
    sender: req.user.id,
    content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);

    // populate sender and chat
    message = await message.populate("sender", "name email");
    message = await message.populate("chat");
    message = await Message.populate(message, {
      path: "chat.users",
      select: "name email",
    });

    // update latest message in chat
    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message._id,
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Failed to send message" });
  }
};

// @desc    Get all messages of a chat
// @route   GET /api/messages/:chatId
// @access  Private
const fetchMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      chat: req.params.chatId,
    })
      .populate("sender", "name email")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

module.exports = { sendMessage, fetchMessages };