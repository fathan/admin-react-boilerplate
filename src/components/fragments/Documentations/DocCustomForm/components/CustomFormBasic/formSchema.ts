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
    }),
  birthdate: z.date().refine(date => date <= new Date(), {
    message: "Tanggal lahir tidak boleh di masa depan",
  }),
  user: z
    .array(
      z.object({
        label: z.string(),
        value: z.union([z.string(), z.number()]), // <-- allow string atau number
      })
    )
    .nullable()
    .refine((v) => !v || v.length > 0, {
      message: "User harus dipilih jika diisi",
    }),
  age: z.number().min(0, "Umur tidak boleh negatif").max(120, "Umur tidak boleh lebih dari 120").optional(),
  avatar: z
    .array(z.instanceof(File))
    .nonempty({ message: "Avatar wajib diupload" })
    .optional(),
});

export type FormSchemaType = z.infer<typeof formSchema>;
