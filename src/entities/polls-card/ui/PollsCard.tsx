import dayjs from "dayjs";
import { router } from "expo-router";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { QuizIcon } from "@/shared/assets/icons";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { getQuestionWordForm } from "../model/getQuestionWordForm";

interface IPollsCardProps {
  id: number;
  title: string;
  numberOfQuestions: number;
  date_start: string | null;
  date_end: string | null;
  isPassed?: boolean;
}

export const PollsCard: FC<IPollsCardProps> = ({
  id,
  title,
  numberOfQuestions,
  date_start,
  date_end,
  isPassed = false,
}) => {
  const questionLengthString = getQuestionWordForm(Number(numberOfQuestions));

  const onPressPollCard = () => {
    if (isPassed) {
      router.push(`/(withoutTabs)/polls/passed`);
    } else {
      router.push(`/(withoutTabs)/polls/${id}`);
    }
  };
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      disabled={numberOfQuestions === 0}
      onPress={onPressPollCard}
    >
      <View style={[styles.iconContainer]}>
        <QuizIcon width={32} height={32} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>
          <Text style={styles.titleAccent}>Опрос</Text> · {title}
        </Text>
        <View style={styles.actionContainer}>
          <View
            style={[
              styles.actionWrapper,
              isPassed && styles.actionWrapperPassed,
            ]}
          >
            <Text
              style={[styles.actionTitle, isPassed && styles.actionTitlePassed]}
            >
              {isPassed ? "Пройден" : questionLengthString}
            </Text>
          </View>
          {date_end && (
            <View style={styles.dateWrapper}>
              {date_start &&
              !dayjs(date_start).isSame(dayjs(date_end), "day") ? (
                <Text style={styles.actionTitle}>
                  {dayjs(date_start).format("DD.MM.YYYY")} -{" "}
                  {dayjs(date_end).format("DD.MM.YYYY")}
                </Text>
              ) : (
                <Text style={styles.actionTitle}>
                  до {dayjs(date_end).format("DD.MM.YYYY")}
                </Text>
              )}
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  iconContainer: {
    width: 58,
    height: 58,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.grayLight,
  },
  infoContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "space-evenly",
    paddingLeft: 14,
    gap: 9,
  },
  title: {
    fontFamily: Fonts.TBold,
    fontSize: 13,
  },
  titleAccent: {
    color: Colors.redAccent,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionWrapper: {
    height: 19,
    borderWidth: 1,
    borderColor: Colors.grayLight,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 7,
  },
  dateWrapper: {
    height: 19,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  actionWrapperPassed: {
    borderWidth: 1,
    borderColor: Colors.grayLight,
    backgroundColor: Colors.black,
  },
  actionTitle: {
    fontFamily: Fonts.TRegular,
    fontSize: 11,
    lineHeight: 13,
  },
  actionTitlePassed: {
    color: Colors.white,
  },
});
