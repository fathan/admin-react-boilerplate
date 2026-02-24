import { z } from "zod";

export const formSchema = z.object({
  name: z.string(),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  agree: z.boolean(),
});

export type FormSchemaType = z.infer<typeof formSchema>;
