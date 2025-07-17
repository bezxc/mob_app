import dayjs from "dayjs";
import { z } from "zod";
import { api } from "@/shared/api/baseApi";
import {
  partnerCardSchema,
  partnerOfferSchema,
  PrivilegeCategoriesSchema,
} from "../model/schema";

const PRIVILEGES_API = process.env.EXPO_PUBLIC_PRIVILEGES_API_URL;

export const getPartnersOfferById = (id: string) =>
  api({
    type: "private",
    method: "GET",
    path: `${PRIVILEGES_API}/privilege-partners/offers/${id}`,
    requestSchema: z.void(),
    responseSchema: partnerOfferSchema,
  })();

export const getPrivilegePartnerWithOffers = (id: string) =>
  api({
    type: "private",
    method: "GET",
    path: `${PRIVILEGES_API}/privilege-partners/${id}/offers`,
    requestSchema: z.void(),
    responseSchema: partnerCardSchema,
  })();

export const getPartnerWithActualOffers = async (id: string) => {
  try {
    const partnerWithOffers = await getPrivilegePartnerWithOffers(id);

    const actualOffers = partnerWithOffers.partner_offers.filter((offer) =>
      offer.end_date ? dayjs(offer.end_date).isAfter(dayjs()) : true
    );

    return { ...partnerWithOffers, partner_offers: actualOffers };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPrivilegesCategories = (id: number) =>
  api({
    type: "private",
    method: "GET",
    path: `${PRIVILEGES_API}/privilege-categories/mobile?employee_category=${id}`,
    requestSchema: z.void(),
    responseSchema: PrivilegeCategoriesSchema,
  })();
