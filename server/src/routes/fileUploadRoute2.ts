import { Request, Response, Router } from "express";
import { uploadDocument, uploadSelfie } from "../controller/fileController";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  await uploadSelfie(req, res);
});

router.post("/document", async (req: Request, res: Response) => {
  await uploadDocument(req, res);
});

export default router;
