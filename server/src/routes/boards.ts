import { Router } from "express";
import validateJWTToken from "../middlewares/validateJWTToken.js";
import {
  getBoardsOfUser,
  addBoardToUserQuiver,
} from "../controllers/boardsController.js";

const boardsRouter = Router();
boardsRouter.use(validateJWTToken);

boardsRouter.get("/user", getBoardsOfUser);
boardsRouter.post("/user", addBoardToUserQuiver);

export default boardsRouter;
