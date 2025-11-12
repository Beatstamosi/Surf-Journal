import { Router } from "express";
import validateJWTToken from "../middlewares/validateJWTToken.js";
import { addSession, getAllUserSessions } from "../controllers/sessionController.js";

const sessionRouter = Router();

sessionRouter.use(validateJWTToken);

sessionRouter.post("/", addSession);
sessionRouter.get("/user/all", getAllUserSessions);

export default sessionRouter;
