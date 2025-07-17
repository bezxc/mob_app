import {
  AppealsCenter,
  Documents,
  Gallery,
  Journal,
  Library,
  Polls,
  Privileges,
  Vacancy,
} from "@/shared/assets/icons";
import { IRoutePath } from "@/shared/types/types";

export interface IHomeNavigationCard {
  icon: React.JSX.Element;
  title: string;
  url: IRoutePath;
  backgroundColor: string;
  disabled?: boolean;
  linking?: boolean;
}

type IHomeNavigationCardTuple = [IHomeNavigationCard, IHomeNavigationCard];
type IHomeNavigationCards = IHomeNavigationCardTuple[];

export const homeNavigationCards: IHomeNavigationCards = [
  [
    {
      icon: <Vacancy />,
      title: "Вакансии",
      backgroundColor: "#E7F5FD",
      url: "/(withoutTabs)/vacancies",
    },
    {
      icon: <Journal />,
      title: "Журнал",
      backgroundColor: "#E9E9E9",
      url: "https://kanavto.ru/journal/",
      linking: true,
    },
  ],
  [
    {
      icon: <AppealsCenter />,
      title: "Обращения",
      backgroundColor: "#EEF6EA",
      url: "/(withoutTabs)/issuesPage",
    },
    {
      icon: <Library />,
      title: "Библиотека",
      backgroundColor: "#EAF6F3",
      url: "http://library.kanavto.ru/",
      linking: true,
    },
  ],
  [
    {
      icon: <Polls />,
      title: "Опросы",
      backgroundColor: "#E6DEF9",
      url: "/(withoutTabs)/polls",
    },
    {
      icon: <Privileges />,
      title: "Привилегии",
      backgroundColor: "#FEEDE0",
      url: "/(withoutTabs)/privileges",
    },
  ],
  [
    {
      icon: <Gallery />,
      title: "Фотогалерея",
      backgroundColor: "#FCF9E0",
      url: "/(withoutTabs)/galleryDevelopStage",
    },
    {
      icon: <Documents />,
      title: "Документы",
      backgroundColor: "#DEE6F9",
      url: "/(withoutTabs)/documentsDevelopStage",
    },
  ],
];
