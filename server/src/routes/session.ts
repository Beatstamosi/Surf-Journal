import { Router } from "express";
import validateJWTToken from "../middlewares/validateJWTToken.js";
import {
  addSession,
  getAllUserSessions,
  updateSession,
} from "../controllers/sessionController.js";

const sessionRouter = Router();

sessionRouter.use(validateJWTToken);

sessionRouter.post("/", addSession);
sessionRouter.put("/", updateSession);
sessionRouter.get("/user/all", getAllUserSessions);

export default sessionRouter;
