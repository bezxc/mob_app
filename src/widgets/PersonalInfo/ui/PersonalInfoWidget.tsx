import { StyleSheet, Text, View } from "react-native";
import { PersonalImageCard } from "@/entities/personal-image-card";
import { PersonalIncome } from "@/features/PersonalIncome";
import { PersonalInfoForm } from "@/features/PersonalInfoForm";
import { PersonalTransfers } from "@/features/PersonalTransfers";
import { PersonalVacation } from "@/features/PersonalVacation";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { Relatives } from "@/widgets/Relatives";

export const PersonalInfoWidget = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Мои данные</Text>
        <PersonalImageCard />
        <PersonalInfoForm />
      </View>
      <PersonalVacation />
      <View style={styles.childsContainer}>
        <Relatives />
      </View>
      <View>
        <PersonalIncome />
        <PersonalTransfers />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 18,
    gap: 24,
    backgroundColor: Colors.white,
  },
  wrapper: {
    gap: 12,
  },
  childsContainer: {
    gap: 12,
  },
  title: {
    fontFamily: Fonts.TBold,
    fontSize: 22,
  },
});
