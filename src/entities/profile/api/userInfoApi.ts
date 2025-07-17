import { z } from "zod";
import { api } from "@/shared/api/baseApi";
import { CreateRelativeSchema, RelativeSchema } from "../model/schema";

const USER_INFO_URL = process.env.EXPO_PUBLIC_USER_INFO_API_URL;

export const getRelativesByUserId = ({
  user_kan_uid,
}: {
  user_kan_uid: string;
}) => {
  const params = new URLSearchParams();

  if (user_kan_uid) {
    params.append("user_kan_uid", user_kan_uid);
  }

  return api({
    type: "private",
    method: "GET",
    path: `${USER_INFO_URL}/relatives?${params}`,
    requestSchema: z.void(),
    responseSchema: z.array(RelativeSchema),
  })();
};

export const removeRelative = (id: number) =>
  api({
    type: "private",
    method: "DELETE",
    path: `${USER_INFO_URL}/relatives/${id}`,
    requestSchema: z.void(),
    responseSchema: RelativeSchema,
  })();

export const createRelative = api({
  type: "private",
  method: "POST",
  path: `${USER_INFO_URL}/relatives`,
  requestSchema: CreateRelativeSchema,
  responseSchema: RelativeSchema,
});

export const updateRelative = (id: string) =>
  api({
    type: "private",
    method: "PATCH",
    path: `${USER_INFO_URL}/relatives/${id}`,
    requestSchema: CreateRelativeSchema.partial().omit({ user_kan_uid: true }),
    responseSchema: RelativeSchema,
  });
