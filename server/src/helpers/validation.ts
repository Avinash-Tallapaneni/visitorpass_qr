import { z } from "zod";

export const visitorRegistrationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  visitingPersonName: z.string().min(1, "Visiting person name is required"),
});

export const selfieSchema = z.object({
  selfie: z.string().min(1, "Selfie is required"),
  id: z.string().min(1, "Visitor ID is required"),
});
export const documentSchema = z.object({
  document: z.string().min(1, "Document is required"),
  id: z.string().min(1, "Visitor ID is required"),
});

export type VisitorRegistrationType = z.infer<typeof visitorRegistrationSchema>;
export type selfieType = z.infer<typeof selfieSchema>;
export type documentType = z.infer<typeof documentSchema>;

export const handleValidation = (data: unknown) => {
  const result = visitorRegistrationSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data, errors: null };
  } else {
    const errors: Partial<Record<keyof VisitorRegistrationType, string>> = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof VisitorRegistrationType;
      errors[field] = issue.message;
    });
    return { success: false, data: null, errors };
  }
};

export const handleSelfieValidation = (data: unknown) => {
  const result = selfieSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data, errors: null };
  } else {
    const errors: Partial<Record<keyof selfieType, string>> = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof selfieType;
      errors[field] = issue.message;
    });
    return { success: false, data: null, errors };
  }
};

export const handleDocumentValidation = (data: unknown) => {
  const result = documentSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data, errors: null };
  } else {
    const errors: Partial<Record<keyof documentType, string>> = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof documentType;
      errors[field] = issue.message;
    });
    return { success: false, data: null, errors };
  }
};

export const isBase64 = (str: string): boolean => {
  const base64Regex =
    /^(data:image\/(png|jpeg|jpg|gif|webp);base64,)?[A-Za-z0-9+/]+={0,2}$/;
  return base64Regex.test(str);
};
