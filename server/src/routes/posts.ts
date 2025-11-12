import { Router } from "express";
import validateJWTToken from "../middlewares/validateJWTToken.js";
import { getAllUserPosts } from "../controllers/postsController.js";

const postsRouter = Router();

postsRouter.use(validateJWTToken);

postsRouter.get("/user/all", getAllUserPosts);

export default postsRouter;
