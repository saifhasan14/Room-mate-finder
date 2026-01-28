import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chats = await prisma.chat.findMany({
      where: {
        OR: [{ user1Id: tokenUserId }, { user2Id: tokenUserId }],
      },
    });

    for (const chat of chats) {
      const receiverId =
        chat.user1Id === tokenUserId ? chat.user2Id : chat.user1Id;

      const receiver = await prisma.user.findUnique({
        where: {
          id: receiverId,
        },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });
      chat.receiver = receiver;
    }

    res.status(200).json(chats);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chats!" });
  }
};

export const getChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    // Permission check
    const user1 = String(chat.user1Id);
    const user2 = String(chat.user2Id);
    const current = String(tokenUserId);

    if (user1 !== current && user2 !== current) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Mark as seen
    await prisma.chat.update({
      where: {
        id: req.params.id,
      },
      data: {
        seenBy: {
          push: tokenUserId,
        },
      },
    });

    res.status(200).json(chat);
  } catch (err) {
    console.log("GET CHAT ERROR:", err);
    res.status(500).json({ message: "Failed to get chat!" });
  }
};

export const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  const receiverId = req.body.receiverId;

  try {
    const ids = [tokenUserId, receiverId].sort();

    const existingChat = await prisma.chat.findUnique({
      where: {
        user1Id_user2Id: {
          user1Id: ids[0],
          user2Id: ids[1],
        },
      },
    });

    if (existingChat) {
      return res.status(200).json(existingChat);
    }

    const newChat = await prisma.chat.create({
      data: {
        user1Id: ids[0],
        user2Id: ids[1],
        seenBy: [tokenUserId],
      },
    });

    res.status(200).json(newChat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add chat!" });
  }
};

export const readChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await prisma.chat.findUnique({
      where: { id: req.params.id },
    });

    const user1 = String(chat.user1Id);
    const user2 = String(chat.user2Id);
    const current = String(tokenUserId);

    if (user1 !== current && user2 !== current) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedChat = await prisma.chat.update({
      where: { id: req.params.id },
      data: {
        seenBy: {
          set: [tokenUserId],
        },
      },
    });

    res.status(200).json(updatedChat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to read chat!" });
  }
};
