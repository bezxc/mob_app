import { LinearGradientPoint } from "expo-linear-gradient";
import { ExpoRouter } from "expo-router";

export type IRoutePath = ExpoRouter.__routes["href"];

export interface IGetAllQueryParams {
  page?: number;
  size?: number;
  order_by?: string;
}

export interface JwtDecode {
  kan_uid: string;
  employee_guid: string;
  full_name: string;
  login_ad: string;
}

export interface IUserCredentials {
  login: string;
  refreshToken: string;
  accessToken: string;
  infoToken: string;
  isAuthenticated: boolean;
  fullName: string;
  kanUid: string;
  employeeGuid: string;
}

export interface ITagItem {
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  author_kan_uid: number;
  id: number;
}

export interface IGetAllApiResponse<T> {
  items: T[];
  page: number;
  size: number;
  pages: number;
  total: number;
}

export type PreparePostComment = Omit<
  IPostComment,
  "id" | "created_at" | "updated_at"
>;

export interface IPostComment {
  created_at: string;
  updated_at: string;
  body: string;
  post_id: number;
  parent_comment_id: number | null;
  author_kan_uid: number;
  id: number;
}

export interface IPostItem {
  created_at: string;
  updated_at: string;
  id: string;
  title: string;
  body: string;
  author_kan_uid: number;
  image_key: string;
  thumbnail_key: string | null;
  publication_date: string;
  banner_key: string;
  tag: Pick<ITagItem, "id" | "name">;
  is_pinned: boolean;
  is_draft: boolean;
  mobile_views: number;
  web_views: number;
  docs: IPostDocument[];
  comments: IPostComment[];
}

export interface IPostDocument {
  post_id: number;
  doc_key: string;
}

export interface IHomeScreenPagesItem {
  linearColors: string[];
  start: LinearGradientPoint;
  end: LinearGradientPoint;
  icon: React.JSX.Element;
  title: string;
  url: string;
}

export interface IRadioItem {
  value: string;
  label: string;
  [key: string]: any;
}

export interface ISelectItem {
  label: string;
  value: string | boolean;
}

export interface INewsTag {
  id: number;
  name: string;
}

export interface INewsCard {
  created_at: string;
  updated_at: string;
  id: number;
  title: string;
  body: string;
  author_kan_uid: number;
  image_key: string;
  thumbnail_key: string;
  publication_date: string;
  banner_key: string;
  tag: INewsTag;
  is_pinned: boolean;
  is_draft: boolean;
}

export interface INewsItem {
  id: number;
  title: string;
  tag_name: string;
  is_pinned: boolean;
  image_key: string;
  created_at: string;
}

export interface IDocument {
  id: number;
  name: string;
  doc_key: string;
}

export interface IComment {
  id: number;
  parent_comment_id: number | null;
  author_kan_uid: number;
  body: string;
  created_at: string;
}

export interface INewsDetail {
  id: number;
  tag_name: string;
  title: string;
  body: string;
  is_draft: boolean;
  is_pinned: boolean;
  image_key: string;
  banner_key: string;
  docs: IDocument[];
  comments: IComment[];
  author_kan_uid: number;
  mobile_views: number;
  web_views: number;
  publication_date: string;
  created_at: string;
}

export interface IUser {
  kan_uid: number;
  full_name: string;
  employee_guid: string;
  working_rate: string;
  date_of_admission: string;
  date_of_dismissal: string | null;
  position: IUserPosition;
  division: IUserDivision;
  type_of_employment: string;
  type_of_event: string;
  date_of_birth: string;
  gender: string;
  work_phone: string;
  mobile_phone: string;
  email: string;
  decree: boolean;
  discount_category: number;
  date_of_experience: string;
  rest_of_vacation: string;
  planned_vacation: string;
}

export interface IUserPosition {
  guid: string;
  name: string;
}

export interface IUserDivision {
  guid: string;
  name: string;
  direction: string;
  dealership: string;
  organization: IUserDevisionOrganization;
}

export interface IUserDevisionOrganization {
  guid: string;
  name: string;
  inn: string;
  kpp: string;
}

export interface IEducation {
  guid: string;
  kan_uid: number;
  type_of_education: string;
  specialization: string;
  educational_institution: string;
  year_of_graduation: number;
  specialty_code: string;
}

export interface IPollsItem {
  id: number;
  title: string;
  is_active: boolean;
  created_at: string;
  date_start: string | null;
  date_end: string | null;
  total_questions: number;
}

export type IGetAllPostsApiResponse = IGetAllApiResponse<IPostItem>;
export type IGetAllPollsApiResponse = IGetAllApiResponse<IPollsItem>;

export type ISetStateFn<T> = React.Dispatch<React.SetStateAction<T>>;
