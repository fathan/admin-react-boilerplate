import { z } from "zod";

export const formSchema = z.object({
  framework: z.string().min(1, "Framework wajib dipilih"),
  gender: z.string().min(1, "Gender wajib dipilih"),
  agree: z.boolean().refine((v) => v === true, {
    message: "Harus setuju terms",
  }),
});

export type FormSchemaType = z.infer<typeof formSchema>;
