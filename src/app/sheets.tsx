import { registerSheet, SheetDefinition } from "react-native-actions-sheet";
import { FilterSheet as EdoFilterSheet } from "@/entities/edo";
import { CategorySelectSheet } from "@/entities/issues";
import { FilterSheet } from "@/entities/posts";
import { BottomSheetCommentActions } from "@/features/BottomSheetCommentActions";
import { BottomSheetDeleteComment } from "@/features/BottomSheetDeleteComment";
import { PersonalImageBottomSheet } from "@/features/PersonalImageBottomSheet";

registerSheet("comment-actions", BottomSheetCommentActions);
registerSheet("delete-comment", BottomSheetDeleteComment);
registerSheet("posts-filter", FilterSheet);
registerSheet("issues-category", CategorySelectSheet);
registerSheet("profile-image", PersonalImageBottomSheet);
registerSheet("reg-numbers", EdoFilterSheet);

declare module "react-native-actions-sheet" {
  interface Sheets {
    "comment-actions": SheetDefinition<{
      payload: {
        commentBody: string;
      };
    }>;
    "delete-comment": SheetDefinition<{
      payload: {
        id: number | null;
      };
    }>;
    "issues-category": SheetDefinition<{
      payload: {
        onChange: (value: string) => void;
      };
    }>;
  }
}
