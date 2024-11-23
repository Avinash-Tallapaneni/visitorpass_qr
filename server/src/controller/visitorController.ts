import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { db } from "../database";
import { visitors } from "../database/schema";
import {
  handleValidation,
  VisitorRegistrationType,
} from "../helpers/validation";

export const createVisitor = async (req: Request, res: Response) => {
  try {
    const validationResult = handleValidation(req.body);

    if (!validationResult.success) {
      return res.status(400).json({ errors: validationResult.errors });
    }

    const data = validationResult.data as VisitorRegistrationType;

    const visitorData = {
      ...data,
      id: nanoid(21),
    };

    // @ts-ignore - Ignore type error for the returning() method

    const result = await db.insert(visitors).values(visitorData).returning();

    return res
      .status(201)
      .json({ success: "OK", message: "OTP sent successfully", data: result });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return res.status(500).json({ error: errorMessage });
  }
};
