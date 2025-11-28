import { Router } from "express";
import validateJWTToken from "../middlewares/validateJWTToken.js";
import {
  deleteUser,
  updateUser,
  getPublicUserProfile,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.use(validateJWTToken);

userRouter.put("/update", updateUser);
userRouter.delete("/delete", deleteUser);
userRouter.get("/:profileId/public", getPublicUserProfile);

export default userRouter;
