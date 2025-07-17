import dayjs from "dayjs";
import { z } from "zod";

export const CandidatesFormSchema = z.object({
  appliedVacancy: z
    .string({
      required_error: "Поле обязательно для заполнения",
    })
    .min(3),
  fio: z
    .string({
      required_error: "Поле обязательно для заполнения",
    })
    .min(3),
  phone: z
    .string()
    .refine((val) => /^\d{3} \d{3} \d{2} \d{2}$/.test(val), {
      message: "Неверный формат номера",
    })
    .transform((phone) => {
      const cleanedPhone = phone.replace(/\s+/g, "");
      return `+7${cleanedPhone}`;
    }),
  birthday: z
    .date({ required_error: "Выберите дату рождения" })
    .nullable()
    .refine(
      (val) => val && dayjs(val) > dayjs("1930-01-01") && dayjs(val) <= dayjs(),
      {
        message: "Некорректный диапазон",
      },
    )
    .transform((date) => (date ? dayjs(date).format("YYYY-MM-DD") : null)),
  familyStatus: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "Поле обязательно для заполнения",
    }),
});

export type ICandidatesFormSchemaInitialType = z.input<
  typeof CandidatesFormSchema
>;
export type ICandidatesFormSchemaType = z.output<typeof CandidatesFormSchema>;
