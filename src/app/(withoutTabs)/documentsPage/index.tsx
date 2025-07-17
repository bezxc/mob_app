import { ScrollView, StyleSheet, View } from "react-native";
import { DocumentCard } from "@/entities/document-card";

export default function DocumentsPage() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.cardContainer}>
        <DocumentCard
          title="Анкета соискателя"
          url="(withoutTabs)/documentsPage/candidatesProfile"
          isLocalLink
        />
        {Array.from({ length: 20 }).map((_, index) => (
          <DocumentCard
            key={index}
            title="Дресс-код"
            url="https://app.kanavto.ru/edoc/cf7f549b-198c-11e9-80cb-0cc47a6f2d8b.pdf"
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    gap: 8,
    paddingBottom: 30,
  },
});
