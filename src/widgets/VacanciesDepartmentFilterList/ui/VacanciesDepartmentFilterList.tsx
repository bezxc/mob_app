import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { MapPin } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SearchInput } from "@/entities/search-input";
import {
  getVacanciesDepartments,
  setVacanciesFilters,
} from "@/entities/vacancies";
import { Colors, Fonts } from "@/shared/styles/tokens";

export const VacanciesDepartmentFilterList = () => {
  const [searchValue, setSearchValue] = useState("");

  const {
    data: vacancyDepartments,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["vacancies-filters-departments", searchValue],
    queryFn: () =>
      getVacanciesDepartments({
        department_name__ilike: searchValue,
      }),
  });

  const handleSelectFilter = ({
    department_guid,
    department_name,
  }: {
    department_guid: string;
    department_name: string;
  }) => {
    setVacanciesFilters({
      department: { department_guid, department_name },
    });
    router.back();
  };

  return (
    <View style={styles.container}>
      <SearchInput
        placeholder="Поиск по позициям"
        setSearchValue={setSearchValue}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
          showsVerticalScrollIndicator={false}
        >
          {vacancyDepartments?.map((item) => (
            <View key={item.department_guid} style={styles.contentContainer}>
              <TouchableOpacity
                style={styles.container}
                onPress={() => {
                  const { department_guid, department_name } = item;
                  handleSelectFilter({ department_guid, department_name });
                }}
              >
                <View style={styles.title}>
                  <View style={styles.icon}>
                    <MapPin
                      size={24}
                      strokeWidth={1}
                      color={Colors.redAccent}
                    />
                  </View>
                  <Text style={styles.positionTitle}>
                    {item.department_name}
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.separatorWrapper}>
                <View style={styles.separator} />
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
  },
  contentContainer: {
    paddingHorizontal: 18,
  },
  emptyListText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: Fonts.TRegular,
  },
  separatorWrapper: {
    height: 16,
    width: "100%",
    justifyContent: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "#E8E8E8",
    width: "100%",
  },

  title: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  icon: {
    backgroundColor: Colors.grayLight,
    padding: 5,
    borderRadius: 10,
  },
  positionTitle: {
    flexShrink: 1,
  },
});
