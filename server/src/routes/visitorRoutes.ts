import { Router, Request, Response } from "express";
import { createVisitor } from "../controller/visitorController";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  await createVisitor(req, res);
});

export default router;
