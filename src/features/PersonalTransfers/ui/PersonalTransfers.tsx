import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useUnit } from "effector-react";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { getPayslipsInfo } from "@/entities/profile";
import { ProfileDocumentCard } from "@/entities/profile-document-card";
import { $auth } from "@/shared/api/auth.store";
import { Colors, Fonts } from "@/shared/styles/tokens";

export const PersonalTransfers = () => {
  const { kanUid } = useUnit($auth);
  const [count, setCount] = useState(0);

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["accurals"],
    queryFn: () => getPayslipsInfo({ id: kanUid }),
  });

  const [openAccordion, setOpenAccordion] = useState<boolean>(false);
  const open = useSharedValue(openAccordion);

  const payslips = data?.slice(0, 12);

  const onPress = () => {
    if (payslips?.length) {
      if (count < payslips.length - 1) {
        setCount((prev) => prev + 1);
      }

      if (count === payslips.length - 2) {
        open.value = !open.value;
        setOpenAccordion((prev) => !prev);
      }

      if (count === payslips.length - 1) {
        open.value = !open.value;
        setOpenAccordion((prev) => !prev);
        setCount(0);
      }
    }
  };

  if (isError) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Рассчетные листы не найдены</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isLoading || !isSuccess ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.cardsContainer}>
          {data.map((card, index) => (
            <View
              key={card.doc_key}
              style={{ display: index > count ? "none" : "flex" }}
            >
              <ProfileDocumentCard
                title={`Расчетный лист ${dayjs(card.doc_date).format(
                  "MMMM YYYY",
                )}`}
                organizationGuid={card.organization_guid}
                url={card.doc_key}
              />
            </View>
          ))}
          <Pressable
            style={{
              alignSelf: "center",
              alignItems: "center",
              flexDirection: "row",
              marginTop: 10,
            }}
            onPress={onPress}
          >
            {!openAccordion ? (
              <>
                <ChevronDown color={Colors.gray50} />
                <Text style={{ color: Colors.gray50 }}> загрузить больше </Text>
                <ChevronDown color={Colors.gray50} />
              </>
            ) : (
              <>
                <ChevronUp color={Colors.gray50} />
                <Text style={{ color: Colors.gray50 }}> скрыть </Text>
                <ChevronUp color={Colors.gray50} />
              </>
            )}
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
  },
  title: {
    fontFamily: Fonts.TBold,
    fontSize: 22,
  },
  cardsContainer: {
    marginTop: 10,
    flexDirection: "column",
    gap: 10,
  },
  notFound: {
    textAlign: "center",
    fontFamily: Fonts.TRegular,
    fontSize: 14,
  },
  chevronDownIconWrapper: {
    width: 20,
    height: 20,
    backgroundColor: Colors.grayLight,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    flexBasis: "10%",
  },
  button: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  buttonText: {
    fontFamily: Fonts.TBold,
    fontSize: 13,
    color: Colors.redAccent,
  },
});
