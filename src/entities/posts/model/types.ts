export interface ICommentFormState {
  state?: "reply" | "edit" | "";
  user?: {
    fullname: string;
    author_kan_uid: number | null;
    login: string;
  };
  parent_comment_id?: number | null;
  comment_id?: number;
  commentBody?: string;
}
