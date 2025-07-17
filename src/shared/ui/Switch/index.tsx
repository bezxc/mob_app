import React, { FC, useState } from "react";
import { Switch, SwitchProps } from "react-native";
import { Colors } from "@/shared/styles/tokens";

interface ICustomSwitch extends SwitchProps {
  onValueChange?: () => void;
}

export const CustomSwitch: FC<ICustomSwitch> = ({
  onValueChange,
  ...props
}) => {
  const [checked, setChecked] = useState(false);
  const handleChange = (newValue: boolean) => {
    setChecked(newValue);
    if (onValueChange) {
      onValueChange();
    }
  };

  return (
    <Switch
      {...props}
      thumbColor={Colors.white}
      trackColor={{ true: Colors.redAccent }}
      value={checked}
      onValueChange={handleChange}
    />
  );
};
