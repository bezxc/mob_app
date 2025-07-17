import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { IStatus } from "@/entities/polls";
import { StackIcon } from "@/shared/assets/icons";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { IRadioItem } from "@/shared/types/types";
import { LinearGradientButton, RadioGroup } from "@/shared/ui";
import { radioButtons } from "../model/radioVariants";

interface IPollsWelcomeProps {
  setStatus: (value: IStatus) => void;
  setStage: (value: number) => void;
  editable?: boolean;
}

export const PollsWelcome: FC<IPollsWelcomeProps> = ({
  setStage,
  setStatus,
  editable,
}) => {
  const handleSelectedRadioChange = (value: IRadioItem) => {
    setStatus(value.value as IStatus);
  };
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <View style={styles.iconInner}>
          <StackIcon />
        </View>
      </View>
      <Text style={styles.title}>
        Пройдите{"\n"} опрос для улучшения{"\n"} качества работы
      </Text>
      <Text style={styles.description}>Опрос займет не больше 15 минут</Text>
      {editable && (
        <RadioGroup
          style={styles.radioGroup}
          options={radioButtons}
          onValueChange={handleSelectedRadioChange}
          activeItem={radioButtons[0].value}
          withIcon
        />
      )}
      <LinearGradientButton onPress={() => setStage(1)} text="Пройти опрос" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 30,
    width: "100%",
    paddingTop: "30%",
  },
  iconWrapper: {
    alignSelf: "center",
    backgroundColor: Colors.grayLight,
    borderRadius: 20,
    padding: 10,
  },
  iconInner: {
    backgroundColor: Colors.white,
    borderRadius: 40,
    padding: 14,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  title: {
    fontFamily: Fonts.TRegular,
    fontSize: 28,
    textAlign: "center",
    lineHeight: 34,
  },
  description: {
    fontFamily: Fonts.TRegular,
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    color: Colors.grayText,
  },
  radioGroup: { flexDirection: "row", gap: 20, alignSelf: "center" },
});
