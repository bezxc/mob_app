import { IExampleQuestion } from "@/entities/polls";

export const exampleQuestions: IExampleQuestion[] = [
  {
    id: 0,
    type: "radio",
    title: "Что было написано над входом на кухню в доме Пифии?",
    variants: [
      {
        id: "1",
        label: "Memento mori — «Помни о смерти»",
        value: "1",
      },
      {
        id: "2",
        label: "Esse quam videri — «Быть, а не казаться»",
        value: "2",
      },
      {
        id: "3",
        label: "Temet nosce — «Познай себя»",
        value: "3",
      },
      {
        id: "4",
        label:
          "Homo quisque fortūnae faber — «Каждый человек — творец своей судьбы»",
        value: "4",
      },
    ],
  },
  {
    id: 1,
    type: "checkbox",
    title: "Что было написано над входом на кухню в доме Пифии?",
    variants: [
      {
        id: "1",
        label: "Memento mori — «Помни о смерти»",
        value: "1",
      },
      {
        id: "2",
        label: "Esse quam videri — «Быть, а не казаться»",
        value: "2",
      },
      {
        id: "3",
        label: "Temet nosce — «Познай себя»",
        value: "3",
      },
      {
        id: "4",
        label:
          "Homo quisque fortūnae faber — «Каждый человек — творец своей судьбы»",
        value: "4",
      },
    ],
  },
  {
    id: 2,
    type: "rating",
    title: "Сможете узнать известную книгу по первым строчкам?",
    variants: Array.from({ length: 10 }).map((_, index) => ({
      id: String(index + 1),
      label: String(index + 1),
      value: String(index + 1),
    })),
  },
];
