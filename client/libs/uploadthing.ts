import { UploadRouter } from "@/app/api/uploadthing+api";
import { generateReactNativeHelpers } from "@uploadthing/expo";

export const { useImageUploader, useDocumentUploader } =
  generateReactNativeHelpers<UploadRouter>();
