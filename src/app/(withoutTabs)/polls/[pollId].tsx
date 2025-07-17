import { useQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { getPollAnswers, getPollQuestions, IStatus } from "@/entities/polls";
import { $auth } from "@/shared/api/auth.store";
import { PollsQuestion } from "@/widgets/PollsQuestion";
import { PollsSuccess } from "@/widgets/PollsSuccess";
import { PollsWelcome } from "@/widgets/PollsWelcome";

const CurrentPollsPage = () => {
  const [stage, setStage] = useState(0);
  const [status, setStatus] = useState<IStatus>("deanon");
  const { kanUid } = useUnit($auth);

  const fetchAnswers = async () => {
    try {
      const res = await getPollAnswers({
        question_id: String(pollsQuestion![0].id),
        author_kan_uid: String(kanUid),
      });
      if (res.items.length > 0) {
        const status = res.items[0].is_anonymous ? "anon" : "deanon";
        setStatus(status);
      }
      return res;
    } catch (error) {
      throw error;
    }
  };

  const { pollId } = useLocalSearchParams<{ pollId: string }>();
  const {
    data: pollsQuestion,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["poll-questions", pollId],
    queryFn: () => getPollQuestions({ pollId: pollId as string }),
    gcTime: 10,
  });

  const {
    data: answers,
    isSuccess: isAnswerSuccess,
    isLoading: isAnswersLoading,
  } = useQuery({
    queryKey: ["poll-answers"],
    queryFn: () => fetchAnswers(),
    enabled:
      Array.isArray(pollsQuestion) &&
      Boolean(pollsQuestion[0].id) &&
      Boolean(kanUid),
    gcTime: 0.5,
  });

  return (
    <View style={styles.container}>
      {(isLoading || isAnswersLoading) && (
        <ActivityIndicator size="large" style={styles.indicator} />
      )}

      {isSuccess && isAnswerSuccess && pollsQuestion.length && (
        <>
          {stage === 0 && (
            <PollsWelcome
              editable={answers.items.length === 0}
              setStage={setStage}
              setStatus={setStatus}
            />
          )}
          {stage === 1 && (
            <PollsQuestion
              status={status}
              questions={pollsQuestion}
              setStage={setStage}
            />
          )}
          {stage === 2 && <PollsSuccess />}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    flex: 1,
  },
  indicator: {
    marginHorizontal: "auto",
    marginVertical: "auto",
  },
});

export default CurrentPollsPage;
