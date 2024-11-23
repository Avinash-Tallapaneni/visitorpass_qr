import { z } from "zod";

export const visitorRegistrationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  visitingPersonName: z.string().min(1, "Visiting person name is required"),
});

export type VisitorRegistrationType = z.infer<typeof visitorRegistrationSchema>;

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
