import { Request, Response, Router } from "express";
import { uploadDocument, uploadSelfie } from "../controller/fileController";
import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop();
    cb(null, `${uniquePrefix}.${extension}`);
  },
});

const upload = multer({ storage: storage });

const router = Router();

router.post("/selfie", async (req: Request, res: Response) => {
  await uploadSelfie(req, res);
});

router.post(
  "/document",
  upload.single("document"),
  async (req: Request, res: Response) => {
    if (req.file && req.body.visitorId) {
      const newPath = `uploads/${req.body.visitorId}.${req.file.originalname
        .split(".")
        .pop()}`;
      fs.renameSync(req.file.path, newPath);
      req.file.path = newPath;
    }
    await uploadDocument(req, res);
  }
);
export default router;
