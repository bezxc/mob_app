import { useUnit } from "effector-react";
import { Href, router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { bottomSheet, toggleBottomSheet } from "@/entities/bottom-sheet";
import { BottomSheetItem } from "@/entities/bottom-sheet-item";
import { bottomSheetScreens } from "@/entities/home-content";
import { CustomBottomSheet } from "@/features/CustomBottomSheet";
import { Colors, Fonts } from "@/shared/styles/tokens";

export const HomeBottomSheet = () => {
  const bottomSheetState = useUnit(bottomSheet);

  const offset = useSharedValue(0);

  const toggleSheet = () => {
    toggleBottomSheet("bottomSheetHome");
    offset.value = 0;
  };

  const handlePressBottomLink = (url: string) => {
    router.push(url as Href);
    toggleSheet();
  };
  return (
    <>
      {bottomSheetState.bottomSheetVisible && (
        <CustomBottomSheet
          height={0.63}
          handlePressBottomLink={handlePressBottomLink}
          offset={offset}
          toggleSheet={toggleSheet}
        >
          <View style={styles.indicator} />
          <View style={styles.bottomContainer}>
            <Text style={styles.bottomTitle}>Все сервисы</Text>
            <View style={styles.bottomLinksContainer}>
              {bottomSheetScreens.map((screen, index) => (
                <BottomSheetItem
                  key={index}
                  start={screen.start}
                  end={screen.end}
                  linearColors={screen.linearColors}
                  icon={screen.icon}
                  title={screen.title}
                  url={screen.url}
                  handlePress={() => handlePressBottomLink(screen.url)}
                />
              ))}
            </View>
          </View>
        </CustomBottomSheet>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    position: "relative",
    zIndex: 100,
  },
  bottomTitle: {
    fontFamily: Fonts.TBold,
    fontSize: 26,
  },
  bottomLinksContainer: {
    marginTop: 23,
    gap: 12,
  },
  indicator: {
    width: 46,
    height: 5,
    alignSelf: "center",
    borderRadius: 7,
    backgroundColor: Colors.grayIndicator,
    marginBottom: 15,
  },
});
