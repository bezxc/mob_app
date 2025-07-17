import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import {
  createAnswerForPollQuestion,
  createCommentForPollQuestion,
  IPollAnswer,
  IPollQuestion,
  IPollQuestions,
  IPollsChoice,
  IStatus,
} from "@/entities/polls";
import { PollsMultiplieAnswer } from "@/features/PollsMultiplieAnswer";
import { PollsRatingAnswer } from "@/features/PollsRatingAnswer";
import { PollsSingleAnswer } from "@/features/PollsSingleAnswer";
import { PollsSlider } from "@/features/PollsSlider";
import { $auth } from "@/shared/api/auth.store";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { Input, LinearGradientButton } from "@/shared/ui";

interface IPollsQuestionWithoutAnswerProps {
  questions: IPollQuestions;
  setStage: (value: number) => void;
  setCurrentQuestionIndx: React.Dispatch<React.SetStateAction<number>>;
  currentQuestionIndx: number;
  currentQuestion: IPollQuestion;
  setScrollEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  choices?: IPollsChoice[];
  status: IStatus;
}

export const PollsQuestionWithoutAnswer: FC<
  IPollsQuestionWithoutAnswerProps
> = ({
  questions,
  setStage,
  setCurrentQuestionIndx,
  currentQuestion,
  currentQuestionIndx,
  setScrollEnabled,
  choices,
  status,
}) => {
  const queryClient = useQueryClient();

  // Свой ответ
  const [ownAnswer, setOwnAnswer] = useState("");
  const [selectedOwnAnswer, setSelectedOwnAnswer] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<IPollAnswer[] | null>(
    null,
  );

  // Комментарий
  const [comment, setComment] = useState("");

  const { kanUid } = useUnit($auth);

  const { mutate: createAnswer } = useMutation({
    mutationFn: createAnswerForPollQuestion,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [
          "poll-answers",
          {
            questionId: response.question_id,
          },
        ],
      });
      setComment("");
      setOwnAnswer("");
      setSelectedOwnAnswer(false);
      setCurrentAnswer(null);
      if (currentQuestionIndx < questions.length - 1) {
        setCurrentQuestionIndx((prev) => prev + 1);
      } else {
        setStage(2);
      }
    },
    onError: (error) => {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Ошибка отправки ответа",
      });
    },
  });

  const { mutate: createComment } = useMutation({
    mutationFn: createCommentForPollQuestion,
    onError: (error) => {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Ошибка отправки комментария",
      });
    },
  });

  const handlePressContinue = () => {
    if (comment) {
      createComment({
        author_kan_uid: Number(kanUid),
        body: comment,
        question_id: currentQuestion.id,
        tag_id: currentQuestion.tag.id,
        is_anonymous: status === "anon",
      });
    }

    createAnswer({
      author_kan_uid: Number(kanUid),
      own_answer: selectedOwnAnswer && ownAnswer ? ownAnswer : null,
      choices: currentAnswer?.length ? (currentAnswer as IPollAnswer[]) : [],
      question_id: currentQuestion.id,
      is_anonymous: status === "anon",
    });
  };

  return (
    <View style={[styles.content]}>
      <View style={styles.contentInner}>
        <View style={[styles.quizHeaderWrapper]}>
          <Text style={styles.quizHeaderTitle}>{currentQuestion.title}</Text>
          {currentQuestion.description && (
            <Text style={styles.quizHeaderDescription}>
              {currentQuestion.description}
            </Text>
          )}
          <Text style={styles.quizHeaderDescription}>
            {currentQuestion.type === "RADIO" && "Выберите один из вариантов"}
            {currentQuestion.type === "CHECKBOX" &&
              "Выберите несколько вариантов"}
            {currentQuestion.type === "SCORE" &&
              choices &&
              `Выберите оценку от ${choices[0].title} до ${choices[1].title} баллов`}
          </Text>
        </View>
        <View>
          {currentQuestion.type === "RADIO" && choices && (
            <PollsSingleAnswer
              withOwnVariant={currentQuestion.has_own_answer}
              setSelected={setSelectedOwnAnswer}
              setOwnAnswerValue={setOwnAnswer}
              ownAnswerValue={ownAnswer}
              selected={selectedOwnAnswer}
              setCurrentAnswer={setCurrentAnswer}
              answerVariants={choices.map((item) => ({
                label: item.title,
                value: String(item.id),
              }))}
            />
          )}
          {currentQuestion.type === "CHECKBOX" && choices && (
            <PollsMultiplieAnswer
              setCurrentAnswer={setCurrentAnswer}
              answerVariants={choices.map((item) => ({
                label: item.title,
                value: String(item.id),
              }))}
              withOwnVariant={currentQuestion.has_own_answer}
              setSelected={setSelectedOwnAnswer}
              setOwnAnswerValue={setOwnAnswer}
              ownAnswerValue={ownAnswer}
              selected={selectedOwnAnswer}
            />
          )}
          {currentQuestion.type === "SCORE" &&
            choices &&
            Number(choices[1].title) <= 10 && (
              <PollsRatingAnswer
                minRating={Number(choices[0].title)}
                maxRating={Number(choices[1].title)}
                setCurrentAnswer={setCurrentAnswer}
              />
            )}
          {currentQuestion.type === "SCORE" &&
            choices &&
            Number(choices[1].title) > 10 && (
              <PollsSlider
                setCurrentAnswer={setCurrentAnswer}
                minValue={Number(choices[0].title)}
                maxValue={Number(choices[1].title)}
                setScrollEnabled={setScrollEnabled}
              />
            )}
        </View>
      </View>
      <View style={[styles.contentFooter]}>
        <Input
          labelText="Ваш комментарий"
          placeholder="Этот вопрос..."
          multiline
          scrollEnabled={false}
          labelStyle={styles.inputColor}
          style={[styles.inputColor]}
          value={comment}
          onChangeText={setComment}
        />
        <LinearGradientButton
          disabled={
            (!currentAnswer?.length &&
              (!selectedOwnAnswer || ownAnswer.length === 0)) ||
            (currentQuestion.type === "CHECKBOX" &&
              currentQuestion.has_own_answer &&
              selectedOwnAnswer &&
              ownAnswer.length === 0)
          }
          onPress={handlePressContinue}
          text="Продолжить"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 40,
    alignItems: "stretch",
    gap: 40,
    justifyContent: "space-between",
  },
  contentInner: {
    gap: 40,
  },
  contentFooter: {
    gap: 20,
  },
  quizHeaderWrapper: {
    gap: 5,
  },
  quizHeaderTitle: {
    fontFamily: Fonts.TBold,
    fontSize: 20,
    textAlign: "center",
  },
  quizHeaderDescription: {
    fontFamily: Fonts.TRegular,
    fontSize: 15,
    color: Colors.grayText,
    textAlign: "center",
  },
  inputColor: {
    color: Colors.black,
  },
});
