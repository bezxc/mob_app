import dayjs from "dayjs";
import { router } from "expo-router";
import { FC } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { CardMenu } from "@/shared/ui";
import { setVacancyResumeFormThirdStep } from "../model/vacancyResume.store";

interface IPastWorkCareerCardProps {
  id: number;
  organization_name: string | null;
  date_start: string;
  date_end: string | null;
  position: string;
  index: number;
}

interface ICurrentWorkCareerCardProps {
  organization_name: string | null | undefined;
  date_start: string | undefined;
  date_end: string | null | undefined;
  position: string | undefined;
  management_name: string | null | undefined;
  department_name: string | null | undefined;
  styles?: StyleProp<ViewStyle>;
}

export const CurrentWorkCareerCard: FC<ICurrentWorkCareerCardProps> = ({
  organization_name,
  date_start,
  date_end,
  position,
  management_name,
  department_name,
  styles,
}) => (
  <View style={[stylesCurrent.card, styles]}>
    <View style={stylesCurrent.info}>
      <Text style={stylesCurrent.title}>Период работы</Text>
      <Text style={stylesCurrent.description}>
        {`${dayjs(date_start).format("DD.MM.YYYY")} - ${date_end ? dayjs(date_end).format("DD.MM.YYYY") : "По настоящее время"}`}
      </Text>
    </View>
    <View style={stylesCurrent.info}>
      <Text style={stylesCurrent.title}>Должность</Text>
      <Text style={stylesCurrent.description}>{position}</Text>
    </View>
    <View style={stylesCurrent.info}>
      <Text style={stylesCurrent.title}>Управленческое подразделение</Text>
      <Text style={stylesCurrent.description}>{management_name}</Text>
    </View>
    <View style={stylesCurrent.info}>
      <Text style={stylesCurrent.title}>Коробка</Text>
      <Text style={stylesCurrent.description}>{department_name}</Text>
    </View>
    <View style={stylesCurrent.info}>
      <Text style={stylesCurrent.title}>Наименование организации</Text>
      <Text style={stylesCurrent.description}>{organization_name}</Text>
    </View>
  </View>
);

export const PastWorkCareerCard: FC<IPastWorkCareerCardProps> = ({
  organization_name,
  date_start,
  date_end,
  position,
  index,
}) => {
  const redirectToEdit = () => {
    router.push({
      pathname: "/(withoutTabs)/pastWorkForm",
      params: {
        searchParam: index + 1,
      },
    });
  };

  const deleteFx = () => {
    setVacancyResumeFormThirdStep({
      flag: "delete",
      index: index + 1,
    });
  };

  return (
    <View style={[stylesPast.card]}>
      <View style={stylesPast.cardContainer}>
        <View style={{ gap: 15 }}>
          <View style={stylesPast.info}>
            <Text style={stylesPast.title}>Наименование организации</Text>
            <Text style={stylesPast.description}>
              {organization_name ? organization_name : "Не указано"}
            </Text>
          </View>
          <View style={stylesPast.info}>
            <Text style={stylesPast.title}>Период работы</Text>
            <Text style={stylesPast.description}>
              {`${dayjs(date_start).format("DD.MM.YYYY")} - ${date_end ? dayjs(date_end).format("DD.MM.YYYY") : "По настоящее время"}`}
            </Text>
          </View>
          <View style={stylesPast.info}>
            <Text style={stylesPast.title}>Должность</Text>
            <Text style={stylesPast.description}>{position}</Text>
          </View>
        </View>
        <CardMenu deleteFn={deleteFx} editFn={() => redirectToEdit()} />
      </View>
    </View>
  );
};

const stylesPast = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    gap: 12,
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.gray50,
    zIndex: 10,
    paddingBottom: 8,
  },
  title: {
    color: Colors.gray70,
    fontFamily: Fonts.TRegular,
    fontSize: 12,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ellipsisButton: {
    marginTop: 5,
  },
  description: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 13,
    flexShrink: 1,
  },
  info: {
    paddingLeft: 15,
    gap: 3,
  },
});

const stylesCurrent = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    gap: 12,
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.gray50,
    zIndex: 10,
    paddingBottom: 8,
  },
  subCard: {
    backgroundColor: Colors.white,
    paddingVertical: 10,
    margin: -5,
    zIndex: -1,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  title: {
    color: Colors.gray70,
    fontFamily: Fonts.TRegular,
    fontSize: 12,
  },
  description: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 13,
    flexShrink: 1,
  },
  descriptionSubCard: {
    fontFamily: Fonts.TBold,
    fontSize: 13,
  },
  info: {
    paddingLeft: 15,
    gap: 3,
  },
});
