export {
  createAnswerForPollQuestion,
  createCommentForPollQuestion,
  deleteCommentForPollQuestion,
  getPollAnswers,
  getPollChoices,
  getPollComment,
  getPollQuestions,
  getPollsList,
  updateAnswerForPollQuestion,
  updateCommentForPollQuestion,
} from "./api/pollsApi";
export {
  addAnswer,
  clearAnswers,
  $quiz as quiz,
  reset,
  setCurrentAnswer,
  setCurrentQuestion,
  setStage,
  setStatus,
} from "./model/quiz";
export { IExampleQuestion } from "./model/types";
export {
  type IAnswer,
  type IPollAnswer,
  type IPollQuestion,
  type IPollQuestions,
  type IPollsChoice,
  type IPollsGetCommentById,
  type IPollsResponseAnswer,
  type IPollsUpdateAnswerBody,
  type IPollsUpdateCommentBody,
  type IStatus,
} from "./model/types";
export { IPollsOwnVariant, PollsOwnVariant } from "./ui/PollsOwnVariant";
export { PollsRadioGroupWithOwnVariant } from "./ui/PollsRadioGroup";
