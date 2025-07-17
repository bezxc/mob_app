import { useUnit } from "effector-react";
import React, { FC } from "react";
import {
  FieldError,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import { Pressable, StyleSheet, Text, View, ViewProps } from "react-native";
import { RelativeSchemaType } from "@/entities/profile";
import { RelativeCard } from "@/entities/relatives";
import { $vacancyResumeForm } from "@/entities/vacancy-resume";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { InputInfo } from "@/shared/ui";

interface IRadioGroupItem {
  label: string;
  value: boolean;
}

export interface IRadioGroupButtonProps {
  option: IRadioGroupItem;
  onValueChange: (value: IRadioGroupItem) => void;
  error?: FieldError;
  isSelectedValue?: boolean;
}

export const VacanciesRadioGroupButton: FC<IRadioGroupButtonProps> = ({
  onValueChange,
  option,
  error,
  isSelectedValue,
  ...props
}) => {
  const { label } = option;
  return (
    <Pressable
      {...props}
      disabled={isSelectedValue}
      onPress={() => {
        onValueChange(option);
      }}
      style={[styles.radioButton, error && styles.error]}
    >
      <View style={styles.labelWrapper}>
        <Text
          style={[styles.radioButtonLabel, styles.radioButtonLabelWithBorder]}
        >
          {label}
        </Text>
      </View>
      <View
        style={[
          styles.radioButtonIcon,
          isSelectedValue && styles.radioButtonSelected,
        ]}
      >
        <View style={styles.radioButtonSelectedInner} />
      </View>
    </Pressable>
  );
};

export interface IRadioGroupProps extends ViewProps {
  onValueChange?: (arg: boolean) => void;
  relatives?: RelativeSchemaType[];
  isRelativesError: boolean;
}

type TRadioGroupField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
} & IRadioGroupProps;
export const VacanciesControlledRadioGroup: FC<TRadioGroupField> = ({
  name,
  onValueChange,
  relatives,
  isRelativesError,
  ...props
}) => {
  const { secondStep } = useUnit($vacancyResumeForm);

  const {
    fieldState: { error },
    field: { onChange, value },
  } = useController({
    name,
  });

  const options = [
    {
      value: true,
      label: "Добавить родственников из Личного профиля",
    },
    {
      value: false,
      label: "Нет близких родственников",
    },
  ];

  const onChangeSelectedRadio = (option: IRadioGroupItem) => {
    onChange(option.value);
    onValueChange?.(option.value);
  };

  return (
    <View style={styles.groupContainer} {...props}>
      <VacanciesRadioGroupButton
        option={options[0]}
        isSelectedValue={options[0].value === value}
        onValueChange={onChangeSelectedRadio}
        error={error}
      />

      {secondStep.add_relatives && (
        <View style={{ gap: 12 }}>
          {(relatives && relatives.length === 0) || isRelativesError ? (
            <InputInfo
              style={styles.infoBlock}
              labelStyle={styles.relativesLabel}
              descriptionStyle={styles.relativesDescription}
              description="Заполните информацию о близких родственниках в Личном профиле, во вкладке Личные данные"
            />
          ) : (
            relatives?.map((r) => (
              <RelativeCard key={r.id} {...r} disableCardMenu />
            ))
          )}
        </View>
      )}
      <VacanciesRadioGroupButton
        option={options[1]}
        isSelectedValue={options[1].value === value}
        onValueChange={onChangeSelectedRadio}
        error={error}
      />

      {relatives && relatives.length > 0 && !secondStep.add_relatives && (
        <InputInfo
          style={styles.infoBlock}
          labelStyle={styles.relativesLabel}
          descriptionStyle={styles.relativesDescription}
          description='В Вашем случае поле "Нет близких родственников" не может быть выбрано. У Вас указаны родственники в Личном профиле.'
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  groupContainer: { gap: 12 },
  labelWrapper: { gap: 11, flexGrow: 1 },

  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingLeft: 20,
    paddingRight: 25,
    paddingVertical: 14,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: Colors.gray30,
  },
  radioButtonIcon: {
    height: 17,
    width: 17,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.grayStroke,
  },
  error: {
    borderColor: Colors.redAccent,
  },
  radioButtonSelected: {
    backgroundColor: Colors.redAccent,
    borderColor: Colors.redAccent,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelectedInner: {
    width: 10,
    height: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  radioButtonLabel: {
    fontFamily: Fonts.TRegular,
    fontSize: 14,
    color: Colors.grayText,
  },
  radioButtonLabelWithBorder: {
    position: "relative",
    top: -1,
    flexGrow: 1,
    color: Colors.black,
  },
  infoBlock: {
    borderWidth: 1,
    borderColor: Colors.gray30,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.white,
  },
  relativesDescription: {
    fontFamily: Fonts.TRegular,
    fontSize: 14,
    color: Colors.redAccent,
  },
  relativesLabel: {
    fontFamily: Fonts.TRegular,
    fontSize: 12,
    color: Colors.gray70,
  },
});
