import { StyleSheet, Text } from "react-native";
import { Colors, Fonts } from "@/shared/styles/tokens";

export const PolicyText = () => {
  return (
    <Text style={styles.policyText}>
      Нажимая на кнопку “Отправить заявку” Я даю согласие отделу кадров на{" "}
      <Text style={styles.policyTextBorder}>условия обработки</Text> своих
      персональных данных
    </Text>
  );
};

const styles = StyleSheet.create({
  policyText: {
    alignSelf: "center",
    fontFamily: Fonts.TRegular,
    fontSize: 13,
    color: Colors.grayText,
  },
  policyTextBorder: {
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
  },
});
