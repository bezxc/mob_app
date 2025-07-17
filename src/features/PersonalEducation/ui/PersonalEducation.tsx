import { useQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { EducationCard } from "@/entities/education-card";
import { EducationType, getEducationInfo } from "@/entities/profile";
import { $auth } from "@/shared/api/auth.store";
import { Fonts } from "@/shared/styles/tokens";

export const PersonalEducation = () => {
  const { kanUid } = useUnit($auth);

  const { data: educations, isError } = useQuery<EducationType>({
    queryKey: ["educations", { kanUid }],
    queryFn: () => getEducationInfo(kanUid),
  });

  return (
    <View style={[styles.container, isError && { display: "none" }]}>
      <Text style={styles.title}>Образование</Text>
      {educations ? (
        educations.map((education) => (
          <EducationCard
            key={education.educational_institution}
            educational_institution={education.educational_institution}
            specialization={education.specialization}
            type_of_education={education.type_of_education}
            year_of_graduation={education.year_of_graduation}
          />
        ))
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: Fonts.TBold,
    fontSize: 16,
  },
});
