import { z } from "zod";

export const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Format email not valid"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export type FormSchemaType = z.infer<typeof formSchema>;
