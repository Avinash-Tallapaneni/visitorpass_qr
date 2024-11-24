import { Request, Response, Router } from "express";
import { uploadDocument, uploadSelfie } from "../controller/fileController";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = Router();

router.post("/selfie", async (req: Request, res: Response) => {
  await uploadSelfie(req, res);
});

router.post(
  "/document",
  upload.single("document"),
  async (req: Request, res: Response) => {
    console.log("Uploading document...", req.body);
    try {
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      console.log("Uploaded Document File:", JSON.stringify(req.file));

      // Call the document upload handler
      await uploadDocument(req, res);
    } catch (error) {
      console.error("Error uploading document:", error);
      res.status(500).json({ error: "Failed to upload document" });
      return;
    }
  }
);
export default router;
