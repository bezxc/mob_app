import { FC, useEffect } from "react";
import { Keyboard, StyleSheet } from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { Input, RadioButton } from "@/shared/ui";

export interface IPollsOwnVariant {
  selected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
  ownAnswerValue: string;
  setOwnAnswerValue: React.Dispatch<React.SetStateAction<string>>;
}

export const PollsOwnVariant: FC<IPollsOwnVariant> = ({
  selected,
  setSelected,
  ownAnswerValue,
  setOwnAnswerValue,
}) => {
  const height = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (selected) {
      height.value = withTiming(100, { duration: 200 });
      opacity.value = withTiming(1, { duration: 200 });
    } else {
      height.value = withTiming(0, { duration: 200 });
      opacity.value = withTiming(0, { duration: 200 });
    }
  }, [selected]);

  const handleSelectedRadioChange = () => {
    if (selected) {
      Keyboard.dismiss();
    }
    setSelected((prev) => !prev);
  };
  return (
    <Animated.View style={styles.container}>
      <RadioButton
        label="Свой вариант"
        selected={selected}
        onPress={handleSelectedRadioChange}
        withLabelBorder={false}
        withIcon={false}
        disableOnSelect={false}
      />
      <Animated.View style={{ height, opacity }}>
        <Input
          editable={selected}
          placeholder="Мой вариант..."
          style={styles.inputColor}
          containerStyle={[styles.inputContainer]}
          value={ownAnswerValue}
          onChangeText={setOwnAnswerValue}
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 13,
  },
  inputContainer: {
    marginTop: 17,
  },
  inputColor: {
    color: "#000",
  },
});
