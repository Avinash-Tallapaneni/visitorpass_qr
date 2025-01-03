import { generateReactNativeHelpers } from "@uploadthing/expo";
import type { OurFileRouter } from "../../server/src/routes/bak.uploadthing";

export const { useImageUploader, useDocumentUploader } =
  generateReactNativeHelpers<OurFileRouter>({
    url: process.env.EXPO_PUBLIC_BACKEND_URL || "http://localhost:8000",
  });
