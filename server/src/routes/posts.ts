import { Router } from "express";
import validateJWTToken from "../middlewares/validateJWTToken.js";
import { getAllUserPosts, likePost } from "../controllers/postsController.js";
import { unlikePost } from "../controllers/postsController.js";

const postsRouter = Router();

postsRouter.use(validateJWTToken);

postsRouter.get("/user/all", getAllUserPosts);
postsRouter.delete("/:postId/unlike", unlikePost);
postsRouter.post("/:postId/like", likePost);

export default postsRouter;
