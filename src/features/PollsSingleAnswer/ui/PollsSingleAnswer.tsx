import React, { FC } from "react";
import { StyleSheet } from "react-native";
import {
  IPollAnswer,
  IPollsOwnVariant,
  PollsRadioGroupWithOwnVariant,
} from "@/entities/polls";
import { IRadioItem } from "@/shared/types/types";
import { RadioGroup } from "@/shared/ui";

interface IPollsSingleAnswerProps extends IPollsOwnVariant {
  answerVariants: IRadioItem[];
  currentAnswer?: IPollAnswer[] | null;
  setCurrentAnswer: React.Dispatch<React.SetStateAction<IPollAnswer[] | null>>;
  withOwnVariant: boolean;
}

export const PollsSingleAnswer: FC<IPollsSingleAnswerProps> = ({
  withOwnVariant,
  answerVariants,
  currentAnswer,
  setCurrentAnswer,
  ownAnswerValue,
  selected,
  setOwnAnswerValue,
  setSelected,
}) => {
  const handleSelectedRadioChange = (option: IRadioItem) => {
    setCurrentAnswer([{ id: Number(option.value) }]);
  };

  const handleSelectedRadioWithOwnVariantChange = (option: IRadioItem) => {
    if (option.value === "ownVariant") {
      setCurrentAnswer([]);
    } else {
      setCurrentAnswer([{ id: Number(option.value) }]);
    }
  };

  return (
    <>
      {withOwnVariant ? (
        <PollsRadioGroupWithOwnVariant
          activeItem={
            currentAnswer?.[0]?.id
              ? String(currentAnswer[0].id)
              : (selected
                ? "ownVariant"
                : undefined)
          }
          style={styles.checkboxGroup}
          options={answerVariants}
          selectedOwnVariant={selected}
          setSelectedOwnVariant={setSelected}
          onValueChange={handleSelectedRadioWithOwnVariantChange}
          ownAnswerValue={ownAnswerValue}
          setOwnAnswerValue={setOwnAnswerValue}
          withLabelBorder
        />
      ) : (
        <RadioGroup
          activeItem={
            currentAnswer?.[0]?.id ? String(currentAnswer[0].id) : undefined
          }
          style={styles.checkboxGroup}
          options={answerVariants}
          onValueChange={handleSelectedRadioChange}
          withLabelBorder
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  checkboxGroup: { gap: 13, alignSelf: "stretch" },
});
