import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { InputInfo } from "@/shared/ui";

interface IEducationCardProps {
  type_of_education: string | null;
  educational_institution: string | null;
  specialization: string | null;
  year_of_graduation: number | null;
}

export const EducationCard: FC<IEducationCardProps> = ({
  educational_institution,
  specialization,
  type_of_education,
  year_of_graduation,
}) => {
  return (
    <View style={styles.educationWrapper}>
      <InputInfo
        style={styles.inputInfo}
        label="Вид образования"
        description={type_of_education}
        descriptionStyle={styles.description}
        labelStyle={{ color: Colors.gray70 }}
      />
      <InputInfo
        label="Учебное заведение"
        description={educational_institution}
        style={styles.inputInfo}
        descriptionStyle={styles.description}
        labelStyle={{ color: Colors.gray70 }}
      />
      <InputInfo
        label="Специальность"
        description={specialization}
        style={styles.inputInfo}
        descriptionStyle={styles.description}
        labelStyle={{ color: Colors.gray70 }}
      />
      <InputInfo
        style={styles.inputInfo}
        label="Год окончания"
        description={String(year_of_graduation)}
        descriptionStyle={styles.description}
        labelStyle={{ color: Colors.gray70 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 14,
  },
  educationWrapper: {
    backgroundColor: Colors.grayLight,
    borderRadius: 20,
    marginTop: 12,
  },
  educationInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  inputInfo: {
    backgroundColor: Colors.grayLight,
    paddingVertical: 12,
  },
});
