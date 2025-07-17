import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { getIssueHistory, getIssueInfo } from "@/entities/issues";
import { IssuesHistoryCard } from "@/entities/issues-history-card";
import { IssueCenterFileLink } from "@/features/IssueCenterFileLink";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { AccordionItem } from "@/shared/ui";

const IssueInfo = () => {
  const { issueInfo } = useLocalSearchParams();
  const [openAccordion, setOpenAccordion] = useState<boolean>(false);
  const open = useSharedValue(openAccordion);

  const onPress = () => {
    open.value = !open.value;
    setOpenAccordion((prev) => !prev);
  };
  const {
    data: issue,
    isLoading,
    refetch: refetchIssue,
  } = useQuery({
    queryKey: ["issues", { issueInfo }],
    queryFn: () => getIssueInfo({ id: issueInfo as string }),
  });
  const { data: history, isLoading: isHistoryLoading } = useQuery({
    queryKey: ["issueHistory", { issueInfo }],
    queryFn: () => getIssueHistory({ id: issueInfo as string }),
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetchIssue} />
      }
      contentContainerStyle={styles.container}
    >
      {isLoading || !issue ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.cardsContainer}>
          <View style={styles.wrapper}>
            <Text style={styles.title}>Статус</Text>
            <Text style={styles.body}>{issue.status.title}</Text>
          </View>
          {issue.category.category_type.id !== 3 && (
            <View style={styles.wrapper}>
              <Text style={styles.title}>Описание</Text>
              <Text style={styles.body}>
                {issue.body}
                {issue.category.category_type.id === 1 && (
                  <Text>{issue.benefit ? ". " + issue.benefit : ""}</Text>
                )}
              </Text>
            </View>
          )}

          {issue.category.category_type.id === 2 && (
            <View style={styles.wrapper}>
              <Text style={styles.title}>Польза от внедрения</Text>
              <Text style={styles.body}>{issue.benefit}</Text>
            </View>
          )}

          {issue.category.category_type.id === 3 && (
            <>
              <View style={styles.wrapper}>
                <Text style={styles.title}>ФИО кандидата</Text>
                <Text style={styles.body}>{issue.applicant_full_name}</Text>
              </View>
              <View style={styles.wrapper}>
                <Text style={styles.title}>Телефон кандидата</Text>
                <Text style={styles.body}>{issue.applicant_phone}</Text>
              </View>
              <View style={styles.wrapper}>
                <Text style={styles.title}>Рекомендуемая вакансия</Text>
                <Text style={styles.body}>{issue.applicant_vacancy}</Text>
              </View>
            </>
          )}
          {issue.files.length > 0 && (
            <View style={styles.wrapper}>
              <Text style={styles.title}>Прикрепленные файлы</Text>

              {issue.files.map((file) => (
                <IssueCenterFileLink key={file.doc_key} file={file} />
              ))}
            </View>
          )}
          {issue.answer && (
            <View style={styles.wrapper}>
              <Text style={styles.title}>Ответ администратора</Text>
              <Text style={styles.body}>{issue.answer}</Text>
            </View>
          )}
          {!isHistoryLoading && history?.length !== 0 && (
            <Pressable
              style={{
                alignSelf: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
              onPress={onPress}
            >
              {!openAccordion ? (
                <>
                  <ChevronDown color={Colors.gray50} />
                  <Text style={styles.accordionBtn}>
                    показать историю обращения
                  </Text>
                  <ChevronDown color={Colors.gray50} />
                </>
              ) : (
                <>
                  <ChevronUp color={Colors.gray50} />
                  <Text style={styles.accordionBtn}>
                    скрыть исторю обращения
                  </Text>
                  <ChevronUp color={Colors.gray50} />
                </>
              )}
            </Pressable>
          )}
          <AccordionItem
            style={{ gap: 12 }}
            viewKey="issuesAccordion"
            isExpanded={open}
            duration={200}
          >
            {isHistoryLoading || !history ? (
              <ActivityIndicator />
            ) : (
              history.map((item) => (
                <IssuesHistoryCard key={item.id} item={item} />
              ))
            )}
          </AccordionItem>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingBottom: Platform.OS === "ios" ? 64 : 32,
  },
  cardsContainer: {
    gap: 12,
  },
  wrapper: {
    borderWidth: 1,
    borderColor: Colors.gray50,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 15,
    gap: 15,
  },

  title: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 12,
    color: Colors.gray70,
  },
  body: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 13,
    lineHeight: 16,
    color: Colors.black,
  },
  accordionBtn: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 14,
    color: Colors.gray50,
  },
  fileLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default IssueInfo;
