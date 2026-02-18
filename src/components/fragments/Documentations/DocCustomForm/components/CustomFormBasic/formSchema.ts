import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  isAgree: z.boolean().refine((v) => v === true, {
    message: "Harus setuju terms",
  }),
  isActive: z.boolean().refine(v => v === true, {
    message: "Harus aktif",
  }),
  description: z.string().min(10, "Deskripsi minimal 10 karakter").max(200, "Deskripsi maksimal 200 karakter").optional(),
  gender: z.string().min(1, "Gender wajib dipilih"),
  role: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .nullable()
    .refine((v) => v !== null && v.label && v.value, {
      message: "Role wajib dipilih",
    })
});

export type FormSchemaType = z.infer<typeof formSchema>;
