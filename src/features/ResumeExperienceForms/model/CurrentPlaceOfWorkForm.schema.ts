import { z } from "zod";

export const CurrentPlaceOfWorkFormSchema = z.object({
  responsibilities: z.string().min(1, "Заполните обязательное поле").trim(),
  progress: z.string().min(1, "Заполните обязательное поле").trim(),
  reason_for_dismissal: z.string().min(1, "Заполните обязательное поле").trim(),
});

export type ICurrentPlaceOfWorkSchemaInitialType = z.input<
  typeof CurrentPlaceOfWorkFormSchema
>;
export type ICurrentPlaceOfWorkSchemaType = z.infer<
  typeof CurrentPlaceOfWorkFormSchema
>;
