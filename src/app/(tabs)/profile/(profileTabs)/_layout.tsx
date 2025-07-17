import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
  MaterialTopTabBarProps,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useProfileHeaderVariant } from "@/entities/profile-header";
import { Colors } from "@/shared/styles/tokens";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

function CustomTabBar(props: MaterialTopTabBarProps) {
  return (
    <View style={styles.tabBarWrapper}>
      <View style={styles.tabBarInner}>
        <MaterialTopTabBar {...props} />
      </View>
    </View>
  );
}

export default function Layout() {
  // For nested linking to profile tabs
  useProfileHeaderVariant();

  const tabScreens: {
    name: string;
    options: MaterialTopTabNavigationOptions;
  }[] = [
    { name: "index", options: { title: "Личные данные" } },
    { name: "education", options: { title: "Образование" } },
    { name: "career", options: { title: "Карьера" } },
    { name: "tmc", options: { title: "ТМЦ" } },
    { name: "edo", options: { title: "Приказы" } },
  ];

  return (
    <View style={styles.container}>
      <MaterialTopTabs
        tabBar={(props: MaterialTopTabBarProps) => <CustomTabBar {...props} />}
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tab,
          tabBarGap: 16,
          tabBarIndicatorStyle: styles.indicator,
          sceneStyle: {
            backgroundColor: Colors.white,
          },
          tabBarLabel: ({ focused, children }) => (
            <Text style={focused ? styles.tabTextActive : styles.tabText}>
              {children}
            </Text>
          ),
        }}
      >
        {tabScreens.map((screen) => (
          <MaterialTopTabs.Screen
            key={screen.name}
            name={screen.name}
            options={screen.options}
          />
        ))}
      </MaterialTopTabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  tabBarWrapper: {
    marginHorizontal: 18,
    overflow: "hidden",
  },
  tabBarInner: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayText,
  },
  tabBar: {
    backgroundColor: Colors.white,
    elevation: 0,
    shadowOpacity: 0,
  },
  tab: {
    width: "auto",
    padding: 0,
  },
  tabText: {
    color: Colors.grayText,
  },
  tabTextActive: {
    color: Colors.redAccent,
  },
  indicator: {
    display: "none", // new arch broke indicator
    backgroundColor: "red",
    height: 1,
    bottom: -1,
  },
});
