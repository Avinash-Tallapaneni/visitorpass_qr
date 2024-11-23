import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../database";
import { visitors } from "../database/schema";
import {
  handleSelfieValidation,
  isBase64,
  selfieType,
} from "../helpers/validation";

export const uploadSelfie = async (req: Request, res: Response) => {
  try {
    const validationResult = handleSelfieValidation(req.body);

    if (!validationResult.success) {
      return res.status(400).json({ errors: validationResult.errors });
    }

    const { selfie, id } = validationResult.data as selfieType;

    if (!isBase64(selfie)) {
      return res.status(400).json({ error: "Invalid selfie image format" });
    }
 
    const visitor = await db.select().from(visitors).where(eq(visitors.id, id));

    if (!visitor) {
      return res.status(404).json({ error: "Visitor not found" });
    }
 
    const updatedVisitor = await db
      .update(visitors)
      .set({ avatar: selfie })
      .where(eq(visitors.id, id))
      .returning();

    return res.status(200).json({
      message: "Selfie uploaded successfully",
      data: updatedVisitor,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return res.status(500).json({ error: errorMessage });
  }
};

export const uploadDocument = async (req: Request, res: Response) => {};
