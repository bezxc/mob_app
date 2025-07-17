import {
  BookBookmarkIcon,
  BookIcon,
  BriefCaseIcon,
  HandbagIcon,
  MediaIcon,
  NoteIcon,
  ThumbsUpIcon,
} from "@/shared/assets/icons";
import { IHomeScreenPagesItem } from "@/shared/types/types";

export const bottomSheetScreens: IHomeScreenPagesItem[] = [
  {
    start: { x: 0.1, y: 0.4 },
    end: { x: 0.8, y: 0.9 },
    linearColors: ["#3BC962", "#52E37A", "#30B454"],
    icon: <BookIcon width={28} height={28} />,
    title: "Журнал",
    url: "/",
  },
  {
    start: [1, 1],
    end: [1, 0],
    linearColors: ["#00E9BF", "#41A4FF"],
    icon: <MediaIcon width={28} height={28} />,
    title: "Медиа",
    url: "/",
  },
  {
    start: [1, 1],
    end: [1, 0],
    linearColors: ["#FB8062", "#9441FF"],
    icon: <HandbagIcon width={28} height={28} />,
    title: "Привилегия",
    url: "/",
  },
  {
    start: [1, 1],
    end: [1, 0],
    linearColors: ["#25A4EA", "#047FC3", "#31ABEE"],
    icon: <BookBookmarkIcon width={28} height={28} />,
    title: "Library",
    url: "/",
  },
  {
    start: [1, 0],
    end: [0, 1],
    linearColors: ["#d13ab9", "#f860df", "#be29a6"],
    icon: <ThumbsUpIcon width={28} height={28} />,
    title: "Опросы",
    url: "/(withoutTabs)/polls",
  },
  {
    start: { x: 1, y: 0 },
    end: { x: 0, y: 1 },
    linearColors: ["#cfab2a", "#d7b849", "#c7a62f"],
    icon: <BriefCaseIcon width={28} height={28} />,
    title: "Вакансии",
    url: "/",
  },
  {
    start: [0, 0],
    end: [1, 1],
    linearColors: ["#6a935c", "#97be8a", "#709364"],
    icon: <NoteIcon width={28} height={28} />,
    title: "Документы",
    url: "/",
  },
];
