import { FC } from "react";
import { StyleSheet } from "react-native";
import {
  IPollAnswer,
  IPollsOwnVariant,
  PollsOwnVariant,
} from "@/entities/polls";
import { IRadioItem } from "@/shared/types/types";
import { CheckboxGroup } from "@/shared/ui";

interface IPollsMultiplieAnswerProps extends IPollsOwnVariant {
  answerVariants: IRadioItem[];
  setCurrentAnswer: React.Dispatch<React.SetStateAction<IPollAnswer[] | null>>;
  withOwnVariant: boolean;
  currentAnswer?: IPollAnswer[] | null;
}

export const PollsMultiplieAnswer: FC<IPollsMultiplieAnswerProps> = ({
  answerVariants,
  setCurrentAnswer,
  withOwnVariant,
  currentAnswer,
  ...props
}) => {
  const handleSelectedRadioChange = (options: IRadioItem[]) => {
    setCurrentAnswer(options.map((item) => ({ id: Number(item.value) })));
  };

  return (
    <>
      <CheckboxGroup
        activeItems={currentAnswer?.map((item) => ({
          label: String(item.title),
          value: String(item.id),
        }))}
        style={styles.checkboxGroup}
        options={answerVariants}
        onValueChange={handleSelectedRadioChange}
        activeItem={answerVariants[0].value}
        withOwnVariant={withOwnVariant}
        withLabelBorder
      />
      {withOwnVariant && <PollsOwnVariant {...props} />}
    </>
  );
};

const styles = StyleSheet.create({
  checkboxGroup: { gap: 13, alignSelf: "stretch" },
});
