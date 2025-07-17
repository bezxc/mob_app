import AsyncStorage from "@react-native-async-storage/async-storage";
import { createEffect, createEvent, createStore, sample } from "effector";
import { IAnswer, ICurrentAnswer, IQuizInitialState, IStatus } from "./types";

const initialState: IQuizInitialState = {
  stage: 0,
  currentQuestion: 0,
  currentAnswer: null,
  answers: [],
  status: "deanon",
};

export const init = createEvent();
export const reset = createEvent();

export const setStage = createEvent<number>();
export const setCurrentQuestion = createEvent<number>();
export const setStatus = createEvent<IStatus>();
export const setCurrentAnswer = createEvent<ICurrentAnswer | null>();

export const addAnswer = createEvent<IAnswer>();
export const clearAnswers = createEvent();

export const fetchQuizFromAsyncStorageFx = createEffect(async () => {
  const stageValue = await AsyncStorage.getItem("stage");
  const currentQuestionValue = await AsyncStorage.getItem("currentQuestion");
  const answersValue = await AsyncStorage.getItem("answers");
  const statusValue = await AsyncStorage.getItem("status");
  const stage = stageValue ? Number.parseInt(stageValue, 10) : 0;
  const currentQuestion = currentQuestionValue
    ? Number.parseInt(currentQuestionValue, 10)
    : 0;
  const answers = answersValue ? JSON.parse(answersValue) : [];
  const currentAnswer = null;
  const status = statusValue ? statusValue : "deanon";

  return { stage, answers, currentQuestion, status, currentAnswer };
});

const updateQuizStageInAsyncStorageFx = createEffect(
  async ({
    stage,
    answers,
    currentQuestion,
    status,
    currentAnswer,
  }: IQuizInitialState) => {
    try {
      await AsyncStorage.multiSet([
        ["stage", `${stage}`],
        ["currentQuestion", `${currentQuestion}`],
        ["status", status],
        ["answers", JSON.stringify(answers)],
        ["currentAnswer", currentAnswer ? JSON.stringify(currentAnswer) : ""],
      ]);
    } catch (error) {
      console.error(error);
    }
  },
);

export const $quiz = createStore<IQuizInitialState>(initialState);

sample({
  clock: fetchQuizFromAsyncStorageFx.doneData,
  target: init,
});

$quiz
  .on(init, (state, value) => value)
  .on(setStage, (state, stage) => ({ ...state, stage }))
  .on(setStatus, (state, status) => ({ ...state, status }))
  .on(setCurrentAnswer, (state, currentAnswer) => ({ ...state, currentAnswer }))
  .on(setCurrentQuestion, (state, currentQuestion) => ({
    ...state,
    currentQuestion,
  }))
  .on(addAnswer, (state, answer) => ({
    ...state,
    answers: [...state.answers, answer],
  }))
  .on(clearAnswers, (state) => ({
    ...state,
    answers: [],
  }))
  .reset(reset);

sample({
  clock: $quiz,
  target: updateQuizStageInAsyncStorageFx,
});

fetchQuizFromAsyncStorageFx();
