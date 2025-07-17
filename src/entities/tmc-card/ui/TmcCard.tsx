import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { InputInfo } from "@/shared/ui";

interface ITmcCard {
  active: string;
  code: string;
  serialCode: string;
}

export const TmcCard: FC<ITmcCard> = ({ active, code, serialCode }) => {
  return (
    <View style={styles.tmcCard}>
      <InputInfo
        style={styles.inputInfo}
        label="Наименование ТМЦ"
        description={active}
        descriptionStyle={styles.description}
        labelStyle={{ color: Colors.gray70 }}
      />
      {serialCode && (
        <InputInfo
          label="Серийный номер"
          description={serialCode}
          style={styles.inputInfo}
          descriptionStyle={styles.description}
          labelStyle={{ color: Colors.gray70 }}
        />
      )}
      {code && (
        <InputInfo
          label="Инвентарный номер"
          description={code}
          style={styles.inputInfo}
          descriptionStyle={styles.description}
          labelStyle={{ color: Colors.gray70 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tmcCard: {
    backgroundColor: Colors.grayLight,
    borderRadius: 20,
    marginTop: 12,
  },
  description: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 14,
  },
  inputInfo: {
    backgroundColor: Colors.grayLight,
    paddingVertical: 5,
  },
});
