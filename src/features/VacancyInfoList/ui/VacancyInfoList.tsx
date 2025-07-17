import { ChevronDown, ChevronUp, Dot } from "lucide-react-native";
import { FC, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { prepareListData } from "@/entities/vacancies";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { AccordionItem } from "@/shared/ui";

interface IVacancyInfoListProps {
  title: string;
  items: string;
  visibilityCount: number;
  accordionName: string;
}

const getListItems = (from: number, to: number, items: string[]) => {
  return items
    .slice(from, to)
    .map((item, index) => (
      <VacancyInfoListItem key={item + index} item={item} />
    ));
};

const VacancyInfoListItem = ({ item }: { item: string }) => (
  <View key={item} style={styles.listItem}>
    <Dot color={Colors.black} />
    <Text style={styles.listItemText}>{item}</Text>
  </View>
);

export const VacancyInfoList: FC<IVacancyInfoListProps> = ({
  title,
  items,
  visibilityCount,
  accordionName,
}) => {
  const [openAccordion, setOpenAccordion] = useState<boolean>(false);
  const open = useSharedValue(openAccordion);

  const preparedItems = prepareListData(items);

  const onPressAccordion = () => {
    open.value = !open.value;
    setOpenAccordion((prev) => !prev);
  };

  return (
    <View>
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>{title}:</Text>

        <View style={styles.list}>
          {getListItems(0, visibilityCount, preparedItems)}
        </View>
      </View>

      {preparedItems.length > visibilityCount && (
        <>
          <AccordionItem
            viewKey={accordionName}
            isExpanded={open}
            wrapperStyle={{ gap: 0 }}
          >
            {getListItems(visibilityCount, items.length, preparedItems)}
          </AccordionItem>
          <Pressable
            style={{
              alignSelf: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={onPressAccordion}
          >
            {!openAccordion ? (
              <View style={styles.accordionWrapper}>
                <ChevronDown color={Colors.gray50} />
                <Text style={styles.accordionBtn}>загрузить больше</Text>
                <ChevronDown color={Colors.gray50} />
              </View>
            ) : (
              <View style={styles.accordionWrapper}>
                <ChevronUp color={Colors.gray50} />
                <Text style={styles.accordionBtn}>скрыть</Text>
                <ChevronUp color={Colors.gray50} />
              </View>
            )}
          </Pressable>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 30,
  },
  listTitle: {
    fontFamily: Fonts.TBold,
    fontSize: 14,
  },
  list: {
    marginTop: 12,
  },
  listItem: {
    alignItems: "center",
    flexDirection: "row",
  },
  listItemText: {
    flexShrink: 1,
  },
  accordionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  accordionBtn: {
    fontFamily: Fonts.TRegular,
    fontSize: 13,
    color: Colors.gray50,
  },
});
