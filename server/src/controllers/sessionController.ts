import { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import handleError from "../services/handleError.js";

const addSession = async (req: Request, res: Response) => {
//   const {
//     spotName,
//     startTimeSession,
//     forecast,
//     shareInFeed,
//     sessionMatchForecast,
//     description,
//     boardId,
//   } = req.body;
//   const user = req.user;

//   // create forecast

//   // create session
//   try {
//     await prisma.session.create({ data: {

//     } });
//   } catch (err) {
//     handleError(err, res);
//   }
};

export { addSession };
