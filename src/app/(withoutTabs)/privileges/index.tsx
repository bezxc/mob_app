import { useQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { getYearAndMountExperience } from "@/entities/career-card/model/helper";
import { getCategoryCalculation, getUserInfo } from "@/entities/privileges";
import { $auth } from "@/shared/api/auth.store";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { AccordionItem } from "@/shared/ui";
import { PrivilegesTabs } from "@/widgets/PrivilegesTabs";

const PrivilegesPage = () => {
  const { kanUid } = useUnit($auth);
  const {
    data: user,
    isLoading,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["privilegesUserInfo", { kanUid }],
    queryFn: () => getUserInfo(kanUid),
  });

  const [openAccordion, setOpenAccordion] = useState<boolean>(false);
  const open = useSharedValue(openAccordion);

  const { yearsExpirience, mounthExpirience } = getYearAndMountExperience({
    date_start: user?.date_of_experience,
  });

  const calculationCategoryText = getCategoryCalculation({
    discountCategory: user?.discount_category,
    expDate: user?.date_of_experience,
    positionGroup: user?.position_group,
  });

  const onPressAccordion = () => {
    open.value = !open.value;
    setOpenAccordion((prev) => !prev);
  };

  if (isLoading) {
    <ActivityIndicator />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetchUser} />
      }
      contentContainerStyle={styles.container}
    >
      <View style={styles.topInfo}>
        <Image
          style={styles.topImage}
          resizeMode="contain"
          source={require("@/shared/assets/privilegesTop.png")}
        />
        <View style={styles.topInfoInner}>
          {!user ? (
            <ActivityIndicator />
          ) : (
            <>
              <Text style={styles.topText}>
                Моя категория скидки:{" "}
                <Text style={styles.boldText}>{user.discount_category}</Text>
              </Text>
              <Text style={styles.topText}>
                Группа должности:{" "}
                <Text style={styles.boldText}>
                  {user.position_group || "сотрудник"}
                </Text>
              </Text>
              <Text style={styles.topText}>
                Стаж:{" "}
                <Text style={styles.boldText}>
                  {yearsExpirience
                    ? `${yearsExpirience} ${mounthExpirience}`
                    : mounthExpirience}
                </Text>
              </Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.privilegesDescription}>
        <AccordionItem viewKey="privilegesAccordion" isExpanded={open}>
          <Text style={styles.descriptionText}>
            Программа лояльности для сотрудников КАН АВТО даёт возможность
            каждому сотруднику воспользоваться бонусами и выгодными
            предложениями.
          </Text>
          <Text style={styles.descriptionText}>
            В ГК “КАН АВТО” установлено 4 категории скидок, которые зависят от
            стажа работы в компании и должности сотрудника.
          </Text>

          <Image
            style={styles.tableImage}
            resizeMode="contain"
            source={require("@/shared/assets/privilegesTable.png")}
          />
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
      </View>

      <View style={styles.categories}>
        <Text style={styles.title}>Категории скидок</Text>
        {calculationCategoryText && (
          <Text style={styles.descriptionText}>{calculationCategoryText}</Text>
        )}
      </View>

      {user && <PrivilegesTabs currentCategory={user.discount_category} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingBottom: 16,
    gap: 20,
  },
  title: {
    fontFamily: Fonts.TBold,
    fontSize: 18,
    textAlign: "center",
  },
  topInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 5,
  },
  topInfoInner: {
    gap: 8,
    flexShrink: 1,
  },
  topImage: {
    maxWidth: 110,
    maxHeight: 75,
  },
  topText: {
    fontSize: 14,
  },
  privilegesDescription: {
    gap: 8,
  },
  descriptionText: {
    fontSize: 12,
    color: Colors.gray70,
    textAlign: "center",
    fontFamily: Fonts.SFSemiBold,
  },
  tableImage: {
    width: "100%",
    height: 130,
  },
  boldText: {
    fontFamily: Fonts.TBold,
  },
  accordionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  categories: {
    gap: 12,
  },
  accordionBtn: {
    fontFamily: Fonts.TRegular,
    fontSize: 13,
    color: Colors.gray50,
  },
});

export default PrivilegesPage;
