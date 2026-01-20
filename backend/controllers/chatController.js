const Chat = require("../models/Chat");

// @desc  Create or fetch one-to-one chat
// @route POST /api/chats
// @access Private
const accessChat = async (req, res) => {
  const { userId } = req.body;

  // 1️⃣ Validate input
  if (!userId) {
    return res.status(400).json({ message: "UserId is required" });
  }

  // 2️⃣ Prevent self-chat
  if (userId === req.user.id) {
    return res
      .status(400)
      .json({ message: "You cannot create a chat with yourself" });
  }

  // 3️⃣ Check if chat already exists
  let chat = await Chat.findOne({
    isGroupChat: false,
    users: { $all: [req.user.id, userId] },
    $expr: { $eq: [{ $size: "$users" }, 2] }, // ensures exactly 2 users
  }).populate("users", "-password");

  if (chat) {
    return res.json(chat);
  }

  // 4️⃣ Create new chat
  const newChat = await Chat.create({
    chatName: "Personal Chat",
    isGroupChat: false,
    users: [req.user.id, userId],
  });

  const fullChat = await Chat.findById(newChat._id).populate(
    "users",
    "-password"
  );

  res.status(201).json(fullChat);
};

module.exports = { accessChat };
