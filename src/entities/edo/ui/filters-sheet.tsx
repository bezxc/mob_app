import { useQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { FC, useState } from "react";
import { LayoutAnimation, StyleSheet, Text, View } from "react-native";
import ActionSheet, {
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import { $auth } from "@/shared/api/auth.store";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { IRadioItem } from "@/shared/types/types";
import { CheckboxGroup, GradientButton } from "@/shared/ui";
import { getEdoDocsRegNumbers } from "../api";
import {
  $edoDocsFilters,
  clearFilters,
  setEdoDocsFilters,
} from "../model/edoFilter.store";

export const FilterSheet: FC<SheetProps> = () => {
  const { kanUid } = useUnit($auth);
  const [prepareOptions, setPrepareOptions] = useState<IRadioItem[]>([]);
  const setPostsFilters = useUnit(setEdoDocsFilters);
  const resetPostsFilters = useUnit(clearFilters);
  const { regNumber } = useUnit($edoDocsFilters);

  const layoutAnimConfig = {
    duration: 300,
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
    },
    delete: {
      duration: 100,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };

  const { data: tags } = useQuery({
    queryKey: ["reg_numbers", { kanUid }],
    queryFn: () => getEdoDocsRegNumbers(kanUid),
  });

  const onSubmit = () => {
    setPostsFilters({ regNumber: prepareOptions });
    SheetManager.hide("reg-numbers");
    LayoutAnimation.configureNext(layoutAnimConfig);
  };

  const reset = () => {
    resetPostsFilters();
    SheetManager.hide("reg-numbers");
    LayoutAnimation.configureNext(layoutAnimConfig);
  };

  return (
    <ActionSheet
      isModal={false}
      gestureEnabled
      containerStyle={{
        padding: 25,
      }}
      indicatorStyle={{
        display: "none",
      }}
    >
      <Text style={styles.title}>Фильтр по рег.номеру</Text>
      {tags && (
        <CheckboxGroup
          onValueChange={(options) => setPrepareOptions(options)}
          activeItems={regNumber}
          options={tags.map((tag) => ({
            label: tag.reg_number,
            value: String(tag.reg_number),
          }))}
          style={styles.commentWrapper}
        />
      )}
      <View style={styles.buttonGroup}>
        <GradientButton
          gradientStyles={{ paddingVertical: 16 }}
          onPress={onSubmit}
        >
          Применить фильтр
        </GradientButton>
        <GradientButton
          onPress={reset}
          gradientStyles={{ paddingVertical: 12 }}
          colors={["#1D77ED", "#56A0FF", "#2572D6"]}
        >
          Сбросить фильтр
        </GradientButton>
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.TBold,
    fontSize: 20,
    color: Colors.darkGray,
    marginBottom: 20,
  },
  buttonGroup: {
    gap: 10,
  },
  commentWrapper: {
    gap: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    borderRadius: 20,
    alignItems: "stretch",
  },
  submitButton: {
    backgroundColor: Colors.redAccent,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: Colors.grayLight,
  },
  submitText: {
    fontFamily: Fonts.TBold,
    fontSize: 15,
    color: Colors.white,
  },
  cancelText: {
    fontFamily: Fonts.TBold,
    fontSize: 15,
    color: Colors.black,
  },
});
