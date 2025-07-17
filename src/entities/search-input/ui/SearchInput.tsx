import { FC } from "react";
import { StyleSheet } from "react-native";
import { LoopIcon } from "@/shared/assets/icons";
import { Colors } from "@/shared/styles/tokens";
import { IInputProps, Input } from "@/shared/ui";
import { useDebounceCallback } from "@/shared/utils";

interface ISearchInputProps extends IInputProps {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  debounceDelay?: number;
}

export const SearchInput: FC<ISearchInputProps> = ({
  setSearchValue,
  debounceDelay = 500,
  style,
  ...props
}) => {
  const debounced = useDebounceCallback((text) => {
    setSearchValue(text);
  }, debounceDelay);
  return (
    <Input
      {...props}
      autoComplete="off"
      autoCapitalize="none"
      autoCorrect={false}
      onChangeText={(text) => debounced(text)}
      style={[styles.inputStyle, style]}
      containerStyle={[styles.inputContainer, props.containerStyle]}
      logoStyle={styles.logoStyle}
      logo={<LoopIcon stroke={Colors.black} />}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 18,
    paddingLeft: 45,
    paddingVertical: 8,
  },
  inputStyle: {
    color: Colors.black,
  },
  logoStyle: {
    left: 0,
    top: -10,
  },
});
