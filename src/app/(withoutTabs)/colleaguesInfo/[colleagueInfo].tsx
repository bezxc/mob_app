import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Linking,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AvatarImage } from "@/entities/avatar-image";
import { getColleagueInfoV2 } from "@/entities/colleagues";
import { TelegramIcon } from "@/shared/assets/icons";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { InputInfo } from "@/shared/ui";
import { formatDateWithTime } from "@/shared/utils";

const ColleaguesDetail = () => {
  const { colleagueInfo } = useLocalSearchParams();

  const {
    data: colleague,
    isLoading,
    refetch: refetchColleague,
  } = useQuery({
    queryKey: ["colleagues", { colleagueInfo }],
    queryFn: () => getColleagueInfoV2({ kan_uid: colleagueInfo as string }),
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetchColleague} />
      }
      contentContainerStyle={styles.container}
    >
      {isLoading || !colleague ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={styles.topContainer}>
            <AvatarImage
              full_name={colleague.full_name}
              kan_uid={String(colleagueInfo)}
              imageStyle={styles.avatar}
            />

            <View style={styles.textWrapper}>
              <Text style={styles.profileName}>{colleague.full_name}</Text>
              <Text style={styles.position} numberOfLines={2}>
                {colleague.position.name}
              </Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            {colleague.date_of_birth && (
              <InputInfo
                labelStyle={styles.label}
                label="Дата рождения"
                description={formatDateWithTime(
                  colleague.date_of_birth,
                  "dayWithMonth",
                )}
              />
            )}
            {colleague.email && (
              <Pressable
                onPress={() => Linking.openURL(`mailto:${colleague.email}`)}
              >
                <InputInfo
                  label="E-mail"
                  labelStyle={styles.label}
                  description={colleague.email}
                />
              </Pressable>
            )}

            {colleague.home_phone && (
              <Pressable
                onPress={() => Linking.openURL(`tel:${colleague.home_phone}`)}
              >
                <InputInfo
                  label="Личный номер телефона"
                  description={colleague.home_phone}
                />
              </Pressable>
            )}
            {colleague.work_phone && (
              <Pressable
                onPress={() => Linking.openURL(`tel:${colleague.work_phone}`)}
              >
                <InputInfo
                  label="Рабочий номер телефона"
                  description={colleague.work_phone}
                />
              </Pressable>
            )}
            {colleague.internal_phone && (
              <InputInfo
                label="Внутренний номер телефона"
                description={colleague.internal_phone}
              />
            )}
            {colleague.division.management.department.name && (
              <InputInfo
                label="Коробка"
                description={colleague.division.management.department.name}
              />
            )}
            {colleague.division.management.name && (
              <InputInfo
                label="Управленческое подразделение"
                description={colleague.division.management.name}
              />
            )}
            {colleague.division.organization.name && (
              <InputInfo
                label="Юридическое лицо"
                description={colleague.division.organization.name}
              />
            )}
            {colleague.telegram && (
              <Pressable
                onPress={() => {
                  Linking.openURL(`http://t.me/${colleague.telegram}`).catch(
                    (error) => console.error("An error occurred", error),
                  );
                }}
              >
                <TelegramIcon
                  style={styles.telegramIcon}
                  width={50}
                  height={50}
                />
              </Pressable>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 50,
    paddingHorizontal: 18,
    paddingBottom: Platform.OS === "ios" ? 64 : 32,
  },
  label: {
    fontFamily: Fonts.TRegular,
    color: Colors.gray70,
  },
  topContainer: {
    alignItems: "center",
    gap: 22,
  },
  avatar: {
    width: 115,
    height: 115,
    borderRadius: 40,
  },
  textWrapper: {
    gap: 10,
  },
  profileName: {
    fontFamily: Fonts.TBold,
    fontSize: 22,
    textAlign: "center",
  },

  position: {
    fontFamily: Fonts.TRegular,
    fontSize: 15,
    color: Colors.grayText,
    textAlign: "center",
  },
  infoContainer: {
    marginTop: 20,
    gap: 10,
  },
  initials: {
    fontSize: 18,
    fontFamily: Fonts.TBold,
  },
  telegramIcon: {
    alignSelf: "center",
  },
});

export default ColleaguesDetail;
