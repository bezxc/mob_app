import { useQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { router, Stack } from "expo-router";
import { FC, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";
import { NestedHeader } from "@/entities/nested-header";
import {
  getPollAnswers,
  getPollChoices,
  getPollComment,
  IPollQuestions,
  IStatus,
} from "@/entities/polls";
import { $auth } from "@/shared/api/auth.store";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { PollsQuestionWithAnswer } from "./PollsQuestionWithAnswer";
import { PollsQuestionWithoutAnswer } from "./PollsQuestionWithoutAnswer";

interface IPollsQuestionProps {
  questions: IPollQuestions;
  setStage: (value: number) => void;
  status: IStatus;
}

export const PollsQuestion: FC<IPollsQuestionProps> = ({
  questions,
  setStage,
  status,
}) => {
  const [currentQuestionIndx, setCurrentQuestionIndx] = useState(0);
  // Свой ответ
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const { kanUid } = useUnit($auth);

  const {
    data: answers,
    isSuccess: isAnswerSuccess,
    isLoading: isAnswersLoading,
    isError: isAnswersError,
  } = useQuery({
    queryKey: ["poll-answers", String(questions[currentQuestionIndx].id)],
    queryFn: () =>
      getPollAnswers({
        question_id: String(questions[currentQuestionIndx].id),
        author_kan_uid: String(kanUid),
      }),
    enabled: currentQuestionIndx <= questions.length - 1 && Boolean(kanUid),
    gcTime: 0.5,
  });

  const {
    data: comment,
    isSuccess: isCommentsSuccess,
    isLoading: isCommentLoading,
    isError: isCommentError,
  } = useQuery({
    queryKey: ["poll-comment", String(questions[currentQuestionIndx].id)],
    queryFn: async () => {
      const res = await getPollComment({
        question_id: String(questions[currentQuestionIndx].id),
        author_kan_uid: String(kanUid),
      });
      return res.items[0] || "";
    },
    enabled: currentQuestionIndx <= questions.length - 1 && Boolean(kanUid),
    gcTime: 0.5,
  });

  const {
    data: choices,
    isSuccess,
    isLoading,
    isError: isChoicesError,
  } = useQuery({
    queryKey: ["poll-choices", String(questions[currentQuestionIndx].id)],
    queryFn: () =>
      getPollChoices({ questionId: String(questions[currentQuestionIndx].id) }),
    enabled: currentQuestionIndx <= questions.length - 1,
    gcTime: 0.5,
  });
  const currentQuestion = questions[currentQuestionIndx];
  const choicesSuccess = isSuccess && choices && choices.length > 0;

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: Colors.white },
          headerShown: true,
          header: (props) => (
            <NestedHeader
              headerTitle={`Вопрос №${currentQuestionIndx + 1}`}
              backPress={() => {
                if (currentQuestionIndx > 0) {
                  setCurrentQuestionIndx((prev) => prev - 1);
                } else {
                  router.back();
                }
              }}
              {...props}
            />
          ),
        }}
      />
      <ScrollView
        scrollEnabled={scrollEnabled}
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          paddingBottom: 35,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        {(isLoading || isAnswersLoading || isCommentLoading) && (
          <ActivityIndicator size="large" style={styles.indicator} />
        )}
        {isAnswerSuccess &&
          isCommentsSuccess &&
          choicesSuccess &&
          (answers.items.length > 0 ? (
            <PollsQuestionWithAnswer
              answer={answers.items[0]}
              status={status}
              choices={choices}
              currentQuestion={currentQuestion}
              currentQuestionIndx={currentQuestionIndx}
              questions={questions}
              setCurrentQuestionIndx={setCurrentQuestionIndx}
              setScrollEnabled={setScrollEnabled}
              setStage={setStage}
              initialComment={comment}
            />
          ) : (
            <PollsQuestionWithoutAnswer
              status={status}
              choices={choices}
              currentQuestion={currentQuestion}
              currentQuestionIndx={currentQuestionIndx}
              questions={questions}
              setCurrentQuestionIndx={setCurrentQuestionIndx}
              setScrollEnabled={setScrollEnabled}
              setStage={setStage}
            />
          ))}
        {(isChoicesError || isAnswersError || isCommentError) && (
          <Text style={styles.errorMessage}>
            Что-то пошло не так, попробуйте позже
          </Text>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  indicator: {
    marginHorizontal: "auto",
    marginVertical: "auto",
  },
  errorMessage: {
    margin: "auto",
    fontSize: 16,
    fontFamily: Fonts.TBold,
  },
});
