import { z } from "zod";

export const PersonalInfoSchema = z.object({
  homePhone: z
    .string()
    .refine((val) => /^\d{3} \d{3} \d{2} \d{2}$/.test(val), {
      message: "Неверный формат номера",
    })
    .transform((phone) => {
      const cleanedPhone = phone.replace(/\s+/g, "");
      return `+7${cleanedPhone}`;
    }),
  workPhone: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{3} \d{3} \d{2} \d{2}$/.test(val), {
      message: "Неверный формат номера",
    })
    .transform((phone) => {
      if (!phone) return phone;
      const cleanedPhone = phone.replace(/\s+/g, "");
      return `+7${cleanedPhone}`;
    }),
  internalPhone: z
    .string()
    .optional()
    .refine(
      (val) => {
        return !val || /^\d{4}$/.test(val);
      },
      {
        message: "Номер телефона должен состоять из 4-х цифр",
      },
    ),
  telegram: z.union([
    z
      .string()
      .min(5, { message: "Логин должен содержать минимум 5 символов" })
      .max(32, { message: "Логин должен содержать максимум 32 символа" })
      .regex(/^[a-zA-Z_]/, {
        message: "Логин должен начинаться с буквы или символа подчеркивания",
      })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message:
          "Логин может содержать только буквы, цифры и символы подчеркивания",
      }),
    z.literal(""),
  ]),
});

export type IPersonalInfoSchemaInitialType = z.input<typeof PersonalInfoSchema>;
export type IPersonalInfoSchemaType = z.infer<typeof PersonalInfoSchema>;
