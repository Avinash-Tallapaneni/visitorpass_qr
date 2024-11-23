  import { z } from "zod";

  export const visitorRegistrationSchema = z.object({
    name: z.string().min(3, "Name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^\d+$/, "Phone number must contain only digits"),
    visitingPersonName: z.string().min(3, "Visiting Person name is required"),
    
  });

  export const selfieSchema = z.object({
    selfie: z.string().min(1, "Selfie is required"),
    id: z.string().min(1, "Visitor ID is required"),
  });
  export const documentSchema = z.object({
    document: z.string().min(1, "Document is required"),
    id: z.string().min(1, "Visitor ID is required"),
  });

  export type visitorRegistrationType = z.infer<typeof visitorRegistrationSchema>;
  export type selfieType = z.infer<typeof selfieSchema>;
  export type documentType = z.infer<typeof documentSchema>;
