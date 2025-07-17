import { z } from "zod";

export const UserSchema = z.object({
  kan_uid: z.number(),
  full_name: z.string(),
  employee_guid: z.string(),
  working_rate: z.string(),
  date_of_admission: z.string(),
  date_of_dismissal: z.string().nullable(),
  type_of_employment: z.string(),
  type_of_event: z.string(),
  position_group: z.string(),
  date_of_birth: z.string(),
  gender: z.string(),
  email: z.string().email(),
  decree: z.boolean(),
  discount_category: z.number(),
  date_of_experience: z.string(),
  rest_of_vacation: z.string(),
  planned_vacation: z.number(),
  login_ad: z.string(),
  work_phone: z.string(),
  home_phone: z.string(),
  internal_phone: z.string(),
  telegram: z.string(),
  position: z.object({
    guid: z.string(),
    name: z.string(),
  }),
  division: z.object({
    guid: z.string(),
    name: z.string(),
    direction: z.string(),
    dealership: z.string(),
    organization: z.object({
      guid: z.string(),
      name: z.string(),
      inn: z.string(),
      kpp: z.string(),
    }),
    management: z.object({
      guid: z.string(),
      name: z.string(),
      department: z.object({
        guid: z.string(),
        name: z.string(),
      }),
    }),
  }),
});

const PrivilegePartnerSchema = z.object({
  id: z.number(),
  partner_name: z.string(),
  description: z.string(),
  bonus_description: z.string(),
  image_key: z.string(),
});

const PrivilegeCategorySchema = z.object({
  title: z.string(),
  image_name: z.string(),
  first_display: z.string().nullable(),
  second_display: z.string().nullable(),
  third_display: z.string().nullable(),
  fourth_display: z.string().nullable(),
  id: z.number(),
  privilege_partners: z.array(PrivilegePartnerSchema).optional(),
});

export const partnerOfferSchema = z.object({
  updated_at: z.string(),
  created_at: z.string(),
  id: z.number(),
  title: z.string(),
  user_kan_uid: z.number(),
  employee_category: z.number(),
  description: z.string(),
  offer_discount: z.string().nullable(),
  start_date: z.string().nullable(),
  end_date: z.string().nullable(),
  issue_center_category_id: z.number().nullable(),
  image_key: z.string().nullable(),
  privilege_partner: PrivilegePartnerSchema.pick({
    id: true,
    partner_name: true,
  }),
  files: z.array(
    z.object({
      partner_offer_id: z.number(),
      file_key: z.string(),
    })
  ),
});

export const PartnerOfferArraySchema = z.array(partnerOfferSchema);

export const partnerCardSchema = z.object({
  id: z.number(),
  partner_name: z.string(),
  description: z.string().nullable(),
  bonus_description: z.string().nullable(),
  image_key: z.string(),
  privilege_category: PrivilegeCategorySchema.pick({
    id: true,
    title: true,
  }),
  partner_offers: PartnerOfferArraySchema,
});

export const PrivilegeCategoriesSchema = z.array(PrivilegeCategorySchema);

export type PrivilegePartnerOffersSchemaType = z.infer<
  typeof PartnerOfferArraySchema
>;

export type PartnerOfferSchemaType = z.infer<typeof partnerOfferSchema>;

export type UserSchemaType = z.infer<typeof UserSchema>;
export type PrivilegePartnerSchemaType = z.infer<typeof PrivilegePartnerSchema>;
export type PrivilegeCategorySchemaType = z.infer<
  typeof PrivilegeCategorySchema
>;
