import { Router, Request, Response } from "express";
import { generateQR } from "../controller/qrCodeGenerator";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  console.log("req.body", req.body);
  await generateQR(req.body.visitorId);
});

export default router;
