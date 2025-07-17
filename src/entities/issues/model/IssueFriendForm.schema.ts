import { z } from "zod";
import { IssueFileSchema } from "./IssueFilesSchema";

export const IssueFriendFormSchema = z
  .object({
    applicant_full_name: z.string().min(3, { message: "Введите ФИО" }).trim(),
    applicant_phone: z
      .string()
      .refine((val) => /^\d{3} \d{3} \d{2} \d{2}$/.test(val), {
        message: "Неверный формат номера",
      }),
    applicant_vacancy: z
      .string()
      .min(3, { message: "Введите название вакансии" })
      .trim(),

    files: IssueFileSchema,
  })

  .transform((data) => {
    if (data.applicant_phone) {
      data.applicant_phone = `+7${data.applicant_phone.replace(/\s+/g, "")}`;
    }

    return data;
  });

export type IIssueFriendFormSchemaInitialType = z.input<
  typeof IssueFriendFormSchema
>;
export type IIssueFriendFormSchemaType = z.output<typeof IssueFriendFormSchema>;
