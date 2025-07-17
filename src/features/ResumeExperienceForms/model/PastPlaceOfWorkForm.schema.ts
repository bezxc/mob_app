import dayjs from "dayjs";
import { z } from "zod";

export const PastPlaceOfWorkFormSchema = z
  .object({
    responsibilities: z.string().min(1, "Обязательное поле"),
    progress: z.string().min(1, "Обязательное поле"),
    reason_for_dismissal: z.string().min(1, "Обязательное поле"),
    date_start: z
      .date({ required_error: "Выберите или введите дату " })
      .nullable()
      .refine((val) => val, { message: "Обязательное поле" }),
    date_end: z
      .date({ required_error: "Выберите или введите дату " })
      .nullable()
      .refine((val) => val, { message: "Обязательное поле" }),
    organization_name: z
      .string()
      .min(1, "Обязательное поле")
      .nullable()
      .refine((val) => typeof val === "string"),
    position: z.string().min(1, "Обязательное поле"),
  })
  .refine(
    ({ date_start, date_end }) => dayjs(date_end).isAfter(dayjs(date_start)),
    {
      message: "Дата окончания должна быть позже даты начала",
      path: ["date_end"],
    },
  );

export type IPastPlaceOfWorkSchemaInitialType = z.input<
  typeof PastPlaceOfWorkFormSchema
>;
export type IPastPlaceOfWorkSchemaType = z.infer<
  typeof PastPlaceOfWorkFormSchema
>;
