import { IStatus } from "@/entities/polls";

export interface IRadioButtons {
  id: string;
  label: string;
  value: IStatus;
}

export const radioButtons: IRadioButtons[] = [
  {
    id: "1",
    label: "Не анонимно",
    value: "deanon",
  },
  {
    id: "2",
    label: "Анонимно",
    value: "anon",
  },
];
