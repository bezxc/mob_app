import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useUnit } from "effector-react";
import {
  router,
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { $colleaguesFilters } from "@/entities/colleagues";
import { NestedHeaderWithFilters } from "@/entities/nested-header";
import { setVacancyResumeFormFourthStep } from "@/entities/vacancy-resume";

export const useColleaguesInitActions = () => {
  const { from } = useLocalSearchParams<{ from: string }>();
  const { applyFilter } = useUnit($colleaguesFilters);

  const navigation = useNavigation();

  useFocusEffect(() => {
    if (from === "resume") {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: "none" },
      });
      navigation.setOptions({
        header: (props: NativeStackHeaderProps) => (
          <NestedHeaderWithFilters
            headerTitle="Коллеги"
            filtersHref="/(withoutTabs)/colleaguesFilters"
            withBackButton
            backPress={router.dismiss}
            filtersCount={applyFilter ? applyFilter.length : 0}
            {...props}
          />
        ),
      });
    }
  });

  const onPressAction = ({ kan_uid }: { kan_uid: number }) => {
    if (from === "resume") {
      setVacancyResumeFormFourthStep({
        supervisor_kan_uid: kan_uid,
      });
      router.dismiss();
    } else {
      router.push(`/(withoutTabs)/colleaguesInfo/${kan_uid}`);
    }
  };

  return { onPressAction };
};
