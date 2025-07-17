import { FC, useRef } from "react";
import { Pressable, StyleSheet, TextInput, TextInputProps } from "react-native";
import { LoopIcon } from "@/shared/assets/icons";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { useDebounceCallback } from "@/shared/utils";

export const EdoInput: FC<TextInputProps> = ({ ...props }) => {
  const textInputRef = useRef<TextInput | null>(null);
  return (
    <Pressable
      onPress={() => textInputRef.current?.focus()}
      style={styles.container}
    >
      <LoopIcon stroke={Colors.black} />

      <TextInput
        {...props}
        ref={textInputRef}
        style={styles.input}
        placeholderTextColor={Colors.gray}
      />
    </Pressable>
  );
};

interface ISearchInputProps extends TextInputProps {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  debounceDelay?: number;
}

export const EdoSearchInput: FC<ISearchInputProps> = ({
  setSearchValue,
  debounceDelay = 500,
  ...props
}) => {
  const debounced = useDebounceCallback((text) => {
    setSearchValue(text);
  }, debounceDelay);
  return (
    <EdoInput
      {...props}
      autoComplete="off"
      autoCapitalize="none"
      autoCorrect={false}
      onChangeText={(text) => debounced(text)}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 8,
    paddingHorizontal: 21,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.gray,
  },

  input: {
    fontSize: 13,
    color: Colors.black,
    fontFamily: Fonts.TBold,
  },
});
