import dayjs from "dayjs";
import { z } from "zod";

export const RelativeFormSchema = z.object({
  fullName: z.string().trim().min(8),
  degree: z.object({
    label: z.string(),
    value: z.enum(["Son", "Daughter", "Mother", "Father", "Husband", "Wife"]),
  }),
  birthDay: z
    .date()
    .refine(
      (date) =>
        date === null ||
        (dayjs(date).isBefore(dayjs()) &&
          dayjs(date).isAfter(dayjs().subtract(120, "year"))),
      {
        message: "Дата должна быть не больше текущей и не старше 120 лет.",
      }
    ),
});

export type IRelativeInitialFromSchemaType = z.input<typeof RelativeFormSchema>;
export type IRelativeFormSchemaType = z.output<typeof RelativeFormSchema>;

export type IRelativeDegreeType = IRelativeFormSchemaType["degree"];
