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

export type visitorRegistrationType = z.infer<typeof visitorRegistrationSchema>;
