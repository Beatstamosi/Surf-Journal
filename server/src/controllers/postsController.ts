import { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import handleError from "../services/handleError.js";

const getAllUserPosts = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  try {
    if (!userId) throw new Error("Missing user Id.");
    const posts = await prisma.post.findMany({
      where: {
        creatorId: userId,
      },
      include: {
        session: {
          include: {
            forecast: true,
            board: true,
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
        comments: {
          include: {
            author: true,
          },
        },
      },
    });

    res.status(201).json({ posts });
  } catch (err) {
    handleError(err, res);
  }
};

export { getAllUserPosts };
