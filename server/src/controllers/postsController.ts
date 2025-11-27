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
        creator: true,
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

const unlikePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const user = req.user;

  try {
    if (!user || !postId) throw new Error("Missing user or postId.");

    await prisma.like.delete({
      where: {
        postId_userId: {
          postId: parseInt(postId),
          userId: user.id,
        },
      },
    });

    res.sendStatus(204);
  } catch (err) {
    handleError(err, res);
  }
};

const likePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const user = req.user;

  try {
    if (!user || !postId) throw new Error("Missing user or postId.");

    await prisma.like.create({
      data: {
        postId: parseInt(postId),
        userId: user.id,
      },
    });

    res.sendStatus(201);
  } catch (err) {
    handleError(err, res);
  }
};

export { getAllUserPosts, unlikePost, likePost };
