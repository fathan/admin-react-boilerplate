import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Nama is required"),
  email: z.string().min(1, "Email is required").email("Format email not valid"),
  password: z.string().min(1, "Password is required"),
  role: z.string().min(1, "Role is required"),
});

export type FormSchemaType = z.infer<typeof formSchema>;